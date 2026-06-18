import api from "./axiosInstance";

export const startInterview = async (payload) => {
  const response = await api.post(
    "/interview/start-interview",
    payload
  );

  return response.data;
};

export const submitAnswer = async (sessionId, questionId, answer) => {
  const response = await api.post(
    "/answer/submit-answer",
    {
      session_id: sessionId,
      question_id: questionId,
      answer,
    }
  );

  return response.data;
};

export const getInterviewSummary = async (sessionId) => {
  const response = await api.get(
    `/interview-summary/${sessionId}`
  );

  return response.data;
};

export const endInterview = async (sessionId) => {
  const response = await api.post(
    `/interview/end-interview/${sessionId}`
  );

  return response.data;
};
