// src/hooks/useInterview.js

import { useState } from "react";
import {
  startInterview,
  submitAnswer,
  getInterviewSummary,
  endInterview,
} from "../api/interviewApi";

export const useInterview = () => {
  const [sessionId, setSessionId] = useState(null);
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

      setSessionId(data.session_id);
      setQuestion(data.question);
      setQuestionNumber(1);

      return data;
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

      const data = await submitAnswer(sessionId, answer);

      if (data.interview_ended) {
        setFinished(true);
        return data;
      }

      setQuestion(data.next_question);
      setQuestionNumber((prev) => prev + 1);

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