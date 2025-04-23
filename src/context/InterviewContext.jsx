import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "./AuthContext";

const API = import.meta.env.VITE_BACKEND || "http://localhost:8000";

const InterviewContext = createContext(undefined);

export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  const [resumes, setResumes] = useState([]);
  const { isAuthenticated } = useAuth();
  const { token } = useAuth();

  const getInterviews = async () => {
    try {
      const response = await axios.get(`${API}/interviews/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setInterviews(response.data?.data);
        secureLocalStorage.setItem(
          "interviews",
          JSON.stringify(response.data?.data)
        );
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const getResumes = async () => {
    try {
      const response = await axios.get(`${API}/resumes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setResumes(response.data?.data);
        secureLocalStorage.setItem(
          "resumes",
          JSON.stringify(response.data?.data)
        );
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };
  const loadData = async () => {
    try {
      const interviewList = JSON.parse(
        secureLocalStorage.getItem("interviews")
      );
      const resumeList = JSON.parse(secureLocalStorage.getItem("resumes"));
      if (interviewList) setInterviews(interviewList);
      else getInterviews();
      if (interviewList) setResumes(resumeList);
      else getResumes();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  const value = {
    resumes,
    interviews,
    setInterviews,
    setResumes,
    getInterviews,
    getResumes,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};
