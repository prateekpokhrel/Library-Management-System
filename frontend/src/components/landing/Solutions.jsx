import React from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaBook,
  FaChartLine,
  FaUsers,
  FaSearch,
  FaCloud,
} from "react-icons/fa";

export default function Solutions() {
  const solutions = [
    {
      icon: <FaBook />,
      title: "Smart Book Management",
      description: "Manage thousands of books with intelligent categorization, automated tagging, and real-time tracking.",
      color: "text-indigo-600",
      bgTint: "bg-indigo-50",
      hoverGlow: "group-hover:border-indigo-200 group-hover:shadow-indigo-500/10",
    },
    {
      icon: <FaUsers />,
      title: "Student Management",
      description: "Maintain complete digital records of students, faculty, and readers with tiered access controls.",
      color: "text-cyan-600",
      bgTint: "bg-cyan-50",
      hoverGlow: "group-hover:border-cyan-200 group-hover:shadow-cyan-500/10",
    },
    {
      icon: <FaRobot />,
      title: "AI Recommendations",
      description: "Personalized book recommendations powered by machine learning algorithms that adapt to reading habits.",
      color: "text-emerald-600",
      bgTint: "bg-emerald-50",
      hoverGlow: "group-hover:border-emerald-200 group-hover:shadow-emerald-500/10",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      description: "Gain actionable insights into borrowing trends, peak hours, and reader behavior with beautiful charts.",
      color: "text-amber-600",
      bgTint: "bg-amber-50",
      hoverGlow: "group-hover:border-amber-200 group-hover:shadow-amber-500/10",
    },
    {
      icon: <FaSearch />,
      title: "Advanced Search",
      description: "Find books instantly using natural language processing, semantic search, or AI-driven context queries.",
      color: "text-rose-600",
      bgTint: "bg-rose-50",
      hoverGlow: "group-hover:border-rose-200 group-hover:shadow-rose-500/10",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Library",
      description: "Access your entire library infrastructure securely from anywhere, backed by enterprise-grade encryption.",
      color: "text-purple-600",
      bgTint: "bg-purple-50",
      hoverGlow: "group-hover:border-purple-200 group-hover:shadow-purple-500/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  return (
    <section id="solutions" className="relative py-24 bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-indigo-100/50 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            End-to-End <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Smart Solutions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="text-slate-600 text-lg md:text-xl font-light leading-relaxed"
          >
            Everything your institution needs to transition into a modern, AI-powered digital ecosystem. Automate the mundane, focus on the readers.
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.hoverGlow}`}
            >
              {/* Card Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${item.bgTint} ${item.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}