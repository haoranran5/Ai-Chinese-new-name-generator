import React from 'react';
import { Heart, Volume2, Trash2, Globe, Star } from 'lucide-react';
import { NameEntry } from '../data/namesDatabase';
import { useFavorites } from '../hooks/useFavorites';

interface NameCardProps {
  name: NameEntry;
  showRemove?: boolean;
}

const NameCard: React.FC<NameCardProps> = ({ name, showRemove = false }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isNameFavorited = isFavorite(name.name);

  const handleFavoriteClick = () => {
    if (isNameFavorited) {
      removeFavorite(name.name);
    } else {
      addFavorite(name);
    }
  };

  const handlePronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name.name);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const genderColors = {
    male: 'from-blue-500/20 to-cyan-500/20',
    female: 'from-pink-500/20 to-purple-500/20',
    unisex: 'from-green-500/20 to-teal-500/20'
  };

  const genderIcons = {
    male: '♂',
    female: '♀',
    unisex: '⚲'
  };

  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 group relative overflow-hidden hover:scale-105`}>
      {/* Card background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${genderColors[name.gender]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white/80">{genderIcons[name.gender]}</span>
          <span className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm">
            {name.gender}
          </span>
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-white/60" />
            <span className="text-xs text-white/60">{name.country}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Popularity indicator */}
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-white/70">{name.popularity}</span>
          </div>
          
          <button
            onClick={handlePronunciation}
            className="p-2 text-white/60 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
            title="Play pronunciation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          
          {showRemove ? (
            <button
              onClick={handleFavoriteClick}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              title="Remove from favorites"
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
              title={isNameFavorited ? 'Remove from favorites' : 'Add to favorites'}
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
        <p className="text-lg text-white/90 font-medium">/{name.pronunciation}/</p>
        <p className="text-sm text-white/70 mt-1">Origin: {name.origin}</p>
      </div>

      {/* Meaning */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative z-10 shadow-inner">
        <div className="text-sm text-white/70 mb-2 font-semibold">Meaning</div>
        <p className="text-white/90 leading-relaxed">{name.meaning}</p>
      </div>
    </div>
  );
};

export default NameCard;