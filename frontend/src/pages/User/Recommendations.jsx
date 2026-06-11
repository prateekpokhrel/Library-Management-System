import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaStar,
  FaBook,
  FaBrain,
  FaChevronLeft,
  FaRegHeart
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getRecommendedBooks } from "../../services/bookService";

export default function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const data = await getRecommendedBooks();

      const formattedBooks = data
          .filter((book) => book.availableQuantity > 0)
          .slice(0, 8)
          .map((book, index) => ({
            id: book.id,
            title: book.title,
            author: book.author?.authorName || "Unknown Author",
            category: book.category?.categoryName || "General",
            imageUrl: book.coverImage || book.imageUrl, // Handling fallback just in case based on your previous models
            score: 95 - index,
          }));

      setRecommendations(formattedBooks);
    } catch (error) {
      console.error("Failed to load recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-500 font-medium animate-pulse">
          <FaRobot size={24} className="mr-3 text-indigo-300" />
          Loading Recommendations...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">
        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto px-4 sm:px-8"
        >
          <motion.div variants={item} className="mb-10 flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl border border-indigo-200">
              <FaRobot size={28} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
                AI Suggestions
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Personalized curation powered by SmartShelf engine.
              </p>
            </div>
          </motion.div>

          {/* AI Insight Header Cards */}
          <motion.div variants={item} className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-max mb-4">
                <FaBrain />
              </div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">
                Reading Pattern
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Based on your borrowing history and available resources.
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl w-max mb-4">
                <FaBook />
              </div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">
                Top Category
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {recommendations[0]?.category || "General"}
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl w-max mb-4">
                <FaStar />
              </div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">
                Engine Accuracy
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {recommendations.length} Books Available
              </p>
            </div>
          </motion.div>

          {/* Recommendations Grid */}
          <motion.div variants={item} className="grid lg:grid-cols-2 gap-6">
            {recommendations.map((book) => (
                <div
                    key={book.id}
                    className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    {/* Book Cover Image */}
                    <div className="w-24 h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                      {book.imageUrl ? (
                          <img
                              src={`http://localhost:8086/uploads/${book.imageUrl}`}
                              alt={book.title}
                              className="w-full h-full object-cover"
                          />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaBook className="text-slate-300 text-3xl" />
                          </div>
                      )}
                    </div>

                    {/* Info Container */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors line-clamp-2">
                          {book.title}
                        </h2>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold whitespace-nowrap ml-2">
                      {book.score}% Match
                    </span>
                      </div>
                      <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-1">
                        {book.author}
                      </p>
                      <span className="inline-block bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-6">
                    {book.category}
                  </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
                      <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                          style={{ width: `${book.score}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-3">
                      <button
                          onClick={() => navigate(`/user/book/${book.id}`)}
                          className="flex-1 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
                      >
                        View Details
                      </button>
                      <button className="w-11 bg-slate-50 hover:bg-pink-50 border border-slate-100 hover:border-pink-200 text-slate-400 hover:text-pink-500 rounded-xl flex items-center justify-center transition-all">
                        <FaRegHeart />
                      </button>
                    </div>
                  </div>
                </div>
            ))}
            {/* Empty State */}
            {!loading && recommendations.length === 0 && (
                <div className="col-span-1 lg:col-span-2 text-center py-10">
                  <p className="text-slate-500">
                    No recommended books are currently available. Check back later!
                  </p>
                </div>
            )}
          </motion.div>
        </motion.div>
      </div>
  );
}