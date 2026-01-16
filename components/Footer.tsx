import React, { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const Footer: React.FC = () => {
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
              <li><a href="#" rel="nofollow" aria-label="Sector Intelligence (Demo)" className="hover:text-nexus-primary transition-colors">Sector Intelligence</a></li>
              <li><a href="#" rel="nofollow" aria-label="Event Calendar (Demo)" className="hover:text-nexus-primary transition-colors">Event Calendar</a></li>
              <li><a href="#" rel="nofollow" aria-label="Executive Portal (Demo)" className="hover:text-nexus-primary transition-colors">Executive Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-wider">Corporate</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" rel="nofollow" aria-label="About Us (Demo)" className="hover:text-nexus-primary transition-colors">About Us</a></li>
              <li><a href="#" rel="nofollow" aria-label="Contact Support (Demo)" className="hover:text-nexus-primary transition-colors">Contact Support</a></li>
              <li><a href="#" rel="nofollow" aria-label="Privacy Policy (Demo)" className="hover:text-nexus-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4 uppercase text-xs tracking-wider">Secure Newsletter</h4>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Work Email" 
                aria-label="Email address for newsletter"
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-nexus-primary transition-colors"
              />
              <button type="submit" className="bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/50 px-3 py-2 rounded-sm text-sm font-semibold hover:bg-nexus-primary hover:text-white dark:hover:text-nexus-darker transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-600 text-xs">
            © 2024 The Summit Nexus. All rights reserved. Restricted Use.
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