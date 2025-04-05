
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startInterview, submitResponse, endInterview } from '../../api/api';
import { toast } from 'sonner';
import { 
  initSpeechRecognition, 
  startSpeechRecognition, 
  stopSpeechRecognition,
  speakText 
} from '../../utils/speech';

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [ending, setEnding] = useState(false);
  
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  
  // Initialize interview
  useEffect(() => {
    if (!id) return;
    
    const initInterview = async () => {
      try {
        setLoading(true);
        const response = await startInterview(Number(id));
        setSessionId(response.session_id);
        
        // Get first question
        // In a real app this would come from the API response
        setCurrentQuestion("Hello! I'm your AI interviewer today. Let's start by introducing yourself briefly. Could you tell me a bit about your background and experience?");
        setCurrentQuestionId("intro_question");
        
        // Speak the introduction
        setTimeout(() => {
          speakText(
            "Hello! I'm your AI interviewer today. Let's start by introducing yourself briefly. Could you tell me a bit about your background and experience?",
            () => setIsSpeaking(true),
            () => setIsSpeaking(false)
          );
        }, 1000);
        
        // Start timer
        startTimer();
      } catch (error) {
        console.error('Error starting interview:', error);
        toast.error('Failed to start interview');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    initInterview();
    
    // Initialize speech recognition
    try {
      recognitionRef.current = initSpeechRecognition();
    } catch (error) {
      toast.error('Speech recognition is not supported in your browser');
    }
    
    return () => {
      // Cleanup timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Stop speech recognition
      if (recognitionRef.current) {
        try {
          stopSpeechRecognition(recognitionRef.current);
        } catch (error) {
          console.error('Error stopping speech recognition:', error);
        }
      }
    };
  }, [id, navigate]);
  
  const startTimer = () => {
    if (timerRef.current) return;
    
    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsedSeconds);
    }, 1000);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleListening = () => {
    if (isSpeaking) return; // Don't start listening while AI is speaking
    
    if (isListening) {
      setIsListening(false);
      if (recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
      }
    } else {
      setIsListening(true);
      setTranscript('');
      
      if (recognitionRef.current) {
        startSpeechRecognition(
          recognitionRef.current,
          (text, isFinal) => {
            setTranscript(text);
          },
          (error) => {
            console.error('Speech recognition error:', error);
            toast.error('Speech recognition error');
            setIsListening(false);
          }
        );
      }
    }
  };
  
  const handleSubmitResponse = async () => {
    if (!sessionId || !transcript.trim() || !currentQuestionId) return;
    
    try {
      setSubmitting(true);
      setIsListening(false);
      
      if (recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
      }
      
      const response = await submitResponse(sessionId, currentQuestionId, transcript);
      
      setTranscript('');
      
      // Set new question from API response
      setCurrentQuestion(response.next_question);
      setCurrentQuestionId(currentQuestionId === "intro_question" ? "follow_up_1" : "follow_up_2");
      
      // Speak the new question
      speakText(
        response.next_question,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    } catch (error) {
      console.error('Error submitting response:', error);
      toast.error('Failed to submit your response');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleEndInterview = async () => {
    if (!sessionId) return;
    
    try {
      setEnding(true);
      
      // Stop listening if active
      if (isListening && recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
        setIsListening(false);
      }
      
      // End timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      const response = await endInterview(sessionId);
      
      toast.success('Interview completed successfully');
      
      // Navigate to feedback page
      navigate(`/feedback/${response.feedback_id}`);
    } catch (error) {
      console.error('Error ending interview:', error);
      toast.error('Failed to end interview');
      navigate('/dashboard');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sathi-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-700">Preparing your interview...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Interview Header */}
      <div className="sathi-card mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-sathi-primary flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">AI Interviewer</div>
              <div className="text-xs text-gray-500">Interview Session</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 text-sm">
              <div className="text-gray-500">Duration</div>
              <div className="font-semibold">{formatTime(elapsedTime)}</div>
            </div>
            
            <button 
              onClick={handleEndInterview}
              disabled={ending}
              className="bg-red-100 text-red-600 hover:bg-red-200 text-sm font-medium rounded-md px-3 py-1 flex items-center disabled:opacity-50"
            >
              {ending ? 'Ending...' : 'End Interview'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Interview Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Conversation Area */}
          <div className="sathi-card h-[400px] mb-6 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* AI Question */}
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-sathi-primary flex items-center justify-center text-white text-xs">AI</div>
                  <div className="ml-3 bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-800">{currentQuestion}</p>
                  </div>
                </div>
                
                {/* User Answer (if available) */}
                {transcript && (
                  <div className="flex items-start flex-row-reverse">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">You</div>
                    <div className="mr-3 bg-sathi-primary/10 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-800">{transcript}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Controls Area */}
          <div className="sathi-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={toggleListening}
                  disabled={isSpeaking || submitting}
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    isListening ? 'bg-red-500 text-white' : 'bg-sathi-primary text-white'
                  } disabled:opacity-50`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {isListening ? 'Recording... Click to stop' : 'Click to start speaking'}
                </span>
              </div>
              
              <button
                onClick={handleSubmitResponse}
                disabled={!transcript.trim() || submitting || isListening || isSpeaking}
                className="sathi-btn-primary px-6 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Response'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Video Preview */}
          <div className="sathi-card h-[300px] mb-6 flex items-center justify-center overflow-hidden">
            <video
              id="userVideo"
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
            ></video>
            
            {/* Camera placeholder - switch to real camera when implemented */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-white opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-white text-sm">Camera Preview</p>
              </div>
            </div>
          </div>
          
          {/* Interview Tips */}
          <div className="sathi-card">
            <h3 className="font-medium text-gray-900 mb-3">Interview Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sathi-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Speak clearly and at a moderate pace
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sathi-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Use concrete examples from your experience
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sathi-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Structure responses with the STAR method (Situation, Task, Action, Result)
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sathi-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Keep answers concise and relevant
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;