import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaSave, FaTimes, FaCloudUploadAlt, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { addBook } from "../../services/bookService";
import { getAllAuthors } from "../../services/authorService";
import { getAllCategories } from "../../services/categoryService";
import { getAllPublishers } from "../../services/publisherService";

export default function AddBook() {
  const navigate = useNavigate();

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

  // State for the image file and its preview URL (UI only for now)
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [authorsData, categoriesData, publishersData] = await Promise.all([
          getAllAuthors(),
          getAllCategories(),
          getAllPublishers(),
        ]);

        setAuthors(authorsData);
        setCategories(categoriesData);
        setPublishers(publishersData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("isbn", form.isbn);
      formData.append("quantity", form.quantity);
      formData.append("authorId", form.authorId);
      formData.append("categoryId", form.categoryId);
      formData.append("publisherId", form.publisherId);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await addBook(formData);

      alert("Book Added Successfully");
      navigate("/admin/books");

    } catch (err) {
      console.error(err);
      setError("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Catalog
          </button>
        </header>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4 sm:px-8">

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Add New Resource</h1>
            <p className="text-slate-500 mt-2 font-medium">Register a new physical book or digital asset into the system.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8 sm:p-10">

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                  {error}
                </div>
            )}

            <div className="space-y-6">

              {/* Top Row: Title & Author */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Book Title</label>
                  <input
                      type="text"
                      placeholder="e.g., Clean Architecture"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Author Name</label>
                  <select
                      value={form.authorId}
                      onChange={(e) => setForm({ ...form, authorId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
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

              {/* Bottom Row: Category/Publisher & ISBN/Quantity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Category</label>
                    <select
                        value={form.categoryId}
                        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
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
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">ISBN</label>
                    <input
                        type="text"
                        placeholder="978-013..."
                        value={form.isbn}
                        onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Quantity</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Functional Cover Upload Area */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Cover Image (Optional)</label>

                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-500 transition-colors cursor-pointer group overflow-hidden h-48">

                  {/* Hidden File Input */}
                  <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Preview State vs Empty State */}
                  {imagePreview ? (
                      <div className="relative z-0 h-full w-full flex items-center justify-center">
                        <img
                            src={imagePreview}
                            alt="Book Cover Preview"
                            className="max-h-full object-contain rounded-md shadow-sm"
                        />
                        <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-indigo-600">
                          Change Image
                        </div>
                      </div>
                  ) : (
                      <div className="flex flex-col items-center justify-center pointer-events-none">
                        <FaImage size={32} className="mb-2 group-hover:-translate-y-1 transition-transform" />
                        <p className="text-sm font-semibold text-slate-600">Click to upload cover image</p>
                        <p className="text-xs font-medium mt-1">SVG, PNG, JPG (max 2MB)</p>
                      </div>
                  )}
                </div>
              </div>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
              <button onClick={() => navigate(-1)} className="px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all">
                <FaTimes /> Cancel
              </button>
              <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FaSave />
                {loading ? "Saving..." : "Register Book"}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
  );
}