
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg 
            viewBox="0 0 24 24" 
            className="h-8 w-8 fill-primary"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1zm1.5-8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          <div className="font-bold text-xl">Interview Sathi</div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-primary transition duration-200">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-primary transition duration-200">How it Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-primary transition duration-200">Pricing</a>
        </div>
        <div>
          <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
