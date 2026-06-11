import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowLeft, FaUserCircle, FaGoogle } from "react-icons/fa";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8086/api/auth/login", {
        email,
        password
      });

      // Crucial Step: Capture the ID robustly whether the backend sends "id", "userId", or nests it.
      const fetchedUserId = response.data.id || response.data.userId || response.data.user?.id;

      // Save user details and token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", fetchedUserId); // Guaranteed to be set correctly
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);

      // Navigate to dashboard upon successful login
      navigate("/user/dashboard");

    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Initiating Google SSO...");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 py-12 overflow-hidden font-sans">

        {/* Light Ambient Background Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Back to Home Navigation Link */}
        <Link
            to="/"
            className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group z-10"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden z-10"
        >
          {/* Top Accent Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"></div>

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-indigo-600">
              <FaUserCircle className="text-3xl" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-light">
              Access your personalized library dashboard.
            </p>
          </div>

          {/* Error Message Display */}
          {error && (
              <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold rounded-xl text-center">
                {error}
              </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaEnvelope />
              </span>
                <input
                    type="email"
                    placeholder="reader@smartshelf.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium text-sm shadow-inner disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaLock />
              </span>
                <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium text-sm shadow-inner disabled:opacity-60"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1 ml-1">
              <label className="flex items-center text-sm font-medium text-slate-600 cursor-pointer group select-none">
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition mr-2.5 cursor-pointer"
                />
                <span className="group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
            >
              {isLoading ? "Authenticating..." : "Login to Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Or Continue With</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google SSO Button */}
          <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={isLoading}
              className="w-full bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-1 disabled:opacity-60"
          >
            <FaGoogle className="text-rose-500 text-lg" />
            Sign in with Google
          </button>

          {/* Signup Link */}
          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/user/signup" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors">
              Create one now
            </Link>
          </p>

        </motion.div>
      </div>
  );
}