// src/api/interviewApi.js

import api from "./axiosInstance";

export const startInterview = async (payload) => {
  const response = await api.post(
    "/start-interview",
    payload
  );

  return response.data;
};

export const submitAnswer = async (sessionId, answer) => {
  const response = await api.post(
    `/submit-answer/${sessionId}`,
    {
      answer
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
    `/end-interview/${sessionId}`
  );

  return response.data;
};