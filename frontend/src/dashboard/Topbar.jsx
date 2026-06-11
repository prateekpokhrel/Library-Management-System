import { FaBell, FaSearch } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-6">

      <div className="flex items-center gap-3 bg-slate-900 px-4 py-3 rounded-xl w-96">
        <FaSearch />
        <input
          type="text"
          placeholder="Search books..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <FaBell size={20} />

        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
          P
        </div>
      </div>
    </header>
  );
}