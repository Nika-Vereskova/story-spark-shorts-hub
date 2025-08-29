
import React from 'react';
import { getCurrentLocale, switchLocale, type Locale } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
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
        <Button
          variant="ghost"
          size="sm"
          className="px-3 py-2 text-sm text-oxidized-teal hover:bg-brass/10 hover:text-brass border border-brass/30"
        >
          <span className="text-base mr-2">{currentLanguage.flag}</span>
          <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[120px] bg-parchment border-brass/30 shadow-brass-drop z-[1100]"
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
