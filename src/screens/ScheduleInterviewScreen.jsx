import React from 'react';
import Header from '../components/Header';
import ScheduleInterview from '../components/interviews/ScheduleInterview';

const ScheduleInterviewScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Schedule Interview</h1>
            <p className="text-gray-600">Choose a date and time for your interview</p>
          </div>
          
          <ScheduleInterview />
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewScreen;