import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Hook reuse kar liya!
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCard";
import InterviewList from "../components/dashboard/InterviewList";
import NewInterviewModal from "../components/dashboard/NewInterviewModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Global logout function
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample Past Interviews (Baad me Backend API se fetch honge)
  const [interviews, setInterviews] = useState([
    {
      id: "session_101",
      role: "MERN Stack Developer",
      difficulty: "Intermediate",
      date: "14 Oct 2026",
      score: "85%",
      status: "Completed",
      topics: ["React Hooks", "JWT Auth", "MongoDB Indexing"],
    },
    {
      id: "session_102",
      role: "SDE-1 (Backend Focus)",
      difficulty: "Hard",
      date: "15 Oct 2026",
      score: null,
      status: "In Progress",
      topics: ["Node.js Streams", "REST APIs", "System Design"],
    },
  ]);

  // Jab user modal me naya interview create karega
  const handleCreateInterview = (newSessionData) => {
    const newSession = {
      id: `session_${Date.now()}`,
      role: newSessionData.role,
      difficulty: newSessionData.difficulty,
      date: "Just Now",
      score: null,
      status: "In Progress",
      topics: newSessionData.techStack.split(",").map((t) => t.trim()),
    };

    setInterviews([newSession, ...interviews]);
    setIsModalOpen(false);

    // Sidha Live Interview Room me redirect karein
    navigate(`/interview/${newSession.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header ko global logout function pass kar diya */}
      <DashboardHeader
        onOpenModal={() => setIsModalOpen(true)}
        handleLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-indigo-950/60 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 shadow-xl">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, Candidate 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Apna Resume upload karein aur 4-Agent AI ke saath naya mock interview start karein.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25 transition shrink-0"
          >
            + Start New Interview
          </button>
        </div>

        {/* Analytics Overview */}
        <StatsCards totalInterviews={interviews.length} />

        {/* Past & Active Interviews List */}
        <InterviewList interviews={interviews} />
      </main>

      {/* Resume Upload & Setup Modal */}
      {isModalOpen && (
        <NewInterviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateInterview}
        />
      )}
    </div>
  );
};

export default Dashboard;