
import React from 'react';
import { Button } from '@/components/ui/button';
import { getCurrentLocale, switchLocale, type Locale } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const currentLocale = getCurrentLocale();
  
  const languages = [
    { code: 'en' as Locale, flag: '🇬🇧', name: 'English' },
    { code: 'sv' as Locale, flag: '🇸🇪', name: 'Svenska' },
    { code: 'ru' as Locale, flag: '🇷🇺', name: 'Русский' }
  ];

  const handleLanguageChange = (locale: Locale) => {
    switchLocale(locale);
  };

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLocale === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-2 py-1 text-sm ${
            currentLocale === lang.code 
              ? 'bg-brass text-parchment border-brass-dark' 
              : 'text-oxidized-teal hover:bg-brass/10 hover:text-brass'
          }`}
          title={lang.name}
        >
          <span className="text-base mr-1">{lang.flag}</span>
          <span className="hidden sm:inline text-xs font-medium">{lang.code.toUpperCase()}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
