import React, { useState } from "react";

const NewInterviewModal = ({ onClose, onSubmit }) => {
  const [role, setRole] = useState("");
  const [techStack, setTechStack] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Yahan baad me Profiler Agent ka Backend API call aayega
    setTimeout(() => {
      setLoading(false);
      onSubmit({ role, techStack, difficulty, resumeFile });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">
            Setup AI Mock Interview
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Job Role */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Target Job Role
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Full Stack MERN Developer, SDE-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Key Skills / Tech Stack */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Key Tech Stack (Comma separated)
            </label>
            <input
              type="text"
              required
              placeholder="e.g., React, Node.js, MongoDB, DSA"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Beginner">Beginner (Freshers)</option>
              <option value="Intermediate">Intermediate (SDE-1)</option>
              <option value="Hard">Hard (Advanced DSA & System Design)</option>
            </select>
          </div>

          {/* Resume PDF Upload */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Upload Resume (PDF for Profiler Agent)
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-slate-800 file:text-indigo-300 hover:file:bg-slate-700"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition"
            >
              {loading ? "Profiler Agent Analyzing..." : "Start Interview →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInterviewModal;