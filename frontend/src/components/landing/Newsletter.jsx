import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-16 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Subtle Background Glow inside the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-50 to-transparent blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Stay <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Updated</span>
            </h2>
            
            <p className="text-slate-600 text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Join our newsletter to receive the latest feature releases, AI integration tips, and SmartShelf news directly to your inbox.
            </p>

            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
                required
              />
              <button 
                type="submit"
                className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Subscribe Now
                <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            <p className="text-xs text-slate-400 font-medium mt-6">
              We care about your data privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}