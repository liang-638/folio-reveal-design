
import React from 'react';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}
interface WorkCardProps {
  work: Work;
  section: string;
  onSelect: (work: Work) => void;
  renderWorkImage: (work: Work) => React.ReactNode;
}

const WorkCard: React.FC<WorkCardProps> = ({
  work,
  section,
  onSelect,
  renderWorkImage,
}) => {
  return (
    <div
      className="relative aspect-video bg-card/30 rounded-lg border border-border/50 cursor-pointer hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
      key={work.id}
    >
      <div 
        className="w-full h-full relative"
        onClick={() => onSelect(work)}
      >
        {renderWorkImage(work)}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs md:text-sm text-white font-medium truncate">{work.title}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
