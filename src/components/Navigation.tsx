
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import LanguageSwitcher from './LanguageSwitcher';
import { t, getCurrentLocale } from '@/lib/i18n';

interface NavigationProps {
  currentPage?: string;
}

const Navigation = ({ currentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut, subscribed, subscriptionTier } = useAuth();
  const location = useLocation();
  const locale = getCurrentLocale();

  const navItems = [
    { name: t('nav.home'), path: `/${locale}`, key: 'home' },
    { name: t('nav.about'), path: `/${locale}/about`, key: 'about' }, 
    { name: t('nav.services'), path: `/${locale}/services`, key: 'services' },
    { name: t('nav.books'), path: `/${locale}/books`, key: 'books' },
    { name: t('nav.videos'), path: `/${locale}/videos`, key: 'videos' },
    { name: t('nav.blog'), path: `/${locale}/blog`, key: 'blog' },
    { name: t('nav.contact'), path: `/${locale}/contact`, key: 'contact' },
  ];

  // Add scroll listener for border effect
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.scroll-border');
      if (nav) {
        if (window.scrollY > 0) {
          nav.classList.add('border-b-2');
          nav.classList.remove('border-b');
        } else {
          nav.classList.add('border-b');
          nav.classList.remove('border-b-2');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrentPage = (itemKey: string) => {
    if (currentPage) {
      return currentPage === itemKey || location.pathname === `/${locale}/${itemKey}` || (itemKey === 'home' && location.pathname === `/${locale}`);
    }
    
    // Handle home page - both root and locale-prefixed
    if (itemKey === 'home') {
      return location.pathname === '/' || location.pathname === `/${locale}` || location.pathname === `/${locale}/`;
    }
    
    // Handle other pages
    return location.pathname === `/${locale}/${itemKey}` || location.pathname === `/${itemKey}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-sm border-b border-teal/50 shadow-sm transition-all duration-300 scroll-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to={`/${locale}`} className="flex items-center space-x-3 logo">
              <img
                src="/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png"
                alt="STEaM LOGIC Studio AB"
                loading="lazy"
                className="h-[32px] sm:h-[36px] md:h-[52px] gear"
              />
              <img
                src="/lovable-uploads/64f9c8ed-7532-43d6-a694-85153b7cae57.png"
                alt="STEaM LOGIC Studio AB"
                loading="lazy"
                className="h-[28px] sm:h-[32px] md:h-[48px] object-contain"
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`font-inter font-medium transition-colors hover:text-brass ${
                    isCurrentPage(item.key) 
                      ? 'text-brass border-b-2 border-brass' 
                      : 'text-oxidized-teal'
                  }`}
                >
                  {item.name as string}
                </Link>
              ))}
              
              <LanguageSwitcher />
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-brass" />
                    <span className="text-oxidized-teal text-sm">
                      {user.email}
                      {subscribed && (
                        <span className="ml-2 text-brass text-xs">
                          ({subscriptionTier})
                        </span>
                      )}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={signOut}
                    className="border-brass text-brass hover:bg-brass hover:text-parchment"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    {t('nav.signOut')}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-brass hover:bg-brass-dark text-parchment"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.signIn')}
                </Button>
              )}
            </div>

            <button
              className="md:hidden text-oxidized-teal hover:text-brass transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-brass/30">
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`font-inter font-medium transition-colors hover:text-brass ${
                      isCurrentPage(item.key) ? 'text-brass' : 'text-oxidized-teal'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name as string}
                  </Link>
                ))}
                
                <div className="pt-2 border-t border-brass/30">
                  <LanguageSwitcher />
                </div>
                
                {user ? (
                  <div className="space-y-2 pt-2 border-t border-brass/30">
                    <div className="text-oxidized-teal text-sm flex items-center">
                      <User className="w-4 h-4 text-brass mr-2" />
                      {user.email}
                      {subscribed && (
                        <span className="ml-2 text-brass text-xs">
                          ({subscriptionTier})
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={signOut}
                      className="border-brass text-brass hover:bg-brass hover:text-parchment"
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      {t('nav.signOut')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="bg-brass hover:bg-brass-dark text-parchment"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('nav.signIn')}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
