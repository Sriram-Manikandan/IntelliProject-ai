import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 sm:max-w-[420px]">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">We value your privacy</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We use strictly necessary cookies to ensure our platform works securely. 
                We also use optional cookies to analyze traffic and improve your experience. 
                Read our <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">Privacy Policy</Link> for more details.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full pt-2">
            <button
              onClick={declineCookies}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              Decline Optional
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              Accept All
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
