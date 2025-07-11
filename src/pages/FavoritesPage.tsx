import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import NameCard from '../components/NameCard';

const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>{t('favorites.backToHome')}</span>
          </Link>
          
          <div className="flex items-center space-x-2 text-white/80 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
            <Heart className="w-5 h-5" />
            <span>{t('favorites.count', { count: favorites.length })}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-4 drop-shadow-lg">{t('favorites.title')}</h1>
          <p className="text-white/80 text-lg">{t('favorites.subtitle')}</p>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            <div className="text-white/40 mb-6 relative z-10">
              <Heart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">{t('favorites.empty.title')}</h3>
            <p className="text-white/70 mb-8 relative z-10 text-lg">{t('favorites.empty.message')}</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 font-semibold"
            >
              <span>{t('favorites.empty.button')}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((name) => (
              <NameCard key={name.id} name={name} showRemove />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;