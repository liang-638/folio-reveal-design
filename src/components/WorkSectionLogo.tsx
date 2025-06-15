
import React from 'react';

interface WorkSectionLogoProps {
  section: string;
  className?: string;
  style?: React.CSSProperties;
}

// 使用新版、無大面積空白的 logo
const LOGO_SRC = "/lovable-uploads/d8ec262d-205c-4c6e-8d42-b119d41cd899.png";

const WorkSectionLogo: React.FC<WorkSectionLogoProps> = ({ section, className = '', style }) => {
  if (section === 'game') {
    return (
      <img
        src={LOGO_SRC}
        alt="Game Design Logo"
        className={`object-contain w-full max-h-[500px] mx-auto drop-shadow-lg ${className}`}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxHeight: '500px',
          aspectRatio: 'auto 16/5', // 寬高比大致符合你的圖檔
          ...style,
        }}
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

