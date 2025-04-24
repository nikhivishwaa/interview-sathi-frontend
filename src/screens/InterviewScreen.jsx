import React from 'react';
import InterviewRoom from '../components/interviews/InterviewRoom';
import Header from '../components/Header';

const InterviewScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 w-10/12">
          <h1 className="text-2xl font-bold text-gray-900">Interview Session</h1>
          <p className="text-gray-600">Answer questions clearly and take your time</p>
        </div>
        
        <InterviewRoom />
      </div>
    </div>
  );
};

export default InterviewScreen;