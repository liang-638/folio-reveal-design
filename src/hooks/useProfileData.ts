
import { useState, useEffect } from 'react';

interface ProfileData {
  name: string;
  title: string;
  aboutMe: string[];
  email: string;
  website: string;
  location: string;
}

const defaultProfileData: ProfileData = {
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
};

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const savedData = localStorage.getItem('profileData');
    return savedData ? JSON.parse(savedData) : defaultProfileData;
  });

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
  };

  return {
    profileData,
    updateProfile
  };
};
