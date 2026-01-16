import React, { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { ViewState } from '../types';
import ErrorTooltip from './ErrorTooltip';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address required");
      return;
    }
    // Simulate subscription
    alert("Subscription confirmed. Welcome to the intelligence feed.");
    setEmail('');
    setError('');
  };

  const isEmailValid = email.trim() !== '';

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-12 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-slate-900 dark:text-white font-bold text-xl mb-4">
               <Shield className="h-6 w-6 text-nexus-primary mr-2" />
               THE SUMMIT <span className="text-nexus-primary">NEXUS</span>
            </div>
            <p className="text-slate-600 dark:text-slate-500 text-sm">
              Empowering global leadership with unified technology intelligence and security frameworks.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate(ViewState.HOME)} className="hover:text-nexus-primary transition-colors text-left">
                  Sector Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(ViewState.EVENTS)} className="hover:text-nexus-primary transition-colors text-left">
                  Event Calendar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate(ViewState.PORTAL)} className="hover:text-nexus-primary transition-colors text-left">
                  Executive Portal
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-wider">Corporate</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate(ViewState.ABOUT)} className="hover:text-nexus-primary transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <a href="mailto:support@thesummitnexus.com" className="hover:text-nexus-primary transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate(ViewState.ABOUT)} className="hover:text-nexus-primary transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-wider">Newsletter Subscription</h4>
            <form className="flex flex-col gap-2 relative" onSubmit={handleSubscribe} noValidate>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-label="Email address for newsletter"
                  className={`w-full bg-white dark:bg-slate-900 border text-slate-900 dark:text-white px-3 py-2 rounded-sm text-sm focus:outline-none transition-colors ${error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800 focus:border-nexus-primary'}`}
                />
                {error && <ErrorTooltip message={error} />}
              </div>
              <button 
                type="submit" 
                disabled={!isEmailValid}
                className={`px-3 py-2 rounded-sm text-sm font-semibold transition-colors border ${
                  !isEmailValid
                  ? 'bg-slate-200 text-slate-400 border-slate-300 dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-nexus-primary/20 text-nexus-primary border-nexus-primary/50 hover:bg-nexus-primary hover:text-white dark:hover:text-nexus-darker'
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-600 text-xs">
            © 2024 The Summit Nexus. All Rights Reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-slate-500 text-xs">
              <CheckCircle className="h-4 w-4 mr-1 text-slate-600" /> ISO 27001
            </div>
            <div className="flex items-center text-slate-500 text-xs">
              <CheckCircle className="h-4 w-4 mr-1 text-slate-600" /> NATO Partner
            </div>
            <div className="flex items-center text-slate-500 text-xs">
              <CheckCircle className="h-4 w-4 mr-1 text-slate-600" /> GDPR Compliant
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;