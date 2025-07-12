import React from 'react';
import { Brain, Cpu, Zap, Sparkles, Bot, Network } from 'lucide-react';

const AIElements: React.FC = () => {
  return (
    <>
      {/* AI Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Lines */}
        <div className="absolute top-20 left-10 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {/* Neural connections */}
            <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none" className="animate-pulse">
              <line x1="50" y1="50" x2="150" y2="100" />
              <line x1="50" y1="50" x2="100" y2="150" />
              <line x1="150" y1="100" x2="250" y2="150" />
              <line x1="100" y1="150" x2="200" y2="200" />
              <line x1="250" y1="150" x2="350" y2="200" />
              <line x1="200" y1="200" x2="300" y2="250" />
              <line x1="350" y1="200" x2="300" y2="300" />
              <line x1="300" y1="250" x2="350" y2="350" />
            </g>
            {/* Neural nodes */}
            <g fill="url(#neuralGradient)" className="animate-pulse">
              <circle cx="50" cy="50" r="4" />
              <circle cx="150" cy="100" r="4" />
              <circle cx="100" cy="150" r="4" />
              <circle cx="250" cy="150" r="4" />
              <circle cx="200" cy="200" r="4" />
              <circle cx="350" cy="200" r="4" />
              <circle cx="300" cy="250" r="4" />
              <circle cx="300" cy="300" r="4" />
              <circle cx="350" cy="350" r="4" />
            </g>
          </svg>
        </div>

        {/* Floating AI Icons */}
        <div className="absolute top-32 right-20 animate-float">
          <Brain className="w-8 h-8 text-cyan-400/30" />
        </div>
        <div className="absolute top-64 left-32 animate-float-delayed">
          <Cpu className="w-6 h-6 text-purple-400/30" />
        </div>
        <div className="absolute bottom-40 right-40 animate-float-slow">
          <Bot className="w-10 h-10 text-emerald-400/30" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float">
          <Network className="w-7 h-7 text-orange-400/30" />
        </div>

        {/* Data Flow Animation */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan-vertical" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-scan-horizontal" />
      </div>

      {/* AI Feature Badges */}
      <div className="absolute top-8 left-8 flex flex-col space-y-4 pointer-events-none">
        <div className="flex items-center space-x-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-2 shadow-lg">
          <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-300 font-medium">AI Powered</span>
        </div>
        <div className="flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 rounded-full px-4 py-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-xs text-purple-300 font-medium">Smart Generation</span>
        </div>
      </div>
    </>
  );
};

export default AIElements;