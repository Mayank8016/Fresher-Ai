const steps = [
  {
    num: "01",
    title: "Upload Resume & Role",
    desc: "Dashboard par apna Resume PDF upload karein aur target job role select karein.",
  },
  {
    num: "02",
    title: "Give Voice + Code Interview",
    desc: "AI Interviewer ke sawalon ka mic se jawab dein aur live editor me code likhein.",
  },
  {
    num: "03",
    title: "Get AI Feedback Report",
    desc: "End me har answer ka score, galtiyan aur Ideal Answer apne dashboard par dekhein.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-10">
          How It Works in 3 Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Step {step.num}
              </span>
              <h3 className="text-lg font-bold text-white mt-3">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1.5">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;