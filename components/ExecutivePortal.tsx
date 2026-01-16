import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Lock, User, ShieldCheck, Activity, FileText, Zap, LogOut, Plus, Globe, Calendar, Briefcase, KeyRound } from 'lucide-react';
import { User as UserType, Event } from '../types';

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

  // New Event Form State
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
      title: '',
      date: '',
      location: '',
      themes: '',
      description: '',
      targetAudience: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleSubmitEvent = (e: React.FormEvent) => {
      e.preventDefault();
      const event: Event = {
          id: Date.now().toString(),
          title: newEvent.title,
          date: newEvent.date,
          location: newEvent.location,
          themes: newEvent.themes.split(',').map(t => t.trim()),
          isExclusive: true, // Executive created events are exclusive by default
          description: newEvent.description,
          targetAudience: newEvent.targetAudience
      };
      onAddEvent(event);
      setShowEventForm(false);
      setNewEvent({ title: '', date: '', location: '', themes: '', description: '', targetAudience: '' });
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
                        Secure Session Active: <span className="text-slate-900 dark:text-white font-medium">{user.name}</span> <span className="mx-2 text-nexus-primary">•</span> {user.organization}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                        user.role === 'ADMIN' 
                        ? 'bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/30' 
                        : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    }`}>
                        {user.role} Clearance
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</p>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 animate-slide-up">
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Global Threat Level</h3>
                        <Activity className="text-yellow-500 h-6 w-6" />
                    </div>
                    <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-500 mb-2 dark:text-glow">ELEVATED</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">SECTOR: FINANCIAL SERVICES // NODE: LONDON</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Network Consensus</h3>
                        <User className="text-purple-500 h-6 w-6" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">12 <span className="text-xl text-slate-500 font-normal">Peers</span></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">CHANNEL: QUANTUM_RESISTANCE_V2</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Next Deployment</h3>
                        <Briefcase className="text-green-500 h-6 w-6" />
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mb-2 truncate">Davos Cyber Retreat</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">STATUS: CONFIRMED // JAN 20, 2025</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
                
                {/* AI Briefing Module */}
                <div className="glass-panel p-8 rounded-2xl flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                            <Zap className="mr-3 text-nexus-glow h-6 w-6" />
                            AI Strategic Intelligence
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
                                <span className="text-nexus-primary animate-pulse text-xs uppercase tracking-widest">Querying Neural Net...</span>
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
                                <p>Awaiting directive. Select "Generate Brief" for analysis.</p>
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
                                Strategic Event Deployment
                            </h3>
                            <button 
                                onClick={() => setShowEventForm(!showEventForm)}
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
                                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Initialize New Summit</h4>
                                <p className="text-slate-500 text-sm max-w-xs mb-6">Create high-priority gatherings for the C-Suite network. All events created here are marked as Exclusive.</p>
                                <button 
                                    onClick={() => setShowEventForm(true)}
                                    className="px-6 py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl transition-all font-medium flex items-center shadow-sm"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Configure Event
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitEvent} className="space-y-4 bg-white/50 dark:bg-black/40 p-6 rounded-xl border border-slate-200 dark:border-white/5 animate-fade-in max-h-[400px] overflow-y-auto">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Event Directive (Title)</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm"
                                        placeholder="e.g. Asia-Pacific Cyber Defense Forum"
                                        value={newEvent.title}
                                        onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Timeline</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm"
                                            placeholder="e.g. Mar 12, 2025"
                                            value={newEvent.date}
                                            onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Coordinates</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm"
                                            placeholder="e.g. Tokyo, JP"
                                            value={newEvent.location}
                                            onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Mission Brief (Description)</label>
                                    <textarea 
                                        required
                                        className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm resize-none h-20"
                                        placeholder="Brief description of the event..."
                                        value={newEvent.description}
                                        onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Target Participants</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm"
                                        placeholder="e.g. CISOs, Government Officials"
                                        value={newEvent.targetAudience}
                                        onChange={e => setNewEvent({...newEvent, targetAudience: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Strategic Themes</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full glass-input px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-nexus-primary transition-all text-sm"
                                        placeholder="e.g. AI Ethics, Zero Trust"
                                        value={newEvent.themes}
                                        onChange={e => setNewEvent({...newEvent, themes: e.target.value})}
                                    />
                                </div>
                                <div className="pt-2 flex gap-3">
                                    <button 
                                        type="submit"
                                        className="flex-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50 py-3 rounded-lg font-bold hover:bg-emerald-500/30 transition-all text-sm uppercase tracking-wide shadow-lg"
                                    >
                                        Deploy
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setShowEventForm(false)}
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
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Event Deployment Restricted</h3>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Your clearance level (EXECUTIVE) permits viewing and attendance only. Contact an Administrator to elevate privileges.
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
            Restricted Access
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Secure Member Authentication Protocol
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          
          {/* Quick Access Section */}
          <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 mb-6">
             <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                <KeyRound className="w-3 h-3 mr-1" /> Quick Simulation Access
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
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input px-5 py-4 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:border-transparent transition-all"
                placeholder="Corporate Identity"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input px-5 py-4 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:border-transparent transition-all"
                placeholder="Encrypted Token"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-nexus-primary hover:bg-nexus-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-primary transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isLoading ? (
                  <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Credentials...
                  </span>
              ) : (
                  'Initiate Session'
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-center pt-2">
             <a href="#" className="text-xs text-nexus-primary hover:text-nexus-glow transition-colors border-b border-nexus-primary/30 hover:border-nexus-glow pb-0.5">Request Access Clearance</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExecutivePortal;