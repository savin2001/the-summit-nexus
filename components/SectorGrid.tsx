import React from 'react';
import { SECTORS } from '../constants';
import * as Icons from 'lucide-react';

const SectorGrid: React.FC = () => {
  return (
    <section id="sectors" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Strategic Sectors</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive coverage of the six critical pillars defining the future of global technology and security infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS.map((sector, index) => {
            // Dynamically get the icon component
            // @ts-ignore
            const IconComponent = Icons[sector.iconName] || Icons.HelpCircle;

            return (
              <div 
                key={sector.id}
                className="glass-panel glass-panel-hover p-8 rounded-2xl transition-all duration-300 group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-nexus-primary/10 rounded-xl text-nexus-primary group-hover:text-nexus-glow group-hover:bg-nexus-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <Icons.ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-nexus-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-nexus-primary transition-colors">
                  {sector.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {sector.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectorGrid;