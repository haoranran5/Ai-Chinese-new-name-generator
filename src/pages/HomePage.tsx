import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Sun, Compass, Pin as Yin, ArrowRight, Brain, Zap, Globe, Heart, Info } from 'lucide-react';

interface NameData {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 'nameGenerator',
      icon: Sparkles,
      title: t('home.services.nameGenerator.title'),
      description: t('home.services.nameGenerator.description'),
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400'
    },
    {
      id: 'fengShuiTips',
      icon: Compass,
      title: t('home.services.fengShuiTips.title'),
      description: t('home.services.fengShuiTips.description'),
      color: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400'
    },
    {
      id: 'astrology',
      icon: Sun,
      title: t('home.services.astrology.title'),
      description: t('home.services.astrology.description'),
      color: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-400'
    },
    {
      id: 'zodiac',
      icon: Yin,
      title: t('home.services.zodiac.title'),
      description: t('home.services.zodiac.description'),
      color: 'from-pink-500/20 to-purple-500/20',
      iconColor: 'text-pink-400'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-8 backdrop-blur-sm border border-yellow-400/20 relative group shadow-2xl">
            <Sun className="w-16 h-16 text-yellow-400 group-hover:animate-spin drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 bg-gradient-conic from-yellow-400/10 via-orange-400/10 to-yellow-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-lg">
            {t('home.title')}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-4">
            {t('home.subtitle')}
          </p>
          <p className="text-lg text-white/70 leading-relaxed max-w-4xl mx-auto">
            {t('home.heroDescription')}
          </p>
          
          {/* Feng Shui Features */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-4 py-2 shadow-lg">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-medium">{t('home.aiPowered')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 rounded-full px-4 py-2 shadow-lg">
              <Globe className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300 font-medium">{t('home.culturalIntelligence')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm border border-red-400/20 rounded-full px-4 py-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">{t('home.instantGeneration')}</span>
            </div>
          </div>
        </div>




        {/* Services Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
              {t('home.services.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden hover:scale-105 cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;