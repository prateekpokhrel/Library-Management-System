import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "What is SmartShelf AI?",
    answer: "SmartShelf AI is a next-generation Library Management System (LMS) that leverages artificial intelligence to automate cataloging, track borrowing, and provide personalized reading recommendations, transforming traditional libraries into smart ecosystems.",
  },
  {
    question: "Can libraries use it for digital resources?",
    answer: "Yes, the platform seamlessly integrates with digital repositories, e-books, and audiobooks. It provides a unified, semantic search experience so readers can discover both physical and digital assets in one place.",
  },
  {
    question: "Is it mobile responsive?",
    answer: "Absolutely. SmartShelf AI is built with a progressive, responsive architecture ensuring a flawless and intuitive experience across desktops, tablets, and smartphones. Users can even use their phones for QR code self-checkout.",
  },
  {
    question: "Does it support AI recommendations?",
    answer: "Yes! Our machine learning models analyze user reading history, semantic book data, and peer borrowing trends to generate highly accurate and personalized book suggestions, increasing reader engagement.",
  },
  {
    question: "Can universities use it?",
    answer: "Our platform is built for enterprise scale. It includes tiered access controls for students and faculty, department-level analytics, and easy integration with standard university identity providers (SSO).",
  },
  {
    question: "Does it support analytics?",
    answer: "It features a comprehensive analytics dashboard that visualizes borrowing trends, peak library hours, return rates, and resource utilization to help administrators make data-driven acquisition decisions.",
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  return (
    <section id="faq" className="relative py-24 bg-slate-50 text-slate-900 overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 mx-auto bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm text-indigo-600">
            <FaQuestionCircle className="text-2xl" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-slate-600 text-lg font-light">
            Everything you need to know about the SmartShelf AI platform.
          </p>
        </div>

        {/* Accordion List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`group bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'border-indigo-200 shadow-md' : 'border-slate-200/60 hover:border-slate-300'}`}
              >
                {/* Question Trigger Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isActive}
                >
                  <h3 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-800'}`}>
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-4 ${isActive ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-700'}`}>
                    <FaChevronDown className="text-xs" />
                  </div>
                </button>

                {/* Answer Accordion Wrapper */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}