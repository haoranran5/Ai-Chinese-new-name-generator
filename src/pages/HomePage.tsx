import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Compass, Pin as Yin, ArrowRight, Brain, Zap, Globe, Heart, Info, Users, Star } from 'lucide-react';

interface NameData {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
}

const HomePage: React.FC = () => {
  // SEO optimization - set page title and meta description
  React.useEffect(() => {
    document.title = 'Chinese Name Generator - Generate Authentic Chinese Names Online';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Chinese name generator with meanings. Generate authentic Chinese names, explore Chinese zodiac compatibility, and discover traditional Chinese male names and fantasy names.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'chinese names, chinese zodiac, chinese ai name, chinese male names, random chinese name generator, chinese name generator fantasy, chinese zodiac compatibility, chinese zodiac signs, free chinese name generator, chinese astrology, feng shui tips, bazi analysis, chinese zodiac calculator, zodiac love match');
  }, []);

  // 龙虎生肖图标组件
  const DragonTigerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
    return (
      <div className={`${className} relative flex items-center justify-center`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <defs>
            <linearGradient id="dragonGradientHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="tigerGradientHome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          
          {/* 简化龙 */}
          <path d="M4 10 Q6 8 9 9 Q11 10 10 12 Q9 14 7 13 Q5 12 4 10 Z" fill="url(#dragonGradientHome)" opacity="0.9" />
          <circle cx="8" cy="10" r="1" fill="#fff" opacity="0.8" />
          
          {/* 简化虎 */}
          <path d="M14 14 Q16 12 19 13 Q21 14 20 16 Q19 18 17 17 Q15 16 14 14 Z" fill="url(#tigerGradientHome)" opacity="0.9" />
          <circle cx="18" cy="14" r="1" fill="#fff" opacity="0.8" />
          
          {/* 连接心形 */}
          <path d="M10 11 Q12 12 14 13" stroke="#ec4899" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="12" cy="12" r="1.5" fill="#ec4899" opacity="0.4" />
        </svg>
      </div>
    );
  };

  const services = [
    {
      id: 'nameGenerator',
      icon: Sparkles,
      title: 'Chinese AI Name Generator',
      description: 'Generate authentic Chinese names using AI-powered BaZi principles and Chinese Astrology. Perfect for babies, business names, and personal use with detailed meaning explanations.',
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400'
    },
    {
      id: 'maleNames',
      icon: Users,
      title: 'Chinese Male Names Collection',
      description: 'Discover traditional Chinese male names with cultural significance. Our random Chinese name generator offers authentic male names perfect for babies and personal use.',
      color: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400'
    },
    {
      id: 'zodiacNames',
      icon: DragonTigerIcon,
      title: 'Chinese Zodiac Name Matching',
      description: 'Match Chinese names with your zodiac sign for perfect compatibility. Our Chinese zodiac name generator ensures harmony between your name and astrological destiny.',
      color: 'from-pink-500/20 to-purple-500/20',
      iconColor: 'text-pink-400'
    },
    {
      id: 'fantasyNames',
      icon: Brain,
      title: 'Chinese Name Generator Fantasy',
      description: 'Create unique fantasy Chinese names for games, stories, and creative projects. Our Chinese name generator fantasy tool offers imaginative names with cultural depth.',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400'
    },
    {
      id: 'compatibility',
      icon: Heart,
      title: 'Chinese Zodiac Compatibility Calculator',
      description: 'Free Chinese zodiac compatibility calculator for love matches. Discover rat and dragon compatibility, relationship analysis, and Chinese zodiac love match predictions with detailed compatibility scores.',
      color: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-400'
    },
    {
      id: 'fengShuiTips',
      icon: Compass,
      title: 'Feng Shui Tips - Home & Office Harmony',
      description: 'Master proven Feng Shui tips to improve Qi flow and achieve perfect Chi balance in your home and office. Expert guidance for Western homes with practical applications.',
      color: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-8 backdrop-blur-sm border border-yellow-400/20 relative group shadow-2xl overflow-hidden">
            {/* 科技网格背景 */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,128,0.1)_1px,transparent_1px)] bg-[size:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* 主图标 - 科技感"名"字 */}
            <div className="relative z-10 w-16 h-16 group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="heroIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#ff0080" />
                  </linearGradient>
                  <filter id="heroGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* 现代化"名"字设计 */}
                <g fill="none" stroke="url(#heroIconGradient)" strokeWidth="3" strokeLinecap="round" filter="url(#heroGlow)">
                  {/* 夕字部分 */}
                  <line x1="12" y1="20" x2="28" y2="20" />
                  <path d="M18 25 Q15 35 22 48" />
                  <circle cx="24" cy="26" r="2" fill="url(#heroIconGradient)" />
                  
                  {/* 口字部分 - 科技化设计 */}
                  <rect x="32" y="16" width="20" height="32" rx="3" />
                  <line x1="34" y1="24" x2="50" y2="24" strokeWidth="1.5" />
                  <line x1="34" y1="32" x2="50" y2="32" strokeWidth="1.5" />
                  <line x1="34" y1="40" x2="50" y2="40" strokeWidth="1.5" />
                </g>
                
                {/* 科技装饰元素 */}
                <g stroke="url(#heroIconGradient)" fill="none" strokeWidth="1" opacity="0.6">
                  <path d="M8,8 L4,8 L4,12" />
                  <path d="M56,8 L60,8 L60,12" />
                  <path d="M8,56 L4,56 L4,52" />
                  <path d="M56,56 L60,56 L60,52" />
                </g>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 bg-gradient-conic from-yellow-400/10 via-orange-400/10 to-yellow-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-lg">
            Chinese Name Generator - Discover Your Perfect Chinese Name
          </h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-4">
            Chinese Name Generator - AI-Powered Name Creation & Zodiac Compatibility
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-4">
            Generate authentic Chinese names with AI intelligence, explore Chinese zodiac compatibility, and discover traditional Chinese male names with our comprehensive name generator
          </p>
          <p className="text-base text-white/70 leading-relaxed max-w-4xl mx-auto">
            Create meaningful Chinese names using our random Chinese name generator, match names with Chinese zodiac signs, explore Chinese name generator fantasy options, and get expert cultural insights. All tools are completely free and designed for Western users.
          </p>
          
          {/* Feng Shui Features */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-4 py-2 shadow-lg">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-medium">Chinese AI Name Generator</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 rounded-full px-4 py-2 shadow-lg">
              <Globe className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300 font-medium">Chinese Male Names</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm border border-red-400/20 rounded-full px-4 py-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">Random Chinese Name Generator</span>
            </div>
          </div>
        </div>




        {/* Services Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
              Chinese Name Generator & Zodiac Compatibility Tools
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive Chinese name generator with AI-powered features, zodiac compatibility calculator, and cultural tools combining ancient wisdom with modern technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => window.location.hash = `#${service.id}`}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden hover:scale-105 cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.id === 'compatibility' || service.id === 'zodiacNames' ? (
                        <Icon className="w-10 h-10" />
                      ) : (
                        <Icon className={`w-8 h-8 ${service.iconColor}`} />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 text-center">
                      {service.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center justify-center text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium mr-2">Explore Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chinese Name Generator Features Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Advanced Chinese Name Generator Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover our comprehensive Chinese name generator with AI-powered features for authentic name creation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Chinese Male Names</h4>
              <p className="text-sm text-white/70">
                Traditional Chinese male names with cultural significance and meaning explanations
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Chinese AI Name</h4>
              <p className="text-sm text-white/70">
                AI-powered Chinese name generation using advanced algorithms and cultural intelligence
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Random Chinese Name Generator</h4>
              <p className="text-sm text-white/70">
                Generate random Chinese names instantly with our advanced name generator tool
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Chinese Name Generator Fantasy</h4>
              <p className="text-sm text-white/70">
                Create fantasy Chinese names for creative projects, games, and storytelling
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Why Choose Our Chinese Name Generator Platform?
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              The most comprehensive Chinese name generator with AI-powered features and authentic cultural intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">100% Free Chinese Name Generator</h4>
              <p className="text-sm text-white/70">
                All Chinese name generation, zodiac compatibility, and cultural analysis are completely free with no hidden costs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">AI-Enhanced Chinese Name Creation</h4>
              <p className="text-sm text-white/70">
                Advanced AI technology combined with authentic Chinese naming principles for accurate name generation and cultural significance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Authentic Chinese Culture</h4>
              <p className="text-sm text-white/70">
                Authentic Chinese naming traditions and zodiac practices explained for Western users, making cultural wisdom accessible and practical.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Chinese Name Generator - Generate Authentic Chinese Names Online",
            "description": "Free Chinese name generator with meanings. Generate authentic Chinese names, explore Chinese zodiac compatibility, and discover traditional Chinese male names and fantasy names.",
            "url": "https://chinesecharactername.top/",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "browserRequirements": "Requires JavaScript",
            "author": {
              "@type": "Organization",
              "name": "Chinese Name Generator Platform",
              "url": "https://chinesecharactername.top/"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "description": "Free Chinese name generator with AI-powered features"
            },
            "featureList": [
              "Chinese AI Name Generator",
              "Chinese Male Names Collection", 
              "Chinese Zodiac Name Matching",
              "Chinese Name Generator Fantasy",
              "Random Chinese Name Generator",
              "Chinese Zodiac Compatibility Calculator"
            ],
            "keywords": "chinese names, chinese zodiac, chinese ai name, chinese male names, random chinese name generator, chinese name generator fantasy"
          })
        }} />
      </div>
    </div>
  );
};

export default HomePage;