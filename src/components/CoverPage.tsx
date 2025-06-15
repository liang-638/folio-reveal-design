
import React from 'react';

interface CoverPageProps {
  onEnter: () => void;
}

// 波浪SVG，響應式設計，顏色參照你的圖片
const WaveBackground = () => (
  <svg
    width="600"
    height="350"
    viewBox="0 0 600 350"
    className="absolute left-0 bottom-0 z-0 pointer-events-none select-none max-w-[80vw] max-h-[40vh] md:max-w-[50vw] md:max-h-[50vh]"
    style={{ minWidth: 300, minHeight: 180 }}
    fill="none"
    aria-hidden="true"
  >
    {/* 最底層深藍 */}
    <path
      d="M0 320 Q 80 270 220 320 Q 350 370 600 300 V 350 H0 Z"
      fill="#1d2236"
    />
    {/* 淺藍層 */}
    <path
      d="M0 280 Q 130 210 250 280 Q 400 360 600 220 V 350 H0 Z"
      fill="#77a7df"
      opacity="0.85"
    />
    {/* 亮藍層 */}
    <path
      d="M0 240 Q 80 150 300 220 Q 450 320 600 160 V 340 H0 Z"
      fill="#2176ee"
      opacity="0.80"
    />
    {/* 紫色層 */}
    <path
      d="M0 330 Q 150 320 240 300 Q 350 270 600 340 V 350 H0 Z"
      fill="#563981"
      opacity="0.7"
    />
  </svg>
);

const CoverPage: React.FC<CoverPageProps> = ({ onEnter }) => {
  return (
    <div 
      className="min-h-screen bg-black flex items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={onEnter}
    >
      {/* 波浪狀幾何背景（左下角） */}
      <WaveBackground />

      {/* Top straight blue line */}
      <div className="absolute top-8 left-0 w-full z-10">
        <div className="w-full h-0.5 bg-blue-500"></div>
      </div>

      {/* Top right squares (without extra blue lines) */}
      <div className="absolute top-12 right-16 flex space-x-3 z-10">
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
      </div>

      {/* Main title */}
      <div className="text-center z-20 fade-in relative">
        <div className="mb-8">
          <h1 className="text-8xl font-light tracking-wider">
            <span className="text-blue-400">Yu-Fang</span>
            <span className="text-purple-400 ml-6 italic text-6xl">////</span>
            <span className="text-purple-400 ml-2 text-6xl">-</span>
          </h1>
        </div>
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
      <div className="absolute bottom-16 right-16 z-10">
        <div className="w-32 h-32 border-2 border-blue-400 bg-transparent opacity-30"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-30">
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
