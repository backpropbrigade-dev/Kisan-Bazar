import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheck, FaCrown, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";

const PricingPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      navigate("/login?redirect=pricing");
      return;
    }
    if (user?.role === "farmer") {
      navigate(`/farmer/subscription?plan=${plan}`);
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-sm">
            <FaCrown className="text-amber-500" /> Agri-Tech SaaS Membership Plans
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Grow Your Farm Business with KisanBazar Pro
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Directly market your produce to thousands of consumers, eliminate middlemen, and track sales revenue with built-in SaaS analytics.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free Starter */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Starter Farmer</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Basic</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Essential tools to showcase your harvest online.</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-500 font-medium"> / forever</span>
              </div>

              <ul className="mt-8 space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> List up to 5 Produce Items
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> Standard Search Visibility
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> Direct Consumer Messaging
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> Order Request Notifications
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan("free")}
              className="mt-8 w-full bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Farmer (Featured) */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-500 p-8 flex flex-col justify-between relative transform hover:-translate-y-1 transition-transform">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow">
              Most Popular for Local Farms
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Pro Farmer <FaCrown className="text-amber-400" />
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Recommended</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Unlock unlimited produce listings and verified trust status.</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">$19</span>
                <span className="text-gray-500 font-medium"> / month</span>
              </div>

              <ul className="mt-8 space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3 font-medium">
                  <FaCheck className="text-green-500 shrink-0" /> <strong>Unlimited</strong> Produce Listings
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <FaCheck className="text-green-500 shrink-0" /> <strong>Verified Farmer Badge</strong> on Profile
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> Top Priority Placement in Search
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> Real-time Revenue & Sales Analytics
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-green-500 shrink-0" /> Featured Homepage Placement
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan("pro")}
              className="mt-8 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition-colors shadow-md"
            >
              Upgrade to Pro Plan
            </button>
          </div>

          {/* Enterprise Co-op */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Co-Op Enterprise</h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">For Groups</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">For large farming organizations, cooperatives, and bulk distributors.</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">$49</span>
                <span className="text-gray-500 font-medium"> / month</span>
              </div>

              <ul className="mt-8 space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <FaCheck className="text-purple-500 shrink-0" /> Everything in Pro Plan
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-purple-500 shrink-0" /> Multi-farm Manager Accounts
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-purple-500 shrink-0" /> Dedicated Account Representative
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-purple-500 shrink-0" /> Bulk Order Logistics Integration
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan("enterprise")}
              className="mt-8 w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Choose Enterprise
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-green-600 text-xl mx-auto mb-4">
              <FaShieldAlt />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Build Buyer Trust</h4>
            <p className="text-gray-600 text-sm">Verified Farmer badges assure consumers of authentic organic produce and direct farm origin.</p>
          </div>
          <div>
            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-green-600 text-xl mx-auto mb-4">
              <FaChartLine />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Sales Analytics</h4>
            <p className="text-gray-600 text-sm">Monitor revenue, top-performing crops, and pending order fulfilment with easy visual charts.</p>
          </div>
          <div>
            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-green-600 text-xl mx-auto mb-4">
              <FaRocket />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Instant Scale</h4>
            <p className="text-gray-600 text-sm">List unlimited products without worrying about listing caps or hidden commissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
