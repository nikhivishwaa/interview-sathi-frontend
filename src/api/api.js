import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND || 'http://localhost:8000';

// Helper function to get authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Interview related API calls
export const getInterviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/interviews/`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const scheduleInterview = async (date, time, jobRole) => {
  const response = await axios.post(`${API_BASE_URL}/interviews/schedule/`, {
    date,
    time,
    job_role: jobRole
  }, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const cancelInterview = async (id) => {
  await axios.post(`${API_BASE_URL}/interviews/${id}/cancel/`, {}, {
    headers: getAuthHeader()
  });
};

// Resume related API calls
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');

  const response = await axios.post(`${API_BASE_URL}/resumes/upload/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get(`${API_BASE_URL}/resumes/`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Interview session related API calls
export const startInterview = async (interviewId) => {
  const response = await axios.post(`${API_BASE_URL}/interviews/${interviewId}/start/`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const submitResponse = async (sessionId, questionId, answer) => {
  const response = await axios.post(`${API_BASE_URL}/interviews/sessions/${sessionId}/answer/`, {
    question_id: questionId,
    answer
  }, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const endInterview = async (sessionId) => {
  const response = await axios.post(`${API_BASE_URL}/interviews/sessions/${sessionId}/end/`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getFeedback = async (feedbackId) => {
  const response = await axios.get(`${API_BASE_URL}/interviews/feedback/${feedbackId}/`, {
    headers: getAuthHeader()
  });
  return response.data;
};
