// src/pages/DashboardPage.jsx

import { useNavigate } from "react-router-dom";

const DashboardPage = () => {

  const navigate = useNavigate();

  const startInterview = () => {
    navigate("/interview", {
      state: {
        role: "Frontend Developer",
        experience_level: "Junior",
        tech_stack: ["React", "Tailwind", "JavaScript"],
        total_questions: 10
      }
    });
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <button
        onClick={startInterview}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Start Interview
      </button>

    </div>
  );
};

export default DashboardPage;