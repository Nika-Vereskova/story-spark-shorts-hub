import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { t, getCurrentLocale } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';

/* eslint-disable @typescript-eslint/no-explicit-any */

// EU Countries Data
const EU_COUNTRIES = [
  {code:'AT', country_en:'Austria',   capital_en:'Vienna',       country_sv:'Österrike', capital_sv:'Wien',        region:'Central', hint_en:'Austria → Wiener sausage → Vienna', hint_sv:'Österrike → wienerkorv → Wien'},
  {code:'BE', country_en:'Belgium',   capital_en:'Brussels',     country_sv:'Belgien',   capital_sv:'Bryssel',      region:'Western', hint_en:'BELly full of Brussels sprouts', hint_sv:'BELgien → Brysselkål → Bryssel'},
  {code:'BG', country_en:'Bulgaria',  capital_en:'Sofia',        country_sv:'Bulgarien', capital_sv:'Sofia',        region:'Eastern', hint_en:"Bulgarian 'sofa' → Sofia", hint_sv:"Bulgarisk 'soffa' → Sofia"},
  {code:'HR', country_en:'Croatia',   capital_en:'Zagreb',       country_sv:'Kroatien',  capital_sv:'Zagreb',       region:'Southern', hint_en:'ZAG tag for Croatia → Zagreb', hint_sv:'KROatien → ZAG (flygkod) → Zagreb'},
  {code:'CY', country_en:'Cyprus',    capital_en:'Nicosia',      country_sv:'Cypern',    capital_sv:'Nicosia',      region:'Southern', hint_en:"Nice sea around Cyprus → Nicosia", hint_sv:"Nice sea runt Cypern → Nicosia"},
  {code:'CZ', country_en:'Czechia',   capital_en:'Prague',       country_sv:'Tjeckien',  capital_sv:'Prag',         region:'Central', hint_en:'Check → Czech → Prague', hint_sv:'Tjeckien → Prag'},
  {code:'DK', country_en:'Denmark',   capital_en:'Copenhagen',   country_sv:'Danmark',   capital_sv:'Köpenhamn',    region:'Nordic', hint_en:'Open‑face sandwiches in Copenhagen', hint_sv:"Tänk 'köpa hamn' → Köpenhamn"},
  {code:'EE', country_en:'Estonia',   capital_en:'Tallinn',      country_sv:'Estland',   capital_sv:'Tallinn',      region:'Baltic', hint_en:"A tall inn → Tallinn", hint_sv:"Ett 'tall' inn → Tallinn"},
  {code:'FI', country_en:'Finland',   capital_en:'Helsinki',     country_sv:'Finland',   capital_sv:'Helsingfors',  region:'Nordic', hint_en:"HEL → Helsinki (easy to spot)", hint_sv:'HEL → Helsingfors'},
  {code:'FR', country_en:'France',    capital_en:'Paris',        country_sv:'Frankrike', capital_sv:'Paris',        region:'Western', hint_en:'PAR → Paris (Eiffel)', hint_sv:'PAR → Paris (Eiffeltornet)'},
  {code:'DE', country_en:'Germany',   capital_en:'Berlin',       country_sv:'Tyskland',  capital_sv:'Berlin',       region:'Central', hint_en:'BERlin in GERmany', hint_sv:'BERlin i Tyskland'},
  {code:'GR', country_en:'Greece',    capital_en:'Athens',       country_sv:'Grekland',  capital_sv:'Aten',         region:'Southern', hint_en:'Greek athlete → Athens', hint_sv:'Grekisk atlet → Aten'},
  {code:'HU', country_en:'Hungary',   capital_en:'Budapest',     country_sv:'Ungern',    capital_sv:'Budapest',     region:'Central', hint_en:'Hungry? Try a BUDa‑pastry → Budapest', hint_sv:'Hungrig? BUDa‑bakelse → Budapest'},
  {code:'IE', country_en:'Ireland',   capital_en:'Dublin',       country_sv:'Irland',    capital_sv:'Dublin',       region:'Western', hint_en:'Dublin → double in (two leaves of clover)', hint_sv:'Dublin → dubbelt in (shamrock)'},
  {code:'IT', country_en:'Italy',     capital_en:'Rome',         country_sv:'Italien',   capital_sv:'Rom',          region:'Southern', hint_en:'Romans in Rome', hint_sv:'Romarna i Rom'},
  {code:'LV', country_en:'Latvia',    capital_en:'Riga',         country_sv:'Lettland',  capital_sv:'Riga',         region:'Baltic', hint_en:'Latte in Riga', hint_sv:'Latte i Riga'},
  {code:'LT', country_en:'Lithuania', capital_en:'Vilnius',      country_sv:'Litauen',   capital_sv:'Vilnius',      region:'Baltic', hint_en:'Vilnius → "will‑new‑house"', hint_sv:'Vilnius → "vill‑nytt‑hus"'},
  {code:'LU', country_en:'Luxembourg',capital_en:'Luxembourg',   country_sv:'Luxemburg', capital_sv:'Luxemburg',    region:'Western', hint_en:'Lux = light; tiny but bright', hint_sv:'Lux = ljus; litet men ljust'},
  {code:'MT', country_en:'Malta',     capital_en:'Valletta',     country_sv:'Malta',     capital_sv:'Valletta',     region:'Southern', hint_en:'Valley → Valletta', hint_sv:'Dal → Valletta'},
  {code:'NL', country_en:'Netherlands',capital_en:'Amsterdam',   country_sv:'Nederländerna', capital_sv:'Amsterdam', region:'Western', hint_en:'Dams on the Amstel → Amsterdam', hint_sv:'Damm på Amstel → Amsterdam'},
  {code:'PL', country_en:'Poland',    capital_en:'Warsaw',       country_sv:'Polen',     capital_sv:'Warszawa',     region:'Eastern', hint_en:'POLAND: WAR‑SAW', hint_sv:'POLEN: WAR‑SAW → Warszawa'},
  {code:'PT', country_en:'Portugal',  capital_en:'Lisbon',       country_sv:'Portugal',  capital_sv:'Lissabon',     region:'Western', hint_en:'"Listen" to Fado in Lisbon', hint_sv:'Lyssna (Lis-) på fado i Lissabon'},
  {code:'RO', country_en:'Romania',   capital_en:'Bucharest',    country_sv:'Rumänien',  capital_sv:'Bukarest',     region:'Eastern', hint_en:'Book a rest → Bucharest', hint_sv:'Boka rast → Bukarest'},
  {code:'SK', country_en:'Slovakia',  capital_en:'Bratislava',   country_sv:'Slovakien', capital_sv:'Bratislava',   region:'Central', hint_en:'SLOvakia & BratisLAva share "SLA"', hint_sv:'SLOvakien & BratisLAva delar "SLA"'},
  {code:'SI', country_en:'Slovenia',  capital_en:'Ljubljana',    country_sv:'Slovenien', capital_sv:'Ljubljana',    region:'Central', hint_en:'Ljub‑ means "love" → lovely Ljubljana', hint_sv:'Ljub‑ betyder "kärlek" → Ljubljana'},
  {code:'ES', country_en:'Spain',     capital_en:'Madrid',       country_sv:'Spanien',   capital_sv:'Madrid',       region:'Southern', hint_en:'Real Madrid helps remember Madrid', hint_sv:'Tänk "Real Madrid" → Madrid'},
  {code:'SE', country_en:'Sweden',    capital_en:'Stockholm',    country_sv:'Sverige',   capital_sv:'Stockholm',    region:'Nordic', hint_en:'Stock‑holm: keep stock on the islets', hint_sv:'Stock‑holm: stock på holmarna'}
];

