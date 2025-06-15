
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import WorkItem from './WorkItem';
import ProtectedComponent from '../ProtectedComponent';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface WorkGridProps {
  section: string;
  works: Work[];
  maxWorks: number;
  imageLoadErrors: Set<string>;
  onImageError: (workId: string) => void;
  onImageLoad: (workId: string) => void;
  onWorkClick: (work: Work) => void;
  onEditWork: (work: Work) => void;
  onDeleteWork: (workId: string) => void;
  onAddWork: () => void;
}

const WorkGrid: React.FC<WorkGridProps> = ({
  section,
  works,
  maxWorks,
  imageLoadErrors,
  onImageError,
  onImageLoad,
  onWorkClick,
  onEditWork,
  onDeleteWork,
  onAddWork
}) => {
  const displayWorks = works.slice(0, maxWorks);

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'illustration': return 'Illustration Design';
      case 'character': return 'Character Design';
      case 'game': return 'Game Projects';
      case 'animation': return 'Animation Works';
      case 'awards': return 'Certificates & Awards';
      default: return section;
    }
  };

  return (
    <div className="slide-down p-4 md:p-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-3xl font-semibold text-neon-blue capitalize">
            {getSectionTitle(section)}
          </h2>
          
          {/* Add Work button - only show for authenticated users */}
          <ProtectedComponent>
            <Button
              onClick={onAddWork}
              className="flex items-center gap-2 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
              variant="outline"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Work</span>
            </Button>
          </ProtectedComponent>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {displayWorks.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              section={section}
              imageLoadErrors={imageLoadErrors}
              onImageError={onImageError}
              onImageLoad={onImageLoad}
              onWorkClick={onWorkClick}
              onEditWork={onEditWork}
              onDeleteWork={onDeleteWork}
            />
          ))}
        </div>

        {/* Login Link for Non-Authenticated Users */}
        <ProtectedComponent
          fallback={
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Want to manage portfolio works?</p>
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
              >
                Admin Login
              </Button>
            </div>
          }
        >
          <></>
        </ProtectedComponent>
      </div>
    </div>
  );
};

export default WorkGrid;
