import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Lock, User, ShieldCheck, Activity, FileText, Zap, LogOut, Plus, Globe, Calendar, Briefcase, KeyRound } from 'lucide-react';
import { User as UserType, Event, EventType } from '../types';
import ErrorTooltip from './ErrorTooltip';

interface ExecutivePortalProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    onAddEvent: (event: Event) => void;
}

const ExecutivePortal: React.FC<ExecutivePortalProps> = ({ user, setUser, onAddEvent }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Validation State
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [eventErrors, setEventErrors] = useState<Record<string, string>>({});

  // New Event Form State
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<{
      title: string;
      date: string;
      eventType: EventType;
      location: string;
      themes: string;
      description: string;
      targetAudience: string;
  }>({
      title: '',
      date: '',
      eventType: 'Summit',
      location: '',
      themes: '',
      description: '',
      targetAudience: ''
  });

  // Derived state for button disabling
  const isLoginValid = email.trim() !== '' && password.trim() !== '';
  const isEventValid = 
      newEvent.title.trim() !== '' && 
      newEvent.date !== '' && 
      newEvent.location.trim() !== '' && 
      newEvent.description.trim() !== '' && 
      newEvent.targetAudience.trim() !== '' && 
      newEvent.themes.trim() !== '';

  const validateLogin = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) errors.email = "Identity required";
    if (!password.trim()) errors.password = "Token required";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    loginSequence('ADMIN');
  };

  const loginSequence = (role: 'ADMIN' | 'EXECUTIVE') => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (role === 'ADMIN') {
        setUser({
            name: 'Alexander Sterling',
            role: 'ADMIN',
            organization: 'Global Cyber Dynamics',
            email: 'a.sterling@gcd.corp'
        });
      } else {
        setUser({
            name: 'Sarah Chen',
            role: 'EXECUTIVE',
            organization: 'Helix Financial Systems',
            email: 'schen@helix.fin'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const validateEventForm = () => {
      const errors: Record<string, string> = {};
      if (!newEvent.title.trim()) errors.title = "Event Title is required";
      if (!newEvent.date) errors.date = "Date selection required";
      if (!newEvent.location.trim()) errors.location = "Location required";
      if (!newEvent.description.trim()) errors.description = "Brief required";
      if (!newEvent.targetAudience.trim()) errors.targetAudience = "Audience required";
      if (!newEvent.themes.trim()) errors.themes = "Themes required";
      
      setEventErrors(errors);
      return Object.keys(errors).length === 0;
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateEventForm()) return;

      // Format date nicely
      const dateObj = new Date(newEvent.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const event: Event = {
          id: Date.now().toString(),
          title: newEvent.title,
          eventType: newEvent.eventType,
          date: formattedDate,
          location: newEvent.location,
          themes: newEvent.themes.split(',').map(t => t.trim()),
          isExclusive: true, // Executive created events are exclusive by default
          description: newEvent.description,
          targetAudience: newEvent.targetAudience
      };
      onAddEvent(event);
      setShowEventForm(false);
      setNewEvent({ title: '', date: '', eventType: 'Summit', location: '', themes: '', description: '', targetAudience: '' });
      setEventErrors({});
  };

  const handleAiAnalysis = async () => {
    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const apiKey = process.env.API_KEY;

      if (apiKey) {
         const ai = new GoogleGenAI({ apiKey: apiKey });
         const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Provide a high-level strategic executive brief on the convergence of Quantum Computing and Cybersecurity. Keep it concise, bulleted, and professional, suitable for a C-suite dashboard. Max 150 words.",
        });
        setAiResponse(response.text || "Analysis complete.");
      } else {
         // Descriptive Error for Missing Key
         setTimeout(() => {
            setAiResponse(`
**System Notice: Intelligence Feed Offline**

Unable to authenticate with the Generative Core. The required API Key configuration is missing.

To enable real-time strategic insights:
*   Verify the 'API_KEY' environment variable is set.
*   Ensure the key has appropriate permissions for the Gemini API.

Displaying cached protocols is currently disabled for security compliance.
            `);
         }, 1500);
      }
    } catch (error) {
      console.error("AI Error", error);
      setAiResponse("System Notice: AI Intelligence feed temporarily unavailable. Please consult the manual reports.");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (user) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10 animate-fade-in">
                <div>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center tracking-tight">
                        <ShieldCheck className="mr-4 text-nexus-primary h-10 w-10 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
                        Executive Dashboard
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg font-light">
                        Welcome, <span className="text-slate-900 dark:text-white font-medium">{user.name}</span> <span className="mx-2 text-nexus-primary">•</span> {user.organization}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                        user.role === 'ADMIN' 
                        ? 'bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/30' 
                        : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    }`}>
                        {user.role} ACCOUNT
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</p>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 animate-slide-up">
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Market Risk Index</h3>
                        <Activity className="text-yellow-500 h-6 w-6" />
                    </div>
                    <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-500 mb-2 dark:text-glow">HIGH VOLATILITY</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">SECTOR: FINANCIAL SERVICES // REGION: LONDON</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Network Activity</h3>
                        <User className="text-purple-500 h-6 w-6" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">12 <span className="text-xl text-slate-500 font-normal">Active Peers</span></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">GROUP: QUANTUM_RESISTANCE_V2</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Next Event</h3>
                        <Briefcase className="text-green-500 h-6 w-6" />
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mb-2 truncate">Davos Cyber Retreat</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">STATUS: REGISTERED // JAN 20, 2025</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
                
                {/* AI Briefing Module */}
                <div className="glass-panel p-8 rounded-2xl flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                            <Zap className="mr-3 text-nexus-glow h-6 w-6" />
                            AI Business Insights
                        </h3>
                        <button 
                            onClick={handleAiAnalysis}
                            disabled={isAiLoading}
                            className={`px-4 py-2 bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/50 font-semibold rounded-lg hover:bg-nexus-primary hover:text-nexus-darker transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm`}
                        >
                            {isAiLoading ? 'Synthesizing...' : 'Generate Brief'}
                        </button>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-black/40 p-6 rounded-xl border border-slate-200 dark:border-white/5 flex-grow font-mono text-sm leading-relaxed overflow-y-auto max-h-[400px]">
                        {isAiLoading ? (
                            <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
                                <div className="relative w-12 h-12">
                                    <div className="absolute inset-0 border-t-2 border-nexus-primary rounded-full animate-spin"></div>
                                    <div className="absolute inset-2 border-t-2 border-purple-500 rounded-full animate-spin reverse"></div>
                                </div>
                                <span className="text-nexus-primary animate-pulse text-xs uppercase tracking-widest">Generating Analysis...</span>
                            </div>
                        ) : aiResponse ? (
                            <div className="prose prose-invert max-w-none text-slate-700 dark:text-slate-300">
                                {aiResponse.split('\n').map((line, i) => (
                                    <p key={i} className="mb-3">
                                        {line.startsWith('**') ? <strong className="text-nexus-primary dark:text-nexus-glow">{line.replace(/\*\*/g, '')}</strong> : line.replace(/\*\*/g, '')}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <div className="text-slate-500 dark:text-slate-600 flex flex-col items-center justify-center py-10 h-full">
                                <FileText className="h-16 w-16 mb-4 opacity-30" />
                                <p>Ready to generate. Select "Generate Brief" to start.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Strategic Event Deployment Module - Only for ADMIN */}
                {user.role === 'ADMIN' ? (
                    <div className="glass-panel p-8 rounded-2xl h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                                <Globe className="mr-3 text-emerald-500 dark:text-emerald-400 h-6 w-6" />
                                Event Management
                            </h3>
                            <button 
                                onClick={() => { setShowEventForm(!showEventForm); setEventErrors({}); }}
                                className="p-2 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"
                            >
                                <Plus className={`h-5 w-5 transition-transform duration-300 ${showEventForm ? 'rotate-45' : ''}`} />
                            </button>
                        </div>

                        {!showEventForm ? (
                            <div className="bg-white/50 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/5 p-8 flex flex-col items-center justify-center text-center h-[300px]">
                                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center mb-4">
                                    <Calendar className="h-8 w-8 text-slate-500" />
                                </div>
                                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Create New Event</h4>
                                <p className="text-slate-500 text-sm max-w-xs mb-6">Create high-priority gatherings for the C-Suite network. All events created here are marked as Exclusive.</p>
                                <button 
                                    onClick={() => { setShowEventForm(true); setEventErrors({}); }}
                                    className="px-6 py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl transition-all font-medium flex items-center shadow-sm"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Configure Event
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitEvent} noValidate className="space-y-4 bg-white/50 dark:bg-black/40 p-6 rounded-xl border border-slate-200 dark:border-white/5 animate-fade-in max-h-[400px] overflow-y-auto">
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Event Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        className={`w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm ${eventErrors.title ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary'}`}
                                        placeholder="e.g. Asia-Pacific Cyber Defense Forum"
                                        value={newEvent.title}
                                        onChange={e => {
                                            setNewEvent({...newEvent, title: e.target.value});
                                            if (eventErrors.title) setEventErrors({...eventErrors, title: ''});
                                        }}
                                    />
                                    {eventErrors.title && <ErrorTooltip message={eventErrors.title} />}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Timeline</label>
                                        <input 
                                            type="date" 
                                            required
                                            className={`w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm [color-scheme:light] dark:[color-scheme:dark] ${eventErrors.date ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary'}`}
                                            value={newEvent.date}
                                            onChange={e => {
                                                setNewEvent({...newEvent, date: e.target.value});
                                                if (eventErrors.date) setEventErrors({...eventErrors, date: ''});
                                            }}
                                        />
                                        {eventErrors.date && <ErrorTooltip message={eventErrors.date} />}
                                    </div>
                                    <div className="relative">
                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Category</label>
                                        <select
                                            required
                                            className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm appearance-none"
                                            value={newEvent.eventType}
                                            onChange={e => setNewEvent({...newEvent, eventType: e.target.value as EventType})}
                                        >
                                            <option value="Summit" className="bg-white dark:bg-slate-900">Summit</option>
                                            <option value="Conference" className="bg-white dark:bg-slate-900">Conference</option>
                                            <option value="Workshop" className="bg-white dark:bg-slate-900">Workshop</option>
                                            <option value="Retreat" className="bg-white dark:bg-slate-900">Retreat</option>
                                            <option value="Webinar" className="bg-white dark:bg-slate-900">Webinar</option>
                                            <option value="Briefing" className="bg-white dark:bg-slate-900">Briefing</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Location</label>
                                    <input 
                                        type="text" 
                                        required
                                        className={`w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm ${eventErrors.location ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary'}`}
                                        placeholder="e.g. Tokyo, JP"
                                        value={newEvent.location}
                                        onChange={e => {
                                            setNewEvent({...newEvent, location: e.target.value});
                                            if (eventErrors.location) setEventErrors({...eventErrors, location: ''});
                                        }}
                                    />
                                    {eventErrors.location && <ErrorTooltip message={eventErrors.location} />}
                                </div>

                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Description</label>
                                    <textarea 
                                        required
                                        className={`w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm resize-none h-20 ${eventErrors.description ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary'}`}
                                        placeholder="Brief description of the event..."
                                        value={newEvent.description}
                                        onChange={e => {
                                            setNewEvent({...newEvent, description: e.target.value});
                                            if (eventErrors.description) setEventErrors({...eventErrors, description: ''});
                                        }}
                                    />
                                    {eventErrors.description && <ErrorTooltip message={eventErrors.description} />}
                                </div>
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Target Participants</label>
                                    <input 
                                        type="text" 
                                        required
                                        className={`w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm ${eventErrors.targetAudience ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary'}`}
                                        placeholder="e.g. CISOs, Government Officials"
                                        value={newEvent.targetAudience}
                                        onChange={e => {
                                            setNewEvent({...newEvent, targetAudience: e.target.value});
                                            if (eventErrors.targetAudience) setEventErrors({...eventErrors, targetAudience: ''});
                                        }}
                                    />
                                    {eventErrors.targetAudience && <ErrorTooltip message={eventErrors.targetAudience} />}
                                </div>
                                <div className="relative">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Strategic Themes</label>
                                    <input 
                                        type="text" 
                                        required
                                        className={`w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm ${eventErrors.themes ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary'}`}
                                        placeholder="e.g. AI Ethics, Zero Trust"
                                        value={newEvent.themes}
                                        onChange={e => {
                                            setNewEvent({...newEvent, themes: e.target.value});
                                            if (eventErrors.themes) setEventErrors({...eventErrors, themes: ''});
                                        }}
                                    />
                                    {eventErrors.themes && <ErrorTooltip message={eventErrors.themes} />}
                                </div>
                                <div className="pt-2 flex gap-3">
                                    <button 
                                        type="submit"
                                        disabled={!isEventValid}
                                        className={`flex-1 py-3 rounded-lg font-bold transition-all text-sm uppercase tracking-wide shadow-lg ${
                                            !isEventValid
                                            ? 'bg-slate-300 dark:bg-white/5 text-slate-500 border border-slate-300 dark:border-white/5 cursor-not-allowed opacity-60'
                                            : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                                        }`}
                                    >
                                        Publish Event
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => { setShowEventForm(false); setEventErrors({}); }}
                                        className="px-4 py-3 bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <div className="glass-panel p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center opacity-80">
                         <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center mb-4">
                            <Lock className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Event Creation Restricted</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Your access level (EXECUTIVE) permits viewing and attendance only. Contact an Administrator to elevate privileges.
                        </p>
                    </div>
                )}
            </div>
        </div>
      </div>
    );
  }

  // LOGIN VIEW
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
       {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nexus-primary/20 rounded-full blur-[128px] pointer-events-none opacity-50 dark:opacity-100"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none opacity-50 dark:opacity-100"></div>

      <div className="max-w-md w-full space-y-8 glass-panel p-12 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl animate-slide-up">
        
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-nexus-primary to-nexus-accent rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(14,165,233,0.4)] transform rotate-3">
                <Lock className="h-8 w-8 text-white" />
            </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Member Login
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Please sign in to your professional account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin} noValidate>
          
          {/* Quick Access Section */}
          <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 mb-6">
             <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                <KeyRound className="w-3 h-3 mr-1" /> Demo Accounts
             </h4>
             <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => loginSequence('ADMIN')}
                    className="px-3 py-2 bg-slate-200 dark:bg-white/10 hover:bg-nexus-primary/20 hover:text-nexus-primary rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-nexus-primary/30"
                >
                    Load Admin
                </button>
                <button
                    type="button"
                    onClick={() => loginSequence('EXECUTIVE')}
                    className="px-3 py-2 bg-slate-200 dark:bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-500 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-emerald-500/30"
                >
                    Load Member
                </button>
             </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (loginErrors.email) setLoginErrors({...loginErrors, email: ''});
                }}
                className={`w-full glass-input px-5 py-4 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${loginErrors.email ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary focus:border-transparent'}`}
                placeholder="Business Email"
              />
              {loginErrors.email && <ErrorTooltip message={loginErrors.email} />}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginErrors.password) setLoginErrors({...loginErrors, password: ''});
                }}
                className={`w-full glass-input px-5 py-4 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${loginErrors.password ? 'border-rose-500 focus:ring-rose-500' : 'focus:ring-nexus-primary focus:border-transparent'}`}
                placeholder="Password"
              />
              {loginErrors.password && <ErrorTooltip message={loginErrors.password} />}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !isLoginValid}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all uppercase tracking-wider ${
                  isLoading || !isLoginValid 
                  ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-50' 
                  : 'bg-nexus-primary hover:bg-nexus-glow shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-primary'
              }`}
            >
              {isLoading ? (
                  <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                  </span>
              ) : (
                  'Sign In'
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-center pt-2">
             <a href="mailto:admin@thesummitnexus.com" className="text-xs text-nexus-primary hover:text-nexus-glow transition-colors border-b border-nexus-primary/30 hover:border-nexus-glow pb-0.5">Apply for Membership</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExecutivePortal;