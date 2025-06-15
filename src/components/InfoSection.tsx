import React, { useState } from 'react';
import { useSupabaseProfileData } from '../hooks/useSupabaseProfileData';
import { Button } from './ui/button';
import { Edit, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ProtectedComponent from './ProtectedComponent';

const InfoSection: React.FC = () => {
  const { profileData, updateProfileData, isLoading } = useSupabaseProfileData();
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    title: '',
    email: '',
    website: '',
    location: '',
    about_me: ['']
  });

  React.useEffect(() => {
    if (profileData) {
      setEditData({
        name: profileData.name || '',
        title: profileData.title || '',
        email: profileData.email || '',
        website: profileData.website || '',
        location: profileData.location || '',
        about_me: profileData.about_me || ['']
      });
    }
  }, [profileData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (profileData) {
      setEditData({
        name: profileData.name || '',
        title: profileData.title || '',
        email: profileData.email || '',
        website: profileData.website || '',
        location: profileData.location || '',
        about_me: profileData.about_me || ['']
      });
    }
    setIsEditing(false);
  };

  const updateAboutParagraph = (index: number, value: string) => {
    const newAbout = [...editData.about_me];
    newAbout[index] = value;
    setEditData({ ...editData, about_me: newAbout });
  };

  const addAboutParagraph = () => {
    setEditData({ ...editData, about_me: [...editData.about_me, ''] });
  };

  const removeAboutParagraph = (index: number) => {
    if (editData.about_me.length > 1) {
      const newAbout = editData.about_me.filter((_, i) => i !== index);
      setEditData({ ...editData, about_me: newAbout });
    }
  };

  if (isLoading) {
    return (
      <div className="md:ml-64 min-h-screen bg-background flex items-center justify-center">
        <div className="text-neon-blue text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="md:ml-64 min-h-screen bg-background">
      <div className="p-4 md:p-12 max-w-4xl mx-auto">
        {/* Edit Button - Only show for authenticated users */}
        <ProtectedComponent>
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
                variant="outline"
              >
                <Edit size={16} />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                  variant="outline"
                >
                  <Save size={16} />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                  variant="outline"
                >
                  <X size={16} />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </ProtectedComponent>

        {/* Profile Content */}
        <div className="space-y-8 md:space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="text-2xl md:text-4xl font-bold text-center bg-transparent border-b border-neon-blue/50 focus:border-neon-blue outline-none text-neon-blue w-full max-w-md mx-auto block"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="text-lg md:text-xl text-center bg-transparent border-b border-muted-foreground/50 focus:border-neon-blue outline-none text-muted-foreground w-full max-w-lg mx-auto block mt-2"
                  placeholder="Your Title"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-4xl font-bold text-neon-blue">
                  {profileData?.name || 'Designer Name'}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {profileData?.title || 'Digital Artist & Game Designer'}
                </p>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-card/30 rounded-lg p-4 md:p-8 border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-neon-blue">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
                  />
                ) : (
                  <p className="text-base md:text-lg">{profileData?.email || 'contact@example.com'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.website}
                    onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
                  />
                ) : (
                  <p className="text-base md:text-lg">{profileData?.website || 'www.portfolio.com'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
                  />
                ) : (
                  <p className="text-base md:text-lg">{profileData?.location || 'Location'}</p>
                )}
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="bg-card/30 rounded-lg p-4 md:p-8 border border-border/50">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-neon-blue">About Me</h2>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  {editData.about_me.map((paragraph, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={paragraph}
                        onChange={(e) => updateAboutParagraph(index, e.target.value)}
                        rows={3}
                        className="flex-1 p-3 bg-background border border-border rounded-lg focus:border-neon-blue outline-none resize-none"
                        placeholder={`Paragraph ${index + 1}`}
                      />
                      {editData.about_me.length > 1 && (
                        <button
                          onClick={() => removeAboutParagraph(index)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={addAboutParagraph}
                    className="mt-4 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
                    variant="outline"
                  >
                    Add Paragraph
                  </Button>
                </>
              ) : (
                profileData?.about_me?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                )) || (
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    Welcome to my creative portfolio! I am a passionate digital artist and game designer with expertise in illustration, character design, and interactive media.
                  </p>
                )
              )}
            </div>
          </div>

          {/* Login Link for Non-Authenticated Users */}
          <ProtectedComponent
            fallback={
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Want to edit your profile?</p>
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
                >
                  Admin Login
                </Button>
              </div>
            }
          >
            <></>
          </ProtectedComponent>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
