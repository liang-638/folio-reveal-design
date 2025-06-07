
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface WorkSectionProps {
  section: string;
  works: Work[];
  maxWorks?: number;
  hasDescription?: boolean;
  gameDescription?: string;
}

const WorkSection: React.FC<WorkSectionProps> = ({ 
  section, 
  works, 
  maxWorks = 4, 
  hasDescription = false,
  gameDescription 
}) => {
  const [currentView, setCurrentView] = useState<'description' | 'works'>('description');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const toggleView = () => {
    setCurrentView(prev => prev === 'description' ? 'works' : 'description');
  };

  const displayWorks = works.slice(0, maxWorks);

  return (
    <div className="ml-64 min-h-screen bg-background relative">
      {/* Navigation arrows */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={toggleView}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
        >
          {currentView === 'description' ? (
            <ChevronDown className="text-neon-blue" size={24} />
          ) : (
            <ChevronUp className="text-neon-blue" size={24} />
          )}
        </button>
      </div>

      {/* Description View (for Game Design) */}
      {hasDescription && currentView === 'description' && (
        <div className="slide-up p-12 flex items-center justify-center min-h-screen">
          <div className="max-w-3xl w-full">
            <h2 className="text-4xl font-semibold text-center mb-8 text-neon-blue">
              {section === 'game' ? 'Game Design' : section}
            </h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {gameDescription || 'Game design description will be placed here. This section introduces the core concepts and design philosophy behind the game projects.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Works View */}
      {(!hasDescription || currentView === 'works') && (
        <div className="slide-down p-12 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12 text-neon-blue capitalize">
              {section === 'illustration' ? 'Illustration Design' :
               section === 'character' ? 'Character Design' :
               section === 'game' ? 'Game Projects' :
               section === 'animation' ? 'Animation Works' :
               section === 'awards' ? 'Certificates & Awards' : section}
            </h2>
            
            <div className="grid grid-cols-2 gap-8">
              {displayWorks.map((work) => (
                <div
                  key={work.id}
                  className="aspect-video bg-card/30 rounded-lg border border-border/50 cursor-pointer hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center relative">
                    <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity">
                      {section === 'illustration' ? '🎨' :
                       section === 'character' ? '👤' :
                       section === 'game' ? '🎮' :
                       section === 'animation' ? '🎬' :
                       section === 'awards' ? '🏆' : '📁'}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm text-muted-foreground">{work.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Work Detail Modal */}
      {selectedWork && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedWork(null)}
        >
          <div 
            className="max-w-4xl w-full bg-card rounded-lg overflow-hidden fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                <div className="text-8xl opacity-70">
                  {section === 'illustration' ? '🎨' :
                   section === 'character' ? '👤' :
                   section === 'game' ? '🎮' :
                   section === 'animation' ? '🎬' :
                   section === 'awards' ? '🏆' : '📁'}
                </div>
              </div>
              
              {/* Details */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-4 text-neon-blue">{selectedWork.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedWork.description}
                </p>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="self-start px-6 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSection;
