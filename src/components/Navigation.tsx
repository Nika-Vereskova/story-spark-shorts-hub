
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentLocale, t } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const locale = getCurrentLocale();
  const location = useLocation();
  
  // Extract current locale from path if present
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pathLocale = ['en', 'sv', 'ru'].includes(pathParts[0]) ? pathParts[0] : locale;
  
  const getLocalizedPath = (path: string) => {
    return `/${pathLocale}${path === '/' ? '' : path}`;
  };
  
  const isActive = (page: string) => currentPage === page;

  return (
    <nav className="fixed top-0 w-full bg-parchment/95 backdrop-blur-md z-50 border-b border-brass/30 shadow-brass-drop">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-oxidized-teal font-playfair drop-shadow-text-drop">
          {t('home.title')}
        </h1>
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to={getLocalizedPath('/')} 
            className={`transition-colors font-medium font-inter ${
              isActive('home') ? 'text-brass font-semibold' : 'text-oxidized-teal hover:text-brass'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to={getLocalizedPath('/books')} 
            className={`transition-colors font-medium font-inter ${
              isActive('books') ? 'text-brass font-semibold' : 'text-oxidized-teal hover:text-brass'
            }`}
          >
            {t('nav.books')}
          </Link>
          <Link 
            to={getLocalizedPath('/videos')} 
            className={`transition-colors font-medium font-inter ${
              isActive('videos') ? 'text-brass font-semibold' : 'text-oxidized-teal hover:text-brass'
            }`}
          >
            {t('nav.videos')}
          </Link>
          <Link 
            to={getLocalizedPath('/about')} 
            className={`transition-colors font-medium font-inter ${
              isActive('about') ? 'text-brass font-semibold' : 'text-oxidized-teal hover:text-brass'
            }`}
          >
            {t('nav.about')}
          </Link>
          <a 
            href="/blog" 
            className="text-oxidized-teal hover:text-brass transition-colors font-medium font-inter"
          >
            {t('nav.blog')}
          </a>
          <Link 
            to={getLocalizedPath('/contact')} 
            className={`transition-colors font-medium font-inter ${
              isActive('contact') ? 'text-brass font-semibold' : 'text-oxidized-teal hover:text-brass'
            }`}
          >
            {t('nav.contact')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
