import React from "react";
import { motion } from "framer-motion";
import {
  FaBook, FaHeart, FaTrash, FaEye, FaChevronLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();

  const wishlistBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear", category: "Self Improvement", status: "Available" },
    { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", status: "Available" },
    { id: 3, title: "Artificial Intelligence", author: "Stuart Russell", category: "AI", status: "Borrowed" },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">
      
      <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
          <FaChevronLeft className="text-xs" /> Back to Dashboard
        </button>
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <motion.div variants={item} className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">My Saved Items</h1>
          <p className="text-slate-500 mt-2 font-medium">Resources you've earmarked for later.</p>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {wishlistBooks.map((book) => (
            <div key={book.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 hover:border-pink-100 transition-all group flex flex-col">
              
              <div className="h-48 bg-slate-50 flex items-center justify-center relative group-hover:bg-pink-50/30 transition-colors overflow-hidden">
                <FaBook size={48} className="text-slate-200 group-hover:text-pink-200 transition-colors drop-shadow-sm" />
                <div className="absolute top-4 right-4">
                   <FaHeart className="text-pink-400 drop-shadow-md" size={20} />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">{book.category}</p>
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">{book.title}</h2>
                <p className="text-sm font-medium text-slate-500 mb-4">{book.author}</p>
                
                <div className="mb-6">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border bg-white ${
                    book.status === "Available" ? "text-emerald-600 border-emerald-100" : "text-amber-600 border-amber-100"
                  }`}>
                    {book.status}
                  </span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button onClick={() => navigate(`/user/book/${book.id}`)} className="flex-1 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all shadow-sm">
                    <FaEye /> View
                  </button>
                  <button className="w-11 bg-rose-50 border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl flex items-center justify-center transition-all">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Minimalist Insights Footer */}
        <motion.div variants={item} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Wishlist Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-2 border-indigo-500 pl-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Top Interest</p>
              <p className="text-base font-bold text-slate-900">Artificial Intelligence</p>
            </div>
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Suggested Next</p>
              <p className="text-base font-bold text-slate-900">Deep Learning</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Library Match</p>
              <p className="text-base font-bold text-slate-900">94% Alignment</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}