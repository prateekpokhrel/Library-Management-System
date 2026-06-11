import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPenNib, FaChevronLeft, FaPlus, FaSearch, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } from "../../services/authorService";

export default function Authors() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addAuthorName, setAddAuthorName] = useState("");

    const [editAuthorData, setEditAuthorData] = useState(null); // holds { id, authorName }
    const [editAuthorName, setEditAuthorName] = useState("");

    const [deleteAuthorId, setDeleteAuthorId] = useState(null);

    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const data = await getAllAuthors();
            setAuthors(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers ---
    const handleAddSubmit = async () => {
        if (!addAuthorName.trim()) return;
        try {
            await addAuthor(addAuthorName);
            setAddAuthorName("");
            setIsAddModalOpen(false);
            fetchAuthors();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditSubmit = async () => {
        if (!editAuthorName.trim() || !editAuthorData) return;
        try {
            await updateAuthor(editAuthorData.id, editAuthorName);
            setEditAuthorData(null);
            setEditAuthorName("");
            fetchAuthors();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteAuthorId) return;
        try {
            await deleteAuthor(deleteAuthorId);
            setDeleteAuthorId(null);
            fetchAuthors();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredAuthors = authors.filter((author) =>
        author.authorName?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Authors...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100 relative">

            {/* --- MODALS --- */}
            <AnimatePresence>

                {/* Add Author Modal */}
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
                        >
                            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors">
                                <FaTimes size={20} />
                            </button>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Author</h2>

                            <div className="mb-8">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Author Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Robert C. Martin"
                                    value={addAuthorName}
                                    onChange={(e) => setAddAuthorName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all">Cancel</button>
                                <button onClick={handleAddSubmit} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-sm">Save Author</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Edit Author Modal */}
                {editAuthorData && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
                        >
                            <button onClick={() => setEditAuthorData(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors">
                                <FaTimes size={20} />
                            </button>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Edit Author</h2>

                            <div className="mb-8">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Author Name</label>
                                <input
                                    type="text"
                                    value={editAuthorName}
                                    onChange={(e) => setEditAuthorName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setEditAuthorData(null)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all">Cancel</button>
                                <button onClick={handleEditSubmit} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-sm">Update Author</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteAuthorId && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center relative"
                        >
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                                <FaTrash />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Author?</h2>
                            <p className="text-slate-500 text-sm mb-8">Are you sure? This action cannot be undone and may affect books linked to this author.</p>

                            <div className="flex gap-3 justify-center">
                                <button onClick={() => setDeleteAuthorId(null)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all w-full">Cancel</button>
                                <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all w-full shadow-sm">Delete</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* --- END MODALS --- */}

            <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                    <FaChevronLeft className="text-xs" /> Back to Dashboard
                </button>
            </header>

            <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Authors Directory</h1>
                        <p className="text-slate-500 mt-2 font-medium">Manage metadata for book authors and contributors.</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md"
                    >
                        <FaPlus />
                        Add Author
                    </button>
                </div>

                <div className="relative w-full max-w-md mb-8 group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search authors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                    />
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredAuthors.map((author, idx) => (
                        <motion.div variants={item} key={author.id || idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-50 flex items-center justify-center text-xl font-bold text-indigo-600 flex-shrink-0">
                                {author.authorName
                                    ?.split(" ")
                                    .map(word => word[0])
                                    .join("")
                                    .substring(0, 2)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-base font-bold text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">
                                        {author.authorName}
                                    </h2>

                                    {/* Replaced Ellipsis with clean Edit/Delete action buttons */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => {
                                                setEditAuthorData(author);
                                                setEditAuthorName(author.authorName);
                                            }}
                                            className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                                            title="Edit Author"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => setDeleteAuthorId(author.id)}
                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                            title="Delete Author"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <FaPenNib className="text-slate-400 text-xs" />
                                    <span className="text-sm font-medium text-slate-500">Books Count N/A</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredAuthors.length === 0 && (
                        <div className="col-span-full p-8 text-center text-slate-500 text-sm">
                            No authors found matching your criteria.
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
}