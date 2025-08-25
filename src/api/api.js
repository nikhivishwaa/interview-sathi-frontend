import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { analytics } from "../helpers/analytics";

const API_BASE_URL = import.meta.env.VITE_BACKEND || "http://localhost:8000";

// Helper function to get authorization header
const getAuthHeader = () => {
  const token = secureLocalStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Interview related API calls
export const getInterviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/interviews/`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const scheduleInterview = async (date, time, jobRole) => {
  const response = await axios.post(
    `${API_BASE_URL}/interviews/`,
    {
      date,
      time,
      job_role: jobRole,
    },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const cancelInterview = async (id) => {
  await axios.post(
    `${API_BASE_URL}/interviews/${id}/cancel/`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
  analytics.event({
    category: "Interview",
    action: "interview_cancelled",
    label: `success`,
    value: id,
  });
};

// Resume related API calls
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const token = secureLocalStorage.getItem("token");

  const response = await axios.post(`${API_BASE_URL}/resumes/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  analytics.event({
    category: "Resume",
    action: "resume_uploaded",
    label: `success`,
    value: response.data?.data.id,
  });

  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get(`${API_BASE_URL}/resumes/`, {
    headers: getAuthHeader(),
  });
  return response.data?.data;
};

// Interview session related API calls
export const startInterview = async (interviewId) => {
  const response = await axios.post(
    `${API_BASE_URL}/interviews/${interviewId}/start/`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const submitResponse = async (sessionId, questionId, answer) => {
  const response = await axios.post(
    `${API_BASE_URL}/interviews/sessions/${sessionId}/answer/`,
    {
      question_id: questionId,
      answer,
    },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

export const endInterview = async (sessionId) => {
  const response = await axios.post(
    `${API_BASE_URL}/interviews/sessions/${sessionId}/end/`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};
