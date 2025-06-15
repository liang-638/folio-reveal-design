
import React from 'react';

interface CoverPageProps {
  onEnter: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onEnter }) => {
  return (
    <div 
      className="min-h-screen bg-black flex items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={onEnter}
    >
      {/* Top curved line */}
      <div className="absolute top-8 left-0 w-full">
        <svg width="100%" height="40" className="text-blue-500">
          <path 
            d="M 80 30 Q 400 5 800 25 Q 1200 35 1600 20" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none"
          />
        </svg>
      </div>

      {/* Top right squares */}
      <div className="absolute top-12 right-16 flex space-x-3">
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-16 h-1 bg-blue-500 mt-3"></div>
      </div>

      {/* Left side geometric shapes */}
      <div className="absolute left-0 top-1/4">
        {/* Large blue circular shape */}
        <div className="w-96 h-96 relative">
          <div className="absolute inset-0 bg-blue-600 rounded-full opacity-80"></div>
          <div className="absolute inset-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-90"></div>
        </div>
        
        {/* Overlapping curved shapes */}
        <div className="absolute top-32 left-32">
          <div className="w-80 h-64 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full opacity-70 transform rotate-12"></div>
        </div>
        
        <div className="absolute top-48 left-16">
          <div className="w-72 h-56 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full opacity-60 transform -rotate-6"></div>
        </div>
        
        <div className="absolute bottom-32 left-8">
          <div className="w-64 h-48 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full opacity-75 transform rotate-3"></div>
        </div>
      </div>

      {/* Main title */}
      <div className="text-center z-10 fade-in relative">
        <div className="mb-8">
          <h1 className="text-8xl font-light tracking-wider">
            <span className="text-blue-400">Yu-Fang</span>
            <span className="text-purple-400 ml-6 italic text-6xl">////</span>
            <span className="text-purple-400 ml-2 text-6xl">-</span>
          </h1>
        </div>
        
        {/* Profile text with decorative elements */}
        <div className="relative mt-4">
          <span className="text-white italic text-5xl font-light">profile</span>
          
          {/* Decorative underline and square */}
          <div className="flex items-center justify-center mt-2">
            <div className="w-32 h-0.5 bg-white mr-4"></div>
            <div className="w-6 h-6 border-2 border-blue-400 bg-transparent"></div>
          </div>
        </div>
        
        <p className="text-gray-400 mt-12 text-lg">Click to enter</p>
      </div>

      {/* Bottom right decorative elements */}
      <div className="absolute bottom-16 right-16">
        <div className="w-32 h-32 border-2 border-blue-400 bg-transparent opacity-30"></div>
      </div>

      {/* Additional floating geometric elements */}
      <div className="absolute top-1/3 right-1/4">
        <div className="w-2 h-16 bg-blue-400 opacity-40 transform rotate-12"></div>
      </div>
      
      <div className="absolute bottom-1/3 right-1/3">
        <div className="w-12 h-2 bg-purple-400 opacity-50"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
