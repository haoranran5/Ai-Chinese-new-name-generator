import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Volume2, Trash2 } from 'lucide-react';
import { NameData, useFavorites } from '../contexts/FavoritesContext';

interface NameCardProps {
  name: NameData;
  showRemove?: boolean;
}

const NameCard: React.FC<NameCardProps> = ({ name, showRemove = false }) => {
  const { t } = useTranslation();
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
      const utterance = new SpeechSynthesisUtterance(name.name);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const genderEmojis = {
    male: '👨',
    female: '👩',
    uncertain: '👤'
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 group relative overflow-hidden hover:scale-105">
      {/* Card background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{genderEmojis[name.gender as keyof typeof genderEmojis]}</span>
          <span className="text-sm text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm shadow-lg">
            {t(`genders.${name.gender}`)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePronunciation}
            className="p-2 text-white/60 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            title={t('results.pronunciation')}
          >
            <Volume2 className="w-4 h-4" />
          </button>
          
          {showRemove ? (
            <button
              onClick={handleFavoriteClick}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              title={t('favorites.removeFromFavorites')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                isNameFavorited 
                  ? 'text-red-400 hover:text-red-300 hover:bg-white/10' 
                  : 'text-white/60 hover:text-red-400 hover:bg-white/10'
              }`}
              title={isNameFavorited ? t('results.removeFromFavorites') : t('results.addToFavorites')}
            >
              <Heart className={`w-4 h-4 ${isNameFavorited ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-4 relative z-10">
        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-all duration-300 drop-shadow-lg">
          {name.name}
        </h3>
        <p className="text-lg text-white/90 font-medium">{name.pinyin}</p>
      </div>

      {/* Meaning */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative z-10 shadow-inner">
        <div className="text-sm text-white/70 mb-2 font-semibold">{t('results.meaning')}</div>
        <p className="text-white/90 leading-relaxed">{name.meaning}</p>
      </div>
    </div>
  );
};

export default NameCard;