import React from "react";
import { Link } from "react-router-dom";

const DashboardHeader = ({ onOpenModal, handleLogout }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
            AI
          </div>
          <span className="text-xl font-bold text-white">
            AgentHire<span className="text-indigo-400">.ai</span>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition"
          >
            Home
          </Link>

          <button
            onClick={onOpenModal}
            className="hidden sm:inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            + New Interview
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;