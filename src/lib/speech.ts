export const getSpeechLang = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'en-GB';
    case 'ru':
      return 'ru-RU';
    case 'sv':
    default:
      return 'sv-SE';
  }
};
