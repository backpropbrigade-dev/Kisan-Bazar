import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCrown, FaCheckCircle, FaSpinner, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import API_URL from "../../config/api";

const SubscriptionPage = () => {
  const [searchParams] = useSearchParams();
  const requestedPlan = searchParams.get("plan");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscription(data.data);
    } catch (error) {
      toast.error("Failed to load subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planToUpgrade) => {
    try {
      setUpgrading(true);
      const { data } = await axios.post(
        `${API_URL}/subscription/upgrade`,
        { plan: planToUpgrade },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message || `Upgraded to ${planToUpgrade.toUpperCase()}!`);
      await fetchSubscription();
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription upgrade failed.");
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  const currentPlan = subscription?.plan || "free";
  const usage = subscription?.productUsage || { current: 0, max: 5, remaining: 5 };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/farmer/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Farmer Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Current SaaS Membership</span>
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 mt-1">
                {currentPlan.toUpperCase()} PLAN
                {currentPlan !== "free" && <FaCrown className="text-amber-400 text-2xl" />}
                {subscription?.isVerified && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FaShieldAlt /> Verified Farmer
                  </span>
                )}
              </h1>
            </div>

            {currentPlan === "free" ? (
              <button
                onClick={() => handleUpgrade("pro")}
                disabled={upgrading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {upgrading ? <FaSpinner className="animate-spin" /> : <FaCrown />} Upgrade to Pro ($19/mo)
              </button>
            ) : (
              <span className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-xl border border-green-200">
                Active Subscription
              </span>
            )}
          </div>

          {/* Usage Meter */}
          <div>
            <div className="flex justify-between items-center text-sm font-semibold mb-2">
              <span className="text-gray-700">Product Listing Usage</span>
              <span className="text-green-700">
                {usage.current} / {usage.max === Infinity ? "Unlimited" : usage.max} Items Listed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  usage.current >= 5 && currentPlan === "free" ? "bg-amber-500" : "bg-green-500"
                }`}
                style={{
                  width: usage.max === Infinity ? "100%" : `${Math.min(100, (usage.current / usage.max) * 100)}%`,
                }}
              ></div>
            </div>
            {currentPlan === "free" && usage.current >= 5 && (
              <p className="text-amber-600 text-xs mt-2 font-medium">
                You've reached your free listing limit! Upgrade to Pro to list more harvest items.
              </p>
            )}
          </div>
        </div>

        {/* Change / Select Tier Options */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Subscription Tier</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier Card */}
          <div
            className={`bg-white rounded-2xl p-6 border-2 transition-all ${
              currentPlan === "free" ? "border-green-500 shadow-md" : "border-gray-200"
            }`}
          >
            <h3 className="font-bold text-lg text-gray-900">Starter Free</h3>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">$0 <span className="text-sm font-normal text-gray-500">/mo</span></p>
            <ul className="text-xs text-gray-600 space-y-2 my-4">
              <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Up to 5 product listings</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Standard search</li>
            </ul>
            {currentPlan === "free" ? (
              <span className="block text-center text-sm font-bold text-green-600 py-2 bg-green-50 rounded-lg">Current Plan</span>
            ) : (
              <button
                onClick={() => handleUpgrade("free")}
                disabled={upgrading}
                className="w-full py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200"
              >
                Downgrade to Free
              </button>
            )}
          </div>

          {/* Pro Tier Card */}
          <div
            className={`bg-white rounded-2xl p-6 border-2 transition-all relative ${
              currentPlan === "pro" ? "border-green-500 shadow-lg" : "border-green-300 hover:border-green-500"
            }`}
          >
            <span className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">POPULAR</span>
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-1.5">Pro Farmer <FaCrown className="text-amber-400" /></h3>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">$19 <span className="text-sm font-normal text-gray-500">/mo</span></p>
            <ul className="text-xs text-gray-600 space-y-2 my-4">
              <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Unlimited produce listings</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Verified badge status</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Sales analytics dashboard</li>
            </ul>
            {currentPlan === "pro" ? (
              <span className="block text-center text-sm font-bold text-green-600 py-2 bg-green-50 rounded-lg">Current Plan</span>
            ) : (
              <button
                onClick={() => handleUpgrade("pro")}
                disabled={upgrading}
                className="w-full py-2 bg-green-600 text-white font-bold rounded-lg text-sm hover:bg-green-700 shadow"
              >
                {upgrading ? "Upgrading..." : "Select Pro Plan"}
              </button>
            )}
          </div>

          {/* Enterprise Tier Card */}
          <div
            className={`bg-white rounded-2xl p-6 border-2 transition-all ${
              currentPlan === "enterprise" ? "border-purple-500 shadow-md" : "border-gray-200"
            }`}
          >
            <h3 className="font-bold text-lg text-gray-900">Co-Op Enterprise</h3>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">$49 <span className="text-sm font-normal text-gray-500">/mo</span></p>
            <ul className="text-xs text-gray-600 space-y-2 my-4">
              <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Everything in Pro</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Multi-user manager</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500" /> Logistics integration</li>
            </ul>
            {currentPlan === "enterprise" ? (
              <span className="block text-center text-sm font-bold text-purple-600 py-2 bg-purple-50 rounded-lg">Current Plan</span>
            ) : (
              <button
                onClick={() => handleUpgrade("enterprise")}
                disabled={upgrading}
                className="w-full py-2 bg-purple-600 text-white font-bold rounded-lg text-sm hover:bg-purple-700"
              >
                {upgrading ? "Upgrading..." : "Select Enterprise"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
