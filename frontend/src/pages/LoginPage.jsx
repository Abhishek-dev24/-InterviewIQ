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
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.detail || "Login failed";
      setError(msg);
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      buttonText="Login"
      error={error}
    />
  );
};

export default LoginPage;
