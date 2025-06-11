
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileData {
  name: string;
  title: string;
  aboutMe: string[];
  email: string;
  website: string;
  location: string;
}

export const useSupabaseProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Yu-Fang',
    title: 'Creative Designer',
    aboutMe: [
      'Hello! I\'m Yu-Fang, a passionate creative designer with expertise in illustration, character design, game development, and animation.',
      'I specialize in bringing imaginative concepts to life through digital art, creating compelling characters and immersive visual experiences that tell stories and connect with audiences.',
      'My work spans across various mediums including digital illustration, game design, character development, and motion graphics. I\'m constantly exploring new techniques and pushing creative boundaries.'
    ],
    email: 'yufang@example.com',
    website: 'yufang-design.com',
    location: 'Taiwan'
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from('profile_data')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile data:', error);
        return;
      }

      if (data) {
        setProfileData({
          name: data.name,
          title: data.title,
          aboutMe: data.about_me,
          email: data.email,
          website: data.website,
          location: data.location,
        });
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();

    // 設置即時更新
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profile_data',
        },
        () => {
          fetchProfileData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      const updateData = {
        name: data.name || profileData.name,
        title: data.title || profileData.title,
        about_me: data.aboutMe || profileData.aboutMe,
        email: data.email || profileData.email,
        website: data.website || profileData.website,
        location: data.location || profileData.location,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profile_data')
        .update(updateData)
        .limit(1);

      if (error) {
        console.error('Error updating profile data:', error);
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return {
    profileData,
    updateProfile,
    isLoading,
  };
};
