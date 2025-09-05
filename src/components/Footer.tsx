import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { t, getCurrentLocale } from '@/lib/i18n';

const Footer = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const hasIncremented = useRef(false);

  const incrementVisits = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('increment-visits');
      
      if (error) {
        console.error('Error calling increment-visits function:', error);
        return;
      }

      if (data?.total_visits !== undefined) {
        setVisitCount(data.total_visits);
      }
    } catch (error) {
      console.error('Error incrementing visits:', error);
    }
  };

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;
    incrementVisits();
  }, []);

  const locale = getCurrentLocale();

  return (
    <footer className="vintage-paper-dark weathered-edges py-8 px-6 border-t-4 border-brass/70">
      <div className="container mx-auto text-center">
        <p className="text-oxidized-teal/80 font-medium font-inter">{t('footer.copyright')}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex-1" />
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.youtube.com/@NikaVereskova" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brass hover:text-brass-dark transition-colors font-inter hover:sepia"
            >
              {t('contact.youtube')}
            </a>
            <a 
              href="https://www.instagram.com/vereskovanika" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brass hover:text-brass-dark transition-colors font-inter"
            >
              {t('contact.instagram')}
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61577838015246" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brass hover:text-brass-dark transition-colors font-inter"
            >
              {t('contact.facebook')}
            </a>
          </div>
          <div className="flex-1 flex justify-end">
            {visitCount !== null && (
              <span className="text-oxidized-teal/60 font-inter text-xs">
                {visitCount.toLocaleString()} {t('footer.visits')}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <Link 
            to="/privacy" 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('footer.privacy')}
          </Link>
          <Link 
            to="/terms" 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('footer.terms')}
          </Link>
          <Link 
            to="/admin" 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('footer.admin')}
          </Link>
        </div>

        {/* Internal links for improved crawlability */}
        <div className="flex justify-center space-x-6 mt-3">
          <Link 
            to={`/${locale}/books`} 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('nav.books')}
          </Link>
          <Link 
            to={`/${locale}/learn-ai`} 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('nav.learnAI')}
          </Link>
          <Link 
            to={`/${locale}/europe-capitals`} 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('nav.europeCapitals')}
          </Link>
          <Link 
            to={`/${locale}/ai-services`} 
            className="text-oxidized-teal/80 hover:text-oxidized-teal transition-colors font-inter text-sm"
          >
            {t('nav.projects')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
