import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "bg-zinc-700" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score: 2, label: "Fair", color: "bg-yellow-500" };
  if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500" };
  return { score: 4, label: "Strong", color: "bg-emerald-500" };
};

const BrandingPanel = ({ type }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-16 xl:px-24"
  >
    <div className="absolute inset-0 grid-background opacity-40" />
    <div className="absolute top-20 left-[-80px] w-[380px] h-[380px] rounded-full bg-purple-600/25 blur-[140px]" />
    <div className="absolute bottom-20 right-[-60px] w-[320px] h-[320px] rounded-full bg-cyan-500/20 blur-[120px]" />

    <div className="relative z-10">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <span
          className="text-2xl font-bold text-white tracking-wide"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          InterviewIQ
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8"
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-gray-300">Powered by Adaptive AI Engine</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-4xl xl:text-5xl font-bold leading-tight mb-6"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {type === "login" ? (
          <>
            Ace Your Dream Job{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              With AI
            </span>
          </>
        ) : (
          <>
            Start Your Journey To{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Interview Success
            </span>
          </>
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-lg text-zinc-400 leading-relaxed max-w-md mb-10"
      >
        {type === "login"
          ? "Master interviews with intelligent AI feedback, adaptive questions, and real-time performance insights."
          : "Join thousands of candidates preparing smarter with AI-powered mock interviews tailored to your role and tech stack."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap gap-3"
      >
        {["Adaptive AI Questions", "Real-time Feedback", "Performance Analytics"].map(
          (item, i) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full text-xs font-medium text-zinc-300 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              {item}
            </span>
          )
        )}
      </motion.div>
    </div>
  </motion.div>
);

const AuthForm = ({ type, onSubmit, buttonText, error }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState("");
  const [socialMessage, setSocialMessage] = useState("");

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleChange = (e) => {
    setLocalError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSocialClick = (provider) => {
    setSocialMessage(`${provider} login coming soon. Please use email for now.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    setSocialMessage("");

    if (type === "login") {
      onSubmit({ email: formData.email, password: formData.password });
    } else {
      if (formData.password !== formData.confirmPassword) {
        setLocalError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 6) {
        setLocalError("Password must be at least 6 characters.");
        return;
      }
      onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const displayError = localError || error;

  const inputClass =
    "w-full pl-12 pr-4 py-3.5 rounded-xl bg-zinc-800/80 text-white placeholder-zinc-500 outline-none border border-zinc-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 grid-background opacity-20 lg:opacity-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none lg:hidden" />

      <div className="relative flex min-h-screen">
        <BrandingPanel type={type} />

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              InterviewIQ
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl shadow-black/50 p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2
                  className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {type === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-zinc-400 text-sm">
                  {type === "login"
                    ? "Sign in to continue your interview prep"
                    : "Start your AI-powered interview journey"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {type === "register" && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {type === "register" && (
                  <>
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                level <= passwordStrength.score
                                  ? passwordStrength.color
                                  : "bg-zinc-700"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-zinc-500">
                          Password strength:{" "}
                          <span className="text-zinc-300">{passwordStrength.label}</span>
                        </p>
                      </div>
                    )}

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`${inputClass} pr-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </>
                )}

                {type === "login" && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-zinc-400 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="group-hover:text-zinc-300 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setSocialMessage("Password reset coming soon.")
                      }
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {displayError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-4"
                  >
                    {displayError}
                  </motion.p>
                )}

                {socialMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-amber-400/90 text-sm text-center bg-amber-500/10 border border-amber-500/20 rounded-xl py-2.5 px-4"
                  >
                    {socialMessage}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 0px 30px rgba(168,85,247,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 mt-2"
                >
                  {buttonText}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-xs text-zinc-500 bg-zinc-900/70 uppercase tracking-wider">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialClick("Google")}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-zinc-700/80 bg-zinc-800/50 text-zinc-300 text-sm font-medium hover:border-zinc-600 transition-all duration-200"
                >
                  <GoogleIcon />
                  Google
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialClick("GitHub")}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-zinc-700/80 bg-zinc-800/50 text-zinc-300 text-sm font-medium hover:border-zinc-600 transition-all duration-200"
                >
                  <GitHubIcon />
                  GitHub
                </motion.button>
              </div>

              <p className="text-center text-sm text-zinc-500 mt-8">
                {type === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </div>

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate("/")}
              className="w-full mt-6 text-center text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              ← Back to home
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
