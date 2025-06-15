
import React from 'react';
import { Button } from '../ui/button';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface EditWorkModalProps {
  work: Work;
  works: Work[];
  onSave: () => void;
  onCancel: () => void;
  onWorkChange: (work: Work) => void;
}

const EditWorkModal: React.FC<EditWorkModalProps> = ({
  work,
  works,
  onSave,
  onCancel,
  onWorkChange
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-neon-blue">
          {works.find(w => w.id === work.id) ? 'Edit Work' : 'Add New Work'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={work.title}
              onChange={(e) => onWorkChange({...work, title: e.target.value})}
              className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={work.description}
              onChange={(e) => onWorkChange({...work, description: e.target.value})}
              rows={3}
              className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Cloudinary Image URL</label>
            <input
              type="url"
              value={work.image}
              onChange={(e) => onWorkChange({...work, image: e.target.value})}
              placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
              className="w-full p-2 bg-background border border-border rounded-lg focus:border-neon-blue outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste your Cloudinary image URL
            </p>
          </div>

          {/* Image Preview */}
          {work.image && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Preview</label>
              <div className="w-full h-32 bg-card border border-border rounded-lg overflow-hidden">
                <img
                  src={work.image}
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
            onClick={onSave}
            className="flex-1 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border border-neon-blue/30"
          >
            Save
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditWorkModal;
