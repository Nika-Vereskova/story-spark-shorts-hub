import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button, buttonVariants } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { t, getCurrentLocale } from '@/lib/i18n';
import { getSpeechLang } from '@/lib/speech';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { EUROPE_COUNTRIES } from '@/data/europeCountries';
import { cn } from '@/lib/utils';
import GearIcon from '@/components/GearIcon';
import AdSenseUnit from '@/components/AdSenseUnit';

/* eslint-disable @typescript-eslint/no-explicit-any */

const DEFAULT_QUIZ_LENGTH = 10;

const regions = ['All', ...Array.from(new Set(EUROPE_COUNTRIES.map(c => c.region))).sort()];


const EuropeCapitals = () => {
  const locale = getCurrentLocale();
  const { toast } = useToast();
  
  // State management
  const [activeTab, setActiveTab] = useState('study');
  const [studyIndex, setStudyIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [direction, setDirection] = useState('country'); // 'country' | 'capital'
  const [showHints, setShowHints] = useState(true);
  const [missed, setMissed] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activeTiles, setActiveTiles] = useState<string[]>([]);

  // Quiz state
  const [quizState, setQuizState] = useState<any>(null);
  const [quizMode, setQuizMode] = useState('mc'); // 'mc' | 'typed'
  const [quizDirection, setQuizDirection] = useState('cc'); // 'cc' | 'cc_rev'
  const [quizLength, setQuizLength] = useState<number>(DEFAULT_QUIZ_LENGTH);
  const [typedAnswer, setTypedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null)
  const [currentOptions, setCurrentOptions] = useState<string[]>([])
  const resultTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const studyRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const voiceCache = useRef<Record<string, SpeechSynthesisVoice | undefined>>({});
  const femaleVoiceHints = [
    'female',
    'woman',
    'girl',
    'google',
    'svetlana',
    'zira',
    'anna',
    'irina',
    'natalia',
    'natasha',
    'olga',
    'maria',
    'allison',
    'samantha',
    'joanna',
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (isMobile) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Load missed items from localStorage
  useEffect(() => {
    const savedMissed = localStorage.getItem('europe_missed');
    if (savedMissed) {
      setMissed(JSON.parse(savedMissed));
    }
  }, []);

  // Handle quiz progression after showing result
  useEffect(() => {
    if (showResult && isProcessing) {
      console.log('⏰ Starting result timer');
      resultTimer.current = setTimeout(() => {
        setQuizState((prev: any) => {
          const nextIndex = prev.index + 1;
          let questions = prev.questions.map((q: any, i: number) =>
            i === prev.index ? { ...q, answered: true } : q
          );
          if (questions[nextIndex] && questions[nextIndex].item === questions[prev.index].item) {
            const remaining = questions.slice(nextIndex);
            questions = [...questions.slice(0, nextIndex), ...shuffle(remaining)];
            console.log('🔀 Reshuffled remaining questions');
          }
          console.log('➡️ Advancing', { index: nextIndex, questions });
          return { ...prev, index: nextIndex, questions };
        });
      }, 1500)

      return () => {
        console.log('🧹 Cleaning up timer')
        if (resultTimer.current) clearTimeout(resultTimer.current)
      }
    }
  }, [showResult, isProcessing])

  // Reset interaction state whenever quiz state changes
  useEffect(() => {
    if (quizState) {
      console.log('♻️ Resetting question state');
      setShowResult(false);
      setIsProcessing(false);
      setTypedAnswer('');
      setSelectedAnswer(null);
      setAnswerStatus(null);
      if (quizState.index < quizState.questions.length) {
        setCurrentOptions(quizState.questions[quizState.index].options);
      } else {
        setCurrentOptions([]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizState?.index]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
      voiceCache.current = {};
    };
    updateVoices();
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, []);

  const getVoiceForLocale = (loc: string) => {
    const lang = getSpeechLang(loc);
    if (voiceCache.current[lang]) return voiceCache.current[lang];
    let localeVoices = voices.filter(
      v => v.lang === lang || v.lang.startsWith(`${lang}-`)
    );

    if (!localeVoices.length && lang === 'en-US') {
      localeVoices = voices.filter(v => v.lang.startsWith('en'));
    }

    const preferredOrder = ['samantha', 'joanna', 'allison'];

    const sortByPreference = (arr: SpeechSynthesisVoice[]) =>
      [...arr].sort((a, b) => {
        const ai = preferredOrder.findIndex(n =>
          a.name.toLowerCase().includes(n)
        );
        const bi = preferredOrder.findIndex(n =>
          b.name.toLowerCase().includes(n)
        );
        return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
      });

    const femaleVoices = sortByPreference(
      localeVoices.filter(v =>
        femaleVoiceHints.some(h => v.name.toLowerCase().includes(h))
      )
    );
    const voice = femaleVoices[0] || sortByPreference(localeVoices)[0];
    if (voice) voiceCache.current[lang] = voice;
    return voice;
  };

  // Helper functions
  const shuffle = (arr: any[]) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const countryCodeToFlagEmoji = (code: string) => {
    if (!code || code.length !== 2) return '🏳️';
    const base = 127397; // Regional Indicator Symbol Letter A
    const upper = code.toUpperCase();
    try {
      return String.fromCodePoint(base + upper.charCodeAt(0)) + String.fromCodePoint(base + upper.charCodeAt(1));
    } catch {
      return '🏳️';
    }
  };

  const getCurrentItem = () => EUROPE_COUNTRIES[studyIndex];

  const getCountry = (item: any) => {
    switch (locale) {
      case 'sv':
        return item.country_sv;
      case 'ru':
        return item.country_ru;
      default:
        return item.country_en;
    }
  };

  const getCapital = (item: any) => {
    switch (locale) {
      case 'sv':
        return item.capital_sv;
      case 'ru':
        return item.capital_ru;
      default:
        return item.capital_en;
    }
  };

  const getHint = (item: any) => {
    switch (locale) {
      case 'sv':
        return item.hint_sv;
      case 'ru':
        return item.hint_ru;
      default:
        return item.hint_en;
    }
  };

  const getDisplayText = (item: any, isQuestion: boolean, dir: string) => {
    if (dir === 'country') {
      return isQuestion ? getCountry(item) : getCapital(item);
    } else {
      return isQuestion ? getCapital(item) : getCountry(item);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getSpeechLang(locale);
        const voice = getVoiceForLocale(locale);
        if (voice) {
          utterance.voice = voice;
        }
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      } catch (e) {
        console.log('Speech synthesis not available');
      }
    }
  };

  // Study functions
  const moveCard = (newIndex: number) => {
    setStudyIndex((newIndex + EUROPE_COUNTRIES.length) % EUROPE_COUNTRIES.length);
    setShowFront(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (showFront) {
      setShowFront(false);
    } else {
      const { offsetX } = e.nativeEvent;
      const width = (e.currentTarget as HTMLElement).clientWidth;
      if (offsetX < width / 2) {
        moveCard(studyIndex - 1);
      } else {
        moveCard(studyIndex + 1);
      }
    }
  };

  const handleCardTouch = (e: React.TouchEvent) => {
    if (showFront) {
      setShowFront(false);
    } else {
      const touch = e.touches[0];
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = touch.clientX - rect.left;
      if (x < rect.width / 2) {
        moveCard(studyIndex - 1);
      } else {
        moveCard(studyIndex + 1);
      }
    }
  };

  // Quiz functions
  const startQuiz = () => {
    console.log('🎯 Starting new quiz');
    const questions = shuffle([...EUROPE_COUNTRIES])
      .slice(0, quizLength)
      .map(item => {
        const correctAnswer =
          quizDirection === 'cc' ? getCapital(item) : getCountry(item);
        const wrongAnswers = shuffle(
          EUROPE_COUNTRIES.filter(x => x !== item)
        )
          .slice(0, 3)
          .map(x =>
            quizDirection === 'cc' ? getCapital(x) : getCountry(x)
          );
        return {
          item,
          answered: false,
          options: shuffle([correctAnswer, ...wrongAnswers])
        };
      });
    console.log('📝 Shuffled questions', questions.map((q: any) => q.item.code));

    setQuizState({
      mode: quizMode,
      direction: quizDirection,
      questions,
      index: 0,
      correct: 0,
      total: questions.length
    });
    setCurrentOptions(questions[0].options);
    setShowResult(false);
    setIsProcessing(false);
    setTypedAnswer('');
    setActiveTab('quiz');
    scrollToSection(quizRef);
  };

  const handleQuizAnswer = (selected: string, item: any, correctAnswer: string) => {
    console.log('🔍 Quiz Answer Click:', { selected, correctAnswer, isProcessing, showResult });

    // Prevent double clicks and processing conflicts
    if (isProcessing || showResult) {
      console.log('⚠️ Blocked: Already processing or showing result');
      return;
    }

    setIsProcessing(true);
    setShowResult(true);

    const isCorrect = selected.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    console.log('✅ Answer Check:', { isCorrect, selected, correctAnswer });

    setSelectedAnswer(selected);
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setQuizState((prev: any) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      const newMissed = [...missed, item.code];
      setMissed([...new Set(newMissed)]);
      localStorage.setItem('europe_missed', JSON.stringify([...new Set(newMissed)]));
    }
  };

  const renderMultipleChoice = (question: string, answer: string, q: any) => {
    const allOptions = currentOptions;

    return (
      <div className="w-full space-y-6">
        {/* Decorative gears */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <GearIcon aria-hidden="true" size={8} direction="clockwise" color="text-brass" />
          <div className="text-3xl md:text-4xl font-playfair text-center text-foreground font-bold">
            {question}
          </div>
          <GearIcon aria-hidden="true" size={8} direction="counter" color="text-oxidized-teal" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allOptions.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === answer;

            let feedbackClass = 'border-primary/50 bg-card hover:bg-primary/10 hover:border-primary';
            if (showResult) {
              if (isCorrectOption) {
                feedbackClass = 'bg-green-500 border-green-500 text-white';
              } else if (isSelected) {
                feedbackClass = 'bg-red-500 border-red-500 text-white';
              } else {
                feedbackClass = 'border-primary/50 bg-card opacity-50';
              }
            }

            const disabledClass =
              showResult || isProcessing
                ? 'cursor-not-allowed'
                : 'hover:scale-[1.02] active:scale-[0.98]';

            return (
              <Button
                key={`quiz-option-${idx}-${option}`}
                type="button"
                aria-label={option}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🖱️ Button clicked:', option);
                  handleQuizAnswer(option, q.item, answer);
                }}
                disabled={showResult || isProcessing}
                size="lg"
                variant="outline"
                className={`w-full h-16 text-base md:text-lg rounded-2xl border-2 transition-all duration-200 font-semibold whitespace-normal break-words focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${feedbackClass} ${disabledClass}`}
              >
                {option}
                {isSelected && showResult && (
                  <span className="ml-2">{isCorrectOption ? '✅' : '❌'}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTypedAnswer = (question: string, answer: string, item: any) => {
    const buttonFeedbackClass =
      showResult
        ? answerStatus === 'correct'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
        : '';

    const buttonDisabledClass =
      !typedAnswer.trim() || showResult || isProcessing
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:scale-[1.02] active:scale-[0.98]';

    return (
      <div className="w-full space-y-6">
        {/* Decorative gears */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <GearIcon aria-hidden="true" size={8} direction="clockwise" color="text-brass" />
          <div className="text-3xl md:text-4xl font-playfair text-center text-foreground font-bold">
            {question}
          </div>
          <GearIcon aria-hidden="true" size={8} direction="counter" color="text-oxidized-teal" />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            placeholder={t('projects.europeCapitals.typeHere')}
            disabled={showResult}
            className="w-full h-14 md:h-16 px-4 md:px-6 text-lg md:text-xl text-center rounded-2xl border-2 border-primary/50 bg-card focus:border-primary focus:ring-2 focus:ring-primary/20"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && typedAnswer.trim()) {
                handleQuizAnswer(typedAnswer, item, answer);
              }
            }}
          />

          <div className="flex justify-center">
            <Button
              type="button"
              aria-label={t('projects.europeCapitals.checkAnswer')}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Typed answer submitted:', typedAnswer);
                handleQuizAnswer(typedAnswer, item, answer);
              }}
              disabled={!typedAnswer.trim() || showResult || isProcessing}
              size="lg"
              className={`h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${buttonFeedbackClass} ${buttonDisabledClass}`}
            >
              {t('projects.europeCapitals.checkAnswer')}{' '}
              {showResult ? (answerStatus === 'correct' ? '✅' : '❌') : '✓'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Get current study card content
  const currentItem = getCurrentItem();
  const frontText = getDisplayText(currentItem, showFront, direction);
  const backText = getDisplayText(currentItem, !showFront, direction);
  const displayText = showFront ? frontText : backText;
  const hintText = showHints ? getHint(currentItem) : '';

  // Filter countries by region
  const filteredCountries = selectedRegion === 'All' 
    ? EUROPE_COUNTRIES
    : EUROPE_COUNTRIES.filter(c => c.region === selectedRegion);

  return (
    <div className="min-h-screen bg-background relative">
      <SEO 
        title="Europe Capitals Trainer | Interactive Geography Learning Tool" 
        description="Master European capitals with our interactive trainer featuring flashcards, quizzes, and pronunciation. Free geography learning tool with study modes and progress tracking."
        keywords="Europe capitals trainer, European geography, capitals quiz, geography learning tool, interactive flashcards, Europe countries, STEaM LOGIC Studio AB"
      />
      {/* Educational Content Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": "Europe Capitals Trainer",
        "description": "Interactive geography learning tool with flashcards, quizzes, and pronunciation to master European capitals.",
        "audience": {
          "@type": "Audience",
          "audienceType": ["Students", "Parents", "Teachers", "Lifelong Learners"]
        },
        "provider": {
          "@type": "Organization",
          "name": "STEaM LOGIC Studio AB"
        },
        "inLanguage": ["en", "sv", "ru"],
        "educationalLevel": ["Beginner", "Intermediate"],
        "isAccessibleForFree": true,
        "url": typeof window !== 'undefined' ? window.location.href : 'https://nika-vereskova.lovable.app/en/europe-capitals'
      }) }} />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GearIcon aria-hidden="true" className="absolute top-20 left-10" size={12} direction="clockwise" color="text-primary/20" />
        <GearIcon aria-hidden="true" className="absolute top-32 right-16" size={16} direction="counter" color="text-secondary/15" />
        <div className="absolute bottom-40 left-20 w-4 h-8 bg-accent/20 rounded-full steam-effect"></div>
        <div className="absolute bottom-60 right-32 w-3 h-6 bg-accent/25 rounded-full steam-effect" style={{animationDelay: '1s'}}></div>
      </div>
      
      <Navigation currentPage="europe-capitals" />
      
      <div className="pt-24 pb-12 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Enhanced Steampunk Header */}
          <div className="relative steampunk-card p-8 mb-8 overflow-hidden">
            {/* Animated background gears and steam */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner gear clusters */}
              <div className="absolute top-4 left-4 opacity-20 hover:opacity-40 transition-opacity duration-500">
                <GearIcon size={6} direction="clockwise" color="text-brass" className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="absolute top-6 right-6 opacity-15 hover:opacity-35 transition-opacity duration-500">
                <GearIcon size={8} direction="counter" color="text-oxidized-teal" className="animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <div className="absolute bottom-4 left-8 opacity-25 hover:opacity-45 transition-opacity duration-500">
                <GearIcon size={4} direction="clockwise" color="text-brass/70" className="animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="absolute bottom-6 right-4 opacity-20 hover:opacity-40 transition-opacity duration-500">
                <GearIcon size={5} direction="counter" color="text-oxidized-teal/80" className="animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              
              {/* Steam effects */}
              <div className="absolute top-1/2 left-1/4 w-2 h-6 bg-brass/30 rounded-full animate-steam-puff" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-2/3 right-1/3 w-1.5 h-4 bg-oxidized-teal/25 rounded-full animate-steam-puff" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-1/3 left-1/2 w-1 h-3 bg-brass/20 rounded-full animate-steam-puff" style={{animationDelay: '4s'}}></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-6">
                {/* Enhanced main gear with layered animation */}
                <div className="relative w-20 h-20">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-brass to-oxidized-teal flex items-center justify-center shadow-brass-drop animate-pulse">
                    <GearIcon size={12} direction="clockwise" color="text-parchment" className="drop-shadow-lg animate-spin" style={{ animationDuration: '15s' }} />
                  </div>
                  {/* Overlapping accent gears */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-oxidized-teal to-brass flex items-center justify-center">
                    <GearIcon size={6} direction="counter" color="text-parchment" className="animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-br from-brass/80 to-oxidized-teal/80 flex items-center justify-center">
                    <GearIcon size={4} direction="clockwise" color="text-parchment" className="animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                </div>
                
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl font-playfair text-foreground font-bold animate-fade-in">
                    {t('projects.europeCapitals.title')} 🏰
                  </h1>
                  <p className="text-muted-foreground text-lg mt-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
                    {t('projects.europeCapitals.subtitle')}
                  </p>
                  {/* Decorative pipe accent */}
                  <div className="absolute -bottom-2 left-0 w-3/4 h-px bg-gradient-to-r from-brass/60 via-oxidized-teal/40 to-transparent"></div>
                </div>
              </div>
              
              {/* Enhanced CTA button with gear accents */}
              <div className="relative">
                {/* Rotating gears around button */}
                <div className="absolute -top-3 -left-3 opacity-60">
                  <GearIcon size={3} direction="counter" color="text-brass" className="animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div className="absolute -bottom-2 -right-2 opacity-50">
                  <GearIcon size={4} direction="clockwise" color="text-oxidized-teal" className="animate-spin" style={{ animationDuration: '5s' }} />
                </div>
                
                <Button
                  type="button"
                  onClick={startQuiz}
                  aria-label={t('projects.europeCapitals.startQuiz') as string}
                  size="lg"
                  className="relative w-full md:w-auto h-14 md:h-16 px-6 md:px-8 text-lg md:text-xl rounded-2xl font-bold bg-gradient-to-r from-brass to-oxidized-teal hover:from-brass-dark hover:to-oxidized-teal-light border-2 border-brass-dark shadow-brass-drop transform hover:scale-105 hover:animate-steam-puff transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 text-parchment group overflow-hidden"
                >
                  {/* Button internal gear animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-1 right-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    <GearIcon size={2} direction="clockwise" color="text-parchment" className="animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <span className="relative z-10">🎯 {t('projects.europeCapitals.startQuiz')}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: 'study', icon: '📚', label: t('projects.europeCapitals.study'), color: 'from-oxidized-teal to-primary' },
              { id: 'quiz', icon: '🎯', label: t('projects.europeCapitals.quiz'), color: 'from-brass to-oxidized-teal' },
              { id: 'map', icon: '🗺️', label: t('projects.europeCapitals.map'), color: 'from-primary to-secondary' }
            ].map(tab => (
              <Button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const ref = tab.id === 'study' ? studyRef : tab.id === 'quiz' ? quizRef : mapRef;
                  scrollToSection(ref);
                }}
                aria-label={tab.label as string}
                size="lg"
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`w-full sm:w-auto h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-8 text-base sm:text-lg rounded-2xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                    : 'border-2 hover:scale-105 hover:shadow-md'
                }`}
              >
                <span className="text-2xl mr-2">{tab.icon}</span>
                {tab.label as string}
              </Button>
            ))}
          </div>

          {/* Study Panel */}
          {activeTab === 'study' && (
            <div ref={studyRef} className="steampunk-card p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Flashcard */}
                  <div className="relative">
                    <div
                      className="steampunk-card min-h-[240px] sm:min-h-[300px] flex items-center justify-center text-center p-6 sm:p-8 cursor-pointer"
                      onClick={handleCardClick}
                      onTouchStart={handleCardTouch}
                    >
                    {/* Decorative gears */}
                    <GearIcon aria-hidden="true" className="absolute top-4 left-4" size={8} direction="clockwise" color="text-secondary/30" />
                    <GearIcon aria-hidden="true" className="absolute top-4 right-4" size={6} direction="counter" color="text-primary/30" />
                    
                    <div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                        {displayText}
                      </div>
                      {hintText && showHints && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-muted-foreground text-sm sm:text-base md:text-lg bg-card/50 rounded-lg p-3 border">
                          {currentItem.image ? (
                            <img src={currentItem.image} alt={getCountry(currentItem)} className="w-10 h-10 object-contain" loading="lazy" decoding="async" />
                          ) : currentItem.emoji ? (
                            <span className="text-2xl md:text-3xl">{currentItem.emoji}</span>
                          ) : (
                            <span className="text-2xl md:text-3xl">💡</span>
                          )}
                          <span className="text-center sm:text-left">{hintText}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Flip indicator */}
                    <div className="absolute bottom-4 right-4 text-muted-foreground text-sm">
                      ↻ {t('projects.europeCapitals.clickToFlip')}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">{t('projects.europeCapitals.studyMode')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        onClick={() => { setDirection('country'); setShowFront(true); }}
                        variant={direction === 'country' ? 'default' : 'outline'}
                        size="lg"
                        aria-label={t('projects.europeCapitals.countryToCapital') as string}
                        className="h-12 text-lg rounded-xl font-semibold justify-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🏛️ {t('projects.europeCapitals.countryToCapital')}
                      </Button>
                      <Button
                        onClick={() => { setDirection('capital'); setShowFront(true); }}
                        variant={direction === 'capital' ? 'default' : 'outline'}
                        size="lg"
                        aria-label={t('projects.europeCapitals.capitalToCountry') as string}
                        className="h-12 text-lg rounded-xl font-semibold justify-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🏰 {t('projects.europeCapitals.capitalToCountry')}
                      </Button>
                    </div>
                  </div>


                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-lg">
                      <input 
                        type="checkbox" 
                        checked={showHints}
                        onChange={(e) => setShowHints(e.target.checked)}
                        className="w-5 h-5 accent-secondary rounded"
                      />
                      <span className="text-foreground font-medium">
                        💡 {t('projects.europeCapitals.showHints')}
                      </span>
                    </label>

                      <div className="bg-card/50 rounded-lg p-4 border">
                        <div className="text-lg font-semibold text-foreground">
                          📊 {t('projects.europeCapitals.progress')}: {studyIndex + 1}/{EUROPE_COUNTRIES.length}
                        </div>
                        {missed.length > 0 && (
                          <div className="text-muted-foreground mt-1">
                            🔄 {t('projects.europeCapitals.reviewLater')}: {missed.length}
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Panel */}
          {activeTab === 'quiz' && (
            <div ref={quizRef} className="steampunk-card p-8">
              {!quizState ? (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                      🎯 {t('projects.europeCapitals.quizTime')}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {t('projects.europeCapitals.quizDescription')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{t('projects.europeCapitals.quizType')}</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer hover:bg-card/50 transition-colors">
                          <input 
                            type="radio" 
                            name="qmode" 
                            value="mc" 
                            checked={quizMode === 'mc'}
                            onChange={(e) => setQuizMode(e.target.value)}
                            className="w-5 h-5 accent-secondary"
                          />
                          <span className="text-lg font-medium text-foreground">🔘 {t('projects.europeCapitals.multipleChoice')}</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer hover:bg-card/50 transition-colors">
                          <input 
                            type="radio" 
                            name="qmode" 
                            value="typed" 
                            checked={quizMode === 'typed'}
                            onChange={(e) => setQuizMode(e.target.value)}
                            className="w-5 h-5 accent-secondary"
                          />
                          <span className="text-lg font-medium text-foreground">✏️ {t('projects.europeCapitals.typed')}</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{t('projects.europeCapitals.direction')}</h3>
                      <select 
                        value={quizDirection}
                        onChange={(e) => setQuizDirection(e.target.value)}
                        className="w-full h-12 px-4 text-lg rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="cc">🏛️ {t('projects.europeCapitals.countryToCapital')}</option>
                        <option value="cc_rev">🏰 {t('projects.europeCapitals.capitalToCountry')}</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{t('projects.europeCapitals.questionCount')}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[10, 20, 30].map(n => (
                          <Button
                            key={`ql-${n}`}
                            onClick={() => setQuizLength(n)}
                            variant={quizLength === n ? 'default' : 'outline'}
                            size="lg"
                            aria-label={`${n} ${t('projects.europeCapitals.question')}`}
                            className="h-12 rounded-xl font-semibold"
                          >
                            {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button
                      onClick={startQuiz}
                      size="lg"
                      aria-label={t('projects.europeCapitals.startQuiz') as string}
                      className="h-16 px-12 text-2xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🚀 {t('projects.europeCapitals.startQuiz')}
                      </Button>
                  </div>
                </div>
              ) : quizState.index >= quizState.total ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">
                    {quizState.correct >= 8 ? '🏆' : quizState.correct >= 6 ? '🥉' : '🎯'}
                  </div>
                  <div className="text-4xl font-playfair font-bold text-foreground mb-4">
                    {t('projects.europeCapitals.finalScore')}: {quizState.correct}/{quizState.total}
                  </div>
                  <div className="text-xl text-muted-foreground mb-8">
                    {quizState.correct >= 8 ? t('projects.europeCapitals.excellent') :
                     quizState.correct >= 6 ? t('projects.europeCapitals.good') : t('projects.europeCapitals.keepPracticing')}
                  </div>
                  <Button
                    onClick={() => setQuizState(null)}
                    size="lg"
                    aria-label={t('projects.europeCapitals.tryAgain') as string}
                    className="h-16 px-8 text-xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      🔄 {t('projects.europeCapitals.tryAgain')}
                    </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6 bg-card/50 rounded-xl p-4 border">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-foreground">
                        📊 {t('projects.europeCapitals.question')} {quizState.index + 1}/{quizState.total}
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        ⭐ {t('projects.europeCapitals.score')}: {quizState.correct}/{quizState.total}
                      </div>
                    </div>
                    <Progress
                      value={(quizState.index / quizState.total) * 100}
                      className="h-6 md:h-8 mt-4 bg-secondary/30 rounded-full [&>div]:bg-secondary"
                    />
                  </div>
                  <div className="steampunk-card min-h-[400px] flex items-center justify-center p-8">
                    {(() => {
                      const currentQuestion = quizState.questions[quizState.index];
                      console.log('📝 Rendering question', quizState.index, currentQuestion);
                      const isCountryToCapital = quizState.direction === 'cc';
                      const questionText = isCountryToCapital
                        ? getCountry(currentQuestion.item)
                        : getCapital(currentQuestion.item);
                      const answerText = isCountryToCapital
                        ? getCapital(currentQuestion.item)
                        : getCountry(currentQuestion.item);

                      return quizState.mode === 'mc'
                        ? renderMultipleChoice(questionText, answerText, currentQuestion)
                        : renderTypedAnswer(questionText, answerText, currentQuestion.item);
                    })()}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Map Panel */}
          {activeTab === 'map' && (
            <div ref={mapRef} className="steampunk-card p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                  🗺️ {t('projects.europeCapitals.exploreMap')}
                </h2>
                <p className="text-muted-foreground text-lg">{t('projects.europeCapitals.mapNote')}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 px-4 text-lg rounded-xl'
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>
                        🌍 {t(`projects.europeCapitals.regions.${region.toLowerCase()}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setActiveTiles([])}
                  variant="outline"
                  size="lg"
                  aria-label={t('projects.europeCapitals.reset') as string}
                  className="h-12 px-6 text-lg rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  🔄 {t('projects.europeCapitals.reset')}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCountries.map(country => {
                  const name = getCountry(country);
                  const capital = getCapital(country);
                  const isActive = activeTiles.includes(country.code);
                  
                  return (
                    <Button
                      key={country.code}
                      onClick={() => {
                        speak(`${name}. ${capital}`);
                        setActiveTiles(prev =>
                          prev.includes(country.code)
                            ? prev.filter(c => c !== country.code)
                            : [...prev, country.code]
                        );
                        toast({
                          title: name,
                          description: capital,
                          duration: 2000
                        });
                      }}
                      variant={isActive ? "default" : "outline"}
                      size="lg"
                      aria-label={`${name} ${capital}`}
                      className={`h-16 p-3 text-center transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        isActive
                          ? 'transform scale-105 shadow-lg bg-gradient-to-br from-primary to-secondary'
                          : 'hover:scale-105 hover:shadow-md'
                      }`}
                      title={`${name} → ${capital}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-3xl">{countryCodeToFlagEmoji(country.code)}</div>
                        <div className="font-bold text-base">{country.code}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
              
              <div className="text-center mt-8 bg-card/50 rounded-xl p-4 border">
                <p className="text-muted-foreground">
                  🎵 {t('projects.europeCapitals.clickToHear')} • 
                  ⭐ {t('projects.europeCapitals.selected')}: {activeTiles.length}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center bg-card/30 rounded-xl p-6 border">
            <div className="text-lg font-medium text-foreground mb-2">
              💾 {t('projects.europeCapitals.tipTitle')}
            </div>
            <div className="text-muted-foreground">
              {t('projects.europeCapitals.tip')}
            </div>
          </div>
        </div>
      </div>
      
        <AdSenseUnit
          adSlot="9759787900"
          adFormat="autorelaxed"
          className="my-8"
        />

        <Footer />
      </div>
  );
};

export default EuropeCapitals;
