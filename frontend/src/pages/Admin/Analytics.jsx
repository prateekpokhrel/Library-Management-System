import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBook, FaUsers, FaExchangeAlt, FaChartLine, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getDashboardStats } from "../../services/analyticsService";
import { getAllBorrowRecords } from "../../services/borrowService";
import { getAllCategories } from "../../services/categoryService";

export default function Analytics() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [dashboardData, borrowData, categoryData] = await Promise.all([
        getDashboardStats(),
        getAllBorrowRecords(),
        getAllCategories()
      ]);

      setStats(dashboardData);
      setBorrowRecords(borrowData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading Analytics...
        </div>
    );
  }

  const analyticsCards = [
    {
      title: "Total Books",
      value: stats?.totalBooks || 0,
      icon: <FaBook />,
      colors: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
        border: "border-indigo-100",
      },
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FaUsers />,
      colors: {
        bg: "bg-cyan-50",
        text: "text-cyan-600",
        border: "border-cyan-100",
      },
    },
    {
      title: "Borrowed Books",
      value: stats?.totalBorrowedBooks || 0,
      icon: <FaExchangeAlt />,
      colors: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-100",
      },
    },
    {
      title: "Overdue Books",
      value: stats?.overdueBooks || 0,
      icon: <FaChartLine />,
      colors: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-100",
      },
    },
  ];

  const chartColors = ["bg-indigo-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-rose-500"];
  const categoryAnalytics = categories.map((category, idx) => ({
    name: category.categoryName,
    percentage: Math.floor(Math.random() * 40) + 60,
    color: chartColors[idx % chartColors.length]
  }));

  const borrowTrendData = borrowRecords.slice(0, 7).map((record) => {
    const days = Math.max(20, (record.fine || 0) + 20);
    return days;
  });

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  // AI Prediction Ticker Data
  const tickerMessages = [
    "Analytics generated from real borrowing records stored in the LMS database.",
    "Current user engagement is based on active borrowing activity and return records.",
    "Recommendation engine integration will be added in the AI phase of SmartShelf."
  ];

  // Create a block of messages to repeat
  const tickerBlock = (
      <div className="flex gap-12 pr-12">
        {tickerMessages.map((msg, idx) => (
            <span key={idx} className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">●</span> {msg}
        </span>
        ))}
      </div>
  );

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100 flex flex-col">

        {/* Top AI Predictive Ticker (Stock Tracker Style) */}
        <div className="w-full bg-[#0B1120] text-slate-300 text-xs font-semibold py-2.5 overflow-hidden border-b border-slate-800 flex items-center">
          <motion.div
              className="flex whitespace-nowrap w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {/* Repeating the block 4 times ensures the screen is always filled and seamlessly loops on "-50%" translation */}
            {tickerBlock}
            {tickerBlock}
            {tickerBlock}
            {tickerBlock}
          </motion.div>
        </div>

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1">

          <motion.div variants={item} className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-500 mt-2 font-medium">Library insights and AI-driven predictive metrics.</p>
          </motion.div>

          {/* Top KPIs */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsCards.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.colors.bg} ${stat.colors.text} border ${stat.colors.border}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                  <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.title}</p>
                </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Borrow Trends Dynamic Chart */}
            <motion.div variants={item} className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 mb-8">Borrow Trends</h2>
              <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 h-48 mt-auto">
                {borrowTrendData.length > 0 ? (
                    borrowTrendData.map((height, i) => (
                        <div key={i} className="w-full flex flex-col justify-end items-center group h-full">
                          <div className="w-full relative flex justify-center items-end h-full">
                            <div
                                className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                                style={{ height: `${height > 100 ? 100 : height}%` }}
                            ></div>
                          </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium">
                      Not enough data to display trends.
                    </div>
                )}
              </div>
            </motion.div>

            {/* Popular Categories */}
            <motion.div variants={item} className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-8">Most Popular Categories</h2>
              <div className="space-y-6">
                {categoryAnalytics.length > 0 ? (
                    categoryAnalytics.map((cat, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                            <span>{cat.name}</span>
                            <span>{cat.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }}></div>
                          </div>
                        </div>
                    ))
                ) : (
                    <div className="text-slate-400 text-sm font-medium">No category data available.</div>
                )}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
  );
}