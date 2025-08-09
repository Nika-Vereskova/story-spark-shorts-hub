
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { t } from '@/lib/i18n';
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
          <DialogTitle className="font-bold text-oxidized-teal text-2xl">
            {mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-oxidized-teal">{t('auth.email')}</Label>
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
            <Label htmlFor="password" className="text-oxidized-teal">{t('auth.password')}</Label>
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
            {loading ? t('auth.loading') : (mode === 'signin' ? t('auth.signIn') : t('auth.signUp'))}
          </Button>
        </form>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-brass hover:text-brass-dark underline"
          >
            {mode === 'signin' ? t('auth.needAccount') : t('auth.haveAccount')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
