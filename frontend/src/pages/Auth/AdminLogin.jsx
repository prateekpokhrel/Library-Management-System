import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaArrowLeft,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

import { login } from "../../services/authService";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        email,
        password,
      });

      localStorage.setItem(
          "token",
          response.token
      );

      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);

      setError(
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 overflow-hidden font-sans select-none">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-200/40 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Back Button */}
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
            transition={{ duration: 0.5 }}
            className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden z-10"
        >
          {/* Top Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-md text-white">
              <FaShieldAlt className="text-2xl" />
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Admin Portal
            </h1>

            <p className="text-slate-500 text-sm mt-1.5 font-light">
              Secure authentication for library administrators.
            </p>
          </div>

          <form
              onSubmit={handleLogin}
              className="space-y-5"
          >

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Email Address
              </label>

              <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <FaEnvelope />
              </span>

                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    placeholder="admin@example.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium text-sm shadow-inner"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Password
              </label>

              <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <FaLock />
              </span>

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 font-medium text-sm shadow-inner"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
            )}

            {/* Remember */}
            <div className="flex items-center justify-between pt-1 ml-1">
              <label className="flex items-center text-sm font-medium text-slate-600">
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 mr-2.5"
                />
                Remember device
              </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-300 disabled:opacity-70"
            >
              {loading
                  ? "Authenticating..."
                  : "Authenticate & Log In"}
            </button>
          </form>
        </motion.div>
      </div>
  );
}