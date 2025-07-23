import React from 'react';
import { Info, Brain, Sparkles, Globe, Heart, Zap, Sun } from 'lucide-react';

const AboutPage: React.FC = () => {
  // SEO optimization for about page
  React.useEffect(() => {
    document.title = 'About Our Free Chinese Zodiac & Feng Shui Platform - AI Digital Tools';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about our free Chinese zodiac compatibility calculator, name generator, and Feng Shui platform. AI-powered tools combining ancient Chinese wisdom with modern technology for Western users.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'about chinese zodiac platform, free chinese astrology tools, ai feng shui, chinese culture digital tools, zodiac compatibility platform');
  }, []);

  const features = [
    {
      icon: Sun,
      title: 'Ancient Wisdom Integration',
      description: 'Combining thousands of years of Feng Shui and Chinese Astrology wisdom with modern technology'
    },
    {
      icon: Globe,
      title: 'Authentic Cultural Practices',
      description: 'Respects traditional Chinese practices while making them accessible to modern practitioners'
    },
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Get instant Feng Shui analysis and Chinese Astrology readings with advanced AI processing'
    },
    {
      icon: Heart,
      title: 'Personalized Results',
      description: 'Customized recommendations based on your specific needs and energy patterns'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/20 relative group shadow-2xl">
            <Info className="w-10 h-10 text-yellow-400 group-hover:animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            About Our Free Chinese Zodiac & Feng Shui Platform
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Our AI-powered platform combines ancient Chinese zodiac wisdom with modern technology to bring harmony and balance to Western users. All Chinese zodiac compatibility tools, name generators, and Feng Shui guidance are completely free and designed for cultural authenticity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
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
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              How Our Free Chinese Zodiac Platform Works
            </h2>
            <p className="text-white/80">
              Designed specifically for Western users seeking authentic Chinese zodiac compatibility and Feng Shui wisdom
            </p>
          </div>
          
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              Our completely free AI platform combines ancient Chinese zodiac principles, Feng Shui wisdom, and Chinese Astrology with modern digital tools 
              to provide comprehensive compatibility analysis, name generation, and harmony guidance for Western users. The process involves:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-400">1</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Chinese Zodiac Analysis</h4>
                <p className="text-sm text-white/70">
                  Analyzing your Chinese zodiac sign and compatibility using authentic Chinese astrology principles adapted for Western understanding
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-400">2</span>
                </div>
                <h4 className="font-semibold text-white mb-2">AI-Enhanced Processing</h4>
                <p className="text-sm text-white/70">
                  Processing Chinese zodiac data through ancient wisdom algorithms enhanced with modern AI for accurate compatibility and personalized results
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-400">3</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Free Comprehensive Results</h4>
                <p className="text-sm text-white/70">
                  Delivering completely free Chinese zodiac compatibility scores, name suggestions, and Feng Shui recommendations with detailed cultural explanations
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-green-500/10 rounded-2xl border border-green-400/20">
              <h4 className="text-xl font-bold text-green-400 mb-3 text-center">
                Why Choose Our Chinese Zodiac Platform?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-green-400" />
                  <span>100% Free Chinese Zodiac Tools - No hidden costs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Chinese zodiac wisdom adapted for Western users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>AI-enhanced Chinese astrology accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Authentic Chinese zodiac wisdom with modern insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;