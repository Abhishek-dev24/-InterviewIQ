import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      await login(data);           // ✅ data = {email, password} object
      navigate("/dashboard");      // ✅ only navigates on success
    } catch (err) {
      // ✅ show exact backend error to user
      const msg = err.response?.data?.detail || "Login failed";
      setError(msg);
      console.error("Login error:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        buttonText="Login"
        error={error}          // ✅ pass error down to form
      />
    </div>
  );
};

export default LoginPage;