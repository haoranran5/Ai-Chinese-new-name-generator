// 名字搜索表单组件
import React, { useState } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { SearchFilters } from '../services/nameService';
import { countries, origins } from '../data/namesDatabase';

interface NameSearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

const NameSearchForm: React.FC<NameSearchFormProps> = ({ 
  onSearch, 
  initialFilters = {} 
}) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {};
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        {/* 基础搜索 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Search Names
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={filters.searchTerm || ''}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                placeholder="Search by name, meaning, or origin..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white backdrop-blur-sm"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button
              type="submit"
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* 高级过滤器 */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
            {/* 性别选择 */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Gender
              </label>
              <select
                value={filters.gender || 'all'}
                onChange={(e) => updateFilter('gender', e.target.value === 'all' ? undefined : e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white backdrop-blur-sm"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* 国家选择 */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Country
              </label>
              <select
                value={filters.country || ''}
                onChange={(e) => updateFilter('country', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white backdrop-blur-sm"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* 起源选择 */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Origin
              </label>
              <select
                value={filters.origin || ''}
                onChange={(e) => updateFilter('origin', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white backdrop-blur-sm"
              >
                <option value="">All Origins</option>
                {origins.map(origin => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>

            {/* 流行度范围 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Popularity Range: {filters.minPopularity || 0} - {filters.maxPopularity || 100}
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minPopularity || 0}
                    onChange={(e) => updateFilter('minPopularity', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs text-white/70">Min: {filters.minPopularity || 0}</span>
                </div>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.maxPopularity || 100}
                    onChange={(e) => updateFilter('maxPopularity', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs text-white/70">Max: {filters.maxPopularity || 100}</span>
                </div>
              </div>
            </div>

            {/* 重置按钮 */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white backdrop-blur-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NameSearchForm;