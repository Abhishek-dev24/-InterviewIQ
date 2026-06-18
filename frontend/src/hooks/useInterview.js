import { useState } from "react";
import {
  startInterview,
  submitAnswer,
  getInterviewSummary,
  endInterview,
} from "../api/interviewApi";

export const useInterview = () => {
  const [sessionId, setSessionId] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const beginInterview = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const data = await startInterview(payload);
      const interviewData = data.data;

      setSessionId(interviewData.session_id);
      setQuestionId(interviewData.question_id);
      setQuestion(interviewData.question);
      setQuestionNumber(1);

      return interviewData;
    } catch (err) {
      setError(err.response?.data?.detail || "Start failed");
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (answer) => {
    try {
      setLoading(true);
      setError(null);

      const data = await submitAnswer(sessionId, questionId, answer);

      if (data.next_question?.completed) {
        const summaryData = await getInterviewSummary(sessionId);
        setSummary(summaryData);
        setFinished(true);
        return data;
      }

      setQuestion(data.next_question.next_question);
      setQuestionId(data.next_question.question_id);
      setQuestionNumber(data.next_question.question_number);

      return data;
    } catch (err) {
      setError(err.response?.data?.detail || "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const finishInterview = async () => {
    try {
      setLoading(true);

      await endInterview(sessionId);

      const data = await getInterviewSummary(sessionId);

      setSummary(data);
      setFinished(true);

      return data;
    } catch (err) {
      setError(err.response?.data?.detail || "End failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    sessionId,
    questionId,
    question,
    questionNumber,
    loading,
    finished,
    summary,
    error,
    beginInterview,
    answerQuestion,
    finishInterview,
  };
};
