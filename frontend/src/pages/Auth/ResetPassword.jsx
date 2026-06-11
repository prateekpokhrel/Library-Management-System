import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUnlockAlt, FaLock } from "react-icons/fa";

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Complete validation sync sequence and direct cleanly home
    navigate("/user/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-md text-white">
            <FaUnlockAlt className="text-xl text-amber-400" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-light">
            Establish a strong, new encryption layer for your library portal card entry.
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-5">
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">New Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaLock />
              </span>
              <input 
                type="password" 
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 font-medium text-sm shadow-inner"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm New Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaLock />
              </span>
              <input 
                type="password" 
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 font-medium text-sm shadow-inner"
              />
            </div>
          </div>

          {/* Micro-copy checklist for password criteria */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-500 font-light space-y-1">
            <p className="font-semibold text-slate-700 mb-1">Security Standards Checklist:</p>
            <p>• Must encompass at least 8 distinct alphanumeric positions</p>
            <p>• Incorporate one specialized context asset character variable (e.g. @, #, $)</p>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Account Password
          </button>
        </form>
      </motion.div>
    </div>
  );
}