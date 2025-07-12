// 外国人起名网站主页面
import React, { useState, useEffect } from 'react';
import { Globe, Heart, History, TrendingUp, Sparkles } from 'lucide-react';
import NameSearchForm from '../components/NameSearchForm';
import NameGrid from '../components/NameGrid';
import { searchNames, getRandomNames, SearchFilters, SortOptions } from '../services/nameService';
import { NameEntry } from '../data/namesDatabase';
import { useFavorites } from '../hooks/useFavorites';
import { useSearchHistory } from '../hooks/useSearchHistory';

const ForeignNameGenerator: React.FC = () => {
  const [names, setNames] = useState<NameEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});
  const [sortOptions, setSortOptions] = useState<SortOptions>({ 
    field: 'popularity', 
    direction: 'desc' 
  });
  const [activeTab, setActiveTab] = useState<'search' | 'favorites' | 'history' | 'trending'>('search');

  const { favorites, favoritesCount } = useFavorites();
  const { addToHistory, getRecentSearches } = useSearchHistory();

  // 初始加载随机名字
  useEffect(() => {
    setLoading(true);
    const randomNames = getRandomNames(12);
    setNames(randomNames);
    setLoading(false);
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setLoading(true);
    setCurrentFilters(filters);
    
    setTimeout(() => {
      const results = searchNames(filters, sortOptions);
      setNames(results);
      addToHistory(filters, results.length);
      setLoading(false);
    }, 300);
  };

  const handleSortChange = (newSortOptions: SortOptions) => {
    setSortOptions(newSortOptions);
    const results = searchNames(currentFilters, newSortOptions);
    setNames(results);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setLoading(true);
    
    setTimeout(() => {
      switch (tab) {
        case 'search':
          const searchResults = searchNames(currentFilters, sortOptions);
          setNames(searchResults);
          break;
        case 'favorites':
          setNames(favorites);
          break;
        case 'history':
          const recentSearches = getRecentSearches(10);
          if (recentSearches.length > 0) {
            const lastSearch = recentSearches[0];
            const historyResults = searchNames(lastSearch.filters, sortOptions);
            setNames(historyResults);
          } else {
            setNames([]);
          }
          break;
        case 'trending':
          const trendingNames = getRandomNames(20, { minPopularity: 80 });
          setNames(trendingNames);
          break;
      }
      setLoading(false);
    }, 200);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'search': return 'Search Names';
      case 'favorites': return `My Favorites (${favoritesCount})`;
      case 'history': return 'Search History';
      case 'trending': return 'Trending Names';
      default: return 'Foreign Name Generator';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full animate-float"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-8 backdrop-blur-sm border border-white/20 relative group shadow-2xl">
              <Globe className="w-12 h-12 text-cyan-400 group-hover:animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-lg">
              Foreign Name Generator
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Discover beautiful names from around the world. Search through our comprehensive database of names from USA, UK, France, Germany, and more.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'search', label: 'Search', icon: Globe },
              { id: 'favorites', label: `Favorites (${favoritesCount})`, icon: Heart },
              { id: 'history', label: 'History', icon: History },
              { id: 'trending', label: 'Trending', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id as typeof activeTab)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                  activeTab === id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-lg shadow-cyan-400/20'
                    : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Search Form (only show on search tab) */}
          {activeTab === 'search' && (
            <div className="mb-8">
              <NameSearchForm onSearch={handleSearch} initialFilters={currentFilters} />
            </div>
          )}

          {/* Content Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{getTabTitle()}</h2>
            {activeTab === 'search' && (
              <p className="text-white/70">
                Use the search form above to find names by country, gender, origin, or meaning
              </p>
            )}
            {activeTab === 'favorites' && (
              <p className="text-white/70">
                Your saved favorite names from around the world
              </p>
            )}
            {activeTab === 'trending' && (
              <p className="text-white/70">
                Most popular names with high popularity ratings
              </p>
            )}
          </div>

          {/* Names Grid */}
          <NameGrid
            names={names}
            loading={loading}
            sortOptions={sortOptions}
            onSortChange={handleSortChange}
          />

          {/* Quick Actions */}
          {activeTab === 'search' && !loading && (
            <div className="mt-12 text-center">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
                <h3 className="text-xl font-semibold text-white mb-4 relative z-10">Quick Actions</h3>
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  <button
                    onClick={() => handleSearch({ gender: 'male', minPopularity: 80 })}
                    className="flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Popular Male Names</span>
                  </button>
                  <button
                    onClick={() => handleSearch({ gender: 'female', minPopularity: 80 })}
                    className="flex items-center space-x-2 bg-pink-500/20 text-pink-300 px-4 py-2 rounded-lg hover:bg-pink-500/30 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Popular Female Names</span>
                  </button>
                  <button
                    onClick={() => handleSearch({ country: 'USA' })}
                    className="flex items-center space-x-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                  >
                    <Globe className="w-4 h-4" />
                    <span>American Names</span>
                  </button>
                  <button
                    onClick={() => handleSearch({ country: 'UK' })}
                    className="flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                  >
                    <Globe className="w-4 h-4" />
                    <span>British Names</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForeignNameGenerator;