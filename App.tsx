import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectorGrid from './components/SectorGrid';
import KnowledgeHub from './components/KnowledgeHub';
import EventCalendar from './components/EventCalendar';
import ExecutivePortal from './components/ExecutivePortal';
import Footer from './components/Footer';
import { ViewState, User, Event } from './types';
import { EVENTS as INITIAL_EVENTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Lifted State
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddEvent = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleRegister = (eventId: string) => {
    if (registeredEventIds.includes(eventId)) {
      setRegisteredEventIds(prev => prev.filter(id => id !== eventId));
    } else {
      setRegisteredEventIds(prev => [...prev, eventId]);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.KNOWLEDGE:
        return <KnowledgeHub />;
      case ViewState.EVENTS:
        return (
          <EventCalendar 
            events={events}
            registeredEventIds={registeredEventIds}
            onRegister={handleRegister}
            user={user}
            onNavigateToLogin={() => setCurrentView(ViewState.PORTAL)}
          />
        );
      case ViewState.PORTAL:
        return (
          <ExecutivePortal 
            user={user} 
            setUser={setUser} 
            onAddEvent={handleAddEvent}
          />
        );
      case ViewState.HOME:
      default:
        return (
          <>
            <Hero onNavigate={setCurrentView} />
            <SectorGrid />
            <div className="py-20 bg-gradient-to-b from-transparent to-slate-200/50 dark:to-slate-950/80 transition-colors duration-500">
               <div className="max-w-7xl mx-auto px-4 text-center">
                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">Access Complete Intelligence</h2>
                   <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg font-light">
                     Unlock the full potential of The Summit Nexus by accessing our Knowledge Hub or scheduling your attendance at premier industry summits.
                   </p>
                   <div className="flex flex-col sm:flex-row justify-center gap-6">
                      <button 
                        onClick={() => setCurrentView(ViewState.KNOWLEDGE)}
                        className="px-8 py-4 glass-panel rounded-xl text-nexus-primary hover:text-white hover:bg-nexus-primary transition-all duration-300 font-semibold tracking-wide shadow-lg"
                      >
                        Read Insights
                      </button>
                      <button 
                         onClick={() => setCurrentView(ViewState.EVENTS)}
                         className="px-8 py-4 bg-slate-200/50 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-300 dark:hover:bg-white/10 transition-all duration-300 font-semibold tracking-wide border border-slate-300 dark:border-white/10"
                      >
                        View Calendar
                      </button>
                   </div>
               </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen selection:bg-nexus-primary/30 ${isDarkMode ? 'dark' : ''}`}>
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="relative">
        <div key={currentView} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;