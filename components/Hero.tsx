import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { ChevronRight, Globe, Lock } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Security Intelligence",
    "Global Tech Summits",
    "Elite Executive Networking",
    "Strategic Tech Alliances",
    "Industry-Leading Events"
  ];

  useEffect(() => {
    let timer: any;
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleTyping = () => {
      setText(prev => isDeleting 
        ? fullText.substring(0, prev.length - 1) 
        : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-nexus-primary/30 bg-nexus-primary/10 text-nexus-primary text-xs font-bold tracking-widest uppercase mb-10 backdrop-blur-sm shadow-lg shadow-nexus-primary/20">
            <span className="w-2 h-2 rounded-full bg-nexus-primary mr-3 animate-pulse"></span>
            Intelligence Updated: {new Date().toLocaleDateString()}
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">
            <span className="block mb-2 md:mb-4">Where Technology Meets</span>
            {/* Fixed height container to prevent layout shift */}
            <div className="h-[1.3em] flex items-center justify-center overflow-hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-primary to-nexus-glow typing-cursor inline-block pb-1 px-1 min-h-[1.2em]">
                {text}
              </span>
            </div>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
            The Summit Nexus is the premier unified platform connecting global tech leaders. 
            Access strategic insights, manage sector growth, and join exclusive C-Suite networking events.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up">
            <button
              onClick={() => onNavigate(ViewState.EVENTS)}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-nexus-primary hover:bg-nexus-glow transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transform hover:-translate-y-1"
            >
              <Globe className="mr-2 h-5 w-5" />
              Browse Events
            </button>
            <button
              onClick={() => onNavigate(ViewState.KNOWLEDGE)}
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 dark:border-slate-600 text-base font-bold rounded-xl text-slate-700 dark:text-white bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-all backdrop-blur-sm transform hover:-translate-y-1"
            >
              Access Knowledge Hub
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-60 dark:opacity-100 transition-opacity duration-500">
        <div className="absolute top-20 left-10 w-72 h-72 bg-nexus-primary/20 dark:bg-nexus-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default Hero;