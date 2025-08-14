import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ArrowRight, Brain, Zap, Globe, Heart, Info, Users, User, Palette, Crown, Award } from 'lucide-react';
import { trackPageView, trackNameGeneration } from '../utils/analytics';
import { generateNames } from '../services/chineseNameGenerator';
import { generateNamesInspiredByFamousPerson, FamousPersonNameResponse } from '../services/famousPersonNameGenerator';
import { FamousPerson } from '../data/famousChinesePeople';
import NameCard from '../components/NameCard';
import FamousPersonSelector from '../components/FamousPersonSelector';
import FamousPersonNameCard from '../components/FamousPersonNameCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

// interface NameData {
//   id: string;
//   name: string;
//   pinyin: string;
//   meaning: string;
//   gender: string;
// }

const HomePage: React.FC = () => {
  // Name Generator States
  const [englishName, setEnglishName] = useState('');
  const [gender, setGender] = useState('neutral');
  const [style, setStyle] = useState('neutral');
  const [names, setNames] = useState<Array<{id: string; name: string; pinyin: string; meaning: string; gender: string}>>([]);
  const [famousPersonNames, setFamousPersonNames] = useState<FamousPersonNameResponse['names']>([]);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedFamousPerson, setSelectedFamousPerson] = useState<FamousPerson | null>(null);
  const [showFamousPersonSelector, setShowFamousPersonSelector] = useState(false);
  const [generationMode, setGenerationMode] = useState<'normal' | 'famous-person'>('normal');

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
    
    // Track page view
    trackPageView('Home Page', '/');
  }, []);

  // Name Generation Functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!englishName.trim()) return;
    
    setLoading(true);
    try {
      if (generationMode === 'famous-person' && selectedFamousPerson) {
        // 使用名人库起名
        const result = await generateNamesInspiredByFamousPerson({
          englishName: englishName.trim(),
          gender: gender as 'male' | 'female' | 'neutral',
          favoritePersonId: selectedFamousPerson.id,
          style: style as 'traditional' | 'modern' | 'business' | 'cute' | 'neutral'
        });
        
        setFamousPersonNames(result.names);
        setNames([]); // 清空普通名字
        trackNameGeneration(gender, style);
      } else {
        // 使用普通算法
        const result = await generateNames({
          englishName: englishName.trim(),
          gender: gender as 'male' | 'female' | 'neutral',
          style: style as 'traditional' | 'modern' | 'business' | 'cute' | 'neutral'
        });
        
        setNames(result.names);
        setFamousPersonNames([]); // 清空名人名字
        trackNameGeneration(gender, style);
      }
      
      setHasGenerated(true);
    } catch (error) {
      console.error('生成名字失败:', error);
    } finally {
      setLoading(false);
    }
  };

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
      title: 'AI Name Picker',
      description: 'Our AI picks the perfect Chinese name for you using ancient wisdom and modern tech. Great for babies, business, or just finding a cool name that actually means something.',
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400'
    },
    {
      id: 'maleNames',
      icon: Users,
      title: 'Cool Guy Names',
      description: 'Check out these awesome traditional Chinese guy names. Our random name picker gives you real names that sound great and have cool meanings behind them.',
      color: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400'
    },
    {
      id: 'zodiacNames',
      icon: DragonTigerIcon,
      title: 'Zodiac Name Match',
      description: 'Find a Chinese name that matches your zodiac sign perfectly. Our zodiac name picker makes sure your name vibes with your astrological destiny.',
      color: 'from-pink-500/20 to-purple-500/20',
      iconColor: 'text-pink-400'
    },
    {
      id: 'fantasyNames',
      icon: Brain,
      title: 'Fantasy Name Creator',
      description: 'Make up cool fantasy Chinese names for your games, stories, or creative stuff. Our fantasy name tool gives you imaginative names with real cultural depth.',
      color: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400'
    },
    {
      id: 'compatibility',
      icon: Heart,
      title: 'Zodiac Love Match',
      description: 'Free zodiac compatibility checker for love! See if you and your crush are meant to be, check rat and dragon compatibility, and get the lowdown on your relationship potential.',
      color: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-400'
    },
    {
      id: 'fengShuiTips',
      icon: Compass,
      title: 'Feng Shui Tips - Make Your Space Awesome',
      description: 'Learn proven Feng Shui tricks to make your home and office feel amazing. Get expert tips that actually work for regular homes like yours.',
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
            Find Your Perfect Chinese Name - It's Totally Free!
          </h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-4">
            Get a Cool Chinese Name with AI Magic & Check Your Zodiac Match
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-4">
            Want a real Chinese name? We've got you covered! Our AI picks the best names for you, helps you check if you and your crush are zodiac compatible, and shows you traditional Chinese guy names that actually mean something.
          </p>
          <p className="text-base text-white/70 leading-relaxed max-w-4xl mx-auto">
            Just pick a random Chinese name, see if it matches your zodiac sign, try out some fantasy Chinese names, and learn all the cool cultural stuff behind it. Everything's free and made for folks like us who want to dive into Chinese culture.
          </p>
          
          {/* Feng Shui Features */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-4 py-2 shadow-lg">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-medium">AI Picks Your Name</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 rounded-full px-4 py-2 shadow-lg">
              <Globe className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300 font-medium">Cool Guy Names</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm border border-red-400/20 rounded-full px-4 py-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">Random Name Picker</span>
            </div>
          </div>
        </div>

        {/* Name Generator Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
              Get Your Chinese Name Right Now!
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Just fill out the form below and our AI will pick the perfect Chinese name for you
            </p>
          </div>

          {/* Name Generator Form */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6 relative overflow-hidden mb-8">
            {/* Form background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-3xl"></div>
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
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-white placeholder-white/50 backdrop-blur-sm shadow-inner"
                required
              />
            </div>

            {/* Gender Selection */}
            <div className="space-y-3 relative z-10">
              <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
                <User className="w-4 h-4" />
                <span>Gender Preference</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
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
                    <div className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                      gender === option.value 
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-xl shadow-yellow-400/30 scale-105' 
                        : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                    }`}>
                      <span className="text-lg">{option.emoji}</span>
                      <span className="font-semibold">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Generation Mode Selection */}
            <div className="space-y-3 relative z-10">
              <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
                <Crown className="w-4 h-4" />
                <span>Name Generation Mode</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'normal', label: 'Traditional', desc: 'Classic algorithm', icon: Sparkles },
                  { value: 'famous-person', label: 'Famous Person', desc: 'Based on Chinese celebrities', icon: Award }
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <label key={option.value} className="relative">
                      <input
                        type="radio"
                        name="generationMode"
                        value={option.value}
                        checked={generationMode === option.value}
                        onChange={(e) => setGenerationMode(e.target.value as 'normal' | 'famous-person')}
                        className="sr-only"
                      />
                      <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                        generationMode === option.value 
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-xl shadow-yellow-400/30 scale-105' 
                          : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                      }`}>
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-semibold text-sm">{option.label}</div>
                          <div className="text-xs text-white/70">{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Famous Person Selection */}
            {generationMode === 'famous-person' && (
              <div className="space-y-3 relative z-10">
                <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
                  <Users className="w-4 h-4" />
                  <span>Choose Your Favorite Chinese Historical Figure</span>
                </label>
                {selectedFamousPerson ? (
                  <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl border border-yellow-400/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-yellow-400">{selectedFamousPerson.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{selectedFamousPerson.name}</h4>
                          <p className="text-white/70 text-sm">{selectedFamousPerson.pinyin}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowFamousPersonSelector(true)}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors duration-300 text-sm"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowFamousPersonSelector(true)}
                    className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl text-white/70 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Click to choose your favorite Chinese historical figure</span>
                    </div>
                  </button>
                )}
              </div>
            )}

            {/* Style Selection */}
            <div className="space-y-3 relative z-10">
              <label className="flex items-center space-x-2 text-sm font-semibold text-white/90">
                <Palette className="w-4 h-4" />
                <span>Name Style</span>
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
                    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm shadow-lg ${
                      style === option.value 
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-xl shadow-yellow-400/30 scale-105' 
                        : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/10 text-white/80 hover:scale-102'
                    }`}>
                      <div className="font-semibold text-sm">{option.label}</div>
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
                disabled={loading || !englishName.trim() || (generationMode === 'famous-person' && !selectedFamousPerson)}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-5 px-8 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/30 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <span className="flex items-center justify-center space-x-2 relative z-10">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      <span>
                        {generationMode === 'famous-person' 
                          ? `Generate names inspired by ${selectedFamousPerson?.name}`
                          : 'Generate Chinese Names with AI'
                        }
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Results Section */}
          {(hasGenerated || names.length > 0 || famousPersonNames.length > 0) && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your Chinese Names Are Ready!
                </h3>
                <p className="text-white/70">
                  Here are your personalized Chinese names with meanings and cultural significance
                </p>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <LoadingSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generationMode === 'famous-person' 
                    ? famousPersonNames.map((name, index) => (
                        <FamousPersonNameCard key={index} name={name} />
                      ))
                    : names.map((name) => (
                        <NameCard key={name.id} name={name} />
                      ))
                  }
                </div>
              )}
            </div>
          )}
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4">
              Everything You Need for Chinese Names & Zodiac Stuff
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We've got the best Chinese name picker with AI smarts, a zodiac compatibility checker, and cool cultural tools that mix old wisdom with new tech
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
              What Makes Our Name Picker So Awesome
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Check out all the cool features that make our Chinese name generator the best one out there
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Cool Guy Names</h4>
              <p className="text-sm text-white/70">
                Traditional Chinese guy names that actually mean something cool
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">AI Name Picker</h4>
              <p className="text-sm text-white/70">
                Our AI picks the best Chinese names using smart algorithms and cultural know-how
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Random Name Picker</h4>
              <p className="text-sm text-white/70">
                Get random Chinese names instantly with our super fast name picker
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Fantasy Name Creator</h4>
              <p className="text-sm text-white/70">
                Make up cool fantasy Chinese names for your creative projects and games
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Why Pick Our Name Generator?
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              We've got the best Chinese name picker with AI smarts and real cultural know-how
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">100% Free - No Hidden Costs</h4>
              <p className="text-sm text-white/70">
                All our name picking, zodiac matching, and cultural stuff is totally free. No catches, no hidden fees.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">AI Magic for Better Names</h4>
              <p className="text-sm text-white/70">
                We mix cutting-edge AI with real Chinese naming traditions to give you names that actually make sense and sound great.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Real Chinese Culture</h4>
              <p className="text-sm text-white/70">
                We explain real Chinese naming traditions and zodiac stuff in a way that makes sense to us Westerners, making ancient wisdom actually useful.
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

        {/* Famous Person Selector Modal */}
        {showFamousPersonSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Choose Your Favorite Chinese Historical Figure</h3>
                  <button
                    onClick={() => setShowFamousPersonSelector(false)}
                    className="text-white/70 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>
                <FamousPersonSelector
                  gender={gender}
                  style={style}
                  onPersonSelect={(person) => {
                    setSelectedFamousPerson(person);
                    setShowFamousPersonSelector(false);
                  }}
                  selectedPerson={selectedFamousPerson}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;