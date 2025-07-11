import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Home, Sparkles } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 text-white hover:text-cyan-400 transition-all duration-300 group">
            <div className="relative">
              <div className="relative">
                <Sparkles className="w-8 h-8 group-hover:animate-pulse transition-all duration-500 drop-shadow-lg" />
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
              {t('header.title')}
            </span>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                location.pathname === '/' 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-lg shadow-cyan-400/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t('header.home')}</span>
            </Link>
            
            <Link 
              to="/favorites" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                location.pathname === '/favorites' 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-lg shadow-cyan-400/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">{t('header.favorites')}</span>
            </Link>
            
            <LanguageSelector />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;