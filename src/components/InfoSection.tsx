import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Edit, Save, X } from 'lucide-react';
import { useSupabaseProfileData } from '../hooks/useSupabaseProfileData';
import { useAuth } from '../hooks/useAuth';
import ProtectedComponent from './ProtectedComponent';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';

const InfoSection: React.FC = () => {
  const [currentView, setCurrentView] = useState<'profile' | 'skills'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, updateProfile, isLoading } = useSupabaseProfileData();
  const { isAuthenticated } = useAuth();
  const [editData, setEditData] = useState(profileData);

  const toggleView = () => {
    setCurrentView(prev => prev === 'profile' ? 'skills' : 'profile');
    setIsEditing(false);
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <div className="ml-64 min-h-screen bg-background flex items-center justify-center">
        <div className="text-neon-blue text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="ml-64 min-h-screen bg-background relative">
      {/* Navigation arrows */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={toggleView}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
        >
          {currentView === 'profile' ? (
            <ChevronDown className="text-neon-blue" size={24} />
          ) : (
            <ChevronUp className="text-neon-blue" size={24} />
          )}
        </button>
      </div>

      {/* Edit button - only show for authenticated users */}
      {currentView === 'profile' && (
        <ProtectedComponent>
          <div className="fixed right-8 top-20 z-30">
            {!isEditing ? (
              <button
                onClick={handleEditStart}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
              >
                <Edit className="text-neon-blue" size={20} />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="p-3 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30 hover:bg-green-500/30 transition-all duration-200"
                >
                  <Save className="text-green-500" size={20} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-3 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all duration-200"
                >
                  <X className="text-red-500" size={20} />
                </button>
              </div>
            )}
          </div>
        </ProtectedComponent>
      )}

      {/* Profile View */}
      {currentView === 'profile' && (
        <div className="slide-up p-6 md:p-12 flex items-center justify-center min-h-screen">
          <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Avatar and Name */}
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto lg:mx-0 mb-6 relative">
                <div className="gradient-border rounded-full">
                  <div className="gradient-border-inner rounded-full p-2">
                    <div className="w-full h-full bg-gradient-to-br from-neon-blue to-blue-500 rounded-full flex items-center justify-center">
                      <div className="text-4xl md:text-6xl">😊</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {!isEditing ? (
                <>
                  <h1 className="text-3xl md:text-4xl font-light mb-2">
                    <span className="text-neon-blue">{profileData.name}</span>
                  </h1>
                  <p className="text-blue-400 text-lg md:text-xl">{profileData.title}</p>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm text-muted-foreground">Name</Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="text-sm text-muted-foreground">Title</Label>
                    <Input
                      id="title"
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Biography */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">About Me</h2>
              
              {!isEditing ? (
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                  {profileData.aboutMe.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {editData.aboutMe.map((paragraph, index) => (
                    <div key={index}>
                      <Label htmlFor={`paragraph-${index}`} className="text-sm text-muted-foreground">
                        Paragraph {index + 1}
                      </Label>
                      <Textarea
                        id={`paragraph-${index}`}
                        value={paragraph}
                        onChange={(e) => {
                          const newAboutMe = [...editData.aboutMe];
                          newAboutMe[index] = e.target.value;
                          setEditData({...editData, aboutMe: newAboutMe});
                        }}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Skills View */}
      {currentView === 'skills' && (
        <div className="slide-down p-6 md:p-12 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">Skills & Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Design Software */}
              <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-neon-blue">Design Software</h3>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { name: 'AI', color: 'border-yellow-500 text-yellow-500' },
                    { name: 'PS', color: 'border-blue-500 text-blue-500' },
                    { name: 'AE', color: 'border-blue-400 text-blue-400' },
                    { name: 'PR', color: 'border-blue-300 text-blue-300' },
                    { name: 'FL', color: 'border-gray-400 text-gray-400' },
                    { name: 'C4D', color: 'border-orange-500 text-orange-500' },
                  ].map((tool) => (
                    <div
                      key={tool.name}
                      className={`aspect-square border-2 ${tool.color} rounded-lg flex items-center justify-center text-sm md:text-lg font-bold`}
                    >
                      {tool.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-neon-blue">Contact</h3>
                
                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span className="text-muted-foreground text-sm md:text-base">Email: {profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-muted-foreground text-sm md:text-base">Portfolio: {profileData.website}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span className="text-muted-foreground text-sm md:text-base">Location: {profileData.location}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
                      <Input
                        id="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-sm text-muted-foreground">Website</Label>
                      <Input
                        id="website"
                        value={editData.website}
                        onChange={(e) => setEditData({...editData, website: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-sm text-muted-foreground">Location</Label>
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Login Link for Non-Authenticated Users */}
            <ProtectedComponent
              fallback={
                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">Want to edit this portfolio?</p>
                  <Button 
                    onClick={() => window.location.href = '/auth'}
                    className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
                  >
                    Admin Login
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSection;
