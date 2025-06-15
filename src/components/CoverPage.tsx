
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
      {/* Top straight blue line */}
      <div className="absolute top-8 left-0 w-full">
        <div className="w-full h-0.5 bg-blue-500"></div>
      </div>

      {/* Top right squares (without extra blue lines) */}
      <div className="absolute top-12 right-16 flex space-x-3">
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
      </div>

      {/* Left bottom wave-like geometric shapes */}
      <div className="absolute left-0 bottom-0 overflow-hidden">
        {/* First wave layer - closest to bottom */}
        <div className="relative">
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-80"></div>
          <div className="absolute bottom-16 left-20 w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-70"></div>
          <div className="absolute bottom-24 left-32 w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full opacity-75"></div>
        </div>
        
        {/* Second wave layer */}
        <div className="relative">
          <div className="absolute bottom-32 left-16 w-36 h-36 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full opacity-60"></div>
          <div className="absolute bottom-40 left-28 w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-48 left-40 w-28 h-28 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-65"></div>
        </div>
        
        {/* Third wave layer - highest */}
        <div className="relative">
          <div className="absolute bottom-56 left-24 w-40 h-40 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full opacity-70"></div>
          <div className="absolute bottom-64 left-36 w-36 h-36 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-60"></div>
          <div className="absolute bottom-72 left-48 w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full opacity-75"></div>
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
