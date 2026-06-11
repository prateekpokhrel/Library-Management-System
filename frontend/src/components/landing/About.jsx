import React from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaBookOpen,
  FaUsers,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section id="about" className="relative py-24 bg-white text-slate-900 overflow-hidden">
      
      {/* Soft Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-50 rounded-full blur-[80px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Content Column */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="inline-block border border-indigo-100 bg-indigo-50 px-4 py-1.5 rounded-full text-indigo-600 text-sm font-bold tracking-wider uppercase mb-6">
              Our Vision
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900">
              Redefining the <br />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Modern Library
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed text-lg mb-6 font-light">
              SmartShelf AI is a next-generation Library Management System designed to modernize educational institutions, universities, and public libraries using artificial intelligence, analytics, and automation.
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-4 mb-8">
              {[
                'Reduce manual administrative work by 80%', 
                'Provide hyper-personalized reading paths', 
                'Seamless cloud integration and remote access'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm md:text-base">
                  <FaCheckCircle className="text-cyan-500 text-xl flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.button variants={fadeUp} className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_25px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300">
              Discover Our Story
            </motion.button>
          </motion.div>

          {/* Right Composite Layout Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-4 md:p-8 border border-slate-100 bg-slate-50/50 shadow-inner"
          >
            {/* Embedded Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1000&auto=format&fit=crop" 
                alt="Modern Library Architecture" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
            </div>

            {/* Premium Boxed Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {[
                {
                  icon: <FaRobot className="text-3xl text-cyan-600" />,
                  title: "AI Powered",
                  desc: "Harnessing machine learning for smarter workflows.",
                  bg: "bg-cyan-50",
                },
                {
                  icon: <FaBookOpen className="text-3xl text-indigo-600" />,
                  title: "Smart Library",
                  desc: "Digital-first approach with seamless integration.",
                  bg: "bg-indigo-50",
                },
                {
                  icon: <FaUsers className="text-3xl text-emerald-600" />,
                  title: "User Focused",
                  desc: "Designed to enhance reader experience globally.",
                  bg: "bg-emerald-50",
                },
                {
                  icon: <FaGlobe className="text-3xl text-amber-600" />,
                  title: "Cloud Ready",
                  desc: "Accessible anywhere with secure cloud hosting.",
                  bg: "bg-amber-50",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 backdrop-blur-md border border-slate-100 p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:bg-white hover:border-slate-200 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}