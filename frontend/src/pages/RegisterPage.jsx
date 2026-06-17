import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await register(data);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        buttonText="Create Account"
      />
    </div>
  );
};

export default RegisterPage;