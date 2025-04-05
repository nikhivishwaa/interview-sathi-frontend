import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import FeedbackDetail from "../components/feedback/FeedbackDetail";
import { getFeedback } from "../api/api";
import { toast } from "sonner";

const FeedbackScreen = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const data = await getFeedback(Number(id));

        // Create a mock feedback for demonstration
        const mockFeedback = {
          id: data.id || Number(id),
          interviewId: data.interview_id || 1,
          overallScore: data.overall_score || 75,
          technicalScore: data.technical_score || 80,
          communicationScore: data.communication_score || 70,
          behavioralScore: data.behavioral_score || 78,
          strengths: data.strengths || [
            "Strong technical knowledge of JavaScript frameworks",
            "Clear communication of complex concepts",
            "Structured problem-solving approach",
          ],
          improvements: data.improvements || [
            "Could provide more specific examples from past work",
            "Consider pausing more to gather thoughts",
            "Elaborate more on the debugging process",
          ],
          comments:
            data.comments ||
            `Overall, you demonstrated solid technical knowledge and communication skills. Your responses were well-structured and showed a methodical approach to problem-solving.

Your strongest area was in explaining technical concepts clearly and concisely. You also did well in describing your workflow and collaboration style.

To improve, try to provide more concrete examples from your past experiences that highlight specific achievements. Additionally, taking a moment to gather your thoughts before responding could help you deliver more comprehensive answers.`,
        };

        setFeedback(mockFeedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        toast.error("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

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
