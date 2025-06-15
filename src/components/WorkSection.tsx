
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import NavigationButton from './WorkSection/NavigationButton';
import DescriptionView from './WorkSection/DescriptionView';
import WorkGrid from './WorkSection/WorkGrid';
import WorkModal from './WorkSection/WorkModal';
import EditWorkModal from './WorkSection/EditWorkModal';

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
  const { isAuthenticated } = useAuth();

  const toggleView = () => {
    setCurrentView(prev => prev === 'description' ? 'works' : 'description');
  };

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

  return (
    <div className="md:ml-64 min-h-screen bg-background relative">
      {/* Navigation arrows */}
      <NavigationButton currentView={currentView} onToggle={toggleView} />

      {/* Description View (for Game Design) */}
      {hasDescription && currentView === 'description' && (
        <DescriptionView section={section} gameDescription={gameDescription} />
      )}

      {/* Works View */}
      {(!hasDescription || currentView === 'works') && (
        <WorkGrid
          section={section}
          works={works}
          maxWorks={maxWorks}
          imageLoadErrors={imageLoadErrors}
          onImageError={handleImageError}
          onImageLoad={handleImageLoad}
          onWorkClick={setSelectedWork}
          onEditWork={handleEditWork}
          onDeleteWork={handleDeleteWork}
          onAddWork={handleAddWork}
        />
      )}

      {/* Work Detail Modal */}
      {selectedWork && (
        <WorkModal
          work={selectedWork}
          section={section}
          imageLoadErrors={imageLoadErrors}
          onImageError={handleImageError}
          onImageLoad={handleImageLoad}
          onClose={() => setSelectedWork(null)}
        />
      )}

      {/* Edit Work Modal - only show for authenticated users */}
      {isEditing && editingWork && isAuthenticated && (
        <EditWorkModal
          work={editingWork}
          works={works}
          onSave={handleSaveWork}
          onCancel={() => setIsEditing(false)}
          onWorkChange={setEditingWork}
        />
      )}
    </div>
  );
};

export default WorkSection;
