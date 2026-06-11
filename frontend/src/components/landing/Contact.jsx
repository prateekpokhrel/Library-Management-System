import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 60 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const contactDetails = [
    {
      icon: <FaEnvelope className="text-cyan-600 text-lg" />,
      title: "Email Us",
      value: "support@smartshelf.ai",
      desc: "Our engineering team responds within 24 hours.",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
    },
    {
      icon: <FaPhone className="text-emerald-600 text-lg" />,
      title: "Call Us",
      value: "+977 9800000000",
      desc: "Mon-Fri from 9am to 6pm.",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      icon: <FaMapMarkerAlt className="text-rose-600 text-lg" />,
      title: "Visit Us",
      value: "Kathmandu, Nepal",
      desc: "SmartShelf AI Corporate Office.",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-white text-slate-900 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-sm font-bold text-indigo-600 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Our Team is Online
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Let's Start a <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Conversation</span>
          </h2>
          <p className="text-slate-600 text-lg font-light">
            Have a question about standard deployment models or pricing matrices? Our specialists are ready to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side Info Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {contactDetails.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group flex items-start gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${item.bg} ${item.border} transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                    {item.value}
                  </p>
                  <p className="text-slate-500 text-sm font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side Form Element */}
          <motion.div 
            variants={formVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <form className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@university.edu"
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your library infrastructure requirements..."
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 placeholder-slate-400 resize-none shadow-inner"
                />
              </div>

              <button
                type="button"
                className="group w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 pt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Message
                <FaPaperPlane className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-sm" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}