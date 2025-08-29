import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { t, getCurrentLocale } from '@/lib/i18n';
import { getSpeechLang } from '@/lib/speech';
import { useToast } from '@/hooks/use-toast';
import { EU_COUNTRIES, REGIONS } from '@/data/euCountries';
import GearIcon from '@/components/GearIcon';

/* eslint-disable @typescript-eslint/no-explicit-any */


const EUCapitals = () => {
  const locale = getCurrentLocale();
  const { toast } = useToast();
  
  // State management
  const [activeTab, setActiveTab] = useState('study');
  const [studyIndex, setStudyIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [direction, setDirection] = useState('country'); // 'country' | 'capital'
  const [order, setOrder] = useState([...Array(EU_COUNTRIES.length).keys()]);
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
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)

  // Load missed items from localStorage
  useEffect(() => {
    const savedMissed = localStorage.getItem('eu_missed');
    if (savedMissed) {
      setMissed(JSON.parse(savedMissed));
    }
  }, []);

  // Handle quiz progression after showing result
  useEffect(() => {
    if (showResult && isProcessing && quizState) {
      console.log('⏰ Starting result timer');
      const timer = setTimeout(() => {
        console.log('🔄 Moving to next question');
        setQuizState((prev: any) => ({ ...prev, index: prev.index + 1 }));
      }, 1500);

      return () => {
        console.log('🧹 Cleaning up timer');
        clearTimeout(timer);
      };
    }
  }, [showResult, isProcessing, quizState]);

  // Reset interaction state whenever quiz state changes
  useEffect(() => {
    if (quizState) {
      console.log('♻️ Resetting question state');
    } else {
      console.log('🧹 Quiz state cleared');
    }
    setShowResult(false);
    setIsProcessing(false);
    setTypedAnswer('');
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  }, [quizState]);

  // Helper functions
  const shuffle = (arr: any[]) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getCurrentItem = () => EU_COUNTRIES[order[studyIndex]];

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
    setStudyIndex((newIndex + EU_COUNTRIES.length) % EU_COUNTRIES.length);
    setShowFront(true);
  };

  const flipCard = () => {
    setShowFront(!showFront);
  };

  const shuffleOrder = () => {
    setOrder(shuffle([...Array(EU_COUNTRIES.length).keys()]));
    setStudyIndex(0);
    setShowFront(true);
  };

  // Quiz functions
  const startQuiz = () => {
    console.log('🎯 Starting new quiz');
    const questions = shuffle([...EU_COUNTRIES]).slice(0, 10).map(item => ({
      item,
      answered: false
    }));

    setQuizState({
      mode: quizMode,
      direction: quizDirection,
      questions,
      index: 0,
      correct: 0,
      total: 10
    });
    setShowResult(false);
    setIsProcessing(false);
    setTypedAnswer('');
    setActiveTab('quiz');
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
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setQuizState((prev: any) => ({ ...prev, correct: prev.correct + 1 }));
      toast({
        title: "🎉 " + t('projects.euCapitals.correct'),
        description: t('projects.euCapitals.wellDone'),
        duration: 1500,
      });
    } else {
      const newMissed = [...missed, item.code];
      setMissed([...new Set(newMissed)]);
      localStorage.setItem('eu_missed', JSON.stringify([...new Set(newMissed)]));
      toast({
        title: "❌ " + t('projects.euCapitals.incorrect'),
        description: `${t('projects.euCapitals.correctAnswer')}: ${correctAnswer}`,
        duration: 2000,
        variant: "destructive"
      });
    }
  };

  const renderMultipleChoice = (question: string, answer: string, item: any) => {
    const wrongAnswers = shuffle(
      EU_COUNTRIES.filter(x => x !== item)
    ).slice(0, 3).map(x => {
      return quizDirection === 'cc'
        ? getCapital(x)
        : getCountry(x);
    });
    
    const allOptions = shuffle([answer, ...wrongAnswers]);

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
            const feedbackClass =
              isSelected && showResult
                ? isAnswerCorrect
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-red-500 border-red-500 text-white'
                : 'border-primary/50 bg-card hover:bg-primary/10 hover:border-primary';
            const disabledClass =
              showResult || isProcessing
                ? isSelected && showResult
                  ? 'cursor-not-allowed'
                  : 'opacity-50 cursor-not-allowed'
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
                  handleQuizAnswer(option, item, answer);
                }}
                disabled={showResult || isProcessing}
                size="lg"
                variant="outline"
                className={`w-full h-16 text-base md:text-lg rounded-2xl border-2 transition-all duration-200 font-semibold whitespace-normal break-words focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${feedbackClass} ${disabledClass}`}
              >
                {option}
                {isSelected && showResult && (
                  <span className="ml-2">{isAnswerCorrect ? '✅' : '❌'}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTypedAnswer = (question: string, answer: string, item: any) => {
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
            placeholder={t('projects.euCapitals.typeHere')}
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
              aria-label={t('projects.euCapitals.checkAnswer')}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Typed answer submitted:', typedAnswer);
                handleQuizAnswer(typedAnswer, item, answer);
              }}
              disabled={!typedAnswer.trim() || showResult || isProcessing}
              size="lg"
              className={`h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                showResult
                  ? isAnswerCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : ''
              } ${
                (!typedAnswer.trim() || isProcessing)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {t('projects.euCapitals.checkAnswer')}{' '}
              {showResult ? (isAnswerCorrect ? '✅' : '❌') : '✓'}
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
    ? EU_COUNTRIES 
    : EU_COUNTRIES.filter(c => c.region === selectedRegion);

  return (
    <div className="min-h-screen bg-background relative">
      <SEO 
        title={`${t('projects.euCapitals.title')} | STEaM LOGIC Studio AB`}
        description={t('projects.euCapitals.description')}
        keywords="EU capitals trainer, geography learning, European countries, capitals quiz, educational game, interactive learning"
      />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GearIcon aria-hidden="true" className="absolute top-20 left-10" size={12} direction="clockwise" color="text-primary/20" />
        <GearIcon aria-hidden="true" className="absolute top-32 right-16" size={16} direction="counter" color="text-secondary/15" />
        <div className="absolute bottom-40 left-20 w-4 h-8 bg-accent/20 rounded-full steam-effect"></div>
        <div className="absolute bottom-60 right-32 w-3 h-6 bg-accent/25 rounded-full steam-effect" style={{animationDelay: '1s'}}></div>
      </div>
      
      <Navigation currentPage="eu-capitals" />
      
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
                    {t('projects.euCapitals.title')} 🏰
                  </h1>
                  <p className="text-muted-foreground text-lg mt-2">
                    {t('projects.euCapitals.subtitle')}
                  </p>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={startQuiz}
                aria-label={t('projects.euCapitals.startQuiz') as string}
                size="lg"
                className="w-full md:w-auto h-14 md:h-16 px-6 md:px-8 text-lg md:text-xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                🎯 {t('projects.euCapitals.startQuiz')}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: 'study', icon: '📚', label: t('projects.euCapitals.study'), color: 'from-green-500 to-green-600' },
              { id: 'quiz', icon: '🎯', label: t('projects.euCapitals.quiz'), color: 'from-blue-500 to-blue-600' },
              { id: 'map', icon: '🗺️', label: t('projects.euCapitals.map'), color: 'from-orange-500 to-orange-600' }
            ].map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
            <div className="steampunk-card p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Flashcard */}
                <div className="relative">
                  <div className="steampunk-card min-h-[300px] flex items-center justify-center text-center p-8 cursor-pointer" onClick={flipCard}>
                    {/* Decorative gears */}
                    <GearIcon aria-hidden="true" className="absolute top-4 left-4" size={8} direction="clockwise" color="text-secondary/30" />
                    <GearIcon aria-hidden="true" className="absolute top-4 right-4" size={6} direction="counter" color="text-primary/30" />
                    
                    <div>
                      <div className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                        {displayText}
                      </div>
                      {hintText && showHints && (
                        <div className="text-muted-foreground text-lg bg-card/50 rounded-lg p-3 border">
                          💡 {hintText}
                        </div>
                      )}
                    </div>
                    
                    {/* Flip indicator */}
                    <div className="absolute bottom-4 right-4 text-muted-foreground text-sm">
                      ↻ {t('projects.euCapitals.clickToFlip')}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">{t('projects.euCapitals.studyMode')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        onClick={() => { setDirection('country'); setShowFront(true); }}
                        variant={direction === 'country' ? 'default' : 'outline'}
                        size="lg"
                        aria-label={t('projects.euCapitals.countryToCapital') as string}
                        className="h-12 text-lg rounded-xl font-semibold justify-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🏛️ {t('projects.euCapitals.countryToCapital')}
                      </Button>
                      <Button
                        onClick={() => { setDirection('capital'); setShowFront(true); }}
                        variant={direction === 'capital' ? 'default' : 'outline'}
                        size="lg"
                        aria-label={t('projects.euCapitals.capitalToCountry') as string}
                        className="h-12 text-lg rounded-xl font-semibold justify-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🏰 {t('projects.euCapitals.capitalToCountry')}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">{t('projects.euCapitals.navigation')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => moveCard(studyIndex - 1)}
                        variant="outline"
                        size="lg"
                        aria-label={t('projects.euCapitals.prev') as string}
                        className="h-12 text-lg rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        ⬅️ {t('projects.euCapitals.prev')}
                      </Button>
                      <Button
                        onClick={() => moveCard(studyIndex + 1)}
                        variant="outline"
                        size="lg"
                        aria-label={t('projects.euCapitals.next') as string}
                        className="h-12 text-lg rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {t('projects.euCapitals.next')} ➡️
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={flipCard}
                        size="lg"
                        aria-label={t('projects.euCapitals.flip') as string}
                        className="h-12 text-lg rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🔄 {t('projects.euCapitals.flip')}
                      </Button>
                      <Button
                        onClick={shuffleOrder}
                        variant="outline"
                        size="lg"
                        aria-label={t('projects.euCapitals.shuffle') as string}
                        className="h-12 text-lg rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🔀 {t('projects.euCapitals.shuffle')}
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
                        💡 {t('projects.euCapitals.showHints')}
                      </span>
                    </label>

                      <div className="bg-card/50 rounded-lg p-4 border">
                        <div className="text-lg font-semibold text-foreground">
                          📊 {t('projects.euCapitals.progress')}: {studyIndex + 1}/{EU_COUNTRIES.length}
                        </div>
                        {missed.length > 0 && (
                          <div className="text-muted-foreground mt-1">
                            🔄 {t('projects.euCapitals.reviewLater')}: {missed.length}
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
            <div className="steampunk-card p-8">
              {!quizState ? (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                      🎯 {t('projects.euCapitals.quizTime')}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {t('projects.euCapitals.quizDescription')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{t('projects.euCapitals.quizType')}</h3>
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
                          <span className="text-lg font-medium text-foreground">🔘 {t('projects.euCapitals.multipleChoice')}</span>
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
                          <span className="text-lg font-medium text-foreground">✏️ {t('projects.euCapitals.typed')}</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{t('projects.euCapitals.direction')}</h3>
                      <select 
                        value={quizDirection}
                        onChange={(e) => setQuizDirection(e.target.value)}
                        className="w-full h-12 px-4 text-lg rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="cc">🏛️ {t('projects.euCapitals.countryToCapital')}</option>
                        <option value="cc_rev">🏰 {t('projects.euCapitals.capitalToCountry')}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button
                      onClick={startQuiz}
                      size="lg"
                      aria-label={t('projects.euCapitals.startQuiz') as string}
                      className="h-16 px-12 text-2xl rounded-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        🚀 {t('projects.euCapitals.startQuiz')}
                      </Button>
                  </div>
                </div>
              ) : quizState.index >= quizState.total ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">
                    {quizState.correct >= 8 ? '🏆' : quizState.correct >= 6 ? '🥉' : '🎯'}
                  </div>
                  <div className="text-4xl font-playfair font-bold text-foreground mb-4">
                    {t('projects.euCapitals.finalScore')}: {quizState.correct}/{quizState.total}
                  </div>
                  <div className="text-xl text-muted-foreground mb-8">
                    {quizState.correct >= 8 ? t('projects.euCapitals.excellent') :
                     quizState.correct >= 6 ? t('projects.euCapitals.good') : t('projects.euCapitals.keepPracticing')}
                  </div>
                  <Button
                    onClick={() => setQuizState(null)}
                    size="lg"
                    aria-label={t('projects.euCapitals.tryAgain') as string}
                    className="h-16 px-8 text-xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      🔄 {t('projects.euCapitals.tryAgain')}
                    </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6 bg-card/50 rounded-xl p-4 border">
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold text-foreground">
                        📊 {t('projects.euCapitals.question')} {quizState.index + 1}/{quizState.total}
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        ⭐ {t('projects.euCapitals.score')}: {quizState.correct}/{quizState.total}
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
                      const isCountryToCapital = quizState.direction === 'cc';
                      const questionText = isCountryToCapital
                        ? getCountry(currentQuestion.item)
                        : getCapital(currentQuestion.item);
                      const answerText = isCountryToCapital
                        ? getCapital(currentQuestion.item)
                        : getCountry(currentQuestion.item);

                      return quizState.mode === 'mc'
                        ? renderMultipleChoice(questionText, answerText, currentQuestion.item)
                        : renderTypedAnswer(questionText, answerText, currentQuestion.item);
                    })()}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Map Panel */}
          {activeTab === 'map' && (
            <div className="steampunk-card p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                  🗺️ {t('projects.euCapitals.exploreMap')}
                </h2>
                <p className="text-muted-foreground text-lg">{t('projects.euCapitals.mapNote')}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-12 px-4 text-lg rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {REGIONS.map(region => (
                    <option key={region} value={region}>
                      🌍 {t(`projects.euCapitals.regions.${region.toLowerCase()}`)}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={() => setActiveTiles([])}
                  variant="outline"
                  size="lg"
                  aria-label={t('projects.euCapitals.reset') as string}
                  className="h-12 px-6 text-lg rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  🔄 {t('projects.euCapitals.reset')}
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
                  🎵 {t('projects.euCapitals.clickToHear')} • 
                  ⭐ {t('projects.euCapitals.selected')}: {activeTiles.length}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center bg-card/30 rounded-xl p-6 border">
            <div className="text-lg font-medium text-foreground mb-2">
              💾 {t('projects.euCapitals.tipTitle')}
            </div>
            <div className="text-muted-foreground">
              {t('projects.euCapitals.tip')}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EUCapitals;