import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  LogOut,
  Sparkles,
  Briefcase,
  Layers,
  Code2,
  Hash,
  Play,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  ChevronRight,
  Mic,
  Calendar,
  Award,
} from "lucide-react";
import { useAuth } from "../context/useAuth";

const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior"];
const QUESTION_COUNTS = [5, 10, 15];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const getDisplayName = (token) => {
  if (!token) return "Candidate";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const email = payload.email || "";
    const name = email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Candidate";
  }
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  const [role, setRole] = useState("Frontend Developer");
  const [experienceLevel, setExperienceLevel] = useState("Junior");
  const [techStackInput, setTechStackInput] = useState(
    "React, JavaScript, Tailwind"
  );
  const [totalQuestions, setTotalQuestions] = useState(10);

  const displayName = useMemo(() => getDisplayName(token), [token]);

  const stats = [
    {
      label: "Completed Interviews",
      value: "12",
      change: "+3 this week",
      icon: Mic,
      accent: "from-indigo-500 to-blue-500",
    },
    {
      label: "Average Score",
      value: "7.8",
      change: "Out of 10",
      icon: Target,
      accent: "from-purple-500 to-pink-500",
    },
    {
      label: "Best Performance",
      value: "9.2",
      change: "Senior React round",
      icon: Trophy,
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  const recentSessions = [
    {
      role: "Frontend Developer",
      level: "Junior",
      score: 8.1,
      date: "2 days ago",
      status: "Completed",
    },
    {
      role: "Full Stack Engineer",
      level: "Mid",
      score: 7.4,
      date: "5 days ago",
      status: "Completed",
    },
    {
      role: "React Developer",
      level: "Junior",
      score: 6.9,
      date: "1 week ago",
      status: "Completed",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const startInterview = () => {
    const tech_stack = techStackInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    navigate("/interview", {
      state: {
        role: role.trim(),
        experience_level: experienceLevel,
        tech_stack: tech_stack.length
          ? tech_stack
          : ["General"],
        total_questions: totalQuestions,
      },
    });
  };

  const isFormValid = role.trim().length > 0;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p
                className="text-lg font-bold leading-none"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                InterviewIQ
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">Interview Command Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready for session
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="relative max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* Welcome Section */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-zinc-300">AI Interview Studio</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {displayName}
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Configure your next mock interview, enter the AI session room, and
            receive real-time feedback tailored to your role and tech stack.
          </p>
        </motion.section>

        {/* Stats Cards */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.accent} opacity-20 blur-2xl`}
              />
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.accent} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-zinc-600" />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className="text-xs text-zinc-500 mt-2">{stat.change}</p>
            </motion.div>
          ))}
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Interview Configuration */}
          <motion.section
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-2"
          >
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Configure Interview Session
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Set up your role, experience, and focus areas
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Role */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-white placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <motion.button
                        key={level}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setExperienceLevel(level)}
                        className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                          experienceLevel === level
                            ? "border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10"
                            : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Code2 className="w-4 h-4 text-pink-400" />
                    Tech Stack
                  </label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="React, JavaScript, Tailwind"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700/80 text-white placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-all"
                  />
                  <p className="text-xs text-zinc-500 mt-2">
                    Separate technologies with commas
                  </p>
                </div>

                {/* Question Count */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Hash className="w-4 h-4 text-cyan-400" />
                    Number of Questions
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {QUESTION_COUNTS.map((count) => (
                      <motion.button
                        key={count}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTotalQuestions(count)}
                        className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                          totalQuestions === count
                            ? "border-purple-500 bg-purple-500/15 text-white shadow-lg shadow-purple-500/10"
                            : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                        }`}
                      >
                        {count} Questions
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Session Preview */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                    Session Preview
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                      {role || "Role"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-purple-500/15 text-purple-300 border border-purple-500/20">
                      {experienceLevel}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-pink-500/15 text-pink-300 border border-pink-500/20">
                      {totalQuestions} Qs
                    </span>
                    {techStackInput.split(",").map((tech) =>
                      tech.trim() ? (
                        <span
                          key={tech.trim()}
                          className="px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-300 border border-zinc-700"
                        >
                          {tech.trim()}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>

                {/* Start Button */}
                <motion.button
                  whileHover={{
                    scale: isFormValid ? 1.02 : 1,
                    boxShadow: isFormValid
                      ? "0px 0px 35px rgba(168,85,247,0.45)"
                      : "none",
                  }}
                  whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                  onClick={startInterview}
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all ${
                    isFormValid
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  <Play className="w-5 h-5" />
                  Enter Interview Room
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Sidebar */}
          <motion.aside
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Live Session Card */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider text-zinc-400">
                    Interview Mode
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  AI Interviewer Ready
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Adaptive questions, instant scoring, and personalized feedback
                  powered by Gemini AI.
                </p>

                <div className="space-y-3">
                  {[
                    { step: "01", text: "Configure your session" },
                    { step: "02", text: "Answer AI-generated questions" },
                    { step: "03", text: "Review performance summary" },
                  ].map((item, i) => (
                    <div
                      key={item.step}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/40 border border-zinc-800"
                    >
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                        {item.step}
                      </span>
                      <span className="text-sm text-zinc-300">{item.text}</span>
                      {i === 0 && (
                        <Award className="w-4 h-4 text-indigo-400 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Recent Sessions
                </h3>
                <Clock className="w-4 h-4 text-zinc-500" />
              </div>

              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <motion.div
                    key={`${session.role}-${index}`}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-800/30 hover:border-zinc-700 transition-colors cursor-default"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {session.role}
                        </p>
                        <p className="text-xs text-zinc-500">{session.level}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {session.score}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Calendar className="w-3 h-3" />
                      {session.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
