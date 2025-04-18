import React from 'react';
import { cn } from "@/lib/utils";

const FeatureCard = ({ title, description, icon, className }) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 animate-slide-up", 
      className
    )}>
      <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
