import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Sparkles } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import NameCard from '../components/NameCard';

const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full mb-6 backdrop-blur-sm border border-white/20 relative group shadow-2xl">
            <Heart className="w-10 h-10 text-pink-400 group-hover:animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-red-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            {t('favorites.title')}
          </h1>
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 max-w-md mx-auto shadow-2xl">
              <Sparkles className="w-16 h-16 text-white/40 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white/80 mb-4">{t('favorites.empty')}</h3>
              <p className="text-white/60 leading-relaxed">{t('favorites.emptyDesc')}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((name) => (
              <NameCard key={name.id} name={name} showRemove={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;