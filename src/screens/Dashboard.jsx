
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DashboardStats from '../components/dashboard/DashboardStats';
import UpcomingInterviews from '../components/dashboard/UpcomingInterviews';
import RecentFeedback from '../components/dashboard/RecentFeedback';
import ResumeUpload from '../components/resume/ResumeUpload';
import { useAuth } from '../context/AuthContext';
import { getInterviews, cancelInterview } from '../api/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const data = await getInterviews();
      setInterviews(data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      toast.error('Failed to load your interviews');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelInterview = async (id) => {
    try {
      await cancelInterview(id);
      toast.success('Interview cancelled successfully');
      fetchInterviews();
    } catch (error) {
      console.error('Error cancelling interview:', error);
      toast.error('Failed to cancel interview');
    }
  };

  // Calculate statistics
  const totalInterviews = interviews.length;
  const completedInterviews = interviews.filter(interview => interview.status === 'completed').length;
  const upcomingInterviews = interviews.filter(interview => interview.status === 'scheduled').length;
  
  // Calculate average score
  const interviewsWithFeedback = interviews.filter(interview => interview.feedback);
  const averageScore = interviewsWithFeedback.length > 0
    ? Math.round(
        interviewsWithFeedback.reduce((sum, interview) => sum + (interview.feedback?.overallScore || 0), 0) / 
        interviewsWithFeedback.length
      )
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.first_name}</p>
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
              interviews={interviews.filter(interview => interview.status === 'scheduled')}
              onCancel={handleCancelInterview}
              loading={loading}
            />
            
            <RecentFeedback 
              interviews={interviews.filter(interview => interview.status === 'completed')}
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