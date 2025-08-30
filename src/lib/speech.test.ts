import { describe, it, expect } from 'vitest';
import { getSpeechLang } from './speech';

describe('getSpeechLang', () => {
  it('returns en-US for English locale', () => {
    expect(getSpeechLang('en')).toBe('en-US');
  });

  it('returns sv-SE for Swedish locale', () => {
    expect(getSpeechLang('sv')).toBe('sv-SE');
  });

  it('returns ru-RU for Russian locale', () => {
    expect(getSpeechLang('ru')).toBe('ru-RU');
  });
});
