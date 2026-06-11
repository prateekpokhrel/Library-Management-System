import React from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaRobot,
  FaChevronRight,
} from "react-icons/fa";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Benefits", href: "#benefits" },
  ];

  const supportLinks = [
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Newsletter", href: "#newsletter" },
    { name: "Contact", href: "#contact" },
  ];

  // Bulletproof smooth scrolling execution for React single-page apps
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      // Fallback update to address address bar sync
      window.history.pushState(null, null, targetId);
    }
  };

  return (
    <footer className="relative bg-white border-t border-slate-200 py-16 overflow-hidden z-20">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Column 1: Brand Info Box */}
          <motion.div variants={itemVariants} className="lg:pr-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
                <FaBookOpen className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  SmartShelf AI
                </h2>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  Intelligent LMS
                </p>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed text-sm font-light">
              Transforming traditional libraries into highly intelligent digital ecosystems powered by AI, analytics, and automation models.
            </p>
          </motion.div>

          {/* Column 2: Navigate Block */}
          <motion.div variants={itemVariants}>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6">
              Navigate
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleScroll(e, link.href)}
                  className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors w-fit text-sm font-medium relative z-30"
                >
                  <FaChevronRight className="text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-indigo-600" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Resources & Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6">
              Resources
            </h3>
            <div className="space-y-3">
              {supportLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="group flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors w-fit text-sm font-medium relative z-30"
                >
                  <FaChevronRight className="text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-cyan-600" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 4: Communication & AI Status Wrapper */}
          <motion.div variants={itemVariants}>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6">
              Stay Connected
            </h3>
            
            <a 
              href="mailto:support@smartshelf.ai" 
              className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors mb-5 text-sm font-medium w-fit relative z-30"
            >
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
                <FaEnvelope className="text-base" />
              </div>
              support@smartshelf.ai
            </a>

            <div className="flex gap-2 mb-6">
              {[
                { icon: <FaGithub />, href: "#" },
                { icon: <FaLinkedin />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 shadow-sm relative z-30"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Boxed Light AI Assistant Card Indicator */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-cyan-50/60 border border-indigo-100/80 shadow-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="font-bold text-slate-800 text-xs tracking-wide uppercase flex items-center gap-1.5">
                  <FaRobot className="text-indigo-600" /> AI Agent Core Online
                </span>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Smart query recommendations and automated workflow triggers running on standard schedule.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Metadata Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-slate-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400"
        >
          <p>© 2026 SmartShelf AI. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span>Core Environment:</span>
            <span className="text-indigo-600">React</span>
            <span>•</span>
            <span className="text-cyan-600">TailwindCSS</span>
            <span>•</span>
            <span className="text-emerald-600">LMS Engine</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}