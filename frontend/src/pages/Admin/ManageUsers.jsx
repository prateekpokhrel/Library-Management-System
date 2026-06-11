import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUserPlus, FaEdit, FaTrash, FaEye, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../services/userService";

export default function ManageUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading Users...
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
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-16 selection:bg-indigo-100">

        <header className="h-20 flex items-center px-4 sm:px-8 max-w-7xl mx-auto">
          <button
              onClick={() => navigate(-1)}
              aria-label="Go back to Dashboard"
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <FaChevronLeft className="text-xs" /> Back to Dashboard
          </button>
        </header>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-4 sm:px-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">Manage Users</h1>
              <p className="text-slate-500 mt-2 font-medium">Directory of students, faculty, and administrative staff.</p>
            </div>
            <button
                aria-label="Add New User"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-sm transition-all hover:shadow-md"
            >
              <FaUserPlus /> Add User
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mb-6 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
                type="text"
                aria-label="Search users by name or email"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
            />
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User ID</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">#{user.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                          true ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-500 border-rose-100"
                      }`}>
                        ACTIVE
                      </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                              aria-label="View user details"
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          >
                            <FaEye />
                          </button>

                          <button
                              disabled
                              aria-label="Edit user details (disabled)"
                              className="p-2 text-slate-300 cursor-not-allowed rounded-lg"
                          >
                            <FaEdit />
                          </button>

                          <button
                              aria-label="Delete user"
                              onClick={async () => {
                                if (!window.confirm("Delete User?")) {
                                  return;
                                }
                                try {
                                  await deleteUser(user.id);
                                  fetchUsers();
                                } catch (err) {
                                  console.error(err);
                                  alert("Failed To Delete User");
                                }
                              }}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                  <div className="p-8 text-center text-slate-500 text-sm">No users found matching your criteria.</div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
  );
}