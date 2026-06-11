import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaHeart,
  FaStar,
  FaBookmark,
  FaDownload,
  FaChevronLeft,
  FaBrain,
  FaRegHeart,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { getBookById, borrowBook } from "../../services/bookService";
import { addToWishlist } from "../../services/wishlistService";

export default function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Updated handler implemented from the provided image
  const handleWishlist = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await addToWishlist(
          userId,
          book.id
      );

      alert("Book added to wishlist");
    } catch (error) {
      const message =
          error.response?.data?.message ||
          error.response?.data?.error || // Also catching the 'error' key we added in the backend
          error.response?.data ||
          "Failed to add to wishlist";

      alert(message);
    }
  };

  // Animation variants for smooth loading
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
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
        <div className="min-h-screen flex items-center justify-center">
          Loading Book...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-indigo-100 pb-16">
        {/* Top Navigation Bar */}
        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <FaChevronLeft className="text-xs" /> Back to Catalog
          </button>
        </header>

        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto px-4 sm:px-8"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Cover Image & Actions */}
            <motion.div variants={item} className="lg:col-span-4 flex flex-col gap-6">
              {/* Book Cover */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 aspect-[3/4] relative overflow-hidden group">
                {book.coverImage ? (
                    <img
                        src={`http://localhost:8086/uploads/${book.coverImage}`}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          console.log(
                              "FAILED URL:",
                              `http://localhost:8086/uploads/${book.coverImage}`
                          );
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-2xl">
                      <FaBook
                          size={80}
                          className="text-slate-300"
                      />
                    </div>
                )}
              </div>

              {/* Quick Actions (Desktop only, mobile moves below details) */}
              <div className="hidden lg:flex flex-col gap-3">
                <button
                    onClick={async () => {
                      try {
                        const userId = localStorage.getItem("userId");
                        await borrowBook(userId, book.id);
                        alert("Book Borrowed Successfully");
                        fetchBook();
                      } catch (err) {
                        console.error(err);
                        alert("Borrow Failed");
                      }
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-sm transition-all"
                >
                  <FaBookmark />
                  Borrow Resource
                </button>
                <div className="grid grid-cols-2 gap-3">
                  {/* Updated Button here */}
                  <button
                      onClick={handleWishlist}
                      className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-sm"
                  >
                    <FaRegHeart /> Add To Wishlist
                  </button>
                  <button className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-sm">
                    <FaDownload /> Preview
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Book Details */}
            <motion.div variants={item} className="lg:col-span-8 flex flex-col">
              {/* Main Info */}
              <div className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest">
                  {book.availableQuantity > 0 ? "Available" : "Unavailable"}
                </span>
                  <div className="flex items-center gap-1 text-yellow-400 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-100">
                    <FaStar size={12} />
                    <span className="text-xs font-bold text-yellow-700">
                    {book.rating || "N/A"}
                  </span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-slate-500 font-medium">
                  by{" "}
                  <span className="text-indigo-600 cursor-pointer hover:underline">
                  {book.author?.authorName}
                </span>
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex flex-col gap-1 border-r border-slate-100 last:border-0 sm:border-r">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Category
                </span>
                  <span className="text-sm font-semibold text-slate-800">
                  {book.category?.categoryName}
                </span>
                </div>
                <div className="flex flex-col gap-1 border-slate-100 sm:border-r">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Pages
                </span>
                  <span className="text-sm font-semibold text-slate-800">
                  N/A
                </span>
                </div>
                <div className="flex flex-col gap-1 border-r border-slate-100 last:border-0 sm:border-r">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Language
                </span>
                  <span className="text-sm font-semibold text-slate-800">
                  English
                </span>
                </div>
                <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Publisher
                </span>
                  <span className="text-sm font-semibold text-slate-800 truncate pr-2">
                  {book.publisher?.publisherName}
                </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Synopsis
                </h3>
                <p className="text-slate-600 leading-relaxed font-serif text-lg">
                  No description available.
                </p>
              </div>

              {/* Mobile Actions (Visible only on small screens) */}
              <div className="lg:hidden flex flex-col gap-3 mb-12">
                <button
                    onClick={async () => {
                      try {
                        const userId = localStorage.getItem("userId");
                        await borrowBook(userId, book.id);
                        alert("Book Borrowed Successfully");
                        fetchBook();
                      } catch (err) {
                        console.error(err);
                        alert("Borrow Failed");
                      }
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-sm transition-all"
                >
                  <FaBookmark />
                  Borrow Resource
                </button>
                <div className="grid grid-cols-2 gap-3">
                  {/* Updated Button here */}
                  <button
                      onClick={handleWishlist}
                      className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm shadow-sm"
                  >
                    <FaRegHeart /> Add To Wishlist
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm shadow-sm">
                    <FaDownload /> Preview
                  </button>
                </div>
              </div>

              {/* AI Suggestions */}
              <motion.div variants={item}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-purple-100 p-1.5 rounded text-purple-600">
                    <FaBrain size={14} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Similar by AI
                  </h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    book.category?.categoryName,
                    "Similar Resource",
                    "Recommended Book",
                  ].map((title, index) => (
                      <div
                          key={index}
                          className="bg-white border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-md p-4 rounded-xl cursor-pointer transition-all group flex items-start gap-3"
                      >
                        <div className="mt-1 text-slate-300 group-hover:text-indigo-400 transition-colors">
                          <FaBook size={16} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors leading-tight">
                      {title}
                    </span>
                      </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
  );
}