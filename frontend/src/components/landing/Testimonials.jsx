import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Dr. John Smith",
    role: "University Chief Librarian",
    review: "SmartShelf AI entirely transformed our library operations. The automated tracking alone saved our staff hundreds of hours this semester.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Sarah Lee",
    role: "Research Scholar",
    review: "The semantic AI search is incredibly accurate and fast. It feels like having a personal research assistant guiding me to the exact chapters I need.",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "David Brown",
    role: "Systems Administrator",
    review: "Deploying this was seamless. It is incredibly easy to manage thousands of digital resources and monitor server health through the analytics dashboard.",
    image: "https://i.pravatar.cc/150?img=33",
  }
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  return (
    <section id="testimonials" className="relative py-24 bg-white text-slate-900 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Trusted by <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Educators & Institutes</span>
          </h2>
          <p className="text-slate-600 text-lg font-light">
            See how library administrators and scholars are modernizing their learning environments with the platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.02)] hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Large Soft Quote Watermark */}
              <FaQuoteLeft className="absolute top-6 right-8 text-5xl text-slate-200/50 group-hover:text-indigo-100 transition-colors duration-500" />

              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>

                <p className="text-slate-600 font-light leading-relaxed text-lg mb-8 relative z-10">
                  "{item.review}"
                </p>
              </div>

              {/* User Avatar & Context */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}