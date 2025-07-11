import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FavoritesProvider } from './contexts/FavoritesContext';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import FavoritesPage from './pages/FavoritesPage';
import Header from './components/Header';

function App() {
  const { i18n } = useTranslation();

  return (
    <FavoritesProvider>
      <Router>
        <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-full animate-float"></div>
            
            {/* Tech grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            {/* Scanning lines */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan-horizontal"></div>
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-scan-vertical"></div>
            </div>
            
            {/* Holographic elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-conic from-cyan-400/5 via-purple-400/5 to-cyan-400/5 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-conic from-purple-400/5 via-pink-400/5 to-purple-400/5 rounded-full animate-spin-reverse"></div>
          </div>
          
          {/* Neural network overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1"/>
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none">
                <circle cx="200" cy="200" r="3" fill="#06b6d4" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="400" cy="150" r="3" fill="#8b5cf6" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="600" cy="300" r="3" fill="#06b6d4" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="800" cy="250" r="3" fill="#8b5cf6" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <line x1="200" y1="200" x2="400" y2="150" opacity="0.2">
                  <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite"/>
                </line>
                <line x1="400" y1="150" x2="600" y2="300" opacity="0.2">
                  <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="600" y1="300" x2="800" y2="250" opacity="0.2">
                  <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite"/>
                </line>
              </g>
            </svg>
          </div>
          
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;