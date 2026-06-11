import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaPlay, FaArrowRight, FaArrowUp } from "react-icons/fa";

import Navbar from "../../components/landing/Navbar";
import Features from "../../components/landing/Features";
import Solutions from "../../components/landing/Solutions";
import About from "../../components/landing/About";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import Contact from "../../components/landing/Contact";
import Footer from "../../components/landing/Footer";
import Benefits from "../../components/landing/Benefits";
import HowItWorks from "../../components/landing/HowItWorks";
import Newsletter from "../../components/landing/Newsletter";

export default function LandingPage() {
  // State for Scroll-to-Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        
        {/* Light Background Pattern & Ambient Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-indigo-200/50 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-cyan-200/50 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-white shadow-sm text-indigo-600 text-sm font-semibold tracking-wide mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                AI Powered Library Platform
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl font-black leading-tight tracking-tight text-slate-900">
                SmartShelf AI
              </motion.h1>

              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold mt-4 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight pb-2">
                Intelligent Digital <br /> Ecosystems
              </motion.h2>

              <motion.p variants={fadeUp} className="mt-6 text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                Modern AI-powered management designed for progressive institutions. Automate cataloging, engage readers, and leverage smart recommendations from one beautifully designed dashboard.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
                <a
                  href="#features"
                  className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-semibold shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_25px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                  Explore Features
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                  <FaPlay className="text-indigo-500 text-sm" />
                  Watch Demo
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-y-4 gap-x-6 mt-12 pt-8 border-t border-slate-200">
                {['AI Recommendations', 'Semantic Search', 'QR Borrowing', 'Predictive Analytics'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm md:text-base">
                    <FaCheckCircle className="text-cyan-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side Dashboard Preview (Light Boxed Theme) */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 40 }}
              className="relative perspective-1000"
            >
              <motion.div 
                animate={floatAnimation} 
                className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden"
              >
                {/* Decorative sheen */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      Library Overview
                    </h3>
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Books Available</p>
                      <h4 className="text-4xl font-black text-indigo-600">
                        12.5K
                      </h4>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Active Members</p>
                      <h4 className="text-4xl font-black text-cyan-600">
                        3.2K
                      </h4>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-2xl p-6 mt-5 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold text-slate-800">Borrowing Activity</h4>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">+14% This Month</span>
                    </div>
                    
                    {/* Fixed Height Flex Container */}
                    <div className="flex items-end gap-3 h-32">
                      {[40, 70, 50, 90, 60, 100].map((height, idx) => (
                        <div key={idx} className="w-full h-full flex items-end group cursor-pointer">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="bg-gradient-to-t from-indigo-500 to-cyan-400 w-full rounded-t-lg group-hover:opacity-80 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100/50 rounded-2xl p-5 mt-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900 text-sm">
                        AI Recommendation Engine Active
                      </h4>
                      <p className="text-indigo-700/70 text-xs mt-1 leading-relaxed">
                        Curating personalized paths based on semantic reading history.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features">
        <Features />
      </section>

      {/* Platform Solutions */}
      <section id="solutions">
        <Solutions />
      </section>

      {/* Benefits */}
      <section id="benefits">
        <Benefits />
      </section>

      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* About Company */}
      <section id="about">
        <About />
      </section>

      {/* Social Proof */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Newsletter */}
      <section id="newsletter">
        <Newsletter />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />

      {/* Animated Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] transition-shadow duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border border-slate-700/50 backdrop-blur-md"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}