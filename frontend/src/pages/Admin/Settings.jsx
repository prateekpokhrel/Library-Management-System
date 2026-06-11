import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSave, FaBell, FaLock, FaDatabase, FaPalette, FaRobot, FaChevronLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    libraryName: "SmartShelf AI Library",
    maxBorrowLimit: 5,
    borrowDuration: 15,
    aiRecommendations: true,
    predictiveAnalytics: true,
    smartSearch: true,
    emailNotifications: true,
    overdueAlerts: true,
    reservationAlerts: true,
    primaryColor: "indigo",
  });

  useEffect(() => {
    const saved = localStorage.getItem("lms_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("lms_settings", JSON.stringify(settings));
    alert("Settings Saved Successfully");
  };

  const colors = [
    { value: "indigo", class: "bg-indigo-600" },
    { value: "cyan", class: "bg-cyan-600" },
    { value: "emerald", class: "bg-emerald-600" },
    { value: "slate", class: "bg-slate-900" }
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-8">

          <motion.div variants={item} className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">System Settings</h1>
            <p className="text-slate-500 mt-2 font-medium">Configure global parameters for the SmartShelf platform.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Library Settings */}
            <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><FaDatabase /></div>
                <h2 className="text-lg font-bold text-slate-900">Library Configuration</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Library Name</label>
                  <input
                      type="text"
                      value={settings.libraryName}
                      onChange={(e) => setSettings({ ...settings, libraryName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Max Borrow Limit</label>
                    <input
                        type="number"
                        value={settings.maxBorrowLimit}
                        onChange={(e) => setSettings({ ...settings, maxBorrowLimit: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Duration (Days)</label>
                    <input
                        type="number"
                        value={settings.borrowDuration}
                        onChange={(e) => setSettings({ ...settings, borrowDuration: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Settings */}
            <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl"><FaRobot /></div>
                <h2 className="text-lg font-bold text-slate-900">AI Engine Parameters</h2>
              </div>
              <div className="space-y-6">
                {[
                  { id: "aiRecommendations", label: "AI Recommendations", desc: "Enable ML-driven suggestions based on user history." },
                  { id: "predictiveAnalytics", label: "Predictive Analytics", desc: "Forecast book demand in the admin dashboard." },
                  { id: "smartSearch", label: "Smart Search", desc: "Enable typo-tolerance and semantic searching." }
                ].map((setting) => (
                    <div key={setting.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{setting.label}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{setting.desc}</p>
                      </div>
                      <input
                          type="checkbox"
                          checked={settings[setting.id]}
                          onChange={() => setSettings({ ...settings, [setting.id]: !settings[setting.id] })}
                          className="w-5 h-5 accent-indigo-600 cursor-pointer"
                      />
                    </div>
                ))}
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl"><FaBell /></div>
                <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
              </div>
              <div className="space-y-4">
                {[
                  { id: "emailNotifications", label: "Email Notifications" },
                  { id: "overdueAlerts", label: "Overdue Alerts" },
                  { id: "reservationAlerts", label: "Book Reservation Alerts" }
                ].map((notif) => (
                    <div key={notif.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm font-semibold text-slate-700">{notif.label}</span>
                      <input
                          type="checkbox"
                          checked={settings[notif.id]}
                          onChange={() => setSettings({ ...settings, [notif.id]: !settings[notif.id] })}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>
                ))}
              </div>
            </motion.div>

            {/* Security */}
            <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"><FaLock /></div>
                <h2 className="text-lg font-bold text-slate-900">Security Credentials</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Admin Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-3.5 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-500/10 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-3.5 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-500/10 transition-all" />
                </div>
              </div>
            </motion.div>

            {/* Appearance (Spans full width) */}
            <motion.div variants={item} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-pink-50 text-pink-500 rounded-xl"><FaPalette /></div>
                <h2 className="text-lg font-bold text-slate-900">Brand Primary Color</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colors.map((color, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSettings({ ...settings, primaryColor: color.value })}
                        className={`h-20 rounded-2xl ${color.class} cursor-pointer hover:scale-105 transition-transform shadow-sm relative flex items-center justify-center`}
                    >
                      {settings.primaryColor === color.value && (
                          <span className="text-white font-bold text-sm">Active</span>
                      )}
                    </div>
                ))}
              </div>
            </motion.div>

          </div>

          <motion.div variants={item} className="mt-10 flex justify-end">
            <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <FaSave /> Save Configuration
            </button>
          </motion.div>

        </motion.div>
      </div>
  );
}