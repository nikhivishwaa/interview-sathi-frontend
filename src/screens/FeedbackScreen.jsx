import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import FeedbackDetail from "../components/feedback/FeedbackDetail";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const sampleFeedback = {
  overallScore: 75,
  overallAssessment: "Good",
  technicalScore: 80,
  communicationScore: 70,
  grammarScore: 78,
  relevanceScore: 78,
  strengths: [
    "Strong technical knowledge of JavaScript frameworks",
    "Clear communication of complex concepts",
    "Structured problem-solving approach",
  ],
  improvements: [
    "Could provide more specific examples from past work",
    "Consider pausing more to gather thoughts",
    "Elaborate more on the debugging process",
  ],
  detailedFeedback: `Overall, you demonstrated solid technical knowledge and communication skills. Your responses were well-structured and showed a methodical approach to problem-solving.

Your strongest area was in explaining technical concepts clearly and concisely. You also did well in describing your workflow and collaboration style.

To improve, try to provide more concrete examples from your past experiences that highlight specific achievements. Additionally, taking a moment to gather your thoughts before responding could help you deliver more comprehensive answers.`,
};
const API = import.meta.env.VITE_BACKEND;
const FeedbackScreen = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        console.log({ token });
        setLoading(true);
        const response = await axios.get(`${API}/feedback/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log({ data: response.data });
          const { data } = response.data;
          // Create a mock feedback for demonstration
          const mockFeedback = {
            id,
            overallScore: data.overall_score || 0,
            technicalScore: data.scores?.technical || 0,
            communicationScore: data.scores?.communication || 0,
            grammarScore: data.scores?.grammar || 0,
            relevanceScore: data.scores?.relevance || 0,
            strengths: data.strengths || [],
            improvements: data.improvements || [],
            detailedFeedback: data.detailed_feedback || "",
            behavioralFeedback: data.behavioral_feedback || "",
          };

          setFeedback(mockFeedback);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        if (error?.response?.status === 404) toast.error("Interview Not Exist");
        else toast.error("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-sathi-primary mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4 text-gray-600">Loading feedback...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-gray-600">Feedback not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <FeedbackDetail feedback={feedback} />
      </div>
    </div>
  );
};

export default FeedbackScreen;
