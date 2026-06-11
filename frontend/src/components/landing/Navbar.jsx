import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow/border change when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler for anchor links
  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, null, targetId);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-950/85 backdrop-blur-2xl border-b border-indigo-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]" 
          : "bg-slate-950/50 backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between text-white">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-shadow duration-300">
            <FaBookOpen className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent tracking-tight">
              SmartShelf AI
            </h1>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mt-0.5">
              Intelligent Platform
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          {[
            { name: "Features", href: "#features" },
            { name: "Solutions", href: "#solutions" },
            { name: "About", href: "#about" },
            { name: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="relative text-slate-300 hover:text-white transition-colors duration-300 group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Login Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/user/login"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-400/50 text-indigo-100 transition-all duration-300 text-sm font-bold"
          >
            <FaUser className="text-indigo-400" />
            User Login
          </Link>

          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaShieldAlt />
            Admin
          </Link>
        </div>

      </div>
    </motion.nav>
  );
}