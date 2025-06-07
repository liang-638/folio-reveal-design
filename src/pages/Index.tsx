
import React, { useState } from 'react';
import CoverPage from '../components/CoverPage';
import Sidebar from '../components/Sidebar';
import InfoSection from '../components/InfoSection';
import WorkSection from '../components/WorkSection';
import { portfolioData, gameDescription } from '../data/portfolioData';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [activeSection, setActiveSection] = useState('info');

  const handleEnter = () => {
    setShowPortfolio(true);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  if (!showPortfolio) {
    return <CoverPage onEnter={handleEnter} />;
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
        />
      )}
      
      {activeSection === 'character' && (
        <WorkSection 
          section="character" 
          works={portfolioData.character}
          maxWorks={6}
        />
      )}
      
      {activeSection === 'game' && (
        <WorkSection 
          section="game" 
          works={portfolioData.game}
          maxWorks={4}
          hasDescription={true}
          gameDescription={gameDescription}
        />
      )}
      
      {activeSection === 'animation' && (
        <WorkSection 
          section="animation" 
          works={portfolioData.animation}
          maxWorks={2}
        />
      )}
      
      {activeSection === 'awards' && (
        <WorkSection 
          section="awards" 
          works={portfolioData.awards}
          maxWorks={4}
        />
      )}
    </div>
  );
};

export default Index;
