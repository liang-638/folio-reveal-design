
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import WorkSectionLogo from './WorkSectionLogo';
import WorkCard from './WorkCard';
import WorkDetailModal from './WorkDetailModal';

interface Work {
  id: string;
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
  onWorksUpdate?: (works: Omit<Work, 'sort_order'>[]) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({
  section,
  works,
  maxWorks = 4,
  hasDescription = false,
  gameDescription,
  onWorksUpdate,
}) => {
  const [currentView, setCurrentView] = useState<'description' | 'works'>('description');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  const toggleView = () => {
    setCurrentView(prev => prev === 'description' ? 'works' : 'description');
  };

  const displayWorks = works.slice(0, maxWorks);

  const handleImageError = (workId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(workId));
  };

  const handleImageLoad = (workId: string) => {
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(workId);
      return newSet;
    });
  };

  const renderWorkImage = (work: Work, isModal = false) => {
    const hasError = imageLoadErrors.has(work.id);
    const hasImage = work.image && work.image.trim() !== '';
    const sizeClass = isModal ? 'w-full h-full' : 'w-full h-full';

    if (hasImage && !hasError) {
      return (
        <img
          src={work.image}
          alt={work.title}
          className={`${sizeClass} ${isModal ? 'object-contain' : 'object-cover'} transition-transform duration-300 ${!isModal ? 'group-hover:scale-105' : ''}`}
          onError={() => handleImageError(work.id)}
          onLoad={() => handleImageLoad(work.id)}
        />
      );
    }

    // fallback icon
    return (
      <div className={`${sizeClass} bg-gradient-to-br from-neon-blue/20 to-accent/20 flex items-center justify-center`}>
        <div className="text-4xl md:text-6xl opacity-50 group-hover:opacity-70 transition-opacity">
          {section === 'illustration' ? '🎨' :
            section === 'character' ? '👤' :
              section === 'game' ? '🎮' :
                section === 'animation' ? '🎬' :
                  section === 'awards' ? '🏆' : '📁'}
        </div>
      </div>
    );
  };

  return (
    <div className="md:ml-64 min-h-screen bg-background relative">
      {/* Navigation arrows */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={toggleView}
          className="p-2 md:p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
        >
          {currentView === 'description' ? (
            <ChevronDown className="text-neon-blue" size={20} />
          ) : (
            <ChevronUp className="text-neon-blue" size={20} />
          )}
        </button>
      </div>

      {/* Description View (for Game Design) */}
      {hasDescription && currentView === 'description' && (
        <div className="slide-up p-4 md:p-12 flex items-center justify-center min-h-screen">
          <div className="max-w-3xl w-full">
            <div className="flex justify-center items-center mb-6 md:mb-8">
              <WorkSectionLogo section={section} className={section === 'game' ? 'max-h-64 w-auto' : 'text-2xl md:text-4xl'} style={section === 'game' ? { filter: 'drop-shadow(0 2px 16px #2224)' } : undefined} />
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 md:p-8 border border-border">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {gameDescription || 'Game design description will be placed here. This section introduces the core concepts and design philosophy behind the game projects.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Works View */}
      {(!hasDescription || currentView === 'works') && (
        <div className="slide-down p-4 md:p-12 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <WorkSectionLogo section={section} className={section === 'game' ? 'max-h-40 w-auto' : 'text-xl md:text-3xl'} style={section === 'game' ? { filter: 'drop-shadow(0 2px 8px #2224)' } : undefined} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {displayWorks.map((work) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  section={section}
                  onSelect={setSelectedWork}
                  renderWorkImage={renderWorkImage}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Work Detail Modal */}
      {selectedWork && (
        <WorkDetailModal
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
          renderWorkImage={renderWorkImage}
        />
      )}
    </div>
  );
};

export default WorkSection;
