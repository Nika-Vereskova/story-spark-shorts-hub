
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentLocale, setCurrentLocale, detectBrowserLocale, type Locale } from '@/lib/i18n';

interface LocaleRouterProps {
  children: React.ReactNode;
}

const LocaleRouter: React.FC<LocaleRouterProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const pathLocale = pathParts[0] as Locale;
    
    // Check if the current path starts with a locale
    const validLocales = ['en', 'sv', 'ru'];
    const hasLocaleInPath = validLocales.includes(pathLocale);
    
    if (hasLocaleInPath) {
      // Set the current locale based on the path
      setCurrentLocale(pathLocale);
      setIsInitialized(true);
    } else {
      // No locale in path, determine where to redirect
      const storedLocale = typeof window !== 'undefined' ? localStorage.getItem('preferred-locale') as Locale : null;
      const browserLocale = detectBrowserLocale();
      
      let targetLocale: Locale;
      
      if (storedLocale && validLocales.includes(storedLocale)) {
        targetLocale = storedLocale;
      } else {
        targetLocale = browserLocale;
      }
      
      setCurrentLocale(targetLocale);
      
      // Redirect to the appropriate locale path
      const newPath = `/${targetLocale}${currentPath}`;
      navigate(newPath, { replace: true });
      setIsInitialized(true);
    }
  }, [location.pathname, navigate]);

  if (!isInitialized) {
    return <div className="min-h-screen bg-parchment" />; // Simple loading state
  }

  return <>{children}</>;
};

export default LocaleRouter;
