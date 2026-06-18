import { useLocation, useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const summary = location.state;

  if (!summary) {
    return (
      <div className="text-center mt-20">
        No summary available
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Interview Summary
      </h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4 text-gray-800">

        <p>
          <strong>Total Questions:</strong>{" "}
          {summary.total_questions}
        </p>

        <p>
          <strong>Average Score:</strong>{" "}
          {summary.average_score}
        </p>

        <p>
          <strong>Performance Level:</strong>{" "}
          {summary.performance_level}
        </p>

        {summary.feedbacks?.length > 0 && (
          <div>
            <strong>Feedback:</strong>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {summary.feedbacks.map((feedback, index) => (
                <li key={index}>{feedback}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Back To Dashboard
      </button>

    </div>
  );
};

export default SummaryPage;
