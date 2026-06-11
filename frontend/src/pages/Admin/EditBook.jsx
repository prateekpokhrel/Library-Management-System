import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaSave, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { getBookById, updateBook } from "../../services/bookService";
import { getAllAuthors } from "../../services/authorService";
import { getAllCategories } from "../../services/categoryService";
import { getAllPublishers } from "../../services/publisherService";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    isbn: "",
    quantity: "",
    authorId: "",
    categoryId: "",
    publisherId: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Custom Toast State
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [book, authorsData, categoriesData, publishersData] = await Promise.all([
          getBookById(id),
          getAllAuthors(),
          getAllCategories(),
          getAllPublishers()
        ]);

        setForm({
          title: book.title,
          isbn: book.isbn,
          quantity: book.quantity,
          authorId: book.author?.id || "",
          categoryId: book.category?.id || "",
          publisherId: book.publisher?.id || ""
        });

        setAuthors(authorsData);
        setCategories(categoriesData);
        setPublishers(publishersData);
      } catch (err) {
        console.error("Failed to load book data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    if (type === "error") {
      setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateBook(id, {
        title: form.title,
        isbn: form.isbn,
        quantity: Number(form.quantity),
        authorId: Number(form.authorId),
        categoryId: Number(form.categoryId),
        publisherId: Number(form.publisherId),
      });

      // Show custom React toast instead of native alert
      showToast("Book Updated Successfully", "success");

      // Delay navigation slightly so user can read the success message
      setTimeout(() => {
        navigate("/admin/books");
      }, 1500);

    } catch (err) {
      console.error(err);
      showToast("Failed To Update Book", "error");
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          Loading Book Details...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100 relative">

        {/* Custom Toast Notification */}
        <AnimatePresence>
          {toast.visible && (
              <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border z-50 ${
                      toast.type === "success"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}
              >
                {toast.type === "success" ? (
                    <FaCheckCircle className="text-emerald-500 text-xl" />
                ) : (
                    <FaExclamationCircle className="text-rose-500 text-xl" />
                )}
                <span className="font-bold text-sm">{toast.message}</span>
              </motion.div>
          )}
        </AnimatePresence>

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button
              onClick={() => navigate(-1)}
              disabled={isSaving}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
          >
            <FaChevronLeft className="text-xs" /> Back to Catalog
          </button>
        </header>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4 sm:px-8">

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Edit Resource</h1>
            <p className="text-slate-500 mt-2 font-medium">Updating details for book ID: <span className="font-bold text-indigo-600">#{id}</span></p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8 sm:p-10">

            <div className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Book Title</label>
                  <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      disabled={isSaving}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Author Name</label>
                  <select
                      value={form.authorId}
                      onChange={(e) => setForm({ ...form, authorId: e.target.value })}
                      disabled={isSaving}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Author</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>
                          {author.authorName}
                        </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Category</label>
                  <select
                      value={form.categoryId}
                      onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                      disabled={isSaving}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Publisher</label>
                  <select
                      value={form.publisherId}
                      onChange={(e) => setForm({ ...form, publisherId: e.target.value })}
                      disabled={isSaving}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Publisher</option>
                    {publishers.map(publisher => (
                        <option key={publisher.id} value={publisher.id}>
                          {publisher.publisherName}
                        </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">ISBN</label>
                  <input
                      type="text"
                      value={form.isbn}
                      onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                      disabled={isSaving}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Quantity</label>
                  <input
                      type="number"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      disabled={isSaving}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                  onClick={() => navigate(-1)}
                  disabled={isSaving}
                  className="px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTimes /> Cancel
              </button>
              <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-wait"
              >
                <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
  );
}