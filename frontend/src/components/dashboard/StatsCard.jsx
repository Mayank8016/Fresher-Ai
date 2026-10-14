import React from "react";

const StatsCards = ({ totalInterviews }) => {
  const stats = [
    {
      label: "Total Interviews",
      value: totalInterviews,
      sub: "Sessions created",
      color: "text-indigo-400",
    },
    {
      label: "Average AI Score",
      value: "85%",
      sub: "Evaluated by Shadow Agent",
      color: "text-emerald-400",
    },
    {
      label: "Top Strength",
      value: "Backend & JWT",
      sub: "Based on past answers",
      color: "text-cyan-400",
    },
    {
      label: "Active AI Agents",
      value: "4 Ready",
      sub: "Profiler, Interviewer, Grader, Report",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800"
        >
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            {item.label}
          </p>
          <p className={`text-2xl font-extrabold mt-2 ${item.color}`}>
            {item.value}
          </p>
          <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;