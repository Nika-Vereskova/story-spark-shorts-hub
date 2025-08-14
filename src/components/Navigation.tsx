import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerTrigger
} from '@/components/ui/drawer';
import AuthModal from './AuthModal';
import LanguageSwitcher from './LanguageSwitcher';
import { t, getCurrentLocale } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  currentPage?: string;
}

const Navigation = ({ currentPage }: NavigationProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  ];

  const isCurrentPage = (itemKey: string) => {
    if (currentPage) {
      return currentPage === itemKey || location.pathname === `/${locale}/${itemKey}` || (itemKey === 'home' && location.pathname === `/${locale}`);
    }
    
    if (itemKey === 'home') {
      return location.pathname === '/' || location.pathname === `/${locale}` || location.pathname === `/${locale}/`;
    }
    
    return location.pathname === `/${locale}/${itemKey}` || location.pathname === `/${itemKey}`;
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.key}
          to={item.path}
          className={`font-inter font-medium transition-colors hover:text-brass ${
            isCurrentPage(item.key) 
              ? 'text-brass border-b-2 border-brass pb-1' 
              : 'text-oxidized-teal'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {item.name as string}
        </Link>
      ))}
    </>
  );

  const AuthSection = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (user) {
      return (
        <div className={`flex items-center ${isMobile ? 'flex-col space-y-3 w-full' : 'space-x-4'}`}>
          <div className={`flex items-center space-x-2 ${isMobile ? 'justify-center' : ''}`}>
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
            className={`border-brass text-brass hover:bg-brass hover:text-parchment ${isMobile ? 'w-full min-h-[44px]' : ''}`}
          >
            <LogOut className="w-4 h-4 mr-1" />
            {t('nav.signOut')}
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={() => {
          setAuthModalOpen(true);
          if (isMobile) setMobileMenuOpen(false);
        }}
        className={`bg-brass hover:bg-brass-dark text-parchment ${isMobile ? 'w-full min-h-[44px]' : ''}`}
      >
        <User className="w-4 h-4 mr-2" />
        {t('nav.signIn')}
      </Button>
    );
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/92 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-[1100px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link to={`/${locale}`} className="flex items-center space-x-2 logo">
              <img
                src="/lovable-uploads/db2e86b9-a90f-4ae7-8729-4b18872ca8dd.png"
                alt="STEaM LOGIC Studio AB"
                loading="lazy"
                className="h-[40px] gear"
              />
              <div className="font-playfair text-teal">
                <div className="text-xl leading-tight">STEaM LOGIC</div>
                <div className="text-sm opacity-90">Studio AB</div>
              </div>
            </Link>
            
            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
              <LanguageSwitcher />
            </div>

            {/* Desktop Contact Button - Right */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to={`/${locale}/contact`}
                className="bg-brass hover:bg-brass-dark text-parchment px-6 py-2 rounded-md font-medium transition-colors"
              >
                {t('nav.contact')}
              </Link>
              <AuthSection />
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DrawerTrigger asChild>
                  <button className="text-oxidized-teal hover:text-brass transition-colors p-2">
                    <Menu size={24} />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="w-[88vw] mx-auto max-w-md bg-white/96 backdrop-blur-md rounded-t-2xl border-none shadow-2xl">
                  <DrawerHeader className="flex justify-between items-center pb-4">
                    <div className="font-playfair text-teal text-lg font-semibold">Menu</div>
                    <DrawerClose asChild>
                      <button className="text-oxidized-teal hover:text-brass transition-colors p-2">
                        <X size={20} />
                      </button>
                    </DrawerClose>
                  </DrawerHeader>
                  
                  <div className="px-6 pb-8 space-y-5">
                    {/* Mobile Navigation Links */}
                    <div className="space-y-5">
                      {navItems.map((item) => (
                        <Link
                          key={item.key}
                          to={item.path}
                          className={`block font-inter font-medium transition-colors min-h-[44px] flex items-center text-lg ${
                            isCurrentPage(item.key) ? 'text-brass' : 'text-oxidized-teal hover:text-brass'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name as string}
                        </Link>
                      ))}
                      
                      {/* Contact Link */}
                      <Link
                        to={`/${locale}/contact`}
                        className="block font-inter font-medium transition-colors min-h-[44px] flex items-center text-lg text-brass"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.contact')}
                      </Link>
                    </div>
                    
                    {/* Language Switcher */}
                    <div className="pt-4 border-t border-gray-200/50">
                      <LanguageSwitcher />
                    </div>
                    
                    {/* Auth Section */}
                    <div className="pt-4 border-t border-gray-200/50">
                      <AuthSection isMobile />
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
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