import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateNames, type GenerateRequest } from '../api/puter-ai';
import NameCard from '../components/NameCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { NameData } from '../contexts/FavoritesContext';

const ResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [names, setNames] = useState<NameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const englishName = searchParams.get('name') || '';
  const gender = searchParams.get('gender') || 'uncertain';
  const style = searchParams.get('style') || 'traditional';

  const handleGenerateNames = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateNames({
        englishName,
        gender,
        style,
      });
      setNames(data.names);
    } catch (err) {
      console.error('Error generating names:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateNames();
  }, [englishName, gender, style]);

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
            <span>{t('results.backToHome')}</span>
          </Link>
          
          <button
            onClick={handleGenerateNames}
            disabled={loading}
            className="flex items-center space-x-2 bg-white/10 text-cyan-400 px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{t('results.regenerate')}</span>
          </button>
        </div>

        {/* Search Info */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6 relative z-10 drop-shadow-lg">
            {t('results.title', { name: englishName })}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80 relative z-10">
            <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm shadow-lg">
              {t('results.gender')}: {t(`genders.${gender}`)}
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm shadow-lg">
              {t('results.style')}: {t(`styles.${style}`)}
            </span>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
            <div className="text-red-400 mb-4 relative z-10">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 relative z-10">{t('results.errorTitle')}</h3>
            <p className="text-white/70 mb-4 relative z-10">{t('results.errorMessage')}</p>
            <button
              onClick={handleGenerateNames}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10"
            >
              {t('results.tryAgain')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {names.map((name) => (
              <NameCard key={name.id} name={name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;