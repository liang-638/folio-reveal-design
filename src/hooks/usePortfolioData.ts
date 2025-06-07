
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
  animation: Work[];
  awards: Work[];
}

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
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
