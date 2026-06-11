import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaUsers, FaGlobe, FaChartPie } from "react-icons/fa";

const benefits = [
  {
    title: "Reduce Manual Work",
    description: "Automate cataloging, user management, and fine tracking to free up 80% of your administrative staff's time.",
    icon: <FaBolt />,
    color: "text-cyan-600",
    bgTint: "bg-cyan-50",
    hoverBorder: "group-hover:border-cyan-200",
    gradient: "from-cyan-50/50 to-transparent",
  },
  {
    title: "Increase Reader Engagement",
    description: "Deliver hyper-personalized reading recommendations that keep students and members returning for more.",
    icon: <FaUsers />,
    color: "text-indigo-600",
    bgTint: "bg-indigo-50",
    hoverBorder: "group-hover:border-indigo-200",
    gradient: "from-indigo-50/50 to-transparent",
  },
  {
    title: "Improve Accessibility",
    description: "Cloud-first architecture ensures your library's digital assets are available 24/7 across all devices.",
    icon: <FaGlobe />,
    color: "text-emerald-600",
    bgTint: "bg-emerald-50",
    hoverBorder: "group-hover:border-emerald-200",
    gradient: "from-emerald-50/50 to-transparent",
  },
  {
    title: "Better Data Insights",
    description: "Make informed acquisition decisions based on real-time borrowing trends and predictive AI analytics.",
    icon: <FaChartPie />,
    color: "text-amber-600",
    bgTint: "bg-amber-50",
    hoverBorder: "group-hover:border-amber-200",
    gradient: "from-amber-50/50 to-transparent",
  },
];

export default function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <section id="benefits" className="relative py-24 bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Top section divider line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 text-slate-900"
          >
            Why Choose <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">SmartShelf AI?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="text-slate-600 text-lg font-light animate-pulse"
          >
            Transform operational bottlenecks into seamless, highly intuitive digital experiences.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative bg-white border border-slate-200/60 rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 ${item.hoverBorder}`}
            >
              {/* Dynamic Smooth Background Reveal on Hover */}
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              {/* Premium Light Watermark Number */}
              <div className="absolute -right-4 -bottom-10 text-9xl font-black text-slate-100/70 pointer-events-none transition-transform duration-500 group-hover:scale-105 select-none">
                0{index + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-slate-100 shadow-sm ${item.bgTint} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 font-light leading-relaxed max-w-md">
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