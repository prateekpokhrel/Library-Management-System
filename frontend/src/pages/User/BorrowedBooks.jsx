import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUndo,
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaChevronLeft,
  FaHistory
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getMyBorrowedBooks,
  returnBook
} from "../../services/borrowService";

export default function BorrowedBooks() {
  const navigate = useNavigate();

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const data = await getMyBorrowedBooks(userId);
      setBorrowedBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading borrowed books...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">

        {/* Top Navigation / Breadcrumb */}
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
          {/* Page Header */}
          <motion.div variants={item} className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
              My Checkouts
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage your currently borrowed resources and returns.
            </p>
          </motion.div>

          {/* KPI Summary Grid */}
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                  <FaCheckCircle />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {borrowedBooks.filter(b => !b.returnDate).length}
              </h3>
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Active Books</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500">
                  <FaExclamationTriangle />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {borrowedBooks.filter(b => !b.returnDate && new Date(b.dueDate) < new Date()).length}
              </h3>
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Overdue</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <FaHistory />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {borrowedBooks.length}
              </h3>
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Lifetime Borrowed</p>
            </div>
          </motion.div>

          {/* Borrowed Books List */}
          <div className="space-y-4">
            {borrowedBooks.map((book) => {
              const isOverdue = !book.returnDate && new Date(book.dueDate) < new Date();

              return (
                  <motion.div
                      variants={item}
                      key={book.id}
                      className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >

                    {/* Left: Icon & Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5 lg:w-1/3">
                      <img
                          src={
                            book.book?.imageUrl
                                ? `http://localhost:8086${book.book.imageUrl}`
                                : "/book-placeholder.png"
                          }
                          alt={book.book?.title}
                          className="w-16 h-20 rounded-xl object-cover border"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-tight">
                          {book.book?.title}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                          {book.book?.author?.name}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Dates & Status */}
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-12 lg:w-auto">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <FaCalendarAlt /> Borrowed
                        </div>
                        <p className="text-sm font-semibold text-slate-700">
                          {new Date(book.borrowDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 border-l border-slate-100 pl-6 lg:pl-12">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <FaClock /> Due Date
                        </div>
                        <p className={`text-sm font-semibold ${isOverdue ? "text-rose-600" : "text-slate-700"}`}>
                          {new Date(book.dueDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="border-l border-slate-100 pl-6 lg:pl-12">
                      <span
                          className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                              isOverdue
                                  ? "bg-rose-50 text-rose-600 border-rose-100"
                                  : book.returnDate
                                      ? "bg-slate-50 text-slate-500 border-slate-200"
                                      : "bg-emerald-50 text-emerald-600 border-emerald-100"
                          }`}
                      >
                        {isOverdue ? "Overdue" : book.returnDate ? "Returned" : "Active"}
                      </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-slate-100 lg:border-t-0">

                      {!book.returnDate && (
                          <button
                              onClick={async () => {
                                if (!window.confirm("Return this book?")) return;
                                try {
                                  await returnBook(book.id);
                                  alert("Book returned successfully");
                                  fetchBorrowedBooks();
                                } catch {
                                  alert("Return failed");
                                }
                              }}
                              className="flex-1 lg:flex-none bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 text-slate-600 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-sm"
                          >
                            <FaUndo />
                            Return
                          </button>
                      )}

                      <button
                          onClick={() => navigate(`/user/book/${book.book?.id || book.id}`)}
                          className="flex-1 lg:flex-none bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-center"
                      >
                        Details
                      </button>
                    </div>

                  </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
  );
}