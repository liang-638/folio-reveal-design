
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NavigationButtonProps {
  currentView: 'description' | 'works';
  onToggle: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ currentView, onToggle }) => {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30">
      <button
        onClick={onToggle}
        className="p-2 md:p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
      >
        {currentView === 'description' ? (
          <ChevronDown className="text-neon-blue" size={20} />
        ) : (
          <ChevronUp className="text-neon-blue" size={20} />
        )}
      </button>
    </div>
  );
};

export default NavigationButton;
