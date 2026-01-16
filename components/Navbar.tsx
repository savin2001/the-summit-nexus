import React, { useState, useRef, useEffect } from 'react';
import { ViewState, User } from '../types';
import { Shield, Menu, X, Lock, User as UserIcon, Sun, Moon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  user: User | null;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  user,
  onLogout,
  isDarkMode,
  toggleTheme
}) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Sectors', view: ViewState.HOME, sectionId: 'sectors' },
    { label: 'Knowledge Hub', view: ViewState.KNOWLEDGE },
    { label: 'Events', view: ViewState.EVENTS },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (view: ViewState, sectionId?: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    if (sectionId && view === ViewState.HOME) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
    onLogout();
    onNavigate(ViewState.HOME);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => onNavigate(ViewState.HOME)}>
            <div className="relative">
              <div className="absolute inset-0 bg-nexus-primary/50 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Shield className="h-8 w-8 text-nexus-primary mr-2 relative z-10" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-slate-900 dark:text-white">
              THE SUMMIT <span className="text-nexus-primary dark:text-glow">NEXUS</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view, item.sectionId)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    currentView === item.view && !item.sectionId
                      ? 'text-nexus-primary bg-nexus-primary/10 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

            </div>
          </div>

          <div className="hidden md:block relative" ref={dropdownRef}>
            {!user ? (
              <button
                onClick={() => onNavigate(ViewState.PORTAL)}
                className="flex items-center px-5 py-2.5 rounded-xl border border-nexus-primary/30 text-nexus-primary hover:bg-nexus-primary/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300 text-sm font-semibold tracking-wide ml-4"
              >
                 <Lock className="h-4 w-4 mr-2" />
                 MEMBER PORTAL
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center px-5 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 text-sm font-semibold tracking-wide ml-4"
                >
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
                   <UserIcon className="h-4 w-4 mr-2" />
                   {user.name.split(' ')[0]}
                   <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-fade-in origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.organization}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/30">
                        {user.role} ACCOUNT
                      </span>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigate(ViewState.PORTAL);
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-nexus-primary/10 hover:text-nexus-primary transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-3" />
                        My Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden items-center gap-2">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200 dark:border-white/5 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view, item.sectionId)}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
            {!user ? (
               <button
                onClick={() => handleNavClick(ViewState.PORTAL)}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-nexus-primary hover:bg-nexus-primary/10"
              >
                Member Portal
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick(ViewState.PORTAL)}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-emerald-500 hover:bg-emerald-500/10"
                >
                  Dashboard ({user.name})
                </button>
                 <button
                  onClick={onLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-500 hover:bg-red-500/10"
                >
                  Sign Out
                </button>
              </>
            )}
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;