
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { LogOut, Shield } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Shield size={16} className="text-neon-blue" />
          <span className="text-muted-foreground">Admin: {user?.email}</span>
        </div>
        <Button
          onClick={handleSignOut}
          size="sm"
          variant="outline"
          className="h-8 px-3"
        >
          <LogOut size={14} className="mr-1" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
