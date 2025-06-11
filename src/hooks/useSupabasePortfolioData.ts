
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  sort_order: number;
}

interface PortfolioData {
  illustration: Work[];
  character: Work[];
  game: Work[];
  awards: Work[];
}

export const useSupabasePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    illustration: [],
    character: [],
    game: [],
    awards: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolioData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_works')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching portfolio data:', error);
        return;
      }

      const groupedData: PortfolioData = {
        illustration: [],
        character: [],
        game: [],
        awards: [],
      };

      data?.forEach((work) => {
        if (work.section in groupedData) {
          groupedData[work.section as keyof PortfolioData].push({
            id: work.id,
            title: work.title,
            description: work.description,
            image: work.image,
            sort_order: work.sort_order,
          });
        }
      });

      setPortfolioData(groupedData);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();

    // 設置即時更新
    const channel = supabase
      .channel('portfolio-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_works',
        },
        () => {
          fetchPortfolioData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateSection = async (section: keyof PortfolioData, works: Omit<Work, 'sort_order'>[]) => {
    try {
      // 先刪除該分類的所有作品
      await supabase
        .from('portfolio_works')
        .delete()
        .eq('section', section);

      // 添加新的作品
      const worksToInsert = works.map((work, index) => ({
        section,
        title: work.title,
        description: work.description,
        image: work.image,
        sort_order: index + 1,
      }));

      if (worksToInsert.length > 0) {
        const { error } = await supabase
          .from('portfolio_works')
          .insert(worksToInsert);

        if (error) {
          console.error('Error updating portfolio data:', error);
        }
      }
    } catch (error) {
      console.error('Error updating portfolio data:', error);
    }
  };

  return {
    portfolioData,
    updateSection,
    isLoading,
  };
};
