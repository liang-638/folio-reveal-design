
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGameDescription = () => {
  const [gameDescription, setGameDescription] = useState(
    'My game design projects focus on creating immersive experiences that combine compelling storytelling with innovative gameplay mechanics. Each project represents a unique exploration of interactive entertainment, from RPG adventures to puzzle platforms, emphasizing player engagement and visual excellence.'
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchGameDescription = async () => {
    try {
      const { data, error } = await supabase
        .from('profile_data')
        .select('game_description')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching game description:', error);
        return;
      }

      if (data?.game_description) {
        setGameDescription(data.game_description);
      }
    } catch (error) {
      console.error('Error fetching game description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGameDescription();

    // 設置即時更新
    const channel = supabase
      .channel('game-description-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profile_data',
        },
        () => {
          fetchGameDescription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    gameDescription,
    isLoading,
  };
};
