import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaKey, FaArrowLeft } from "react-icons/fa";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    // Progress smoothly to transaction verification matrix
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 overflow-hidden font-sans">
      
      {/* Light Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-md text-white">
            <FaKey className="text-xl text-cyan-400" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-light leading-relaxed">
            Enter your verified email profile asset below. We will transmit an automatic 6-digit cryptographic verification code.
          </p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaEnvelope />
              </span>
              <input 
                type="email" 
                placeholder="reader@smartshelf.ai"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 font-medium text-sm shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Verification OTP
          </button>
        </form>

        <Link
          to="/user/login"
          className="group flex items-center justify-center gap-2 mt-6 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors text-center"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
          Return to user authentication
        </Link>
      </motion.div>
    </div>
  );
}