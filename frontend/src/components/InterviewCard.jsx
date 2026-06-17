// src/components/InterviewCard.jsx

import { motion } from "framer-motion";

const InterviewCard = ({ question, questionNumber }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <p className="text-sm text-gray-500 mb-2">
        Question {questionNumber}
      </p>

      <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
        {question}
      </h2>
    </motion.div>
  );
};

export default InterviewCard;