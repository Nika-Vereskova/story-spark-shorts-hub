import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { t, getCurrentLocale } from '@/lib/i18n';

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
    
    const handleAnswer = (selectedAnswer: string) => {
      const isCorrect = selectedAnswer === answer;
      if (isCorrect) {
        setQuizState((prev: any) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        const newMissed = [...missed, item.code];
        setMissed([...new Set(newMissed)]);
        localStorage.setItem('eu_missed', JSON.stringify([...new Set(newMissed)]));
      }
      
      setTimeout(() => {
        setQuizState((prev: any) => ({ ...prev, index: prev.index + 1 }));
      }, 800);
    };

    return (
      <div className="w-full">
        <div className="text-2xl md:text-3xl font-playfair text-center text-parchment mb-6">
          {question}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="p-4 rounded-lg border border-teal/40 bg-oxidized-teal/10 hover:bg-teal/20 transition-all duration-200 text-parchment"
            >
              {option}
            </button>
          ))}
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
    <div className="min-h-screen vintage-paper-light parchment-scroll relative">
      <SEO 
        title={`${t('euCapitals.title')} | STEaM LOGIC Studio AB`}
        description={t('euCapitals.description')}
        keywords="EU capitals trainer, geography learning, European countries, capitals quiz, educational game, interactive learning"
      />
      
      <Navigation currentPage="eu-capitals" />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal/20 to-brass/20 rounded-2xl p-6 mb-6 border border-brass/30 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brass/20 flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" className="text-brass"/>
                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2" className="text-teal"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-playfair text-parchment">
                    {t('euCapitals.title')}
                  </h1>
                  <p className="text-brass/80 text-sm">
                    {t('euCapitals.subtitle')}
                  </p>
                </div>
              </div>
              
              <button
                onClick={startQuiz}
                className="px-6 py-3 bg-gradient-to-r from-teal to-oxidized-teal text-parchment rounded-lg hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-200 font-medium"
              >
                {t('euCapitals.startQuiz')}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'study', icon: '📖', label: t('euCapitals.study') },
              { id: 'quiz', icon: '🎯', label: t('euCapitals.quiz') },
              { id: 'map', icon: '🗺️', label: t('euCapitals.map') }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-brass/20 border-brass text-parchment'
                    : 'bg-oxidized-teal/10 border-teal/40 text-parchment/80 hover:bg-teal/20'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label as string}
              </button>
            ))}
          </div>

          {/* Study Panel */}
          {activeTab === 'study' && (
            <div className="bg-oxidized-teal/10 backdrop-blur-sm rounded-2xl p-6 border border-brass/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Flashcard */}
                <div className="bg-gradient-to-br from-teal/20 to-brass/10 rounded-xl p-8 border-l-4 border-brass min-h-[200px] flex items-center justify-center text-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-playfair text-parchment mb-3">
                      {displayText}
                    </div>
                    {hintText && (
                      <div className="text-brass/80 text-sm">
                        {hintText}
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => { setDirection('country'); setShowFront(true); }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        direction === 'country' 
                          ? 'bg-brass/20 border-brass text-parchment'
                          : 'border-teal/40 text-parchment/80 hover:bg-teal/10'
                      }`}
                    >
                      {t('euCapitals.countryToCapital')}
                    </button>
                    <button
                      onClick={() => { setDirection('capital'); setShowFront(true); }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        direction === 'capital' 
                          ? 'bg-brass/20 border-brass text-parchment'
                          : 'border-teal/40 text-parchment/80 hover:bg-teal/10'
                      }`}
                    >
                      {t('euCapitals.capitalToCountry')}
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => moveCard(studyIndex - 1)}
                      className="px-4 py-2 rounded-lg border border-teal/40 text-parchment/80 hover:bg-teal/10 transition-colors"
                    >
                      ← {t('euCapitals.prev')}
                    </button>
                    <button
                      onClick={flipCard}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal to-oxidized-teal text-parchment hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-200"
                    >
                      ⤿ {t('euCapitals.flip')}
                    </button>
                    <button
                      onClick={() => moveCard(studyIndex + 1)}
                      className="px-4 py-2 rounded-lg border border-teal/40 text-parchment/80 hover:bg-teal/10 transition-colors"
                    >
                      {t('euCapitals.next')} →
                    </button>
                    <button
                      onClick={shuffleOrder}
                      className="px-4 py-2 rounded-lg border border-teal/40 text-parchment/80 hover:bg-teal/10 transition-colors"
                    >
                      🔀 {t('euCapitals.shuffle')}
                    </button>
                  </div>

                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={showHints}
                      onChange={(e) => setShowHints(e.target.checked)}
                      className="accent-brass"
                    />
                    <span className="text-parchment/80 text-sm">
                      {t('euCapitals.showHints')}
                    </span>
                  </label>

                  <div className="text-parchment/60 text-sm">
                    {studyIndex + 1}/{EU_COUNTRIES.length}
                    {missed.length > 0 && (
                      <span className="ml-2">
                        • {t('euCapitals.reviewLater')}: {missed.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Panel */}
          {activeTab === 'quiz' && (
            <div className="bg-oxidized-teal/10 backdrop-blur-sm rounded-2xl p-6 border border-brass/30">
              {!quizState ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="qmode" 
                        value="mc" 
                        checked={quizMode === 'mc'}
                        onChange={(e) => setQuizMode(e.target.value)}
                        className="accent-brass"
                      />
                      <span className="text-parchment">{t('euCapitals.multipleChoice')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="qmode" 
                        value="typed" 
                        checked={quizMode === 'typed'}
                        onChange={(e) => setQuizMode(e.target.value)}
                        className="accent-brass"
                      />
                      <span className="text-parchment">{t('euCapitals.typed')}</span>
                    </label>
                    <select 
                      value={quizDirection}
                      onChange={(e) => setQuizDirection(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-oxidized-teal/20 border border-teal/40 text-parchment"
                    >
                      <option value="cc">{t('euCapitals.countryToCapital')}</option>
                      <option value="cc_rev">{t('euCapitals.capitalToCountry')}</option>
                    </select>
                    <button
                      onClick={startQuiz}
                      className="px-6 py-2 bg-gradient-to-r from-teal to-oxidized-teal text-parchment rounded-lg hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-200"
                    >
                      {t('euCapitals.startQuiz')}
                    </button>
                  </div>
                </div>
              ) : quizState.index >= quizState.total ? (
                <div className="text-center py-12">
                  <div className="text-3xl font-playfair text-parchment mb-4">
                    {t('euCapitals.finalScore')}: {quizState.correct}/{quizState.total}
                  </div>
                  <button
                    onClick={() => setQuizState(null)}
                    className="px-6 py-3 bg-gradient-to-r from-teal to-oxidized-teal text-parchment rounded-lg hover:from-teal/90 hover:to-oxidized-teal/90 transition-all duration-200"
                  >
                    {t('euCapitals.tryAgain')}
                  </button>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-teal/20 to-brass/10 rounded-xl p-8 border-l-4 border-brass min-h-[200px] flex items-center justify-center">
                  {(() => {
                    const currentQuestion = quizState.questions[quizState.index];
                    const isCountryToCapital = quizState.direction === 'cc';
                    const questionText = isCountryToCapital
                      ? (isEnglish ? currentQuestion.item.country_en : currentQuestion.item.country_sv)
                      : (isEnglish ? currentQuestion.item.capital_en : currentQuestion.item.capital_sv);
                    const answerText = isCountryToCapital
                      ? (isEnglish ? currentQuestion.item.capital_en : currentQuestion.item.capital_sv)
                      : (isEnglish ? currentQuestion.item.country_en : currentQuestion.item.country_sv);
                    
                    return renderMultipleChoice(questionText, answerText, currentQuestion.item);
                  })()}
                </div>
              )}
              
              {quizState && (
                <div className="mt-4 text-parchment/60 text-sm">
                  {t('euCapitals.score')}: {quizState.correct}/{quizState.total}
                </div>
              )}
            </div>
          )}

          {/* Map Panel */}
          {activeTab === 'map' && (
            <div className="bg-oxidized-teal/10 backdrop-blur-sm rounded-2xl p-6 border border-brass/30">
              <p className="text-parchment/80 mb-4">{t('euCapitals.mapNote')}</p>
              
              <div className="flex gap-4 mb-6">
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-oxidized-teal/20 border border-teal/40 text-parchment"
                >
                  {REGIONS.map(region => (
                    <option key={region} value={region}>
                      {t(`euCapitals.regions.${region.toLowerCase()}`)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setActiveTiles([])}
                  className="px-4 py-2 rounded-lg border border-teal/40 text-parchment/80 hover:bg-teal/10 transition-colors"
                >
                  {t('euCapitals.reset')}
                </button>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {filteredCountries.map(country => {
                  const name = isEnglish ? country.country_en : country.country_sv;
                  const capital = isEnglish ? country.capital_en : country.capital_sv;
                  const isActive = activeTiles.includes(country.code);
                  
                  return (
                    <button
                      key={country.code}
                      onClick={() => {
                        speak(`${name}. ${capital}`);
                        setActiveTiles(prev => 
                          prev.includes(country.code)
                            ? prev.filter(c => c !== country.code)
                            : [...prev, country.code]
                        );
                      }}
                      className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                        isActive
                          ? 'bg-brass/20 border-brass text-parchment transform -translate-y-1'
                          : 'bg-oxidized-teal/20 border-teal/40 text-parchment/80 hover:bg-teal/20 hover:-translate-y-0.5'
                      }`}
                      title={`${name} → ${capital}`}
                    >
                      <div className="font-bold text-sm">{country.code}</div>
                      <div className="text-xs mt-1">{name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-parchment/60 text-sm">
            {t('euCapitals.tip')}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EUCapitals;