import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldVirus } from "react-icons/fa";

export default function OTPVerification() {
  const navigate = useNavigate();
  // Structural references to auto-tab through matching indexes seamlessly
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Context focus initialization onto the primary cell
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    // Auto shift index focal range when a digit string fills an absolute container position
    if (val.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Graceful backward tab on delete keys
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-80 h-80 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-md text-white">
            <FaShieldVirus className="text-2xl text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Security Verification
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-light">
            An encrypted code was passed down to your account profile.
          </p>
        </div>

        <form onSubmit={handleVerify}>
          {/* Boxed Grid Inputs aligned cleanly with light borders */}
          <div className="flex justify-center gap-2.5 mb-8">
            {inputRefs.map((ref, idx) => (
              <input
                key={idx}
                ref={ref}
                type="text"
                maxLength="1"
                onChange={(e) => handleInputChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-14 text-center text-xl font-black rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 shadow-inner outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Confirm Security Token
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-400">
            Didn't catch transmission?{" "}
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none">
              Resend code sequence
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}