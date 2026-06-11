import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCamera, FaBook, FaHeart, FaHistory, FaChevronLeft, FaShieldAlt, FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/userService";

export default function Profile() {
  const navigate = useNavigate();

  // State Management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const data = await getProfile(userId);
      setUser(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Adding a slight delay so the user can see the smooth exit animation
    setTimeout(() => {
      // Clear all authentication data from Local Storage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      // Redirect to login page
      navigate("/user/login"); // Adjust this route if your login page is simply "/login"
    }, 800);
  };

  // Animation Variants
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  // Loading Screen
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-500 font-medium animate-pulse">
          Loading Profile...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">

        {/* Header Navigation */}
        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <AnimatePresence>
          {!isLoggingOut && (
              <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  className="max-w-7xl mx-auto px-4 sm:px-8"
              >

                <motion.div variants={item} className="mb-10">
                  <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">My Profile</h1>
                  <p className="text-slate-500 mt-2 font-medium">View your personal information and account security.</p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8">

                  {/* Left Column: Avatar, Quick Info & Logout */}
                  <motion.div variants={item} className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600"></div>

                      <div className="relative mt-12 mb-4 group cursor-pointer">
                        <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-xl">
                          <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center text-5xl font-light text-indigo-600 uppercase">
                            {user?.fullName?.charAt(0) || "?"}
                          </div>
                        </div>
                        <button className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-md text-slate-600 border border-slate-100 hover:text-indigo-600 transition-colors">
                          <FaCamera size={14} />
                        </button>
                      </div>

                      <h2 className="text-2xl font-bold text-slate-900 capitalize">{user?.fullName || "User"}</h2>
                      <span className="mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-bold uppercase tracking-widest">
                    {user?.role || "Member"}
                  </span>

                      <div className="w-full mt-8 space-y-3">
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <FaEnvelope className="text-slate-400 shrink-0" /> <span className="truncate">{user?.email || "No Email"}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <FaPhone className="text-slate-400 shrink-0" /> {user?.phone || "Not Available"}
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <FaMapMarkerAlt className="text-slate-400 shrink-0" /> {user?.location || "Not Available"}
                        </div>
                      </div>
                    </div>

                    {/* Security Quick Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"><FaShieldAlt /></div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Security</h3>
                          <p className="text-xs text-slate-500">Manage password</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                        Update
                      </button>
                    </div>

                    {/* Animated Logout Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="w-full bg-white border border-rose-100 text-rose-600 rounded-3xl p-5 shadow-sm flex items-center justify-center gap-3 hover:bg-rose-50 hover:shadow-md transition-colors"
                    >
                      <FaSignOutAlt size={18} />
                      <span className="font-bold text-sm">Log Out Securely</span>
                    </motion.button>
                  </motion.div>

                  {/* Right Column: Read-Only Info & Stats */}
                  <motion.div variants={item} className="lg:col-span-8 space-y-6">

                    {/* KPI Stats */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FaBook /></div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">28</h3>
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Borrowed Books</p>
                      </div>
                      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-pink-50 rounded-lg text-pink-500"><FaHeart /></div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">12</h3>
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Wishlist Items</p>
                      </div>
                      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><FaHistory /></div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-1">38</h3>
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Reading History</p>
                      </div>
                    </div>

                    {/* Read-Only Info Form */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm transition-all duration-300">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                          <input
                              type="text"
                              value={user?.fullName || ""}
                              readOnly
                              className="w-full text-sm font-medium p-3 rounded-xl focus:outline-none transition-all bg-slate-50 border border-slate-200 text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                          <input
                              type="text"
                              value={user?.email || ""}
                              readOnly
                              className="w-full text-sm font-medium p-3 rounded-xl focus:outline-none transition-all bg-slate-50 border border-slate-200 text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Phone Number</label>
                          <input
                              type="text"
                              value={user?.phone || ""}
                              readOnly
                              className="w-full text-sm font-medium p-3 rounded-xl focus:outline-none transition-all bg-slate-50 border border-slate-200 text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                          <input
                              type="text"
                              value={user?.location || ""}
                              readOnly
                              className="w-full text-sm font-medium p-3 rounded-xl focus:outline-none transition-all bg-slate-50 border border-slate-200 text-slate-700"
                          />
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Global Logging Out Overlay Animation */}
        <AnimatePresence>
          {isLoggingOut && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
              >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100"
                >
                  <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full"
                  />
                  <h2 className="text-lg font-bold text-slate-800">Signing out securely...</h2>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>

      </div>
  );
}