
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import WorkImage from './WorkImage';
import ProtectedComponent from '../ProtectedComponent';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface WorkItemProps {
  work: Work;
  section: string;
  imageLoadErrors: Set<string>;
  onImageError: (workId: string) => void;
  onImageLoad: (workId: string) => void;
  onWorkClick: (work: Work) => void;
  onEditWork: (work: Work) => void;
  onDeleteWork: (workId: string) => void;
}

const WorkItem: React.FC<WorkItemProps> = ({
  work,
  section,
  imageLoadErrors,
  onImageError,
  onImageLoad,
  onWorkClick,
  onEditWork,
  onDeleteWork
}) => {
  return (
    <div className="relative aspect-video bg-card/30 rounded-lg border border-border/50 cursor-pointer hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 overflow-hidden group">
      <div 
        className="w-full h-full relative"
        onClick={() => onWorkClick(work)}
      >
        <WorkImage
          work={work}
          section={section}
          imageLoadErrors={imageLoadErrors}
          onImageError={onImageError}
          onImageLoad={onImageLoad}
        />
        
        {/* Overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs md:text-sm text-white font-medium truncate">{work.title}</p>
        </div>
      </div>
      
      {/* Edit/Delete buttons - only show for authenticated users */}
      <ProtectedComponent>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditWork(work);
              }}
              className="p-1 bg-neon-blue/20 rounded hover:bg-neon-blue/30 backdrop-blur-sm"
            >
              <Edit size={14} className="text-neon-blue" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteWork(work.id);
              }}
              className="p-1 bg-red-500/20 rounded hover:bg-red-500/30 backdrop-blur-sm"
            >
              <Trash2 size={14} className="text-red-400" />
            </button>
          </div>
        </div>
      </ProtectedComponent>
    </div>
  );
};

export default WorkItem;
