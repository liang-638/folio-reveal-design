
import React from 'react';

interface WorkSectionLogoProps {
  section: string;
  className?: string;
  style?: React.CSSProperties;
}

const LOGO_SRC = "/lovable-uploads/c72f66de-4674-4abd-a8d7-05bdd0e80c54.png";

const WorkSectionLogo: React.FC<WorkSectionLogoProps> = ({ section, className = '', style }) => {
  if (section === 'game') {
    return (
      <img
        src={LOGO_SRC}
        alt="Game Design Logo"
        className={`object-contain drop-shadow-lg ${className}`}
        style={style}
      />
    );
  }
  return (
    <h2 className={`text-neon-blue font-semibold capitalize ${className}`}>
      {section === 'illustration'
        ? 'Illustration Design'
        : section === 'character'
        ? 'Character Design'
        : section === 'game'
        ? 'Game Projects'
        : section === 'animation'
        ? 'Animation Works'
        : section === 'awards'
        ? 'Certificates & Awards'
        : section}
    </h2>
  );
};

export default WorkSectionLogo;
