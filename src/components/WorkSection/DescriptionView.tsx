
import React from 'react';

interface DescriptionViewProps {
  section: string;
  gameDescription?: string;
}

const DescriptionView: React.FC<DescriptionViewProps> = ({ section, gameDescription }) => {
  return (
    <div className="slide-up p-4 md:p-12 flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-6 md:mb-8 text-neon-blue">
          {section === 'game' ? 'Game Design' : section}
        </h2>
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 md:p-8 border border-border">
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {gameDescription || 'Game design description will be placed here. This section introduces the core concepts and design philosophy behind the game projects.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionView;
