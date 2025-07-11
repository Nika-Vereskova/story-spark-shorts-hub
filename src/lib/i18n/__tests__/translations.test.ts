
import { t, setCurrentLocale } from '../index';

describe('Internationalization', () => {
  test('should return correct English translations', () => {
    setCurrentLocale('en');
    expect(t('nav.home')).toBe('Home');
    expect(t('nav.books')).toBe('Books');
    expect(t('home.title')).toBe('Nika Vereskova Stories');
  });

  test('should return correct Swedish translations', () => {
    setCurrentLocale('sv');
    expect(t('nav.home')).toBe('Hem');
    expect(t('nav.books')).toBe('Böcker');
    expect(t('home.title')).toBe('Nika Vereskova Berättelser');
  });

  test('should return correct Russian translations', () => {
    setCurrentLocale('ru');
    expect(t('nav.home')).toBe('Главная');
    expect(t('nav.books')).toBe('Книги');
    expect(t('home.title')).toBe('Истории Ники Вересковой');
  });

  test('should fallback to English if key not found', () => {
    setCurrentLocale('sv');
    expect(t('nonexistent.key')).toBe('nonexistent.key');
  });
});
