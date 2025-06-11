
import React, { useState } from 'react';
import CoverPage from '../components/CoverPage';
import Sidebar from '../components/Sidebar';
import InfoSection from '../components/InfoSection';
import WorkSection from '../components/WorkSection';
import { useSupabasePortfolioData } from '../hooks/useSupabasePortfolioData';
import { useGameDescription } from '../hooks/useGameDescription';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [activeSection, setActiveSection] = useState('info');
  const { portfolioData, updateSection, isLoading: portfolioLoading } = useSupabasePortfolioData();
  const { gameDescription, isLoading: gameDescLoading } = useGameDescription();

  const handleEnter = () => {
    setShowPortfolio(true);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  if (!showPortfolio) {
    return <CoverPage onEnter={handleEnter} />;
  }

  if (portfolioLoading || gameDescLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-neon-blue text-lg">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {activeSection === 'info' && <InfoSection />}
      
      {activeSection === 'illustration' && (
        <WorkSection 
          section="illustration" 
          works={portfolioData.illustration}
          maxWorks={6}
          onWorksUpdate={(works) => updateSection('illustration', works)}
        />
      )}
      
      {activeSection === 'character' && (
        <WorkSection 
          section="character" 
          works={portfolioData.character}
          maxWorks={6}
          onWorksUpdate={(works) => updateSection('character', works)}
        />
      )}
      
      {activeSection === 'game' && (
        <WorkSection 
          section="game" 
          works={portfolioData.game}
          maxWorks={4}
          hasDescription={true}
          gameDescription={gameDescription}
          onWorksUpdate={(works) => updateSection('game', works)}
        />
      )}
      
      {activeSection === 'awards' && (
        <WorkSection 
          section="awards" 
          works={portfolioData.awards}
          maxWorks={4}
          onWorksUpdate={(works) => updateSection('awards', works)}
        />
      )}
    </div>
  );
};

export default Index;
