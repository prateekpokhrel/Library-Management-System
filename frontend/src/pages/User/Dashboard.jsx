import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaRegBookmark,
  FaHistory,
  FaBrain,
  FaSearch,
  FaUserCircle,
  FaChevronRight,
  FaSwatchbook,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaShareAlt,
  FaPlayCircle,
  FaFilePdf,
  FaSearchPlus,
  FaSearchMinus,
  FaDownload,
  FaExpand,
  FaEllipsisH
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserDashboard } from "../../services/userDashboardService";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activePdf, setActivePdf] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Dynamic Dashboard State
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const data = await getUserDashboard(userId);
      setDashboard(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const navigation = [
    { name: "Overview", icon: <FaHome />, path: "/user/dashboard" },
    { name: "Search Catalog", icon: <FaSearch />, path: "/user/books" },
    { name: "My Checkouts", icon: <FaSwatchbook />, path: "/user/borrowed-books" },
    { name: "PDF Library", icon: <FaFilePdf />, path: "/user/pdf-library" },
    { name: "Saved Items", icon: <FaRegBookmark />, path: "/user/wishlist" },
    { name: "Smart Suggestions", icon: <FaBrain />, path: "/user/recommendations" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  // --- Minimalist Embedded PDF Reader ---
  const PdfReaderOverlay = ({ book, onClose }) => (
      <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
          className="fixed inset-0 z-[100] bg-slate-100 flex flex-col font-sans"
      >
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-6 text-slate-800">
            <button onClick={onClose} className="hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm font-medium">
              <FaChevronRight className="rotate-180 text-xs" /> Back
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-semibold text-sm">{book?.title || "Document"}</span>
              <span className="text-slate-400 text-sm">/ {book?.author?.authorName || "Unknown"}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button className="hover:text-slate-800 transition-colors"><FaSearchMinus /></button>
            <span className="text-xs font-semibold tracking-wide">100%</span>
            <button className="hover:text-slate-800 transition-colors"><FaSearchPlus /></button>
            <div className="h-4 w-px bg-slate-200 mx-2"></div>
            <button className="hover:text-slate-800 transition-colors"><FaDownload /></button>
            <button className="hover:text-slate-800 transition-colors"><FaExpand /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-24">
          <div className="w-full max-w-4xl bg-white shadow-sm border border-slate-200 min-h-[1000px] p-16 rounded-lg text-slate-800">
            <h1 className="text-3xl font-light mb-8">{book?.title}</h1>
            <div className="space-y-6 text-justify leading-relaxed text-lg font-serif text-slate-600">
              <p className="text-center text-slate-400 italic mt-20">
                PDF Content Viewer for {book?.title}. <br/>
                Actual PDF rendering integration required here.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
  );

  // Loading Screen
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <span className="font-medium text-sm text-slate-500 tracking-wider uppercase">Loading Dashboard...</span>
          </div>
        </div>
    );
  }

  // Derived Dynamic Stats
  const stats = [
    { title: "Borrowed Books", value: dashboard?.borrowedBooks || 0, subtext: "Currently issued to you", icon: <FaSwatchbook /> },
    { title: "Overdue Books", value: dashboard?.overdueBooks || 0, subtext: "Needs your attention", icon: <FaHistory /> },
    { title: "Available Books", value: dashboard?.availableBooks || 0, subtext: "Ready to be explored", icon: <FaBook /> },
    { title: "Total Books", value: dashboard?.totalBooks || 0, subtext: "In our library catalog", icon: <FaSearch /> },
  ];

  // Featured Item Logic for Banner
  const featuredBorrow = dashboard?.activeBorrows?.length > 0 ? dashboard.activeBorrows[0].book : null;
  const featuredRecent = dashboard?.recentBooks?.length > 0 ? dashboard.recentBooks[0] : null;
  const featuredBook = featuredBorrow || featuredRecent;

  return (
      <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden selection:bg-indigo-100">

        {/* Overlays */}
        <AnimatePresence>{activePdf && <PdfReaderOverlay book={activePdf} onClose={() => setActivePdf(null)} />}</AnimatePresence>
        <AnimatePresence>
          {showInviteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInviteModal(false)} className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 w-full max-w-md p-8 overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Invite to Network</h3>
                      <p className="text-sm text-slate-500 mt-1">Share resources and reading lists securely.</p>
                    </div>
                    <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><FaTimes /></button>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex gap-3">
                        <input type="email" placeholder="Email address..." className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm" />
                        <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">Send</button>
                      </div>
                    </div>
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-slate-100"></div>
                      <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Or share link</span>
                      <div className="flex-grow border-t border-slate-100"></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-sm text-slate-500 flex-1 truncate select-all">https://smartshelf.app/inv/ref-{dashboard?.email?.split('@')[0] || 'user'}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm px-3 py-1 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-lg">Copy</button>
                    </div>
                  </div>
                </motion.div>
              </div>
          )}
        </AnimatePresence>

        {/* 1. Minimalist Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white/80 backdrop-blur-md border-r border-slate-100 z-20">
          <div className="h-20 flex items-center px-8">
            <div className="flex items-center gap-3 text-slate-900">
              <FaBook className="text-indigo-600 text-xl" />
              <span className="text-lg font-bold tracking-tight">SmartShelf</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 mt-2">Menu</p>
            {navigation.map((item) => {
              const isActive = location.pathname.includes(item.path) || (item.name === "Overview" && location.pathname === "/");
              return (
                  <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                          isActive
                              ? "bg-indigo-50/50 text-indigo-600 font-semibold shadow-sm border border-indigo-100/50"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium border border-transparent"
                      }`}
                  >
                    <span className={isActive ? "text-indigo-600" : "text-slate-400"}>{item.icon}</span>
                    {item.name}
                  </button>
              );
            })}

            <div className="pt-6 pb-2">
              <button
                  onClick={() => setShowInviteModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium transition-all duration-200 text-sm border border-transparent"
              >
                <FaShareAlt className="text-slate-400" /> Invite Network
              </button>
            </div>
          </nav>

          <div className="p-4 space-y-1 border-t border-slate-100">
            <button onClick={() => navigate("/user/profile")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors text-sm border border-transparent">
              <FaUserCircle className="text-slate-400" /> Profile Settings
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 font-medium transition-colors text-sm border border-transparent">
              <FaSignOutAlt className="text-rose-400" /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.aside
                    initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-64 h-full bg-white flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                  {/* Same navigation logic as desktop injected here for mobile */}
                  <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900">
                      <FaBook className="text-indigo-600 text-xl" />
                      <span className="text-lg font-bold tracking-tight">SmartShelf</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400"><FaTimes /></button>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 font-medium text-sm"
                        >
                          {item.icon} {item.name}
                        </button>
                    ))}
                  </nav>
                </motion.aside>
              </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

          {/* Sleek Header */}
          <header className="h-20 flex items-center justify-between px-8 z-10 bg-[#F8FAFC]/80 backdrop-blur-md sticky top-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-500 hover:text-slate-900">
                <FaBars className="text-xl" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400">
                <span>Portal</span>
                <FaChevronRight className="text-[8px]" />
                <span className="text-slate-800">Overview</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-slate-400 hover:text-slate-800 transition-colors relative">
                <FaBell className="text-lg" />
                {dashboard?.overdueBooks > 0 && (
                    <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#F8FAFC]"></span>
                )}
              </button>
              <div className="h-5 w-px bg-slate-200"></div>
              <div onClick={() => navigate("/user/profile")} className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-none mb-1">{dashboard?.fullName || "User"}</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest truncate max-w-[120px]">{dashboard?.email || "No Email"}</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <FaUserCircle className="text-xl" />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Main Dashboard */}
          <main className="flex-1 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto px-4 sm:px-8 pb-12 space-y-8">

              {/* Minimalist Dark Banner - Dynamic */}
              <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-md border border-slate-800">
                <div className="relative z-10 text-white">
                  <h1 className="text-3xl font-light tracking-tight mb-2">
                    Welcome back, <span className="font-semibold">{dashboard?.fullName?.split(" ")[0] || "User"}</span>.
                  </h1>

                  {featuredBook ? (
                      <p className="text-sm text-slate-400 font-medium">
                        {featuredBorrow ? "Currently Borrowed: " : "Recently Added: "}
                        <span className="text-white">"{featuredBook.title}"</span>
                        {featuredBook.author?.authorName && ` by ${featuredBook.author.authorName}`}
                      </p>
                  ) : (
                      <p className="text-sm text-slate-400 font-medium">Ready to discover your next great read?</p>
                  )}
                </div>

                <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
                  {featuredBook ? (
                      <button
                          onClick={() => navigate(`/user/book/${featuredBook.id}`)}
                          className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-slate-900 transition-all gap-2 shadow-sm"
                      >
                        <FaPlayCircle className="text-lg" />
                        View Details
                      </button>
                  ) : (
                      <button
                          onClick={() => navigate(`/user/books`)}
                          className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-indigo-500 text-white px-6 py-3 text-sm font-semibold hover:bg-indigo-600 transition-all gap-2 shadow-sm"
                      >
                        <FaSearch className="text-sm" />
                        Browse Catalog
                      </button>
                  )}
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
              </div>

              {/* Clean KPI Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(item.title === "Total Books" || item.title === "Available Books" ? "/user/books" : "/user/borrowed-books")}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.value}</h3>
                      <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.subtext}</p>
                    </div>
                ))}
              </div>

              {/* Minimalist Lists - Real Data */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Active Library / Borrows */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Active Checkouts</h3>
                    <button onClick={() => navigate("/user/borrowed-books")} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {dashboard?.activeBorrows && dashboard.activeBorrows.length > 0 ? (
                        dashboard.activeBorrows.slice(0, 4).map((record, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all cursor-pointer group"
                                onClick={() => navigate(`/user/book/${record.book?.id}`)}
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                                  <FaSwatchbook />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{record.book?.title}</p>
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{record.book?.author?.authorName || "Unknown Author"}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                                Active
                              </span>
                                <button className="text-slate-300 hover:text-slate-600 p-2 transition-colors"><FaEllipsisH /></button>
                              </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                          <FaRegBookmark className="text-3xl text-slate-300 mb-3" />
                          <p className="text-sm font-medium text-slate-500">No active checkouts</p>
                          <button onClick={() => navigate("/user/books")} className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800">Browse Catalog</button>
                        </div>
                    )}
                  </div>
                </div>

                {/* Suggestions / Recommended */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800">For You</h3>
                    <button onClick={() => navigate("/user/recommendations")} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                      Discover
                    </button>
                  </div>

                  <div className="space-y-3">
                    {dashboard?.recommendedBooks && dashboard.recommendedBooks.length > 0 ? (
                        dashboard.recommendedBooks.slice(0, 4).map((book, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(`/user/book/${book.id}`)}
                                className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all cursor-pointer group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                  <FaBrain />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{book.title}</p>
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{book.category?.categoryName || "Recommended"}</p>
                                </div>
                              </div>
                              <button className="text-slate-300 hover:text-indigo-600 p-2 transition-colors">
                                <FaChevronRight className="text-xs" />
                              </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                          <FaSearch className="text-3xl text-slate-300 mb-3" />
                          <p className="text-sm font-medium text-slate-500">More data needed for suggestions</p>
                        </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </main>
        </div>
      </div>
  );
}