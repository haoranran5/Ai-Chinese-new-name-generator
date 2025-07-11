import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, User, Palette } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [englishName, setEnglishName] = useState('');
  const [gender, setGender] = useState('');
  const [style, setStyle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (englishName.trim()) {
      const params = new URLSearchParams({
        name: englishName,
        gender: gender || 'uncertain',
        style: style || 'traditional'
      });
      navigate(`/results?${params.toString()}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-8 backdrop-blur-sm border border-white/20 relative group shadow-2xl">
            <Sparkles className="w-12 h-12 text-cyan-400 group-hover:animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 bg-gradient-conic from-cyan-400/10 via-purple-400/10 to-cyan-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-lg">
            {t('home.title')}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 space-y-8 relative overflow-hidden">
          {/* Form background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          
          {/* English Name Input */}
          <div className="space-y-3 relative z-10">
            <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
              <User className="w-4 h-4" />
              <span>{t('home.form.nameLabel')}</span>
            </label>
            <input
              type="text"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              placeholder={t('home.form.namePlaceholder')}
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm shadow-inner"
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-3 relative z-10">
            <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
              <User className="w-4 h-4" />
              <span>{t('home.form.genderLabel')}</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'male', label: t('home.form.genderMale'), emoji: '👨' },
                { value: 'female', label: t('home.form.genderFemale'), emoji: '👩' },
                { value: 'uncertain', label: t('home.form.genderNeutral'), emoji: '👤' }
              ].map((option) => (
                <label key={option.value} className="relative">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={gender === option.value}
                    onChange={(e) => setGender(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                    gender === option.value 
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-xl shadow-cyan-400/30 scale-105' 
                      : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                  }`}>
                    <span className="text-lg">{option.emoji}</span>
                    <span className="font-semibold">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className="space-y-3 relative z-10">
            <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
              <Palette className="w-4 h-4" />
              <span>{t('home.form.styleLabel')}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { value: 'traditional', label: t('home.form.styleTraditional'), desc: t('home.form.styleTraditionalDesc') },
                { value: 'modern', label: t('home.form.styleModern'), desc: t('home.form.styleModernDesc') },
                { value: 'business', label: t('home.form.styleBusiness'), desc: t('home.form.styleBusinessDesc') },
                { value: 'cute', label: t('home.form.styleCute'), desc: t('home.form.styleCuteDesc') },
                { value: 'neutral', label: t('home.form.styleNeutral'), desc: t('home.form.styleNeutralDesc') }
              ].map((option) => (
                <label key={option.value} className="relative">
                  <input
                    type="radio"
                    name="style"
                    value={option.value}
                    checked={style === option.value}
                    onChange={(e) => setStyle(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                    style === option.value 
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-xl shadow-cyan-400/30 scale-105' 
                      : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                  }`}>
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-xs text-white/70 mt-1">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative z-10">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-5 px-8 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <span className="flex items-center justify-center space-x-3 relative z-10">
                <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                <span>{t('home.form.generateButton')}</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;