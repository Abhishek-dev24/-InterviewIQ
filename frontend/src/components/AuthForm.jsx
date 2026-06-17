import { useState } from "react";
import { motion } from "framer-motion";

const AuthForm = ({ type, onSubmit, buttonText, error }) => {  // ✅ accept error prop
  const [formData, setFormData] = useState({
    name: "",       // ✅ changed from 'username' to 'name' — matches UserCreate backend model
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "login") {
      onSubmit({ email: formData.email, password: formData.password });
    } else {
      onSubmit({ name: formData.name, email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-zinc-400">AI Powered Interview Platform</p>
        </div>

        {/* ✅ Register only: name field — matches backend UserCreate.name */}
        {type === "register" && (
          <input
            type="text"
            name="name"              
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 p-4 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-indigo-500"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-indigo-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-indigo-500"
          required
        />

        {/* ✅ Show backend error message to user */}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.01] transition-all text-white font-semibold"
        >
          {buttonText}
        </button>
      </motion.form>
    </div>
  );
};

export default AuthForm;