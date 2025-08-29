
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
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
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const { user, signOut, subscribed, subscriptionTier } = useAuth();
  const location = useLocation();
  const locale = getCurrentLocale();
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle modal accessibility and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle dropdown clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: t('nav.home'), path: `/${locale}`, key: 'home' },
    { name: t('nav.about'), path: `/${locale}/about`, key: 'about' }, 
    { 
      name: t('nav.projects'), 
      key: 'projects',
      isDropdown: true,
      items: [
        { name: t('nav.books'), path: `/${locale}/books`, key: 'books' },
        { name: t('nav.euCapitals'), path: `/${locale}/eu-capitals`, key: 'eu-capitals' },
        { name: t('nav.services'), path: `/${locale}/services`, key: 'services' },
        { name: t('nav.videos'), path: `/${locale}/videos`, key: 'videos' }
      ]
    },
    { name: t('nav.news'), path: `/${locale}/ai-news`, key: 'news' },
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
    
    // Handle projects dropdown items
    if (['books', 'eu-capitals', 'services', 'videos'].includes(itemKey)) {
      return location.pathname === `/${locale}/${itemKey}` || location.pathname === `/${itemKey}`;
    }
    
    // Handle news (formerly blog/ai-news)
    if (itemKey === 'news') {
      return location.pathname === `/${locale}/ai-news` || location.pathname === `/ai-news` || 
             location.pathname === `/${locale}/blog` || location.pathname === `/blog`;
    }
    
    // Handle other pages
    return location.pathname === `/${locale}/${itemKey}` || location.pathname === `/${itemKey}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[800] bg-parchment/95 backdrop-blur-sm border-b border-teal/50 shadow-sm transition-all duration-300 scroll-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to={`/${locale}`} className="flex items-center space-x-2 logo">
              <img
                src="/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png"
                alt="STEaM LOGIC Studio AB"
                loading="lazy"
                className="h-[32px] sm:h-[36px] md:h-[52px] gear"
              />
              <div className="font-playfair text-teal">
                <div className="text-xl leading-tight">STEaM LOGIC</div>
                <div className="text-sm opacity-90">Studio AB</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.key} className="relative" ref={item.isDropdown ? dropdownRef : undefined}>
                  {item.isDropdown ? (
                    <>
                      <button
                        onClick={() => setProjectsDropdownOpen(!projectsDropdownOpen)}
                        className={`font-inter font-medium transition-colors hover:text-brass flex items-center gap-1 ${
                          item.items?.some(subItem => isCurrentPage(subItem.key)) 
                            ? 'text-brass border-b-2 border-brass' 
                            : 'text-oxidized-teal'
                        }`}
                      >
                        {item.name as string}
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${projectsDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      {projectsDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-parchment border border-brass/30 rounded-lg shadow-lg z-50 backdrop-blur-sm">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.key}
                              to={subItem.path}
                              onClick={() => setProjectsDropdownOpen(false)}
                              className={`block px-4 py-3 font-inter transition-colors hover:bg-brass/10 first:rounded-t-lg last:rounded-b-lg ${
                                isCurrentPage(subItem.key) 
                                  ? 'text-brass bg-brass/5 border-l-4 border-brass' 
                                  : 'text-oxidized-teal hover:text-brass'
                              }`}
                            >
                              {subItem.name as string}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`font-inter font-medium transition-colors hover:text-brass ${
                        isCurrentPage(item.key) 
                          ? 'text-brass border-b-2 border-brass' 
                          : 'text-oxidized-teal'
                      }`}
                    >
                      {item.name as string}
                    </Link>
                  )}
                </div>
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
              className="md:hidden text-oxidized-teal hover:text-brass transition-all duration-300 touch-target flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X size={28} className="animate-in spin-in-90 duration-200" />
              ) : (
                <Settings size={28} className="animate-spin duration-[8s] hover:duration-[2s]" />
              )}
            </button>
          </div>
          
          {/* Mobile Modal Menu */}
          {isOpen && (
            <>
              {/* Scrim Overlay */}
              <div 
                className="fixed inset-0 bg-black/40 z-[900] md:hidden animate-in fade-in duration-150"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              
              {/* Modal Panel */}
              <div 
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobileMenuTitle"
                className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[min(90vw,320px)] max-h-[80vh] bg-white z-[1000] md:hidden rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 id="mobileMenuTitle" className="text-lg font-playfair text-oxidized-teal">
                    Menu
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-8 h-8 text-oxidized-teal hover:text-brass transition-colors rounded-full hover:bg-gray-100"
                    aria-label="Close navigation menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                  {/* Navigation Links */}
                  <nav className="flex flex-col p-4 space-y-2">
                    {navItems.map((item) => (
                      <div key={item.key}>
                        {item.isDropdown ? (
                          <>
                            <div className="flex items-center px-4 py-3 font-inter font-medium text-oxidized-teal">
                              {item.name as string}
                            </div>
                            <div className="ml-4 space-y-1">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.key}
                                  to={subItem.path}
                                  className={`flex items-center px-4 py-2 font-inter transition-all duration-200 rounded-lg text-sm ${
                                    isCurrentPage(subItem.key) 
                                      ? 'text-brass bg-brass/10 border-l-4 border-brass' 
                                      : 'text-oxidized-teal hover:text-brass hover:bg-gray-50'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name as string}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className={`flex items-center px-4 py-3 font-inter font-medium transition-all duration-200 rounded-lg ${
                              isCurrentPage(item.key) 
                                ? 'text-brass bg-brass/10 border-l-4 border-brass' 
                                : 'text-oxidized-teal hover:text-brass hover:bg-gray-50'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name as string}
                          </Link>
                        )}
                      </div>
                    ))}
                    
                    {/* Language Switcher */}
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <LanguageSwitcher />
                    </div>
                    
                    {/* User Authentication */}
                    {user ? (
                      <div className="space-y-4 pt-4 border-t border-gray-200 mt-4">
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
                          className="w-full border-brass text-brass hover:bg-brass hover:text-white"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          {t('nav.signOut')}
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-gray-200 mt-4">
                        <Button
                          onClick={() => {
                            setAuthModalOpen(true);
                            setIsOpen(false);
                          }}
                          className="w-full bg-brass hover:bg-brass-dark text-white"
                        >
                          <User className="w-4 h-4 mr-2" />
                          {t('nav.signIn')}
                        </Button>
                      </div>
                    )}
                  </nav>
                </div>
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
