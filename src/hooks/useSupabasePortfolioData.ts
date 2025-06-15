
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast'; // 新增：引入 toast

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
  const { toast } = useToast(); // 新增：獲取 toast 方法

  const fetchPortfolioData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_works')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching portfolio data:', error);
        toast({
          title: '取得資料失敗',
          description: error.message || '無法從資料庫獲取作品資料。',
          variant: 'destructive',
        });
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
    } catch (error: any) {
      console.error('Error fetching portfolio data:', error);
      toast({
        title: '取得資料失敗',
        description: error.message || '無法從資料庫獲取作品資料。',
        variant: 'destructive',
      });
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
      const { error: deleteError } = await supabase
        .from('portfolio_works')
        .delete()
        .eq('section', section);

      if (deleteError) {
        console.error('Error deleting old works:', deleteError);
        toast({
          title: '作品刪除失敗',
          description: deleteError.message || '無法刪除原有作品',
          variant: 'destructive',
        });
        return;
      }

      // 添加新的作品
      const worksToInsert = works.map((work, index) => ({
        section,
        title: work.title,
        description: work.description,
        image: work.image,
        sort_order: index + 1,
      }));

      if (worksToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('portfolio_works')
          .insert(worksToInsert);

        if (insertError) {
          console.error('Error updating portfolio data:', insertError);
          toast({
            title: '作品儲存失敗',
            description: insertError.message || '作品新增過程遇到錯誤',
            variant: 'destructive',
          });
          return;
        }
      }

      toast({
        title: '成功同步作品',
        description: '已將更動資料儲存到後端',
        variant: 'default',
      });

      // 實作增刪改後，立即獲取一次最新資料
      await fetchPortfolioData();
    } catch (error: any) {
      console.error('Error updating portfolio data:', error);
      toast({
        title: '作品同步失敗',
        description: error.message || '資料同步過程遇到未知錯誤',
        variant: 'destructive',
      });
    }
  };

  return {
    portfolioData,
    updateSection,
    isLoading,
  };
};

