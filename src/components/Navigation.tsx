import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Heart, Info, Sparkles, Compass, Sun, Users } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'nameGenerator', label: 'Name Generator', icon: Sparkles },
    { id: 'fengShuiTips', label: 'Feng Shui Tips', icon: Compass },
    { id: 'astrology', label: 'Chinese Astrology', icon: Sun },
    { id: 'compatibility', label: 'Compatibility', icon: Users },
    { id: 'about', label: t('nav.about'), icon: Info },
    { id: 'home', label: t('nav.home'), icon: Home }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white/90 hidden xs:inline">Chinese Names</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center space-x-1">
            {navItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
            
            {/* More menu for mobile */}
            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => {
                  // Simple toggle for remaining items
                  const moreItems = navItems.slice(3);
                  if (moreItems.length > 0) {
                    onPageChange(moreItems[0].id);
                  }
                }}
              >
                <div className="flex flex-col space-y-0.5">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;