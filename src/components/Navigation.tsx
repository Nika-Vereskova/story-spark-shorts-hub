
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import LanguageSwitcher from './LanguageSwitcher';
import { t, getCurrentLocale } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  currentPage?: string;
}

const Navigation = ({ currentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut, subscribed, subscriptionTier } = useAuth();
  const location = useLocation();
  const locale = getCurrentLocale();
  const isMobile = useIsMobile();

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
            <Link 
              to={`/${locale}`} 
              className="flex items-center space-x-2 logo focus:ring-4 focus:ring-brass/50 rounded-lg p-1 focus:outline-none"
              aria-label="STEaM LOGIC Studio AB - Return to homepage"
            >
              <picture>
                <source 
                  srcSet="/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.webp" 
                  type="image/webp"
                />
                <img
                  src="/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png"
                  alt="STEaM LOGIC Studio AB navigation logo - Steampunk gear symbolizing innovation and precision in AI consulting"
                  loading="lazy"
                  className="h-[32px] sm:h-[36px] md:h-[52px] gear"
                  width="52"
                  height="52"
                />
              </picture>
              <div className="font-playfair text-teal">
                <div className="text-xl leading-tight">STEaM LOGIC</div>
                <div className="text-sm opacity-90">Studio AB</div>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`font-inter font-medium transition-colors hover:text-brass focus:text-brass focus:ring-2 focus:ring-brass/50 rounded px-2 py-1 focus:outline-none ${
                    isCurrentPage(item.key) 
                      ? 'text-brass border-b-2 border-brass' 
                      : 'text-oxidized-teal'
                  }`}
                  aria-current={isCurrentPage(item.key) ? 'page' : undefined}
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
                    className="border-brass text-brass hover:bg-brass hover:text-parchment focus:ring-4 focus:ring-brass/50 focus:outline-none"
                    aria-label="Sign out of your account"
                  >
                    <LogOut className="w-4 h-4 mr-1" aria-hidden="true" />
                    {t('nav.signOut')}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-brass hover:bg-brass-dark text-parchment focus:ring-4 focus:ring-brass/50 focus:outline-none"
                  aria-label="Sign in to your account"
                >
                  <User className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('nav.signIn')}
                </Button>
              )}
            </nav>

            <button
              className="md:hidden text-oxidized-teal hover:text-brass transition-all duration-300 touch-target flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X size={28} className="animate-in spin-in-90 duration-200" />
              ) : (
                <Settings size={28} className="animate-spin duration-[8s] hover:duration-[2s]" />
              )}
            </button>
          </div>
          
          {/* Mobile Drawer Menu */}
          {isOpen && (
            <>
              {/* Backdrop Overlay */}
              <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              
              {/* Drawer Panel */}
              <div className="fixed inset-y-0 left-0 w-[88vw] max-w-sm bg-parchment/96 backdrop-blur-md z-50 md:hidden shadow-2xl animate-in slide-in-from-left duration-300">
                {/* Steam Animation Background */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  <Settings className="absolute top-10 right-10 w-20 h-20 text-brass animate-spin" style={{ animationDuration: '15s' }} />
                  <Settings className="absolute bottom-20 left-10 w-16 h-16 text-oxidized-teal animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                </div>
                
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="touch-target flex items-center justify-center text-oxidized-teal hover:text-brass transition-colors rounded-full"
                    aria-label="Close navigation menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Navigation Links */}
                <nav className="flex flex-col px-6 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.path}
                      className={`touch-target flex items-center px-4 py-3 font-inter font-medium transition-all duration-200 rounded-lg ${
                        isCurrentPage(item.key) 
                          ? 'text-brass bg-brass/10 border-l-4 border-brass' 
                          : 'text-oxidized-teal hover:text-brass hover:bg-brass/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name as string}
                    </Link>
                  ))}
                  
                  {/* Language Switcher */}
                  <div className="pt-6 border-t border-brass/20">
                    <LanguageSwitcher />
                  </div>
                  
                  {/* User Authentication */}
                  {user ? (
                    <div className="space-y-4 pt-6 border-t border-brass/20">
                      <div className="text-oxidized-teal text-sm flex items-center px-4">
                        <User className="w-4 h-4 text-brass mr-3" />
                        <div>
                          <div>{user.email}</div>
                          {subscribed && (
                            <div className="text-brass text-xs">
                              ({subscriptionTier})
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="default"
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full border-brass text-brass hover:bg-brass hover:text-parchment touch-target"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('nav.signOut')}
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-6 border-t border-brass/20">
                      <Button
                        onClick={() => {
                          setAuthModalOpen(true);
                          setIsOpen(false);
                        }}
                        className="w-full bg-brass hover:bg-brass-dark text-parchment touch-target"
                      >
                        <User className="w-4 h-4 mr-2" />
                        {t('nav.signIn')}
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            </>
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
