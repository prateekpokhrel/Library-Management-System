import React from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaSearch,
  FaBook,
  FaQrcode,
  FaChartLine,
  FaUsers,
  FaArrowRight
} from "react-icons/fa";

const features = [
  {
    title: "Smart Semantic Search",
    description: "Locate any resource in milliseconds using natural language processing and advanced filtering.",
    icon: <FaSearch />,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    hoverBorder: "group-hover:border-cyan-200",
    hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.2)]",
  },
  {
    title: "AI Recommendations",
    description: "Personalized reading paths curated by deep learning algorithms based on your borrowing history.",
    icon: <FaRobot />,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    hoverBorder: "group-hover:border-indigo-200",
    hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)]",
  },
  {
    title: "Digital Library Access",
    description: "Read thousands of e-books and audiobooks seamlessly across all your devices, anytime.",
    icon: <FaBook />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    hoverBorder: "group-hover:border-emerald-200",
    hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)]",
  },
  {
    title: "QR Code Borrowing",
    description: "Frictionless self-checkout. Scan physical books with your smartphone for instant borrowing.",
    icon: <FaQrcode />,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
    hoverBorder: "group-hover:border-fuchsia-200",
    hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(217,70,239,0.2)]",
  },
  {
    title: "Reading Analytics",
    description: "Track your reading habits, visualize your progress, and set intelligent goals with dynamic charts.",
    icon: <FaChartLine />,
    color: "text-amber-600",
    bg: "bg-amber-50",
    hoverBorder: "group-hover:border-amber-200",
    hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)]",
  },
  {
    title: "Community Hub",
    description: "Connect with fellow readers, join virtual book clubs, and share insights in real-time forums.",
    icon: <FaUsers />,
    color: "text-rose-600",
    bg: "bg-rose-50",
    hoverBorder: "group-hover:border-rose-200",
    hoverShadow: "group-hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.2)]",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const Features = () => {
  return (
    <section id="features" className="relative bg-white py-24 px-6 overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-3">
            Core Capabilities
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Next-Generation{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Features
            </span>
          </h3>
          <p className="text-slate-600 text-lg font-light">
            Everything you need to manage, discover, and interact with the library of the future, powered by cutting-edge AI.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative bg-white border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-sm ${feature.hoverShadow} ${feature.hoverBorder}`}
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 ${feature.bg} ${feature.color} transition-colors duration-300`}>
                {feature.icon}
              </div>

              {/* Text Content */}
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-slate-600 leading-relaxed mb-6 font-light">
                {feature.description}
              </p>

              {/* Hover Action Link */}
              <div className={`flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ${feature.color}`}>
                <span>Explore Feature</span>
                <FaArrowRight className="text-xs" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;