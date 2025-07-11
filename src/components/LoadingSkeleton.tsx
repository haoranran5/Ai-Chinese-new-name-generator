import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 animate-pulse relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
          
          {/* Header */}
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

          {/* Name */}
          <div className="text-center mb-4">
            <div className="w-20 h-8 bg-white/20 rounded mx-auto mb-2"></div>
            <div className="w-32 h-5 bg-white/20 rounded mx-auto"></div>
          </div>

          {/* Meaning */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
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
};

export default LoadingSkeleton;