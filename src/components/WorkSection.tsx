import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Edit, Trash2, Upload, ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface WorkSectionProps {
  section: string;
  works: Work[];
  maxWorks?: number;
  hasDescription?: boolean;
  gameDescription?: string;
  onWorksUpdate?: (works: Omit<Work, 'sort_order'>[]) => void;
}

const WorkSection: React.FC<WorkSectionProps> = ({ 
  section, 
  works, 
  maxWorks = 4, 
  hasDescription = false,
  gameDescription,
  onWorksUpdate 
}) => {
  const [currentView, setCurrentView] = useState<'description' | 'works'>('description');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  const toggleView = () => {
    setCurrentView(prev => prev === 'description' ? 'works' : 'description');
  };

  const displayWorks = works.slice(0, maxWorks);

  const handleImageError = (workId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(workId));
  };

  const handleImageLoad = (workId: string) => {
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(workId);
      return newSet;
    });
  };

  const handleAddWork = () => {
    const newWork: Work = {
      id: Date.now().toString(),
      title: 'New Work',
      description: 'Enter description here...',
      image: ''
    };
    setEditingWork(newWork);
    setIsEditing(true);
  };

  const handleEditWork = (work: Work) => {
    setEditingWork({ ...work });
    setIsEditing(true);
  };

  const handleSaveWork = () => {
    if (editingWork && onWorksUpdate) {
      const existingIndex = works.findIndex(w => w.id === editingWork.id);
      let updatedWorks;
      
      if (existingIndex >= 0) {
        updatedWorks = [...works];
        updatedWorks[existingIndex] = editingWork;
      } else {
        updatedWorks = [...works, editingWork];
      }
      
      onWorksUpdate(updatedWorks);
    }
    setIsEditing(false);
    setEditingWork(null);
  };

  const handleDeleteWork = (workId: string) => {
    if (onWorksUpdate) {
      const updatedWorks = works.filter(w => w.id !== workId);
      onWorksUpdate(updatedWorks);
    }
  };

  const renderWorkImage = (work: Work, isModal = false) => {
    const hasError = imageLoadErrors.has(work.id);
    const hasImage = work.image && work.image.trim() !== '';
    const sizeClass = isModal ? 'w-full h-full' : 'w-full h-full';
    
    if (hasImage && !hasError) {
      return (
        <img
          src={work.image}
          alt={work.title}
          className={`${sizeClass} ${isModal ? 'object-contain' : 'object-cover'} transition-transform duration-300 ${!isModal ? 'group-hover:scale-105' : ''}`}
          onError={() => handleImageError(work.id)}
          onLoad={() => handleImageLoad(work.id)}
        />
      );
    }
    
    // Fallback to icon
    return (
      <div className={`${sizeClass} bg-gradient-to-br from-neon-blue/20 to-accent/20 flex items-center justify-center`}>
        <div className="text-4xl md:text-6xl opacity-50 group-hover:opacity-70 transition-opacity">
          {section === 'illustration' ? '🎨' :
           section === 'character' ? '👤' :
           section === 'game' ? '🎮' :
           section === 'animation' ? '🎬' :
           section === 'awards' ? '🏆' : '📁'}
        </div>
      </div>
    );
  };

  return (
    <div className="md:ml-64 min-h-screen bg-background relative">
      {/* Navigation arrows */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={toggleView}
          className="p-2 md:p-3 bg-card/80 backdrop-blur-sm rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-all duration-200"
        >
          {currentView === 'description' ? (
            <ChevronDown className="text-neon-blue" size={20} />
          ) : (
            <ChevronUp className="text-neon-blue" size={20} />
          )}
        </button>
      </div>

      {/* Description View (for Game Design) */}
      {hasDescription && currentView === 'description' && (
        <div className="slide-up p-4 md:p-12 flex items-center justify-center min-h-screen">
          <div className="max-w-3xl w-full">
            <h2 className="text-2xl md:text-4xl font-semibold text-center mb-6 md:mb-8 text-neon-blue">
              {section === 'game' ? 'Game Design' : section}
            </h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 md:p-8 border border-border">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {gameDescription || 'Game design description will be placed here. This section introduces the core concepts and design philosophy behind the game projects.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Works View */}
      {(!hasDescription || currentView === 'works') && (
        <div className="slide-down p-4 md:p-12 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-3xl font-semibold text-neon-blue capitalize">
                {section === 'illustration' ? 'Illustration Design' :
                 section === 'character' ? 'Character Design' :
                 section === 'game' ? 'Game Projects' :
                 section === 'animation' ? 'Animation Works' :
                 section === 'awards' ? 'Certificates & Awards' : section}
              </h2>
              
              <Button
                onClick={handleAddWork}
                className="flex items-center gap-2 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
                variant="outline"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Work</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {displayWorks.map((work) => (
                <div
                  key={work.id}
                  className="relative aspect-video bg-card/30 rounded-lg border border-border/50 cursor-pointer hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
                >
                  <div 
                    className="w-full h-full relative"
                    onClick={() => setSelectedWork(work)}
                  >
                    {renderWorkImage(work)}
                    
                    {/* Overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs md:text-sm text-white font-medium truncate">{work.title}</p>
                    </div>
                  </div>
                  
                  {/* Edit/Delete buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditWork(work);
                        }}
                        className="p-1 bg-neon-blue/20 rounded hover:bg-neon-blue/30 backdrop-blur-sm"
                      >
                        <Edit size={14} className="text-neon-blue" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWork(work.id);
                        }}
                        className="p-1 bg-red-500/20 rounded hover:bg-red-500/30 backdrop-blur-sm"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Work Detail Modal */}
      {selectedWork && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedWork(null)}
        >
          <div 
            className="max-w-5xl w-full bg-card rounded-lg overflow-hidden fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Image - Now takes up more space and shows full image */}
              <div className="lg:col-span-2 max-h-[70vh] flex items-center justify-center bg-black/20">
                {renderWorkImage(selectedWork, true)}
              </div>
              
              {/* Details */}
              <div className="p-4 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neon-blue">{selectedWork.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                  {selectedWork.description}
                </p>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="self-start px-4 md:px-6 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors text-sm md:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Work Modal */}
      {isEditing && editingWork && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-neon-blue">
              {works.find(w => w.id === editingWork.id) ? 'Edit Work' : 'Add New Work'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editingWork.title}
                  onChange={(e) => setEditingWork({...editingWork, title: e.target.value})}
                  className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={editingWork.description}
                  onChange={(e) => setEditingWork({...editingWork, description: e.target.value})}
                  rows={3}
                  className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cloudinary Image URL</label>
                <input
                  type="url"
                  value={editingWork.image}
                  onChange={(e) => setEditingWork({...editingWork, image: e.target.value})}
                  placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
                  className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  貼上您的 Cloudinary 圖片 URL
                </p>
              </div>

              {/* Image Preview */}
              {editingWork.image && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Preview</label>
                  <div className="w-full h-32 bg-card border border-border rounded-lg overflow-hidden">
                    <img
                      src={editingWork.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => {}}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleSaveWork}
                className="flex-1 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSection;
