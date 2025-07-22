import React from 'react';
import { Heart, Volume2, Trash2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

interface NameEntry {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
}

interface NameCardProps {
  name: NameEntry;
  showRemove?: boolean;
}

const NameCard: React.FC<NameCardProps> = ({ name, showRemove = false }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isNameFavorited = isFavorite(name.id);

  const handleFavoriteClick = () => {
    if (isNameFavorited) {
      removeFavorite(name.id);
    } else {
      addFavorite(name);
    }
  };

  const handlePronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name.pinyin);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getGenderInfo = (gender: string) => {
    switch (gender) {
      case 'male':
        return { color: 'from-blue-500/20 to-cyan-500/20', icon: '♂', label: '男性' };
      case 'female':
        return { color: 'from-pink-500/20 to-purple-500/20', icon: '♀', label: '女性' };
      default:
        return { color: 'from-green-500/20 to-teal-500/20', icon: '⚲', label: '中性' };
    }
  };

  const genderInfo = getGenderInfo(name.gender);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-4 sm:p-6 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 group relative overflow-hidden hover:scale-105">
      {/* Card background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${genderInfo.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold text-white/80">{genderInfo.icon}</span>
          <span className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm">
            {genderInfo.label}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePronunciation}
            className="p-1.5 sm:p-2 text-white/60 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            title="播放发音"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          
          {showRemove ? (
            <button
              onClick={handleFavoriteClick}
              className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              title="从收藏中移除"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                isNameFavorited 
                  ? 'text-red-400 hover:text-red-300 hover:bg-white/10' 
                  : 'text-white/60 hover:text-red-400 hover:bg-white/10'
              }`}
              title={isNameFavorited ? '从收藏中移除' : '添加到收藏'}
            >
              <Heart className={`w-4 h-4 ${isNameFavorited ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-3 sm:mb-4 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-400 transition-all duration-300 drop-shadow-lg">
          {name.name}
        </h3>
        <p className="text-base sm:text-lg text-white/90 font-medium">{name.pinyin}</p>
      </div>

      {/* Meaning */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 relative z-10 shadow-inner">
        <div className="text-xs sm:text-sm text-white/70 mb-2 font-semibold">含义</div>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">{name.meaning}</p>
      </div>
    </div>
  );
};

export default NameCard;