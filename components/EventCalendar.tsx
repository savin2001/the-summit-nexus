import React, { useState } from 'react';
import { Event, User } from '../types';
import { Calendar, MapPin, Star, ChevronRight, CheckCircle, Lock, Info, Users, X, Shield } from 'lucide-react';

interface EventCalendarProps {
  events: Event[];
  registeredEventIds: string[];
  onRegister: (eventId: string) => void;
  user: User | null;
  onNavigateToLogin: () => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ 
  events, 
  registeredEventIds, 
  onRegister, 
  user,
  onNavigateToLogin 
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };
  
  const handleRegisterFromModal = () => {
    if (!user) {
      onNavigateToLogin();
      return;
    }
    if (selectedEvent) {
      onRegister(selectedEvent.id);
      handleCloseDetails();
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Global <span className="text-nexus-primary dark:text-nexus-glow dark:text-glow">C-Level</span> Summits
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
             Exclusive gatherings for industry leaders to shape the future of technology and security.
          </p>
        </div>

        <div className="space-y-8">
          {events.map((event, index) => {
            const isRegistered = registeredEventIds.includes(event.id);
            
            return (
              <article 
                key={event.id} 
                className="glass-panel p-8 rounded-2xl md:flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all duration-300 border border-slate-200 dark:border-white/5 hover:border-nexus-primary/30 relative overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Decorative sheen */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

                <div className="flex-1 relative z-10">
                  <header className="flex items-start md:items-center gap-4 mb-3">
                    {event.isExclusive && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        <Star className="w-3 h-3 mr-1 fill-current" /> Exclusive
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-nexus-primary transition-colors">
                      {event.title}
                    </h3>
                  </header>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-slate-500 dark:text-slate-400 text-sm mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-nexus-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-nexus-primary" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.themes.map((theme) => (
                      <span key={theme} className="inline-block bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-nexus-primary/30 transition-colors">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 md:mt-0 md:ml-8 flex-shrink-0 relative z-10 flex flex-col gap-3 min-w-[200px]">
                   <button 
                    onClick={() => handleOpenDetails(event)}
                    className="w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center border border-slate-300 dark:border-slate-700 hover:border-nexus-primary text-slate-700 dark:text-slate-300 hover:text-nexus-primary bg-transparent hover:bg-nexus-primary/5"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Intelligence
                  </button>

                  <button 
                    onClick={() => handleOpenDetails(event)} // Redirects to modal first as per requirement
                    className={`w-full px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg ${
                      isRegistered 
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                        : 'bg-nexus-primary text-white dark:text-nexus-darker hover:bg-nexus-glow hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Access Granted
                      </>
                    ) : (
                      <>
                        Request Invitation
                        {user ? <ChevronRight className="w-5 h-5 ml-2" /> : <Lock className="w-4 h-4 ml-2 opacity-70" />}
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             {/* Backdrop */}
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={handleCloseDetails}></div>
             
             {/* Modal Content */}
             <div className="relative w-full max-w-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-start bg-slate-100 dark:bg-white/5">
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                        {selectedEvent.isExclusive && (
                           <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                             Exclusive
                           </span>
                        )}
                         <span className="text-nexus-primary text-xs font-bold tracking-wider uppercase">Event Protocol #{selectedEvent.id}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedEvent.title}</h3>
                   </div>
                   <button onClick={handleCloseDetails} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500 dark:text-slate-400" aria-label="Close modal">
                     <X className="w-6 h-6" />
                   </button>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto">
                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/5">
                         <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-1">
                            <Calendar className="w-3 h-3 mr-1.5" /> Date
                         </div>
                         <div className="text-slate-900 dark:text-white font-semibold">{selectedEvent.date}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/5">
                         <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider mb-1">
                            <MapPin className="w-3 h-3 mr-1.5" /> Coordinates
                         </div>
                         <div className="text-slate-900 dark:text-white font-semibold">{selectedEvent.location}</div>
                      </div>
                   </div>

                   <div className="mb-8">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                         <Info className="w-4 h-4 mr-2 text-nexus-primary" /> Mission Brief
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                         {selectedEvent.description || "Classified event details. Specific agenda items will be decrypted upon registration approval."}
                      </p>
                   </div>

                   <div className="mb-8 p-5 rounded-xl border border-nexus-primary/20 bg-nexus-primary/5">
                      <h4 className="text-sm font-bold text-nexus-primary uppercase tracking-wider mb-3 flex items-center">
                         <Users className="w-4 h-4 mr-2" /> Target Participants
                      </h4>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm font-medium">
                         {selectedEvent.targetAudience || "C-Level Executives, Government Officials, and Security Architects."}
                      </p>
                   </div>

                   <div>
                      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Key Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.themes.map(theme => (
                           <span key={theme} className="px-3 py-1 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-300 dark:border-white/10">
                              {theme}
                           </span>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                   <button 
                     onClick={handleCloseDetails}
                     className="px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-colors"
                   >
                     Close Intelligence
                   </button>
                   <button 
                     onClick={handleRegisterFromModal}
                     disabled={registeredEventIds.includes(selectedEvent.id)}
                     className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center ${
                        registeredEventIds.includes(selectedEvent.id)
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50 cursor-default'
                        : 'bg-nexus-primary text-white dark:text-nexus-darker hover:bg-nexus-glow'
                     }`}
                   >
                     {registeredEventIds.includes(selectedEvent.id) ? (
                        <>
                           <CheckCircle className="w-5 h-5 mr-2" />
                           Registered
                        </>
                     ) : (
                        <>
                           {!user && <Lock className="w-4 h-4 mr-2 opacity-70" />}
                           {user ? 'Confirm Attendance' : 'Login to Attend'}
                        </>
                     )}
                   </button>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventCalendar;