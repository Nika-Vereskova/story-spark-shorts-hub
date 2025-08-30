export const getSpeechLang = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-US';
    case 'ru':
      return 'ru-RU';
    case 'sv':
    default:
      return 'sv-SE';
  }
};
