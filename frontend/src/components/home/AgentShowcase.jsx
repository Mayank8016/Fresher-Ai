import  { useState } from "react";

const agents = [
  {
    name: "1. Profiler Agent",
    role: "Resume & JD Analyzer",
    desc: "Resume PDF parse karke aapke projects aur skills ke hisaab se 6 interview topics banata hai.",
    json: `{\n  "role": "MERN Stack Developer",\n  "topics": ["React Hooks", "JWT Auth", "MongoDB Indexing"]\n}`,
  },
  {
    name: "2. Interviewer Agent",
    role: "Real-Time Questioner",
    desc: "Aapse voice me sawal puchta hai aur adhure answers par smart follow-up questions puchta hai.",
    json: `{\n  "question": "React me useMemo aur useCallback me kya difference hai?",\n  "type": "Follow-up"\n}`,
  },
  {
    name: "3. Shadow Evaluator",
    role: "Background Grader",
    desc: "Har answer aur code ko background me check karke 1-10 ke beech score aur missing points save karta hai.",
    json: `{\n  "score": 8.5,\n  "feedback": "Good explanation, missed referential equality point."\n}`,
  },
  {
    name: "4. Report Agent",
    role: "Final Scorecard Builder",
    desc: "Interview ke end me strengths, weaknesses aur har question ka Ideal Answer generate karta hai.",
    json: `{\n  "overallScore": "85%",\n  "verdict": "Strong Hire",\n  "weakArea": "System Design"\n}`,
  },
];

const AgentShowcase = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section id="agents" className="py-16 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">4-Agent AI Architecture</h2>
          <p className="text-sm text-slate-400 mt-2">
            Har agent ka apna dedicated kaam hai. Click karke output dekhein:
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Left Tabs */}
          <div className="md:col-span-6 space-y-3">
            {agents.map((agent, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selected === index
                    ? "bg-slate-900 border-indigo-500"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{agent.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                    {agent.role}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">{agent.desc}</p>
              </button>
            ))}
          </div>

          {/* Right JSON Preview */}
          <div className="md:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-5">
            <p className="text-xs font-semibold text-indigo-400 uppercase mb-2">
              Agent Structured Output
            </p>
            <h3 className="text-lg font-bold text-white mb-3">{agents[selected].name}</h3>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
              {agents[selected].json}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentShowcase;