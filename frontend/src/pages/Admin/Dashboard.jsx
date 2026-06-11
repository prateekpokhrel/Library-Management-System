import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaChartLine,
  FaCog,
  FaPlus,
  FaLayerGroup,
  FaPenNib,
  FaBuilding,
  FaArrowUp,
  FaBell,
  FaCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getDashboardData } from "../../services/dashboardService";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Animation variants for staggered load
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Dynamic stats array dependent on fetched dashboardData
  const stats = dashboardData
      ? [
        {
          title: "Total Books",
          value: dashboardData.totalBooks,
          icon: <FaBook />,
          growth: "Live",
          colors: {
            bg: "bg-indigo-50",
            text: "text-indigo-600",
            border: "border-indigo-100",
          },
        },
        {
          title: "Total Users",
          value: dashboardData.totalUsers,
          icon: <FaUsers />,
          growth: "Live",
          colors: {
            bg: "bg-cyan-50",
            text: "text-cyan-600",
            border: "border-cyan-100",
          },
        },
        {
          title: "Borrowed Books",
          value: dashboardData.totalBorrowedBooks,
          icon: <FaExchangeAlt />,
          growth: "Live",
          colors: {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            border: "border-emerald-100",
          },
        },
        {
          title: "Overdue Books",
          value: dashboardData.overdueBooks,
          icon: <FaChartLine />,
          growth: "Live",
          colors: {
            bg: "bg-amber-50",
            text: "text-amber-600",
            border: "border-amber-100",
          },
        },
      ]
      : [];

  const modules = [
    { title: "Manage Books", icon: <FaBook />, path: "/admin/books", style: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:shadow-md hover:border-indigo-200" },
    { title: "Categories", icon: <FaLayerGroup />, path: "/admin/categories", style: "text-purple-600 bg-purple-50 border-purple-100 hover:shadow-md hover:border-purple-200" },
    { title: "Authors", icon: <FaPenNib />, path: "/admin/authors", style: "text-pink-600 bg-pink-50 border-pink-100 hover:shadow-md hover:border-pink-200" },
    { title: "Publishers", icon: <FaBuilding />, path: "/admin/publishers", style: "text-orange-600 bg-orange-50 border-orange-100 hover:shadow-md hover:border-orange-200" },
    { title: "User Directory", icon: <FaUsers />, path: "/admin/users", style: "text-cyan-600 bg-cyan-50 border-cyan-100 hover:shadow-md hover:border-cyan-200" },
    { title: "Fines & Dues", icon: <FaExchangeAlt />, path: "/admin/fines", style: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:shadow-md hover:border-emerald-200" },
    { title: "Analytics", icon: <FaChartLine />, path: "/admin/analytics", style: "text-amber-600 bg-amber-50 border-amber-100 hover:shadow-md hover:border-amber-200" },
    { title: "Preferences", icon: <FaCog />, path: "/admin/settings", style: "text-slate-600 bg-slate-50 border-slate-200 hover:shadow-md hover:border-slate-300" },
  ];

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading Dashboard...
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
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-6 md:p-10 font-sans selection:bg-indigo-100">
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-10"
        >

          {/* Header Section */}
          <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                Admin Control Center
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium tracking-wide uppercase">
                System Overview & Operations
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <FaBell />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <button
                  onClick={() => navigate("/admin/books/add")}
                  className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all hover:shadow-indigo-500/30 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                Add Resource
              </button>
            </div>
          </motion.div>

          {/* Key Metrics Grid */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.colors.bg} ${stat.colors.text} border ${stat.colors.border} group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${stat.colors.bg} ${stat.colors.text} text-xs font-bold`}>
                      <FaArrowUp className="text-[10px]" /> {stat.growth}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                    <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">{stat.title}</p>
                  </div>
                </div>
            ))}
          </motion.div>

          {/* Modular Access Grid */}
          <motion.div variants={item}>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">Module Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modules.map((module, index) => (
                  <div
                      key={index}
                      onClick={() => navigate(module.path)}
                      className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 ${module.style}`}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {module.icon}
                    </div>
                    <span className="text-xs font-bold tracking-wide">
                  {module.title}
                </span>
                  </div>
              ))}
            </div>
          </motion.div>

          {/* Data Visualization & Insights */}
          <motion.div variants={item} className="grid lg:grid-cols-3 gap-6">

            {/* Sleek Mock Chart */}
            <div className="lg:col-span-2 bg-white border border-slate-100 shadow-sm rounded-3xl p-8 flex flex-col">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Engagement Activity</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">Borrow vs Return frequency (7 Days)</p>
                </div>
              </div>

              <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 h-48 mt-auto">
                {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                    <div key={i} className="w-full flex flex-col justify-end items-center group">
                      <div className="w-full relative flex justify-center items-end">
                        <div
                            className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                            style={{ height: `${height}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold mt-3 uppercase tracking-wider">Day {i + 1}</span>
                    </div>
                ))}
              </div>
            </div>

            {/* Minimalist Insights Log */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">System Insights</h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1.5"><FaCircle className="text-[8px] text-indigo-500" /></div>
                  <div>
                    <p className="text-sm text-slate-800 font-bold leading-snug">Computer Science leads borrows</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Top category this week.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1.5"><FaCircle className="text-[8px] text-emerald-500" /></div>
                  <div>
                    <p className="text-sm text-slate-800 font-bold leading-snug">Engagement up by 22%</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Compared to previous month.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1.5"><FaCircle className="text-[8px] text-amber-500" /></div>
                  <div>
                    <p className="text-sm text-slate-800 font-bold leading-snug">"Clean Architecture" trending</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">45 current active waitlists.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1.5"><FaCircle className="text-[8px] text-cyan-500" /></div>
                  <div>
                    <p className="text-sm text-slate-800 font-bold leading-snug">System health optimal</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">No latency detected.</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
  );
}