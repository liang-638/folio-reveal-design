
import React from 'react';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface WorkImageProps {
  work: Work;
  section: string;
  isModal?: boolean;
  imageLoadErrors: Set<string>;
  onImageError: (workId: string) => void;
  onImageLoad: (workId: string) => void;
}

const WorkImage: React.FC<WorkImageProps> = ({
  work,
  section,
  isModal = false,
  imageLoadErrors,
  onImageError,
  onImageLoad
}) => {
  const hasError = imageLoadErrors.has(work.id);
  const hasImage = work.image && work.image.trim() !== '';
  const sizeClass = isModal ? 'w-full h-full' : 'w-full h-full';
  
  if (hasImage && !hasError) {
    return (
      <img
        src={work.image}
        alt={work.title}
        className={`${sizeClass} ${isModal ? 'object-contain' : 'object-cover'} transition-transform duration-300 ${!isModal ? 'group-hover:scale-105' : ''}`}
        onError={() => onImageError(work.id)}
        onLoad={() => onImageLoad(work.id)}
      />
    );
  }
  
  // Fallback to icon
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

export default WorkImage;