const REGIONS = ['All','Nordic','Baltic','Western','Central','Eastern','Southern'];

const EUCapitals = () => {
  const locale = getCurrentLocale();
  const isEnglish = locale === 'en';
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

  // Load missed items from localStorage
  useEffect(() => {
    const savedMissed = localStorage.getItem('eu_missed');
    if (savedMissed) {
      setMissed(JSON.parse(savedMissed));
    }
  }, []);

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

  const getDisplayText = (item: any, isQuestion: boolean, dir: string) => {
    if (dir === 'country') {
      return isQuestion 
        ? (isEnglish ? item.country_en : item.country_sv)
        : (isEnglish ? item.capital_en : item.capital_sv);
    } else {
      return isQuestion 
        ? (isEnglish ? item.capital_en : item.capital_sv)
        : (isEnglish ? item.country_en : item.country_sv);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = isEnglish ? 'en-GB' : 'sv-SE';
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
    setActiveTab('quiz');
  };

  const handleQuizAnswer = (selectedAnswer: string, item: any, correctAnswer: string) => {
    const isCorrect = selectedAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    setShowResult(true);
    
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
    
    setTimeout(() => {
      setQuizState((prev: any) => ({ ...prev, index: prev.index + 1 }));
      setShowResult(false);
      setTypedAnswer('');
    }, 1500);
  };

  const renderMultipleChoice = (question: string, answer: string, item: any) => {
    const wrongAnswers = shuffle(
      EU_COUNTRIES.filter(x => x !== item)
    ).slice(0, 3).map(x => {
      return quizDirection === 'cc' 
        ? (isEnglish ? x.capital_en : x.capital_sv)
        : (isEnglish ? x.country_en : x.country_sv);
    });
    
    const allOptions = shuffle([answer, ...wrongAnswers]);

    return (
      <div className="w-full space-y-6">
        {/* Decorative gears */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <svg className="w-8 h-8 text-brass gear-clockwise" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
          </svg>
          <div className="text-3xl md:text-4xl font-playfair text-center text-foreground font-bold">
            {question}
          </div>
          <svg className="w-8 h-8 text-oxidized-teal gear-counter" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
          </svg>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allOptions.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleQuizAnswer(option, item, answer)}
              disabled={showResult}
              size="lg"
              variant="outline"
              className="w-full h-16 text-base md:text-lg rounded-2xl border-2 border-primary/50 bg-card hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-200 font-semibold whitespace-normal break-words"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderTypedAnswer = (question: string, answer: string, item: any) => {
    return (
      <div className="w-full space-y-6">
        {/* Decorative gears */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <svg className="w-8 h-8 text-brass gear-clockwise" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
          </svg>
          <div className="text-3xl md:text-4xl font-playfair text-center text-foreground font-bold">
            {question}
          </div>
          <svg className="w-8 h-8 text-oxidized-teal gear-counter" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
          </svg>
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
              onClick={() => handleQuizAnswer(typedAnswer, item, answer)}
              disabled={!typedAnswer.trim() || showResult}
              size="lg"
              className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-2xl font-semibold"
            >
              {t('projects.euCapitals.checkAnswer')} ✓
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
  const hintText = showHints ? (isEnglish ? currentItem.hint_en : currentItem.hint_sv) : '';

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
        <svg className="absolute top-20 left-10 w-12 h-12 text-primary/20 gear-clockwise" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
        </svg>
        <svg className="absolute top-32 right-16 w-16 h-16 text-secondary/15 gear-counter" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
        </svg>
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
                  <svg className="w-12 h-12 text-background gear-clockwise" viewBox="0 0 24 24" fill="none">
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
                size="lg"
                className="w-full md:w-auto h-14 md:h-16 px-6 md:px-8 text-lg md:text-xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg transform hover:scale-105 transition-all duration-200"
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
                size="lg"
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`w-full sm:w-auto h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-8 text-base sm:text-lg rounded-2xl font-bold transition-all duration-300 ${
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
                    <svg className="absolute top-4 left-4 w-8 h-8 text-secondary/30 gear-clockwise" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
                    </svg>
                    <svg className="absolute top-4 right-4 w-6 h-6 text-primary/30 gear-counter" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43 6.2c-.04-.34-.07-.67-.07-1c0-.33.03-.65.07-.97L21.99 3.23c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L19.43.43C19.39.09 19.36-.24 19.36-.57c0-.33.03-.65.07-.97L17.87-2.54c-.35-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L13.57-.46c-.34.04-.67.07-1 .07c-.33 0-.66-.03-1-.07L10.07-2.54c-.36-.36-.85-.58-1.4-.58c-.55 0-1.04.22-1.4.58L5.73-.46c-.04.34-.07.67-.07 1c0 .33.03.66.07 1L4.13 2.54c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4L6.2 6.34c.04.32.07.64.07.97c0 .33-.03.65-.07.97L4.13 9.28c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.34.07.67.07 1c0 .33-.03.66-.07 1L4.13 16.6c-.35.36-.58.85-.58 1.4c0 .55.23 1.04.58 1.4l1.57 1.51c.04.32.07.64.07.97c0 .33-.03.65-.07.97l1.57 1.51c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58L12 21.89l1.53 1.49c.36.36.85.58 1.4.58c.55 0 1.04-.22 1.4-.58l1.57-1.51c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97L19.43 18.4c.35-.36.58-.85.58-1.4c0-.55-.23-1.04-.58-1.4L17.87 14.09z"/>
                    </svg>
                    
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
                        className="h-12 text-lg rounded-xl font-semibold justify-start"
                      >
                        🏛️ {t('projects.euCapitals.countryToCapital')}
                      </Button>
                      <Button
                        onClick={() => { setDirection('capital'); setShowFront(true); }}
                        variant={direction === 'capital' ? 'default' : 'outline'}
                        size="lg"
                        className="h-12 text-lg rounded-xl font-semibold justify-start"
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
                        className="h-12 text-lg rounded-xl font-semibold"
                      >
                        ⬅️ {t('projects.euCapitals.prev')}
                      </Button>
                      <Button
                        onClick={() => moveCard(studyIndex + 1)}
                        variant="outline"
                        size="lg"
                        className="h-12 text-lg rounded-xl font-semibold"
                      >
                        {t('projects.euCapitals.next')} ➡️
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={flipCard}
                        size="lg"
                        className="h-12 text-lg rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary"
                      >
                        🔄 {t('projects.euCapitals.flip')}
                      </Button>
                      <Button
                        onClick={shuffleOrder}
                        variant="outline"
                        size="lg"
                        className="h-12 text-lg rounded-xl font-semibold"
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
                      className="h-16 px-12 text-2xl rounded-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200"
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
                    className="h-16 px-8 text-xl rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      🔄 {t('projects.euCapitals.tryAgain')}
                    </Button>
                </div>
              ) : (
                <div className="steampunk-card min-h-[400px] flex items-center justify-center p-8">
                  {(() => {
                    const currentQuestion = quizState.questions[quizState.index];
                    const isCountryToCapital = quizState.direction === 'cc';
                    const questionText = isCountryToCapital
                      ? (isEnglish ? currentQuestion.item.country_en : currentQuestion.item.country_sv)
                      : (isEnglish ? currentQuestion.item.capital_en : currentQuestion.item.capital_sv);
                    const answerText = isCountryToCapital
                      ? (isEnglish ? currentQuestion.item.capital_en : currentQuestion.item.capital_sv)
                      : (isEnglish ? currentQuestion.item.country_en : currentQuestion.item.country_sv);
                    
                    return quizState.mode === 'mc' 
                      ? renderMultipleChoice(questionText, answerText, currentQuestion.item)
                      : renderTypedAnswer(questionText, answerText, currentQuestion.item);
                  })()}
                </div>
              )}
              
              {quizState && quizState.index < quizState.total && (
                <div className="mt-6 bg-card/50 rounded-xl p-4 border">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-foreground">
                      📊 {t('projects.euCapitals.question')} {quizState.index + 1}/{quizState.total}
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      ⭐ {t('projects.euCapitals.score')}: {quizState.correct}/{quizState.total}
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-3 mt-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((quizState.index) / quizState.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
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
                  className="h-12 px-6 text-lg rounded-xl font-semibold"
                >
                  🔄 {t('projects.euCapitals.reset')}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCountries.map(country => {
                  const name = isEnglish ? country.country_en : country.country_sv;
                  const capital = isEnglish ? country.capital_en : country.capital_sv;
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
                      className={`h-20 p-4 text-center transition-all duration-300 rounded-2xl ${
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