import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaBook,
  FaHeart,
  FaEye,
  FaChevronLeft,
  FaRegHeart
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllBooks } from "../../services/bookService";

export default function BrowseBooks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to load books", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(
      (book) =>
          book.title?.toLowerCase().includes(search.toLowerCase()) ||
          book.author?.name?.toLowerCase().includes(search.toLowerCase()) ||
          book.isbn?.includes(search)
  );

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading Books...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-8">

          <motion.div variants={item} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Search Catalog</h1>
              <p className="text-slate-500 mt-2 font-medium">Discover resources powered by SmartShelf AI.</p>
            </div>

            <div className="relative w-full md:max-w-md group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                  type="text"
                  placeholder="Search books, authors, or ISBN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm placeholder:text-slate-400"
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
                <div key={book.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 hover:border-indigo-100 transition-all group flex flex-col">

                  <div className="h-56 bg-slate-50 relative overflow-hidden">
                    {book.coverImage ? (
                        <img
                            src={`http://localhost:8086/uploads/${book.coverImage}`}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaBook size={48} className="text-slate-300 group-hover:text-indigo-300 transition-colors drop-shadow-sm" />
                        </div>
                    )}
                    <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border bg-white ${
                      book.availableQuantity > 0 ? "text-emerald-600 border-emerald-100" : "text-amber-600 border-amber-100"
                  }`}>
                    {book.availableQuantity > 0 ? "Available" : "Unavailable"}
                  </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">{book.category?.name}</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors mb-1">{book.title}</h3>
                    <p className="text-sm font-medium text-slate-500 mb-6">{book.author?.name}</p>

                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => navigate(`/user/book/${book.id}`)} className="flex-1 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all">
                        <FaEye /> View
                      </button>
                      <button className="w-11 bg-white border border-slate-100 hover:border-pink-200 hover:bg-pink-50 text-slate-400 hover:text-pink-500 rounded-xl flex items-center justify-center transition-all">
                        <FaRegHeart />
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
  );
}