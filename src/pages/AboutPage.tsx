import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Brain, Sparkles, Globe, Heart, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced algorithms analyze cultural patterns and linguistic structures'
    },
    {
      icon: Globe,
      title: 'Cultural Authenticity',
      description: 'Respects traditional Chinese naming conventions and meanings'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Get beautiful Chinese names in seconds with real-time processing'
    },
    {
      icon: Heart,
      title: 'Personalized Results',
      description: 'Tailored names based on your preferences and style choices'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full mb-6 backdrop-blur-sm border border-white/20 relative group shadow-2xl">
            <Info className="w-10 h-10 text-blue-400 group-hover:animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            {t('about.title')}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group relative overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Our AI system combines traditional Chinese naming wisdom with modern machine learning 
              to create meaningful and culturally appropriate names. The process involves:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-400">1</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Analysis</h4>
                <p className="text-sm text-white/70">
                  Analyzing your English name's phonetic and semantic properties
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Generation</h4>
                <p className="text-sm text-white/70">
                  Creating Chinese characters that match your preferences and style
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-400">3</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Refinement</h4>
                <p className="text-sm text-white/70">
                  Ensuring cultural authenticity and meaningful interpretations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;