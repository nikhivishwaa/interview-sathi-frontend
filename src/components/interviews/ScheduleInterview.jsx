import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scheduleInterview } from '../../api/api';
import { toast } from 'sonner';

const ScheduleInterview = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [jobRole, setJobRole] = useState('frontend');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate min date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  // Calculate max date (3 months from now)
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }
    
    try {
      setLoading(true);
      await scheduleInterview(date, time, jobRole);
      toast.success('Interview scheduled successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast.error('Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto sathi-card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule an Interview</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-1">
            Job Role
          </label>
          <select
            id="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="sathi-input"
            required
          >
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            max={maxDateString}
            className="sathi-input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="sathi-input"
            required
          >
            <option value="" disabled>Select a time</option>
            <option value="09:00:00">9:00 AM</option>
            <option value="10:00:00">10:00 AM</option>
            <option value="11:00:00">11:00 AM</option>
            <option value="12:00:00">12:00 PM</option>
            <option value="13:00:00">1:00 PM</option>
            <option value="14:00:00">2:00 PM</option>
            <option value="15:00:00">3:00 PM</option>
            <option value="16:00:00">4:00 PM</option>
            <option value="17:00:00">5:00 PM</option>
          </select>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="sathi-btn-primary w-full"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scheduling...
              </>
            ) : 'Schedule Interview'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleInterview;