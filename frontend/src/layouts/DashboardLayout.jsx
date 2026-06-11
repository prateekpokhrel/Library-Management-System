import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell 
} from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Define your dashboard navigation links here
  const navItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
    { name: "My Books", path: "/user/books", icon: BookOpen },
    { name: "Settings", path: "/user/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-50 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-slate-950 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-indigo-400">SmartShelf AI</h1>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400" 
                    : "text-gray-400 hover:bg-white/5 hover:text-slate-50"
                }`}
              >
                <Icon size={20} className={isActive ? "text-indigo-400" : "text-gray-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button at bottom */}
        <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button 
              className="text-gray-400 hover:text-white md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold md:hidden">Dashboard</h2>
          </div>

          {/* Right side header actions */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950"></span>
            </button>
            
            {/* User Profile Avatar Placeholder */}
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-slate-950 shadow-sm cursor-pointer"></div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {/* The Outlet renders whatever child route is currently active */}
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}