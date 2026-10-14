import { Link } from "react-router-dom";

const HeroSection = ({ isLoggedIn }) => {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-62.5 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center relative">
        {/* Left Content */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            Multi-Agent GenAI + MERN Stack
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Crack Tech Interviews with{" "}
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              4 AI Agents
            </span>
          </h1>

          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Apna Resume upload karein aur real-time Voice + Code Editor me mock interview dein. Har answer par instant evaluation aur detailed feedback payein.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              to={isLoggedIn ? "/dashboard" : "/signup"}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 transition"
            >
              {isLoggedIn ? "Go to Dashboard →" : "Start Free Interview →"}
            </Link>
            <a
              href="#agents"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
            >
              See How Agents Work
            </a>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400">live-interview-room.jsx</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                ● Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-xs font-semibold text-indigo-400 mb-1">
                Interviewer Agent (Speaking...)
              </p>
              <p className="text-sm text-slate-200">
                "Aapne project me JWT authentication use kiya hai. Token expire hone par refresh flow kaise handle karte hain?"
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-emerald-400">Shadow Evaluator Agent</p>
                <p className="text-xs text-slate-400">Concept Checked: HTTP-Only Cookies</p>
              </div>
              <span className="text-base font-bold text-emerald-400">9/10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;