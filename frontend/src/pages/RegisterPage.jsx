import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (data) => {
    setError("");
    try {
      await register(data);
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.detail || "Registration failed. Please try again.";
      setError(msg);
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      buttonText="Create Account"
      error={error}
    />
  );
};

export default RegisterPage;
