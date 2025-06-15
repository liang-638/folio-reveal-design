
import React from 'react';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface WorkDetailModalProps {
  work: Work;
  onClose: () => void;
  renderWorkImage: (work: Work, isModal: boolean) => React.ReactNode;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({
  work,
  onClose,
  renderWorkImage,
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="max-w-5xl w-full bg-card rounded-lg overflow-hidden fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 max-h-[70vh] flex items-center justify-center bg-black/20">
            {renderWorkImage(work, true)}
          </div>
          <div className="p-4 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neon-blue">
              {work.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
              {work.description}
            </p>
            <button
              onClick={onClose}
              className="self-start px-4 md:px-6 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors text-sm md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailModal;
