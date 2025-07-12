// 名字网格显示组件
import React from 'react';
import { NameEntry } from '../data/namesDatabase';
import NameCard from './NameCard';
import { SortOptions } from '../services/nameService';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface NameGridProps {
  names: NameEntry[];
  loading?: boolean;
  sortOptions: SortOptions;
  onSortChange: (options: SortOptions) => void;
}

const NameGrid: React.FC<NameGridProps> = ({ 
  names, 
  loading = false, 
  sortOptions, 
  onSortChange 
}) => {
  const handleSort = (field: SortOptions['field']) => {
    const newDirection = 
      sortOptions.field === field && sortOptions.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    onSortChange({ field, direction: newDirection });
  };

  const getSortIcon = (field: SortOptions['field']) => {
    if (sortOptions.field !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortOptions.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4" />
      : <ArrowDown className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-12 h-4 bg-white/20 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="w-20 h-8 bg-white/20 rounded mx-auto mb-2"></div>
              <div className="w-32 h-5 bg-white/20 rounded mx-auto"></div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="w-8 h-3 bg-white/20 rounded mb-2"></div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-white/20 rounded"></div>
                <div className="w-3/4 h-3 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (names.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-12 text-center">
        <div className="text-white/40 mb-6">
          <span className="text-6xl">🔍</span>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">No Names Found</h3>
        <p className="text-white/70 text-lg">Try adjusting your search filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { field: 'popularity' as const, label: 'Popularity' },
          { field: 'name' as const, label: 'Name' },
          { field: 'origin' as const, label: 'Origin' },
          { field: 'country' as const, label: 'Country' }
        ].map(({ field, label }) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              sortOptions.field === field
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
            }`}
          >
            <span>{label}</span>
            {getSortIcon(field)}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center">
        <span className="text-white/70 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
          {names.length} names found
        </span>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {names.map((name, index) => (
          <NameCard key={`${name.name}-${index}`} name={name} />
        ))}
      </div>
    </div>
  );
};

export default NameGrid;