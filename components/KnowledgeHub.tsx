import React, { useState, useMemo } from 'react';
import { INSIGHTS } from '../constants';
import { Search, Filter, Clock, X, FileText, Share2, Bookmark } from 'lucide-react';
import { Insight } from '../types';

const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const filteredInsights = useMemo(() => {
    return INSIGHTS.filter((insight) => {
      const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            insight.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter ? insight.category === selectedFilter : true;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const categories = Array.from(new Set(INSIGHTS.map(i => i.category)));

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Knowledge Hub</h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search insights..."
                aria-label="Search insights articles"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0" role="tablist" aria-label="Category filters">
              <button 
                onClick={() => setSelectedFilter(null)}
                role="tab"
                aria-selected={!selectedFilter}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${!selectedFilter ? 'bg-nexus-primary text-white dark:text-nexus-darker' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
              >
                All Insights
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat === selectedFilter ? null : cat)}
                  role="tab"
                  aria-selected={cat === selectedFilter}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${cat === selectedFilter ? 'bg-nexus-primary text-white dark:text-nexus-darker' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredInsights.map((insight, index) => (
            <article 
              key={insight.id} 
              className="flex flex-col md:flex-row glass-panel rounded-xl overflow-hidden hover:border-nexus-primary/30 transition-all group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                <img 
                  src={insight.image} 
                  alt={`Illustration for article: ${insight.title}`} 
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-30 dark:opacity-60"></div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${
                      insight.category === 'Security Alert' ? 'bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/20' :
                      insight.category === 'Market Trend' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20' :
                      'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                    }`}>
                      {insight.category}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {insight.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-nexus-primary transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    {insight.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-500 text-xs">{insight.date}</span>
                  <button 
                    onClick={() => setSelectedInsight(insight)}
                    className="text-nexus-primary text-sm font-medium hover:text-nexus-glow transition-colors" 
                    aria-label={`Read analysis: ${insight.title}`}
                  >
                    Read Full Report &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {filteredInsights.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No insights found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Insight Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedInsight(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
            <div className="relative h-48 sm:h-64">
              <img src={selectedInsight.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
              <button 
                onClick={() => setSelectedInsight(null)} 
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className={`inline-block px-3 py-1 mb-3 rounded-md text-xs font-bold uppercase tracking-wide bg-nexus-primary text-white`}>
                  {selectedInsight.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {selectedInsight.title}
                </h2>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center gap-6 mb-8 text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 pb-6">
                 <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {selectedInsight.readTime}</span>
                 <span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> {selectedInsight.date}</span>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="lead text-lg text-slate-700 dark:text-slate-300 font-medium mb-6">
                  {selectedInsight.summary}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h4 className="text-lg font-bold mt-6 mb-3 text-slate-900 dark:text-white">Key Strategic Implications</h4>
                <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-600 dark:text-slate-400">
                  <li>Integration of proprietary data sets into generative models.</li>
                  <li>Shift towards localized inference for enhanced privacy.</li>
                  <li>New regulatory frameworks impacting cross-border data flows.</li>
                </ul>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 flex justify-between items-center">
               <div className="flex gap-2">
                 <button className="p-2 text-slate-500 hover:text-nexus-primary transition-colors"><Share2 className="w-5 h-5" /></button>
                 <button className="p-2 text-slate-500 hover:text-nexus-primary transition-colors"><Bookmark className="w-5 h-5" /></button>
               </div>
               <button 
                 onClick={() => setSelectedInsight(null)}
                 className="px-6 py-2 bg-nexus-primary text-white rounded-lg font-medium hover:bg-nexus-glow transition-colors"
               >
                 Close Report
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub;