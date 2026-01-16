import React, { useState, useMemo } from 'react';
import { INSIGHTS } from '../constants';
import { Search, Filter, Clock, Tag } from 'lucide-react';

const KnowledgeHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Knowledge Hub</h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search intelligence..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setSelectedFilter(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${!selectedFilter ? 'bg-nexus-primary text-white dark:text-nexus-darker' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
              >
                All Insights
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat === selectedFilter ? null : cat)}
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
                  alt={insight.title} 
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
                  <button className="text-nexus-primary text-sm font-medium hover:text-nexus-glow transition-colors">
                    Read Analysis &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {filteredInsights.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No intelligence found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeHub;