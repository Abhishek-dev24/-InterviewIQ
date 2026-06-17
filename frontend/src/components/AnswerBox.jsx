// src/components/AnswerBox.jsx

import { useState } from "react";

const AnswerBox = ({ onSubmit, loading }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (!answer.trim()) return;

    onSubmit(answer);
    setAnswer("");
  };

  return (
    <div className="space-y-4">
      <textarea
        rows="6"
        placeholder="Type your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border rounded-xl p-4 outline-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Submitting..." : "Submit Answer"}
      </button>
    </div>
  );
};

export default AnswerBox;