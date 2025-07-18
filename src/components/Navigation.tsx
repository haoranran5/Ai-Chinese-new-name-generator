import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Heart, Info, Sparkles } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'nameGenerator', label: 'Name Generator', icon: Sparkles },
    { id: 'fengShuiTips', label: 'Feng Shui Tips', icon: Heart },
    { id: 'astrology', label: 'Chinese Astrology', icon: Info },
    { id: 'compatibility', label: 'Compatibility', icon: Heart },
    { id: 'about', label: t('nav.about'), icon: Info }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
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
                  <span className="hidden sm:inline font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;