import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Send, Mic, MicOff } from "lucide-react";
import JobRoleSelect from './JobRoleSelect';

const InterviewInterface = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsReady(true);
    
    const initialMessages = [
      {
        role: "system",
        content: `Welcome! I'll be conducting your interview for the ${role.replace('-', ' ')} position. Let's get started with some questions.`
      }
    ];

    const roleQuestions = {
      "software-engineer": "Can you tell me about your experience with software development methodologies?",
      "product-manager": "How do you prioritize features in your product roadmap?",
      "ux-designer": "How do you approach user research for a new product?",
      "data-scientist": "Could you explain a complex data analysis project you've worked on?",
      "marketing-manager": "How do you measure the success of a marketing campaign?",
      "sales-representative": "How do you approach a potential client who's rejected your proposals before?",
      "customer-success": "How do you handle a situation where a client is unhappy with your service?",
      "hr-manager": "How do you ensure diversity and inclusion in your hiring process?"
    };

    const firstQuestion = {
      role: "assistant",
      content: roleQuestions[role] || "Can you tell me about yourself and your professional background?"
    };
    
    setMessages([...initialMessages, firstQuestion]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    const userMessage = {
      role: "user",
      content: inputValue
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    setTimeout(() => {
      const aiResponses = {
        "software-engineer": [
          "That's a good perspective. Now, tell me about a challenging technical problem you've solved recently.",
          "Interesting approach! How do you handle code reviews and ensure code quality in your team?",
          "Great. If you were to design a system from scratch, what architecture would you choose and why?"
        ],
        "product-manager": [
          "Good answer. How do you collaborate with engineering teams when implementing new features?",
          "Interesting. How do you balance user needs with business objectives?",
          "How do you validate your product decisions?"
        ]
      };
      
      const roleResponses = aiResponses[selectedRole] || [
        "Thank you for that answer. Could you elaborate on how you approach problem-solving?",
        "That's helpful to know. Can you tell me about a time you had to adapt to a significant change?",
        "Interesting perspective. What would you say are your greatest professional achievements?"
      ];
      
      const randomIndex = Math.floor(Math.random() * roleResponses.length);
      
      const aiMessage = {
        role: "assistant",
        content: roleResponses[randomIndex]
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would connect to the Web Speech API
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interview Practice</CardTitle>
      </CardHeader>
      <CardContent>
        {!isReady ? (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Select a job role to begin practice</h3>
            <JobRoleSelect onSelect={handleRoleSelect} />
          </div>
        ) : (
          <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary/10 text-gray-800 rounded-tr-none' 
                    : message.role === 'system'
                    ? 'bg-muted text-gray-600 rounded-tl-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {isReady && (
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleRecording} 
            className={isRecording ? "text-red-500" : ""}
          >
            {isRecording ? <MicOff /> : <Mic />}
          </Button>
          <Textarea
            placeholder="Type your response..."
            className="flex-1 resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default InterviewInterface;
