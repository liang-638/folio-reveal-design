
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const InfoSection: React.FC = () => {
  const [currentView, setCurrentView] = useState<'profile' | 'skills'>('profile');

  const toggleView = () => {
    setCurrentView(prev => prev === 'profile' ? 'skills' : 'profile');
  };

  return (
    <div className="ml-64 min-h-screen bg-background relative">
      {/* Navigation arrows */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={toggleView}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
        >
          {currentView === 'profile' ? (
            <ChevronDown className="text-neon-blue" size={24} />
          ) : (
            <ChevronUp className="text-neon-blue" size={24} />
          )}
        </button>
      </div>

      {/* Profile View */}
      {currentView === 'profile' && (
        <div className="slide-up p-12 flex items-center justify-center min-h-screen">
          <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Avatar and Name */}
            <div className="text-center lg:text-left">
              <div className="w-48 h-48 mx-auto lg:mx-0 mb-6 relative">
                <div className="gradient-border rounded-full">
                  <div className="gradient-border-inner rounded-full p-2">
                    <div className="w-full h-full bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                      <div className="text-6xl">😊</div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-light mb-2">
                <span className="text-neon-blue">Yu-Fang</span>
              </h1>
              <p className="text-neon-purple text-xl">Creative Designer</p>
            </div>

            {/* Biography */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">About Me</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hello! I'm Yu-Fang, a passionate creative designer with expertise in 
                  illustration, character design, game development, and animation.
                </p>
                <p>
                  I specialize in bringing imaginative concepts to life through digital art, 
                  creating compelling characters and immersive visual experiences that tell stories 
                  and connect with audiences.
                </p>
                <p>
                  My work spans across various mediums including digital illustration, 
                  game design, character development, and motion graphics. I'm constantly 
                  exploring new techniques and pushing creative boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills View */}
      {currentView === 'skills' && (
        <div className="slide-down p-12 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">Skills & Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Design Software */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-neon-blue">Design Software</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'AI', color: 'border-yellow-500 text-yellow-500' },
                    { name: 'PS', color: 'border-blue-500 text-blue-500' },
                    { name: 'AE', color: 'border-purple-500 text-purple-500' },
                    { name: 'PR', color: 'border-blue-400 text-blue-400' },
                    { name: 'FL', color: 'border-gray-400 text-gray-400' },
                    { name: 'C4D', color: 'border-orange-500 text-orange-500' },
                  ].map((tool) => (
                    <div
                      key={tool.name}
                      className={`aspect-square border-2 ${tool.color} rounded-lg flex items-center justify-center text-lg font-bold`}
                    >
                      {tool.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-neon-blue">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-muted-foreground">Email: yufang@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                    <span className="text-muted-foreground">Portfolio: yufang-design.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-muted-foreground">Location: Taiwan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSection;
