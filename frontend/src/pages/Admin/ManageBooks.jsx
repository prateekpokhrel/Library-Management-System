import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaChevronLeft, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook, searchBooks } from "../../services/bookService";

export default function ManageBooks() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Custom UI States to replace native alerts/confirms
  const [viewBook, setViewBook] = useState(null); // Holds book object to view
  const [deleteBookId, setDeleteBookId] = useState(null); // Holds ID of book to delete
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooksData(data);
    } catch (err) {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBook(deleteBookId);
      showToast("Book deleted successfully", "success");
      fetchBooks();
    } catch {
      showToast("Failed to delete book", "error");
    } finally {
      setDeleteBookId(null);
    }
  };

  const filteredBooks = booksData.filter(
      (book) =>
          book.title?.toLowerCase().includes(search.toLowerCase()) ||
          book.author?.authorName?.toLowerCase().includes(search.toLowerCase()) ||
          book.category?.categoryName?.toLowerCase().includes(search.toLowerCase()) ||
          book.publisher?.publisherName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading Books...
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
          {error}
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100 relative">

        {/* --- CUSTOM MODALS & TOASTS --- */}
        <AnimatePresence>

          {/* Toast Notification */}
          {toast.visible && (
              <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border z-[60] ${
                      toast.type === "success"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}
              >
                {toast.type === "success" ? <FaCheckCircle className="text-emerald-500 text-xl" /> : <FaExclamationCircle className="text-rose-500 text-xl" />}
                <span className="font-bold text-sm">{toast.message}</span>
              </motion.div>
          )}

          {/* View Details Modal */}
          {viewBook && (
              <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
              >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
                >
                  <button onClick={() => setViewBook(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors">
                    <FaTimes size={20} />
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Book Details</h2>

                  <div className="space-y-4">
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</p><p className="font-semibold text-slate-900 text-lg">{viewBook.title}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Author</p><p className="font-medium text-slate-700">{viewBook.author?.authorName}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</p><p className="font-medium text-slate-700">{viewBook.category?.categoryName}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Publisher</p><p className="font-medium text-slate-700">{viewBook.publisher?.publisherName}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ISBN</p><p className="font-medium text-slate-700">{viewBook.isbn || "N/A"}</p></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inventory Status</p>
                      <p className="font-bold text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-lg mt-1">
                        {viewBook.availableQuantity} available out of {viewBook.quantity} total
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteBookId && (
              <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
              >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center"
                >
                  <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    <FaTrash />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Book?</h2>
                  <p className="text-slate-500 text-sm mb-8">Are you sure you want to delete this book? This action cannot be undone.</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => setDeleteBookId(null)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all w-full">Cancel</button>
                    <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all w-full shadow-sm">Delete</button>
                  </div>
                </motion.div>
              </motion.div>
          )}

        </AnimatePresence>
        {/* --- END CUSTOM UI --- */}

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-4 sm:px-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Manage Books</h1>
              <p className="text-slate-500 mt-2 font-medium">Add, update, and audit the library catalog.</p>
            </div>
            <button
                onClick={() => navigate("/admin/books/add")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md"
            >
              <FaPlus /> Add Book
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mb-6 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
                type="text"
                placeholder="Search catalog by title, author, category, or publisher..."
                value={search}
                onChange={async (e) => {
                  const value = e.target.value;
                  setSearch(value);

                  if (!value.trim()) {
                    fetchBooks();
                    return;
                  }

                  try {
                    const data = await searchBooks(value);
                    setBooksData(data);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
            />
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Book Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Publisher</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">#{book.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.author?.authorName}</p>
                        <p className="text-xs text-indigo-600 font-medium">
                          Qty: {book.availableQuantity}/{book.quantity}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{book.category?.categoryName}</span>
                      </td>
                      <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600">
                        {book.publisher?.publisherName}
                      </span>
                      </td>
                      <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                          book.availableQuantity > 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        {book.availableQuantity > 0 ? "Available" : "Unavailable"}
                      </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                              onClick={() => setViewBook(book)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          >
                            <FaEye />
                          </button>
                          <button onClick={() => navigate(`/admin/books/edit/${book.id}`)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><FaEdit /></button>
                          <button
                              onClick={() => setDeleteBookId(book.id)}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
              {filteredBooks.length === 0 && (
                  <div className="p-8 text-center text-slate-500 text-sm">No books found matching your criteria.</div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
  );
}