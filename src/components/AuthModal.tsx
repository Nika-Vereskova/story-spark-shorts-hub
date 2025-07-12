
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-parchment border-2 border-brass">
        <DialogHeader>
          <DialogTitle className="text-oxidized-teal font-playfair text-2xl">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-oxidized-teal font-inter">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-parchment/50 border-brass text-oxidized-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-oxidized-teal font-inter">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-parchment/50 border-brass text-oxidized-teal"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brass hover:bg-brass-dark text-parchment"
          >
            {loading ? 'Loading...' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-brass hover:text-brass-dark underline font-inter"
          >
            {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
