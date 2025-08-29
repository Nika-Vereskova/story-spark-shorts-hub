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
import { EUROPE_COUNTRIES, REGIONS } from '@/data/europeCountries';
import { cn } from '@/lib/utils';
import GearIcon from '@/components/GearIcon';

/* eslint-disable @typescript-eslint/no-explicit-any */

const QUIZ_LENGTH = 10;


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

  // Helper functions
  const shuffle = (arr: any[]) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
      .slice(0, QUIZ_LENGTH)
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
        title={`${t('projects.europeCapitals.title')} | STEaM LOGIC Studio AB`}
        description={t('projects.europeCapitals.description')}
        keywords="EU capitals trainer, geography learning, European countries, capitals quiz, educational game, interactive learning"
      />
      
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
          {/* Header */}
          <div className="steampunk-card p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <svg aria-hidden="true" className="w-12 h-12 text-background gear-clockwise" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-playfair text-foreground font-bold">
                    {t('projects.europeCapitals.title')} 🏰
                  </h1>
                  <p className="text-muted-foreground text-lg mt-2">
                    {t('projects.europeCapitals.subtitle')}
                  </p>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={startQuiz}
                aria-label={t('projects.europeCapitals.startQuiz') as string}
                size="lg"
                className="w-full md:w-auto h-14 md:h-16 px-6 md:px-8 text-lg md:text-xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                🎯 {t('projects.europeCapitals.startQuiz')}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: 'study', icon: '📚', label: t('projects.europeCapitals.study'), color: 'from-green-500 to-green-600' },
              { id: 'quiz', icon: '🎯', label: t('projects.europeCapitals.quiz'), color: 'from-blue-500 to-blue-600' },
              { id: 'map', icon: '🗺️', label: t('projects.europeCapitals.map'), color: 'from-orange-500 to-orange-600' }
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
                            <img src={currentItem.image} alt={getCountry(currentItem)} className="w-10 h-10 object-contain" />
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button
                      onClick={startQuiz}
                      size="lg"
                      aria-label={t('projects.europeCapitals.startQuiz') as string}
                      className="h-16 px-12 text-2xl rounded-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                      className="h-6 md:h-8 mt-4 bg-amber-200 rounded-full [&>div]:bg-amber-500"
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
                    {REGIONS.map(region => (
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
                      className={`h-20 p-4 text-center transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        isActive
                          ? 'transform scale-105 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600'
                          : 'hover:scale-105 hover:shadow-md'
                      }`}
                      title={`${name} → ${capital}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="font-bold text-lg">{country.code}</div>
                        <div className="text-xs">{name}</div>
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
      
      <Footer />
    </div>
  );
};

export default EuropeCapitals;