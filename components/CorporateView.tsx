import React from 'react';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

const CorporateView: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Corporate <span className="text-nexus-primary">Information</span></h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Business principles, operating standards, and data policies governing The Summit Nexus.
          </p>
        </div>

        <div className="space-y-12 animate-slide-up">
          
          {/* About Us Section */}
          <section className="glass-panel p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-nexus-primary/10 rounded-xl text-nexus-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About The Nexus</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Founded in 2023, The Summit Nexus operates as a strategic intersection between high-level technology governance and executive security intelligence. We provide a unified platform where global leaders converge to share critical insights, anticipate market shifts, and fortify their organizations against emerging digital threats.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our mission is to bridge the gap between technical innovation and boardroom strategy, ensuring that decision-makers are equipped with actionable intelligence. Through our exclusive summits and curated knowledge hub, we facilitate the secure exchange of ideas that shape the future of the global tech infrastructure.
              </p>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section className="glass-panel p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data Privacy & Security</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-nexus-primary" />
                  Data Collection Policy
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We collect only essential business data required for authentication and personalization of your intelligence feed. This includes corporate affiliation, role designation, and event participation history. All data is encrypted at rest and in transit using military-grade AES-256 standards.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-nexus-primary" />
                  Third-Party Disclosures
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The Summit Nexus maintains a strict non-disclosure policy. Member identities and strategic interests are never shared with external advertisers or unauthorized third parties. Peer-to-peer visibility is strictly opt-in during specific summit events.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/5">
                 <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-nexus-primary" />
                  Compliance Standards
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Our platform architecture adheres to GDPR, CCPA, and ISO 27001 compliance standards. Periodic security audits are conducted by independent NATO-accredited cybersecurity firms to ensure the integrity of our digital infrastructure.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 text-center">
              Last Updated: October 24, 2024. Policy Version 2.1.4
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CorporateView;