import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilePdf,
  FaDownload,
  FaPlayCircle,
  FaChevronLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllPdfBooks } from "../../services/bookService";

export default function PdfLibrary() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [libraryDocs, setLibraryDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPdfBooks();
  }, []);

  const fetchPdfBooks = async () => {
    try {
      const data = await getAllPdfBooks();
      setLibraryDocs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredDocs = libraryDocs.filter((doc) => {
    const matchesSearch =
        doc.title?.toLowerCase().includes(search.toLowerCase()) ||
        doc.author?.name?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  // Animation variants
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-500 font-medium animate-pulse">
          <FaFilePdf size={32} className="mb-4 text-red-300" />
          Loading PDF Library...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">
        {/* Top Navigation Bar */}
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
          {/* Header Section */}
          <motion.div
              variants={item}
              className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
                PDF Library
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Access and read your digital resources anywhere.
              </p>
            </div>

            <div className="relative w-full md:max-w-md group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
              <input
                  type="text"
                  placeholder="Search your PDFs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all shadow-sm placeholder:text-slate-400"
              />
            </div>
          </motion.div>

          {/* PDF Grid */}
          <motion.div
              variants={item}
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredDocs.map((doc) => (
                  <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={doc._id || doc.id} // Added fallback for MongoDB _id
                      className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    {/* Book Cover Image */}
                    <div className="h-44 w-full overflow-hidden rounded-2xl mb-5 bg-slate-100 relative">
                      <img
                          src={`http://localhost:8086/uploads/${doc.coverImage}`}
                          alt={doc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Title and Author */}
                    <div className="flex-1 px-1">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 line-clamp-2 group-hover:text-red-700 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-1">
                        {doc.author?.name}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-6 px-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-emerald-100 bg-emerald-50 text-emerald-600">
                    PDF Available
                  </span>
                    </div>

                    {/* Actions Footer */}
                    <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-slate-100 px-1">
                      <button
                          onClick={() =>
                              window.open(
                                  `http://localhost:8086/uploads/${doc.pdfFile}`,
                                  "_blank"
                              )
                          }
                          className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm hover:shadow"
                          title="Download PDF"
                      >
                        <FaDownload size={14} />
                      </button>
                      <button
                          onClick={() =>
                              window.open(
                                  `http://localhost:8086/uploads/${doc.pdfFile}`,
                                  "_blank"
                              )
                          }
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow hover:scale-105"
                          title="Read PDF"
                      >
                        <FaPlayCircle size={16} />
                      </button>
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {!loading && filteredDocs.length === 0 && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <FaFilePdf size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No PDFs found
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  We couldn't find any documents matching your current search terms.
                </p>
              </motion.div>
          )}
        </motion.div>
      </div>
  );
}