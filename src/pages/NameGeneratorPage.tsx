import React, { useState, useEffect } from 'react';
import { Sparkles, User, Palette, ArrowRight, Brain, Zap, Globe, Heart, Users, Star } from 'lucide-react';
import { generateNames } from '../services/chineseNameGenerator';
import NameCard from '../components/NameCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

interface NameData {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
}

const NameGeneratorPage: React.FC = () => {
  const [englishName, setEnglishName] = useState('');
  const [gender, setGender] = useState('neutral');
  const [style, setStyle] = useState('neutral');
  const [names, setNames] = useState<NameData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!englishName.trim()) return;
    
    setLoading(true);
    try {
      const result = await generateNames({
        englishName: englishName.trim(),
        gender: gender as 'male' | 'female' | 'neutral',
        style: style as 'traditional' | 'modern' | 'business' | 'cute' | 'neutral'
      });
      setNames(result.names);
      setHasGenerated(true);
    } catch (error) {
      console.error('生成名字失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 示例名字展示
  useEffect(() => {
    const loadExampleNames = async () => {
      try {
        const result = await generateNames({
          englishName: 'Example',
          gender: 'neutral',
          style: 'neutral'
        });
        if (!hasGenerated) {
          setNames(result.names.slice(0, 3));
        }
      } catch (error) {
        console.error('加载示例名字失败:', error);
      }
    };
    
    if (!hasGenerated) {
      loadExampleNames();
    }
  }, [hasGenerated]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 pt-20 sm:pt-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-yellow-400/20 relative group shadow-2xl overflow-hidden">
            {/* 科技网格背景 */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,128,0.1)_1px,transparent_1px)] bg-[size:6px_6px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* 科技感"名"字图标 */}
            <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-500">
              <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-lg">
                <defs>
                  <linearGradient id="nameGenIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <filter id="nameGenGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* 简化"名"字 */}
                <g fill="none" stroke="url(#nameGenIconGradient)" strokeWidth="2" strokeLinecap="round" filter="url(#nameGenGlow)">
                  {/* 夕字部分 */}
                  <line x1="8" y1="12" x2="18" y2="12" />
                  <path d="M12 15 Q10 22 15 30" />
                  <circle cx="15" cy="16" r="1" fill="url(#nameGenIconGradient)" />
                  
                  {/* 口字部分 */}
                  <rect x="20" y="10" width="12" height="20" rx="2" />
                  <line x1="22" y1="16" x2="30" y2="16" strokeWidth="1" />
                  <line x1="22" y1="20" x2="30" y2="20" strokeWidth="1" />
                  <line x1="22" y1="24" x2="30" y2="24" strokeWidth="1" />
                </g>
              </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight drop-shadow-lg px-2">
            Free Chinese Name Generator - BaZi Based Naming Tool
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto px-2">
            Generate authentic Chinese names using BaZi principles and Chinese Astrology. Our free AI-powered Chinese name generator creates meaningful names with cultural significance for babies, business, and personal use.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
            <div className="flex items-center space-x-2 bg-green-500/10 backdrop-blur-sm border border-green-400/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg">
              <Heart className="w-4 h-4 text-green-400" />
              <span className="text-xs sm:text-sm text-green-300 font-medium">100% Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300 font-medium">BaZi Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs sm:text-sm text-purple-300 font-medium">Cultural Meaning</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 relative overflow-hidden mb-8 sm:mb-12">
          {/* Form background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
          
          {/* English Name Input */}
          <div className="space-y-3 relative z-10">
            <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
              <User className="w-4 h-4" />
              <span>Your English Name</span>
            </label>
            <input
              type="text"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              placeholder="Enter your English name..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm shadow-inner text-sm sm:text-base"
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-3 relative z-10">
            <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
              <User className="w-4 h-4" />
              <span>Gender Preference</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'male', label: 'Male', emoji: '👨' },
                { value: 'female', label: 'Female', emoji: '👩' },
                { value: 'neutral', label: 'Neutral', emoji: '👤' }
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
                  <div className={`flex items-center justify-center space-x-2 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                    gender === option.value 
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-xl shadow-yellow-400/30 scale-105' 
                      : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                  }`}>
                    <span className="text-base sm:text-lg">{option.emoji}</span>
                    <span className="font-semibold text-sm sm:text-base">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className="space-y-3 relative z-10">
            <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
              <Palette className="w-4 h-4" />
              <span>Name Style</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { value: 'traditional', label: 'Traditional', desc: 'Classic & Elegant' },
                { value: 'modern', label: 'Modern', desc: 'Trendy & Fresh' },
                { value: 'business', label: 'Business', desc: 'Professional' },
                { value: 'cute', label: 'Cute', desc: 'Playful & Sweet' },
                { value: 'neutral', label: 'Neutral', desc: 'Balanced' }
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
                  <div className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                    style === option.value 
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-xl shadow-yellow-400/30 scale-105' 
                      : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                  }`}>
                    <div className="font-semibold text-sm sm:text-base">{option.label}</div>
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
              disabled={loading || !englishName.trim()}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-400 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/30 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <span className="flex items-center justify-center space-x-2 relative z-10">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t('home.form.generating')}</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Generate Chinese Names</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
        
        {/* Results Section */}
        {(hasGenerated || names.length > 0) && (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
                {hasGenerated ? 'Your Chinese Names' : 'Example Chinese Names'}
              </h2>
              {!hasGenerated && (
                <p className="text-white/70 text-sm sm:text-base px-2">Sample names to inspire you - enter your name for personalized results</p>
              )}
            </div>
            
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {names.map((name) => (
                  <NameCard key={name.id} name={name} />
                ))}
              </div>
            )}
            
            {hasGenerated && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  disabled={loading}
                  className="inline-flex items-center space-x-2 bg-white/10 text-yellow-400 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Generate New Names</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Chinese Zodiac Compatibility CTA Section */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
            
            {/* Floating zodiac icons */}
            <div className="absolute top-4 right-4 text-2xl opacity-20 animate-float">🐲</div>
            <div className="absolute bottom-4 left-4 text-2xl opacity-20 animate-float-delayed">🐭</div>
            <div className="absolute top-1/2 left-8 text-xl opacity-15 animate-float-slow">🐅</div>
            <div className="absolute top-1/3 right-8 text-xl opacity-15 animate-float">🐰</div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-pink-400/20 shadow-xl">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 drop-shadow-lg" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                Discover Your Chinese Zodiac Compatibility
              </h3>
              
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
                Now that you have your perfect Chinese name, explore how compatible you are with others using our free Chinese Zodiac Compatibility Calculator. Perfect for love matches, business partnerships, and family harmony.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2 bg-pink-500/20 rounded-xl p-3 border border-pink-400/30">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-pink-300 font-medium">Love Matches</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-purple-500/20 rounded-xl p-3 border border-purple-400/30">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">Relationship Analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-blue-500/20 rounded-xl p-3 border border-blue-400/30">
                  <Star className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">Zodiac Insights</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <button
                onClick={() => window.location.hash = '#compatibility'}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:from-pink-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Check Chinese Zodiac Compatibility</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              
              {/* Popular compatibility examples */}
              <div className="mt-6 sm:mt-8">
                <p className="text-white/60 text-sm mb-4">Popular Compatibility Matches:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center space-x-1 bg-green-500/20 rounded-full px-3 py-1 border border-green-400/30">
                    <span className="text-sm">🐭</span>
                    <Heart className="w-3 h-3 text-pink-400" />
                    <span className="text-sm">🐲</span>
                    <span className="text-xs text-green-300 ml-1">95%</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-500/20 rounded-full px-3 py-1 border border-blue-400/30">
                    <span className="text-sm">🐂</span>
                    <Heart className="w-3 h-3 text-pink-400" />
                    <span className="text-sm">🐍</span>
                    <span className="text-xs text-blue-300 ml-1">92%</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-purple-500/20 rounded-full px-3 py-1 border border-purple-400/30">
                    <span className="text-sm">🐅</span>
                    <Heart className="w-3 h-3 text-pink-400" />
                    <span className="text-sm">🐴</span>
                    <span className="text-xs text-purple-300 ml-1">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameGeneratorPage;