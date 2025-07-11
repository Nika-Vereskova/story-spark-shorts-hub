
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const { signOut, user } = useAuth();

  if (!user) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={signOut}
      className="text-oxidized-teal hover:bg-brass/10 hover:text-brass"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
};

export default LogoutButton;
