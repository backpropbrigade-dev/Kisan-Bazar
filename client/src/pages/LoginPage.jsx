"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/slices/authSlice";
import { FaEnvelope, FaLock, FaLeaf, FaTractor, FaUserCheck, FaUserShield } from "react-icons/fa";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("farmer"); // "farmer" or "consumer"

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(clearError());

    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "farmer") {
        navigate("/farmer/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [dispatch, isAuthenticated, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    dispatch(login({ email: demoEmail, password: demoPassword }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 glass p-8 sm:p-10 rounded-2xl shadow-2xl border border-green-200">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
              <FaLeaf className="text-green-600 text-3xl" />
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Welcome to KisanBazar
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Direct Farmer-to-Consumer Platform (No Middlemen)
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-green-100/60 p-1.5 rounded-xl border border-green-200">
          <button
            type="button"
            onClick={() => setActiveTab("farmer")}
            className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "farmer"
                ? "bg-green-600 text-white shadow-md"
                : "text-green-800 hover:bg-green-200/50"
            }`}
          >
            <FaTractor /> Farmer (రైతు)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("consumer")}
            className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "consumer"
                ? "bg-green-600 text-white shadow-md"
                : "text-green-800 hover:bg-green-200/50"
            }`}
          >
            <FaUserCheck /> Consumer (కస్టమర్)
          </button>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm"
            role="alert"
          >
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 text-sm" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-9 text-sm"
                placeholder={
                  activeTab === "farmer"
                    ? "farmer@kisanbazar.com"
                    : "consumer@kisanbazar.com"
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-9 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-white bg-green-600 hover:bg-green-700 font-bold text-sm shadow-md transition-all"
            disabled={loading}
          >
            {loading ? "Signing in..." : `Sign in as ${activeTab === "farmer" ? "Farmer" : "Consumer"}`}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Box */}
        <div className="border-t border-green-200 pt-4">
          <p className="text-center text-xs font-semibold text-gray-500 mb-2">
            ⚡ Quick Demo Login ( recruiters & testing ):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("farmer@example.com", "password123")}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <FaTractor className="text-xs" /> Demo Farmer
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("consumer@example.com", "password123")}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <FaUserCheck className="text-xs" /> Demo Consumer
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@example.com", "admin123")}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <FaUserShield className="text-xs" /> Demo Admin
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-green-600 hover:text-green-700"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
