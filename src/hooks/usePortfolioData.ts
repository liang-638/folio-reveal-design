
import { useState, useEffect } from 'react';
import { portfolioData as initialData } from '../data/portfolioData';

interface Work {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface PortfolioData {
  illustration: Work[];
  character: Work[];
  game: Work[];
  awards: Work[];
}

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Ensure all required sections exist
        return {
          illustration: parsedData.illustration || initialData.illustration,
          character: parsedData.character || initialData.character,
          game: parsedData.game || initialData.game,
          awards: parsedData.awards || initialData.awards,
        };
      } catch (error) {
        console.error('Error parsing saved portfolio data:', error);
        return {
          illustration: initialData.illustration,
          character: initialData.character,
          game: initialData.game,
          awards: initialData.awards,
        };
      }
    }
    return {
      illustration: initialData.illustration,
      character: initialData.character,
      game: initialData.game,
      awards: initialData.awards,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    } catch (error) {
      console.error('Error saving portfolio data to localStorage:', error);
    }
  }, [portfolioData]);

  const updateSection = (section: keyof PortfolioData, works: Work[]) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: works
    }));
  };

  return {
    portfolioData,
    updateSection
  };
};
