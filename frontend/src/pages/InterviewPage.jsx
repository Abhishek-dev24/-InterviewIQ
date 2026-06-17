// src/pages/InterviewPage.jsx

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";
import InterviewCard from "../components/InterviewCard";
import AnswerBox from "../components/AnswerBox";
import ProgressBar from "../components/ProgressBar";

const InterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // payload coming from dashboard
  const interviewConfig = location.state;

  const {
    question,
    questionNumber,
    finished,
    loading,
    summary,
    beginInterview,
    answerQuestion,
    finishInterview,
  } = useInterview();

  useEffect(() => {
    if (!interviewConfig) {
      navigate("/dashboard");
      return;
    }

    beginInterview(interviewConfig);

  }, []);

  useEffect(() => {
    if (finished && summary) {
      navigate("/summary", {
        state: summary,
      });
    }
  }, [finished, summary]);

  const handleSubmit = async (answer) => {
    await answerQuestion(answer);
  };

  const handleEndInterview = async () => {
    await finishInterview();
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">

      <ProgressBar
        current={questionNumber}
        total={interviewConfig?.total_questions}
      />

      <InterviewCard
        question={question}
        questionNumber={questionNumber}
      />

      <div className="mt-6">
        <AnswerBox
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      <button
        onClick={handleEndInterview}
        className="mt-6 bg-red-500 text-white px-5 py-3 rounded-xl"
      >
        End Interview
      </button>

    </div>
  );
};

export default InterviewPage;