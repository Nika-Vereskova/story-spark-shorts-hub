
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { t, getCurrentLocale } from '@/lib/i18n';

const NotFound = () => {
  const location = useLocation();
  const locale = getCurrentLocale();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment bg-gear-pattern">
      <div className="text-center p-8 bg-parchment/90 border-2 border-brass shadow-brass-drop relative max-w-md mx-auto">
        {/* Ornate brass corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
        
        <h1 className="text-6xl text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
          {t('notFound.title')}
        </h1>
        <p className="text-xl text-brass mb-6 font-inter">
          {t('notFound.subtitle')}
        </p>
        <Link 
          to={`/${locale}`} 
          className="inline-block bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium rounded"
        >
          {t('notFound.returnHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
