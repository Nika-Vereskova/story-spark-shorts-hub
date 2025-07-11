
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { t, getCurrentLocale } from '@/lib/i18n';

const Moved = () => {
  const locale = getCurrentLocale();

  useEffect(() => {
    console.log("User accessed old URL - showing moved notice");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment bg-gear-pattern">
      <div className="text-center p-8 bg-parchment/90 border-2 border-brass shadow-brass-drop relative max-w-lg mx-auto">
        {/* Ornate brass corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
        
        <h1 className="text-5xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
          📖 Site Moved!
        </h1>
        <p className="text-xl text-brass mb-4 font-inter">
          This clockwork chronicle has relocated to a new workshop!
        </p>
        <p className="text-lg text-oxidized-teal mb-6 font-inter">
          You can now find all of Nika's steampunk tales at the new location.
        </p>
        
        <div className="space-y-4">
          <a 
            href="https://nika-vereskova.lovable.app/en/" 
            className="inline-block bg-brass hover:bg-brass-dark text-parchment px-8 py-3 border-2 border-brass-dark shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-inter font-medium rounded text-lg"
          >
            Enter the New Workshop
          </a>
          
          <p className="text-sm text-oxidized-teal/80 mt-4">
            Please update your bookmarks to: <br />
            <span className="font-mono text-brass">https://nika-vereskova.lovable.app/en/</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Moved;
