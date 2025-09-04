import React from 'react';
import { Brain, Settings } from 'lucide-react';
import { t } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AdSenseBanner from '@/components/AdSenseBanner';
import AdSenseSquare from '@/components/AdSenseSquare';
import SteampunkGearCluster from '@/components/SteampunkGearCluster';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactCTA from '@/components/ContactCTA';

const LearnAI = () => {
  const { elementRef: headerRef } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-parchment bg-gear-pattern relative">
      <SEO 
        title="Learn AI - Artificial Intelligence Education | STEaM LOGIC Studio AB" 
        description="Learn AI fundamentals, advanced techniques, and practical applications. Educational resources, widgets, and interactive tools for AI learning."
      />
      
      {/* Decorative Gear Clusters */}
      <SteampunkGearCluster 
        className="opacity-10" 
        size="lg" 
        position="top-left" 
      />
      <SteampunkGearCluster 
        className="opacity-15" 
        size="md" 
        position="top-right" 
      />
      <SteampunkGearCluster 
        className="opacity-20" 
        size="sm" 
        position="bottom-left" 
      />
      <SteampunkGearCluster 
        className="opacity-10" 
        size="lg" 
        position="bottom-right" 
      />
      
      {/* Floating gears */}
      <Settings className="absolute top-32 left-8 w-14 h-14 text-brass/15 animate-gear-rotation" style={{animationDelay: '1s'}} />
      <Settings className="absolute top-1/3 right-8 w-10 h-10 text-brass/20 animate-gear-rotation" style={{animationDelay: '3s'}} />
      <Settings className="absolute bottom-40 left-1/4 w-12 h-12 text-brass/10 animate-gear-rotation" style={{animationDelay: '5s'}} />

      <Navigation currentPage="learn-ai" />

      <div className="pt-24 pb-16 px-6">
        <AdSenseBanner position="top" />
        
        <div className="container mx-auto">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16 relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Brain className="w-16 h-16 text-brass animate-pulse" />
              <Settings className="w-12 h-12 text-oxidized-teal animate-gear-rotation" />
            </div>
            
            <h1 className="text-5xl md:text-6xl text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop">
              {t('learnAI.title')}
            </h1>
            <p className="text-xl text-oxidized-teal/80 max-w-3xl mx-auto font-inter leading-relaxed">
              {t('learnAI.subtitle')}
            </p>
          </div>

          <AdSenseSquare size="medium" />

          {/* Introduction Section */}
          <div className="mb-16 bg-parchment/90 border-2 border-brass/30 p-8 shadow-brass-drop relative">
            {/* Ornate corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brass z-10"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brass z-10"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brass z-10"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brass z-10"></div>

            <h2 className="text-3xl text-oxidized-teal mb-4 font-playfair text-center">
              {t('learnAI.introduction.title')}
            </h2>
            <p className="text-lg text-oxidized-teal/80 font-inter text-center max-w-2xl mx-auto">
              {t('learnAI.introduction.description')}
            </p>
          </div>

          {/* Widget Areas */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Primary Widget Area */}
            <div className="bg-gradient-to-br from-brass/10 to-oxidized-teal/10 border-2 border-brass/40 p-8 shadow-brass-drop relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>

              <h3 className="text-2xl text-oxidized-teal mb-4 font-playfair">
                {t('learnAI.primaryWidget.title')}
              </h3>
              
              {/* Widget Container - Replace with your widget code */}
              <div className="min-h-[300px] bg-parchment/50 border border-brass/20 p-4 flex items-center justify-center">
                <p className="text-oxidized-teal/60 font-inter italic">
                  {/* Primary AI Learning Widget will be inserted here */}
                  // STEaM‑Logic | AI Onboarding Course Widget (React)
// Self‑contained component: no external UI libs required. Uses Tailwind classes.
// Features: multilingual (EN/SV), lesson list, search/filter, progress tracking (localStorage),
// streak counter, basic quiz support, practice prompts w/ copy, export/reset progress.
// Drop into your site as a React component. Default export provided.

import React, { useEffect, useMemo, useState } from "react";

const COURSE_ID = "sl_ai_onboarding_v1";
const LS_PROGRESS_KEY = `${COURSE_ID}_progress`;
const LS_STREAK_KEY = `${COURSE_ID}_streak`;
const LS_LANG_KEY = `${COURSE_ID}_lang`;

/** Utility */
const todayISO = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const isYesterday = (dateStr) => {
  const d = new Date(dateStr);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toDateString() === y.toDateString();
};

/** Sample Course Data — expand or replace with your own */
const lessons = [
  {
    id: "l1",
    type: "read",
    durationMin: 8,
    title: {
      en: "Welcome: What AI Can Do For You",
      sv: "Välkommen: Vad AI kan göra för dig",
    },
    content: {
      en:
        "Quick idea: AI helps you draft, tidy and plan faster. You’ll keep a simple AI Log and do tiny, real tasks—no jargon.",
      sv:
        "Snabb idé: AI hjälper dig att skriva utkast, städa texter och planera snabbare. Du för ett enkelt AI‑logg och gör små, verkliga uppgifter—utan jargong.",
    },
    practice: {
      en: "Create a note called ‘AI Log’. Add columns: date, task, prompt, result, one improvement.",
      sv: "Skapa en anteckning ‘AI Logg’. Lägg till kolumner: datum, uppgift, prompt, resultat, en förbättring.",
    },
  },
  {
    id: "l2",
    type: "read",
    durationMin: 10,
    title: { en: "The Sandwich Prompt", sv: "Sandwich‑prompten" },
    content: {
      en:
        "Pattern: Role → Task → Constraints → Context → Format. Example: ‘You are a friendly editor…’",
      sv:
        "Mönster: Roll → Uppgift → Begränsningar → Kontext → Format. Exempel: ‘Du är en vänlig redaktör…’",
    },
    practice: {
      en:
        "Use the Sandwich to ask for a 150‑word email to reschedule a meeting. Tone warm, crisp.",
      sv:
        "Använd Sandwich för att be om ett 150‑ords mejl för att boka om ett möte. Ton varm och tydlig.",
    },
  },
  {
    id: "l3",
    type: "practice",
    durationMin: 10,
    title: { en: "Email Rewrite (Day‑3 Win)", sv: "Omskrivning av mejl (Dag‑3)" },
    content: {
      en: "Paste a messy email draft. Ask AI to make it concise, kind, and action‑oriented.",
      sv: "Klistra in ett rörigt mejlutkast. Be AI göra det kort, vänligt och åtgärdsinriktat.",
    },
    practice: {
      en:
        "Prompt: ‘You are a professional assistant. Rewrite this email to be 130–160 words, warm but firm, with a clear ask and deadline. Keep my voice.\n[PASTE]’",
      sv:
        "Prompt: ‘Du är en professionell assistent. Skriv om detta mejl till 130–160 ord, varmt men bestämt, med tydlig fråga och deadline. Behåll min röst.\n[KLIS TRA HÄR]’",
    },
  },
  {
    id: "l4",
    type: "practice",
    durationMin: 10,
    title: { en: "Summarize an Article", sv: "Sammanfatta en artikel" },
    content: {
      en: "Pick any article. Get 5 bullets + 2 personal takeaways.",
      sv: "Välj en artikel. Få 5 punkter + 2 personliga insikter.",
    },
    practice: {
      en:
        "‘Give me a 5‑bullet summary in plain English + 2 takeaways for me as a beginner. Link key terms.’",
      sv:
        "‘Ge mig en sammanfattning i 5 punkter + 2 insikter för mig som nybörjare. Länka nyckeltermer.’",
    },
  },
  {
    id: "l5",
    type: "practice",
    durationMin: 10,
    title: { en: "Turn a Goal into a Mini‑Plan", sv: "Gör en mini‑plan av ett mål" },
    content: {
      en: "AI can break a goal into 5 steps with risks and a 30‑minute first step.",
      sv: "AI kan bryta ner ett mål i 5 steg med risker och ett 30‑minuters första steg.",
    },
    practice: {
      en:
        "‘Turn this goal into a 5‑step mini‑plan with time estimates, risks, and a 30‑minute first step. Goal: [TEXT].’",
      sv:
        "‘Gör detta mål till en mini‑plan i 5 steg med tidsuppskattning, risker och ett första steg på 30 minuter. Mål: [TEXT].’",
    },
  },
  {
    id: "l6",
    type: "quiz",
    durationMin: 6,
    title: { en: "Safety & Privacy Basics", sv: "Säkerhet & integritet" },
    content: {
      en: "What should you avoid pasting into a chat assistant?",
      sv: "Vad bör du undvika att klistra in i en chattassistent?",
    },
    quiz: {
      question: {
        en: "Select the best answer:",
        sv: "Välj bästa svaret:",
      },
      options: [
        {
          en: "Anything longer than 200 words",
          sv: "Allt som är längre än 200 ord",
        },
        {
          en: "Sensitive personal data (IDs, banking, private details)",
          sv: "Känsliga personuppgifter (ID, bank, privata detaljer)",
        },
        { en: "Public blog posts", sv: "Offentliga blogginlägg" },
      ],
      correctIndex: 1,
      explanation: {
        en: "Avoid secrets. Use placeholders like [Name] and ask for sources when factual claims matter.",
        sv: "Undvik hemligheter. Använd platshållare som [Namn] och be om källor när fakta är viktiga.",
      },
    },
  },
  {
    id: "l7",
    type: "read",
    durationMin: 7,
    title: { en: "Brainstorm + Score", sv: "Idégenerera + poängsätt" },
    content: {
      en: "Ask for 20 ideas, then score Impact/Effort/Fun (0–5) and pick the top 3.",
      sv: "Be om 20 idéer, poängsätt Effekt/Insats/Kul (0–5) och välj topp 3.",
    },
    practice: {
      en:
        "‘List 20 ideas for [problem]. Score 0–5 on Impact, Effort, Fun. Return the top 3 with first steps.’",
      sv:
        "‘Lista 20 idéer för [problem]. Sätt 0–5 på Effekt, Insats, Kul. Ge topp 3 med första steg.’",
    },
  },
  {
    id: "l8",
    type: "read",
    durationMin: 6,
    title: { en: "Graduate & Next Steps", sv: "Examen & nästa steg" },
    content: {
      en: "Pick a track (Work/Home/Creative). Create 3 reusable prompts for next month.",
      sv: "Välj ett spår (Arbete/Hem/Kreativt). Skapa 3 återanvändbara promptar för nästa månad.",
    },
    practice: {
      en: "Write your 3 golden prompts and pin them.",
      sv: "Skriv dina 3 guld‑promptar och fäst dem.",
    },
  },
];

const TYPES = [
  { id: "read", label: { en: "Read", sv: "Läs" } },
  { id: "practice", label: { en: "Practice", sv: "Öva" } },
  { id: "quiz", label: { en: "Quiz", sv: "Quiz" } },
];

export default function SteamLogicAICourseWidget() {
  const [lang, setLang] = useState(() => localStorage.getItem(LS_LANG_KEY) || "en");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState([]); // array of type ids
  const [expanded, setExpanded] = useState(null); // lesson id
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_PROGRESS_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [streak, setStreak] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(LS_STREAK_KEY) || "null") || {
          current: 0,
          lastDate: null,
        }
      );
    } catch {
      return { current: 0, lastDate: null };
    }
  });
  const t = (en, sv) => (lang === "en" ? en : sv);

  useEffect(() => {
    localStorage.setItem(LS_LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(LS_STREAK_KEY, JSON.stringify(streak));
  }, [streak]);

  const total = lessons.length;
  const completedCount = useMemo(
    () => Object.values(progress).filter(Boolean).length,
    [progress]
  );
  const percent = Math.round((completedCount / total) * 100);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return lessons.filter((les) => {
      const matchesSearch = !s || les.title[lang].toLowerCase().includes(s);
      const matchesType = !typeFilter.length || typeFilter.includes(les.type);
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter, lang]);

  const markDone = (lessonId) => {
    if (progress[lessonId]) return; // already done
    const newProg = { ...progress, [lessonId]: true };
    setProgress(newProg);
    // Streak logic: if lastDate is yesterday or today, increment; else reset to 1
    const today = todayISO();
    setStreak((prev) => {
      if (!prev.lastDate) return { current: 1, lastDate: today };
      if (prev.lastDate === today || isYesterday(prev.lastDate)) {
        const alreadyCountedToday = prev.lastDate === today;
        return {
          current: alreadyCountedToday ? prev.current : prev.current + 1,
          lastDate: today,
        };
      }
      return { current: 1, lastDate: today };
    });
  };

  const resetProgress = () => {
    if (!confirm(t("Reset all progress?", "Återställ all framsteg?"))) return;
    setProgress({});
    setStreak({ current: 0, lastDate: null });
  };

  const exportProgress = () => {
    const data = {
      courseId: COURSE_ID,
      exportedAt: new Date().toISOString(),
      lang,
      progress,
      streak,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${COURSE_ID}_progress.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const toggleType = (id) => {
    setTypeFilter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-teal-900">
              STEaM‑Logic • AI Onboarding
            </h1>
            <p className="text-slate-700 mt-1">
              {t(
                "A tiny course for real‑life wins. 10 minutes a day.",
                "En liten kurs för verkliga vinster. 10 minuter per dag."
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <button
              onClick={exportProgress}
              className="px-3 py-2 rounded-xl border bg-white hover:bg-slate-50 text-slate-800"
            >
              {t("Export", "Exportera")}
            </button>
            <button
              onClick={resetProgress}
              className="px-3 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-800"
            >
              {t("Reset", "Återställ")}
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label={t("Progress", "Framsteg")}
            value={`${completedCount}/${total}`}
            sub={<ProgressBar value={percent} />}
          />
          <StatCard
            label={t("Streak", "Streak")}
            value={`${streak.current} ${t("days", "dagar")}`}
            sub={
              <span className="text-xs text-slate-600">
                {streak.lastDate
                  ? t("Last activity:", "Senast aktiv:") + " " + streak.lastDate
                  : t("No activity yet", "Ingen aktivitet ännu")}
              </span>
            }
          />
          <StatCard
            label={t("Language", "Språk")}
            value={lang === "en" ? "English" : "Svenska"}
            sub={<span className="text-xs text-slate-600">{t("Toggle above","Byt ovan")}</span>}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder={t("Search lessons…", "Sök lektioner…")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
        <div className="flex flex-wrap gap-2">
          {TYPES.map((tp) => (
            <button
              key={tp.id}
              onClick={() => toggleType(tp.id)}
              className={`px-3 py-1.5 rounded-full border ${
                typeFilter.includes(tp.id)
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tp.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            lang={lang}
            expanded={expanded === lesson.id}
            onExpand={() => setExpanded((prev) => (prev === lesson.id ? null : lesson.id))}
            completed={!!progress[lesson.id]}
            onDone={() => markDone(lesson.id)}
          />
        ))}
      </div>

      {/* Footer tip */}
      <p className="text-sm text-slate-500 mt-6">
        {t(
          "Tip: Add a 10‑minute weekly calendar block to keep momentum.",
          "Tips: Lägg in en 10‑minuters veckoblock i kalendern för att behålla farten."
        )}
      </p>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-xl font-semibold text-slate-900 mt-1">{value}</div>
      {sub && <div className="mt-2">{sub}</div>}
    </div>
  );
}

function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full bg-teal-600"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border bg-white">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-2 rounded-xl ${
          lang === "en" ? "bg-teal-600 text-white" : "hover:bg-slate-50"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("sv")}
        className={`px-3 py-2 rounded-xl ${
          lang === "sv" ? "bg-teal-600 text-white" : "hover:bg-slate-50"
        }`}
      >
        SV
      </button>
    </div>
  );
}

function LessonCard({ lesson, lang, expanded, onExpand, completed, onDone }) {
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState(null); // quiz index
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
    setCopied(false);
  }, [expanded]);

  const canComplete = () => {
    if (lesson.type !== "quiz") return true;
    return submitted && selected === lesson.quiz.correctIndex;
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {}
  };

  return (
    <div className={`rounded-2xl border bg-white ${completed ? "opacity-90" : ""}`}>
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TypeBadge type={lesson.type} lang={lang} />
            <span className="text-xs text-slate-500">{lesson.durationMin} min</span>
          </div>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {lesson.title[lang]}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {completed && (
            <span className="inline-flex items-center gap-1 text-teal-700 text-xs font-medium">
              <CheckIcon /> Done
            </span>
          )}
          <button
            onClick={onExpand}
            className="px-3 py-1.5 rounded-xl border bg-slate-50 hover:bg-slate-100 text-slate-700"
          >
            {expanded ? (lang === "en" ? "Close" : "Stäng") : lang === "en" ? "Open" : "Öppna"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-slate-50 p-4 text-slate-800 whitespace-pre-wrap">{lesson.content[lang]}</div>

          {lesson.type !== "quiz" && lesson.practice && (
            <div className="mt-3">
              <div className="text-sm font-medium text-slate-700 mb-1">
                {lang === "en" ? "Try this:" : "Testa detta:"}
              </div>
              <div className="rounded-xl bg-white border p-3 whitespace-pre-wrap">{lesson.practice[lang]}</div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleCopy(lesson.practice[lang])}
                  className="px-3 py-1.5 rounded-xl border bg-white hover:bg-slate-50"
                >
                  {copied ? (lang === "en" ? "Copied!" : "Kopierat!") : lang === "en" ? "Copy prompt" : "Kopiera prompt"}
                </button>
                <a
                  href="https://chat.openai.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl border bg-white hover:bg-slate-50"
                >
                  {lang === "en" ? "Open Chat" : "Öppna Chat"}
                </a>
              </div>
            </div>
          )}

          {lesson.type === "quiz" && lesson.quiz && (
            <div className="mt-3">
              <div className="text-sm text-slate-700 mb-2">{lesson.quiz.question[lang]}</div>
              <div className="space-y-2">
                {lesson.quiz.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q_${lesson.id}`}
                      checked={selected === idx}
                      onChange={() => setSelected(idx)}
                    />
                    <span>{opt[lang]}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-3 py-1.5 rounded-xl border bg-white hover:bg-slate-50"
                >
                  {lang === "en" ? "Submit" : "Skicka"}
                </button>
                {submitted && (
                  <span className={`text-sm ${selected === lesson.quiz.correctIndex ? "text-teal-700" : "text-rose-700"}`}>
                    {selected === lesson.quiz.correctIndex
                      ? tLocal(lang, "Correct!", "Rätt!")
                      : tLocal(lang, "Try again.", "Försök igen.")}
                  </span>
                )}
              </div>
              {submitted && selected === lesson.quiz.correctIndex && (
                <div className="mt-2 text-xs text-slate-600">
                  {lesson.quiz.explanation[lang]}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <button
              disabled={completed || !canComplete()}
              onClick={onDone}
              className={`px-3 py-2 rounded-xl border ${
                completed || !canComplete()
                  ? "bg-slate-100 text-slate-400"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              {completed
                ? lang === "en" ? "Completed" : "Klar"
                : lang === "en" ? "Mark as done" : "Markera klar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TypeBadge({ type, lang }) {
  const map = {
    read: { en: "Read", sv: "Läs" },
    practice: { en: "Practice", sv: "Öva" },
    quiz: { en: "Quiz", sv: "Quiz" },
  };
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-teal-600 text-white">
      <BookIcon /> {map[type][lang]}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-teal-700">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h7a4 4 0 014 4v10a2 2 0 00-2-2H6a2 2 0 00-2 2V6a2 2 0 012-2z"/>
    </svg>
  );
}

function tLocal(lang, en, sv) {
  return lang === "en" ? en : sv;
}

                </p>
              </div>
            </div>

            {/* Secondary Widget Area */}
            <div className="bg-gradient-to-br from-oxidized-teal/10 to-brass/10 border-2 border-oxidized-teal/40 p-8 shadow-brass-drop relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-oxidized-teal"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-oxidized-teal"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-oxidized-teal"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-oxidized-teal"></div>

              <h3 className="text-2xl text-oxidized-teal mb-4 font-playfair">
                {t('learnAI.secondaryWidget.title')}
              </h3>
              
              {/* Widget Container - Replace with your widget code */}
              <div className="min-h-[300px] bg-parchment/50 border border-oxidized-teal/20 p-4 flex items-center justify-center">
                <p className="text-oxidized-teal/60 font-inter italic">
                  {/* Secondary AI Tool Widget will be inserted here */}
                  Widget placeholder - Replace with your AI practice tool
                </p>
              </div>
            </div>
          </div>

          <AdSenseBanner position="middle" />

          {/* Learning Resources Section */}
          <div className="mb-16">
            <h2 className="text-4xl text-oxidized-teal mb-8 font-playfair text-center">
              {t('learnAI.resources.title')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Beginner Resources */}
              <div className="bg-parchment/90 border-2 border-brass/30 p-6 shadow-brass-drop">
                <h3 className="text-xl text-brass mb-3 font-playfair">
                  {t('learnAI.resources.beginner.title')}
                </h3>
                <p className="text-oxidized-teal/80 font-inter">
                  {t('learnAI.resources.beginner.description')}
                </p>
              </div>

              {/* Intermediate Resources */}
              <div className="bg-parchment/90 border-2 border-oxidized-teal/30 p-6 shadow-brass-drop">
                <h3 className="text-xl text-oxidized-teal mb-3 font-playfair">
                  {t('learnAI.resources.intermediate.title')}
                </h3>
                <p className="text-oxidized-teal/80 font-inter">
                  {t('learnAI.resources.intermediate.description')}
                </p>
              </div>

              {/* Advanced Resources */}
              <div className="bg-parchment/90 border-2 border-brass/30 p-6 shadow-brass-drop">
                <h3 className="text-xl text-brass mb-3 font-playfair">
                  {t('learnAI.resources.advanced.title')}
                </h3>
                <p className="text-oxidized-teal/80 font-inter">
                  {t('learnAI.resources.advanced.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width Interactive Widget Area */}
          <div className="mb-16 bg-gradient-to-r from-brass/20 to-oxidized-teal/20 border-2 border-brass/30 p-8 shadow-brass-drop relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>

            <h2 className="text-3xl text-oxidized-teal mb-6 font-playfair text-center">
              {t('learnAI.interactiveWidget.title')}
            </h2>
            
            {/* Full-width widget container - Replace with your widget code */}
            <div className="min-h-[400px] bg-parchment/50 border border-brass/20 p-6 flex items-center justify-center">
              <p className="text-oxidized-teal/60 font-inter italic text-center">
                {/* Interactive AI Learning Widget will be inserted here */}
                Interactive widget placeholder - Replace with your main AI learning interface
              </p>
            </div>
          </div>

          <ContactCTA />
        </div>
        
        <AdSenseBanner position="bottom" />
      </div>

      <Footer />
    </div>
  );
};

export default LearnAI;