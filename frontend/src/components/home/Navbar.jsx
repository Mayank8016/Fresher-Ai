import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
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

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#agents" className="hover:text-white transition">4-Agents</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
        </nav>

        {/* Conditional Auth Buttons */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;