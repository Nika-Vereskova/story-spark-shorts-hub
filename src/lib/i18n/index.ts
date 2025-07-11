
import { en } from './en';
import { sv } from './sv';
import { ru } from './ru';

export type Locale = 'en' | 'sv' | 'ru';

export const translations = {
  en,
  sv,
  ru
};

export const locales: Locale[] = ['en', 'sv', 'ru'];

export const defaultLocale: Locale = 'en';

// Simple translation helper
let currentLang: Locale = 'en';

export const setCurrentLocale = (locale: Locale) => {
  currentLang = locale;
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-locale', locale);
  }
};

export const getCurrentLocale = (): Locale => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-locale') as Locale;
    if (stored && locales.includes(stored)) {
      return stored;
    }
  }
  return currentLang;
};

export const detectBrowserLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('sv')) return 'sv';
  if (browserLang.startsWith('ru')) return 'ru';
  
  return defaultLocale;
};

// Translation function
export const t = (key: string): string => {
  const locale = getCurrentLocale();
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          console.warn(`Translation key "${key}" not found for locale "${locale}"`);
          return key;
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};

export const switchLocale = (locale: Locale) => {
  setCurrentLocale(locale);
  
  // Update URL path
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|sv|ru)/, '') || '/';
    const newPath = `/${locale}${pathWithoutLocale}`;
    window.history.pushState({}, '', newPath);
    window.location.reload(); // Simple reload to apply new locale
  }
};
