import React, { useState, useEffect } from 'react';

import mic_icons from '../assets/mic_icons.png';

const AI_Interviewer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [aiText, setAiText] = useState('AI is speaking...');
  const [userResponse, setUserResponse] = useState('Waiting for response...');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'en-US';
      recognitionInstance.interimResults = false;
      setRecognition(recognitionInstance);

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserResponse(transcript);
      };

      recognitionInstance.onend = () => {
        document.getElementById('mic-btn').classList.remove('mic-active');
        document.getElementById('mic-indicator').style.opacity = '0';
      };
    }
  }, []);

  const startSpeaking = () => {
    const aiQuestion = 'Tell me about yourself. and my name is Ankush Gupta';
    setAiText(aiQuestion);
    speakText(aiQuestion);
    startListening();
  };

  const stopSpeaking = () => {
    recognition?.stop();
    document.getElementById('mic-btn').classList.remove('mic-active');
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognition) {
      recognition.onstart = () => {
        document.getElementById('mic-btn').classList.add('mic-active');
        document.getElementById('mic-indicator').style.opacity = '1';
      };
      recognition.start();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const endCall = () => {
    alert('Interview ended.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg border-b border-gray-700">
        <h1 className="text-lg font-semibold">AI Interview Room</h1>
        <p className="text-sm text-gray-400">Meeting ID: 123-456-789</p>
        <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600" onClick={endCall}>Leave</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-700 flex">

          {/* AI Column */}
          <div className="w-1/2 flex flex-col items-center border-r border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-4">AI Interviewer</h2>
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-blue-400">
              <img src={mic_icons} alt="AI Interviewer" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-300 text-sm w-full text-center">
              <p>{aiText}</p>
            </div>
          </div>

          {/* User Column */}
          <div className="w-1/2 flex flex-col items-center p-4">
            <h2 className="text-lg font-semibold mb-4">You</h2>
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-green-400">
              <img src={mic_icons} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-300 text-sm w-full text-center">
              <p>{userResponse}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-6 p-6">
        <button id="mic-btn" className="bg-gray-700 p-4 rounded-full hover:bg-gray-600 relative w-16 h-16"
          onClick={toggleMute}>
          <img src={isMuted ? `${mic_icons}` : `${mic_icons}`} alt="Mic" className="w-8 h-8" />
          <div id="mic-indicator" className="absolute w-16 h-16 rounded-full border-4 border-blue-500 opacity-0"></div>
        </button>
        <button className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600" onClick={startSpeaking}>Start Interview</button>
        <button className="bg-gray-600 px-6 py-3 rounded-lg hover:bg-gray-500" onClick={stopSpeaking}>Stop</button>
      </div>
    </div>
  );
};

export default AI_Interviewer;
