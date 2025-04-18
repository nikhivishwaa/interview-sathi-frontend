
import React from 'react';
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="container py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Master Your Job Interviews with <span className="text-primary">AI-Powered</span> Practice
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Prepare for your next interview with personalized AI feedback. Practice anytime, anywhere, and get better with every session.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6">
              Start Practicing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-6 py-6">
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-12 animate-fade-in animation-delay-200">
          <div className="relative rounded-lg overflow-hidden border shadow-xl">
            <div className="bg-secondary/5 p-6 rounded-t-lg border-b">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-3 text-sm text-gray-500">Interview Session</div>
              </div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                  AI
                </div>
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                  Tell me about a challenging project you worked on and how you overcame obstacles.
                </div>
              </div>
              <div className="flex mb-4 justify-end">
                <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none text-gray-800">
                  In my previous role, I led a team that was tasked with migrating our legacy system to a new platform...
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 ml-3 flex-shrink-0">
                  You
                </div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                  AI
                </div>
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                  Good start! Consider elaborating on the specific challenges and your problem-solving approach...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
