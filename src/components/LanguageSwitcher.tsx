
import React from 'react';
import { getCurrentLocale, switchLocale, type Locale } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const currentLocale = getCurrentLocale();
  
  const languages = [
    { code: 'en' as Locale, flag: '🇬🇧', name: 'English' },
    { code: 'sv' as Locale, flag: '🇸🇪', name: 'Svenska' },
    { code: 'ru' as Locale, flag: '🇷🇺', name: 'Русский' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (locale: Locale) => {
    switchLocale(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center text-sm text-oxidized-teal hover:text-brass"
        >
          <span className="text-base mr-1">{currentLanguage.flag}</span>
          <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[120px] bg-parchment border-brass/30 shadow-brass-drop"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer px-3 py-2 text-sm ${
              currentLocale === lang.code 
                ? 'bg-oxidized-teal/20 text-oxidized-teal font-medium' 
                : 'text-oxidized-teal hover:bg-brass/10 hover:text-brass'
            }`}
          >
            <span className="text-base mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
