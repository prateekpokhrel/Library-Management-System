import {
  FaBook,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaHome,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen p-6">

      <h1 className="text-2xl font-bold text-indigo-400 mb-10">
        SmartShelf AI
      </h1>

      <nav className="space-y-3">

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">
          <FaHome />
          Dashboard
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">
          <FaBook />
          Books
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">
          <FaUsers />
          Users
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">
          <FaClipboardList />
          Borrow Records
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">
          <FaChartBar />
          Analytics
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer">
          <FaCog />
          Settings
        </div>

      </nav>
    </aside>
  );
}