
import React from 'react';

interface CoverPageProps {
  onEnter: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onEnter }) => {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-blue-900/20 flex items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={onEnter}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
      </div>
      
      {/* Main content */}
      <div className="text-center z-10 fade-in">
        <h1 className="text-6xl md:text-8xl font-light mb-4">
          <span className="text-neon-blue">Yu-Fang</span>
          <span className="text-blue-400 italic ml-4">////</span>
          <br />
          <span className="text-white italic text-4xl md:text-5xl">profile</span>
        </h1>
        
        {/* Decorative curved line */}
        <div className="mt-8 flex justify-center">
          <svg width="200" height="40" className="text-neon-blue">
            <path 
              d="M 0 20 Q 100 0 200 20" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
            />
          </svg>
        </div>
        
        <p className="text-muted-foreground mt-8 text-lg">Click to enter</p>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute bottom-10 left-10">
        <svg width="120" height="80" className="text-neon-blue/30">
          <path 
            d="M 20 60 Q 60 10 100 60" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <circle cx="20" cy="60" r="3" fill="currentColor" />
          <circle cx="100" cy="60" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default CoverPage;
