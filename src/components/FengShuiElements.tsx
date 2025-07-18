import React from 'react';
import { Sun, Moon, Zap, Sparkles, Compass, Yin, Yang } from 'lucide-react';

const FengShuiElements: React.FC = () => {
  return (
    <>
      {/* Feng Shui Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Yin Yang Symbol */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
          <div className="w-full h-full relative">
            <div className="w-full h-full bg-white rounded-full relative overflow-hidden animate-spin-slow">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-black"></div>
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
              <div className="absolute top-0 right-1/4 w-1/4 h-1/4 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bagua Pattern */}
        <div className="absolute bottom-20 left-10 w-48 h-48 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-reverse">
            <defs>
              <linearGradient id="baguaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            {/* Bagua lines */}
            <g stroke="url(#baguaGradient)" strokeWidth="2" fill="none">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                <g key={index} transform={`rotate(${angle} 100 100)`}>
                  <line x1="100" y1="20" x2="100" y2="40" />
                  <line x1="100" y1="45" x2="100" y2="65" />
                  <line x1="100" y1="70" x2="100" y2="90" />
                </g>
              ))}
            </g>
            {/* Center circle */}
            <circle cx="100" cy="100" r="15" fill="url(#baguaGradient)" opacity="0.5" />
          </svg>
        </div>

        {/* Floating Feng Shui Icons */}
        <div className="absolute top-32 left-20 animate-float">
          <Sun className="w-8 h-8 text-yellow-400/30" />
        </div>
        <div className="absolute top-64 right-32 animate-float-delayed">
          <Moon className="w-6 h-6 text-yellow-400/30" />
        </div>
        <div className="absolute bottom-40 right-40 animate-float-slow">
          <Compass className="w-10 h-10 text-orange-400/30" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float">
          <Sparkles className="w-7 h-7 text-red-400/30" />
        </div>

        {/* Energy Flow Animation */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent animate-scan-vertical" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-scan-horizontal" />
      </div>

      {/* Feng Shui Feature Badges */}
      <div className="absolute top-8 left-8 flex flex-col space-y-4 pointer-events-none">
        <div className="flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-4 py-2 shadow-lg">
          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-xs text-yellow-300 font-medium">Chi Powered</span>
        </div>
        <div className="flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 rounded-full px-4 py-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="text-xs text-orange-300 font-medium">Ancient Wisdom</span>
        </div>
      </div>
    </>
  );
};

export default FengShuiElements;