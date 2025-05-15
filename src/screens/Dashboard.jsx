import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DashboardStats from "../components/dashboard/DashboardStats";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import RecentFeedback from "../components/dashboard/RecentFeedback";
import ResumeUpload from "../components/resume/ResumeUpload";
import { useAuth } from "../context/AuthContext";
import { useInterview } from "../context/InterviewContext";
import { toast } from "sonner";
import axios from "axios";
import RenderSvg from "../components/RenderSvg";
import { refreshIconSvg } from "../data/SvgImageData";

const API = import.meta.env.VITE_BACKEND;
const Dashboard = () => {
  const { user, token } = useAuth();
  const { interviews, getInterviews, setInterviews } = useInterview();
  const [loading, setLoading] = useState(true);
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [completedInterviews, setCompletedInterviews] = useState(0);
  const [upcomingInterviews, setUpcomingInterviews] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const data = await getInterviews();
      console.log({data})
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to load your interviews");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelInterview = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API}/interviews/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log({ data: response.data });
        toast.success("Interview Cancelled Successfully");
        setInterviews(
          interviews.map((interview) =>
            interview.id !== id ? interview : response.data?.data
          )
        );
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
      if (error?.response?.status === 404) toast.error("Interview Not Exist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Calculate statistics
    const totalInterviews_ = interviews.length;
    const completedInterviews_ = interviews.filter(
      (interview) => interview.status === "completed"
    ).length;
    const upcomingInterviews_ = interviews.filter(
      (interview) => interview.status === "scheduled"
    ).length;

    // Calculate average score
    const interviewsWithFeedback = interviews.filter(
      (interview) => interview.metadata?.feedback
    );
    const averageScore_ =
      interviewsWithFeedback.length > 0
        ? Math.round(
            interviewsWithFeedback.reduce(
              (sum, interview) => sum + (interview.feedback?.overallScore || 0),
              0
            ) / interviewsWithFeedback.length
          )
        : undefined;

    setAverageScore(averageScore_);
    setTotalInterviews(totalInterviews_);
    setCompletedInterviews(completedInterviews_);
    setUpcomingInterviews(upcomingInterviews_);
  }, [interviews]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.first_name}</p>
          </div>
          <div className="flex rounded-lg bg-white shadow-md p-2 cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out" onClick={()=>{
            fetchInterviews();
            toast.success("Interviews Refreshed");
          }}>
            <RenderSvg svgName={refreshIconSvg} />
          </div>
        </div>

        <div className="space-y-8">
          <DashboardStats
            totalInterviews={totalInterviews}
            completedInterviews={completedInterviews}
            upcomingInterviews={upcomingInterviews}
            averageScore={averageScore}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UpcomingInterviews
              interviews={interviews.filter(
                (interview) => interview.status === "scheduled"
              )}
              onCancel={handleCancelInterview}
              loading={loading}
            />

            <RecentFeedback
              interviews={interviews.filter(
                (interview) => interview.status === "completed"
              )}
              loading={loading}
            />
          </div>

          <ResumeUpload />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
