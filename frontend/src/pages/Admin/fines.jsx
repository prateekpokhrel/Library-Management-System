import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaSearch,
  FaFileInvoiceDollar,
  FaExclamationCircle,
  FaCheckCircle,
  FaBell,
  FaMoneyBillWave,
  FaFileExport
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllBorrowRecords, returnBook } from "../../services/borrowService";

export default function Fines() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom Toast State
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await getAllBorrowRecords();
      setRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  // Helper to calculate days overdue consistently
  const getDaysOverdue = (record) => {
    if (record.returnDate) return 0;
    return Math.max(
        0,
        Math.floor((new Date() - new Date(record.dueDate)) / (1000 * 60 * 60 * 24))
    );
  };

  // --- New Handlers for Export & Reminders ---
  const handleExportReport = () => {
    if (filteredRecords.length === 0) {
      showToast("No records to export.", "error");
      return;
    }

    // 1. Create CSV Headers
    const headers = ["Invoice ID", "User Name", "Email", "Book Title", "Days Overdue", "Amount (INR)", "Status"];

    // 2. Map data to CSV rows
    const csvData = filteredRecords.map(record => {
      const status = record.returnDate ? "Returned" : "Borrowed";
      const daysOverdue = getDaysOverdue(record);
      // Wrap strings in quotes to handle potential commas in names/titles
      return `BR-${record.id},"${record.user?.fullName || "N/A"}","${record.user?.email || "N/A"}","${record.book?.title || "N/A"}",${daysOverdue},${record.fine || 0},"${status}"`;
    });

    // 3. Combine headers and data
    const csvContent = [headers.join(","), ...csvData].join("\n");

    // 4. Create Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Fines_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Report exported successfully!");
  };

  const handleAutoSendReminders = () => {
    if (overdueCount === 0) {
      showToast("No active defaulters to remind.", "success");
      return;
    }
    // In a real app, this would call your backend endpoint
    showToast(`Successfully sent reminders to ${overdueCount} active defaulters!`);
  };

  const handleSendIndividualAlert = (userName) => {
    // In a real app, this would trigger an email/SMS via backend
    showToast(`Reminder alert sent to ${userName}.`);
  };
  // -------------------------------------------

  const filteredRecords = records.filter(
      (record) =>
          record.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          record.book?.title?.toLowerCase().includes(search.toLowerCase()) ||
          String(record.id).includes(search)
  );

  const totalFine = records.reduce(
      (sum, r) => sum + (r.fine || 0),
      0
  );

  const overdueCount = records.filter(
      r => !r.returnDate && new Date(r.dueDate) < new Date()
  ).length;

  const returnedCount = records.filter(
      r => r.returnDate
  ).length;

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading Records...
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100 relative">

        {/* --- CUSTOM TOAST NOTIFICATION --- */}
        <AnimatePresence>
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
        </AnimatePresence>
        {/* --------------------------------- */}

        {/* Top Navigation Bar */}
        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-8">

          {/* Header & Export Button */}
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Fines & Dues</h1>
              <p className="text-slate-500 mt-2 font-medium">Manage late fees, lost book penalties, and financial clearance.</p>
            </div>
            <button
                onClick={handleExportReport}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <FaFileExport /> Export Report
            </button>
          </motion.div>

          {/* KPI Stats Grid */}
          <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 group-hover:scale-110 transition-transform">
                  <FaFileInvoiceDollar />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">₹{totalFine}</h3>
              <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">Total Pending Dues</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
                  <FaMoneyBillWave />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{returnedCount}</h3>
              <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">Returned Resources</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:scale-110 transition-transform">
                  <FaExclamationCircle />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{overdueCount}</h3>
              <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wider">Active Defaulters</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-center">
              <button
                  onClick={handleAutoSendReminders}
                  className="w-full bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
              >
                <FaBell className="text-xl" />
                <span className="text-sm font-bold">Auto-Send Reminders</span>
              </button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={item} className="relative w-full max-w-md mb-6 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
                type="text"
                placeholder="Search by invoice ID, name, or student ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm placeholder:text-slate-400"
            />
          </motion.div>

          {/* Financial Records Table */}
          <motion.div variants={item} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Overdue Resource</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">

                      {/* Invoice ID */}
                      <td className="px-6 py-4 text-sm font-bold text-indigo-600">#BR-{record.id}</td>

                      {/* User Details */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{record.user?.fullName}</p>
                        <p className="text-xs text-slate-500">{record.user?.email}</p>
                      </td>

                      {/* Resource Details */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">{record.book?.title}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">
                          {getDaysOverdue(record)} Days Late
                        </p>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <span className="text-base font-black text-slate-900">₹{record.fine}</span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                          record.returnDate
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}>
                        {record.returnDate ? <FaCheckCircle /> : <FaExclamationCircle />}
                        {
                          record.returnDate
                              ? "Returned"
                              : "Borrowed"
                        }
                      </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!record.returnDate ? (
                              <>
                                <button
                                    onClick={() => handleSendIndividualAlert(record.user?.fullName)}
                                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-indigo-700 hover:border-indigo-300 rounded-lg text-xs font-bold transition-all shadow-sm"
                                    title="Send Reminder Alert"
                                >
                                  Alert
                                </button>
                                <button
                                    onClick={async () => {
                                      try {
                                        await returnBook(record.id);
                                        fetchRecords();
                                        showToast("Book returned successfully!");
                                      } catch (err) {
                                        console.error(err);
                                        showToast("Failed to return book.", "error");
                                      }
                                    }}
                                    className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                                >
                                  Return Book
                                </button>
                              </>
                          ) : (
                              <span className="text-xs font-bold text-slate-400 px-3 py-1.5">Resolved</span>
                          )}
                        </div>
                      </td>

                    </tr>
                ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredRecords.length === 0 && (
                  <div className="p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-3">
                      <FaSearch size={24} />
                    </div>
                    <p className="text-slate-900 font-bold">No records found</p>
                    <p className="text-slate-500 text-sm mt-1">We couldn't find any invoices matching "{search}".</p>
                  </div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
  );
}