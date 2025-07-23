import React, { useState } from 'react';
import { Heart, Users, Building, Home, Star, Sparkles, ArrowRight, Calendar, Globe, Zap, Info } from 'lucide-react';

// 龙虎生肖图标组件
const DragonTigerIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <defs>
          <linearGradient id="dragonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="tigerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        
        {/* 龙的简化图形 */}
        <g fill="url(#dragonGradient)" opacity="0.9">
          <path d="M8 20 Q12 16 18 18 Q22 20 20 24 Q18 28 14 26 Q10 24 8 20 Z" />
          <circle cx="16" cy="20" r="2" fill="#fff" opacity="0.8" />
          <path d="M18 18 Q24 16 26 20" stroke="url(#dragonGradient)" strokeWidth="2" fill="none" />
        </g>
        
        {/* 虎的简化图形 */}
        <g fill="url(#tigerGradient)" opacity="0.9">
          <path d="M28 28 Q32 24 38 26 Q42 28 40 32 Q38 36 34 34 Q30 32 28 28 Z" />
          <circle cx="36" cy="28" r="2" fill="#fff" opacity="0.8" />
          <path d="M30 26 Q26 24 24 28" stroke="url(#tigerGradient)" strokeWidth="2" fill="none" />
        </g>
        
        {/* 中心连接线 */}
        <path d="M20 22 Q24 24 28 26" stroke="#ec4899" strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="24" cy="24" r="3" fill="#ec4899" opacity="0.3" />
      </svg>
    </div>
  );
};

const CompatibilityPage: React.FC = () => {
  const [person1Zodiac, setPerson1Zodiac] = useState('');
  const [person2Zodiac, setPerson2Zodiac] = useState('');
  const [person1Birthday, setPerson1Birthday] = useState('');
  const [person2Birthday, setPerson2Birthday] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);

  // 设置页面标题和meta信息
  React.useEffect(() => {
    document.title = 'Chinese Zodiac Compatibility Calculator - Love Match & Relationship Analysis';
    
    // 添加meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Chinese zodiac compatibility calculator for love matches. Discover rat and dragon compatibility, relationship analysis, and Chinese zodiac love match predictions with detailed compatibility scores.');
    }
    
    // 添加关键词meta标签
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'chinese zodiac compatibility, chinese zodiac love match, rat and dragon compatibility, zodiac compatibility calculator, chinese astrology compatibility, love match calculator');
  }, []);

  const zodiacSigns = [
    { name: 'Rat', year: '2020, 2008, 1996, 1984, 1972', emoji: '🐭', element: 'Water', traits: 'Intelligent, Adaptable, Quick-witted' },
    { name: 'Ox', year: '2021, 2009, 1997, 1985, 1973', emoji: '🐂', element: 'Earth', traits: 'Reliable, Patient, Honest' },
    { name: 'Tiger', year: '2022, 2010, 1998, 1986, 1974', emoji: '🐅', element: 'Wood', traits: 'Brave, Confident, Competitive' },
    { name: 'Rabbit', year: '2023, 2011, 1999, 1987, 1975', emoji: '🐰', element: 'Wood', traits: 'Gentle, Quiet, Elegant' },
    { name: 'Dragon', year: '2024, 2012, 2000, 1988, 1976', emoji: '🐲', element: 'Earth', traits: 'Confident, Intelligent, Enthusiastic' },
    { name: 'Snake', year: '2025, 2013, 2001, 1989, 1977', emoji: '🐍', element: 'Fire', traits: 'Wise, Enigmatic, Intuitive' },
    { name: 'Horse', year: '2026, 2014, 2002, 1990, 1978', emoji: '🐴', element: 'Fire', traits: 'Animated, Active, Energetic' },
    { name: 'Goat', year: '2027, 2015, 2003, 1991, 1979', emoji: '🐐', element: 'Earth', traits: 'Calm, Gentle, Sympathetic' },
    { name: 'Monkey', year: '2028, 2016, 2004, 1992, 1980', emoji: '🐵', element: 'Metal', traits: 'Sharp, Smart, Curious' },
    { name: 'Rooster', year: '2029, 2017, 2005, 1993, 1981', emoji: '🐓', element: 'Metal', traits: 'Observant, Hardworking, Courageous' },
    { name: 'Dog', year: '2030, 2018, 2006, 1994, 1982', emoji: '🐕', element: 'Earth', traits: 'Loyal, Responsible, Reliable' },
    { name: 'Pig', year: '2031, 2019, 2007, 1995, 1983', emoji: '🐷', element: 'Water', traits: 'Compassionate, Generous, Diligent' }
  ];

  const westernZodiacSigns = [
    { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', traits: 'Bold, Ambitious, Direct' },
    { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', traits: 'Reliable, Patient, Practical' },
    { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', traits: 'Curious, Adaptable, Expressive' },
    { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', traits: 'Intuitive, Emotional, Protective' },
    { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', traits: 'Confident, Generous, Creative' },
    { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', traits: 'Analytical, Helpful, Reliable' },
    { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', traits: 'Diplomatic, Fair-minded, Social' },
    { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', traits: 'Passionate, Resourceful, Brave' },
    { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', traits: 'Adventurous, Generous, Idealistic' },
    { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', traits: 'Responsible, Disciplined, Self-control' },
    { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', traits: 'Progressive, Original, Independent' },
    { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', traits: 'Compassionate, Artistic, Intuitive' }
  ];

  // 根据生日自动识别生肖
  const getZodiacFromBirthday = (birthday: string): string => {
    if (!birthday) return '';
    
    const year = new Date(birthday).getFullYear();
    const zodiacCycle = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const baseYear = 1900; // 1900年是鼠年
    const zodiacIndex = (year - baseYear) % 12;
    return zodiacCycle[zodiacIndex];
  };

  // 处理生日输入变化
  const handleBirthdayChange = (birthday: string, person: 'person1' | 'person2') => {
    if (person === 'person1') {
      setPerson1Birthday(birthday);
      const zodiac = getZodiacFromBirthday(birthday);
      if (zodiac) setPerson1Zodiac(zodiac);
    } else {
      setPerson2Birthday(birthday);
      const zodiac = getZodiacFromBirthday(birthday);
      if (zodiac) setPerson2Zodiac(zodiac);
    }
  };

  const compatibilityData: Record<string, Record<string, { score: number; description: string; advice: string; loveMatch: string }>> = {
    'Rat': {
      'Dragon': { 
        score: 95, 
        description: 'Excellent rat and dragon compatibility with strong mutual attraction and shared ambitions', 
        advice: 'Focus on shared goals and support each other\'s dreams',
        loveMatch: 'Perfect love match - Dragon\'s confidence complements Rat\'s intelligence beautifully'
      },
      'Monkey': { 
        score: 90, 
        description: 'Great intellectual connection and fun partnership in this chinese zodiac love match', 
        advice: 'Keep communication open and maintain your playful nature',
        loveMatch: 'Excellent compatibility - both signs share wit and adaptability'
      },
      'Ox': { 
        score: 85, 
        description: 'Stable and reliable relationship with strong chinese zodiac compatibility', 
        advice: 'Balance spontaneity with routine for lasting harmony',
        loveMatch: 'Good long-term potential with complementary strengths'
      },
      'Rat': { 
        score: 75, 
        description: 'Good understanding but may compete for attention', 
        advice: 'Give each other space to shine individually',
        loveMatch: 'Moderate compatibility - understand each other well but need balance'
      },
      'Tiger': { 
        score: 40, 
        description: 'Challenging but passionate chinese zodiac compatibility', 
        advice: 'Work on compromise and patience for this relationship',
        loveMatch: 'Requires effort - opposite personalities can either clash or complement'
      },
      'Horse': { 
        score: 30, 
        description: 'Opposite personalities may clash in this zodiac pairing', 
        advice: 'Focus on finding common ground and shared interests',
        loveMatch: 'Challenging match - significant differences in life approach'
      }
    },
    'Dragon': {
      'Rat': { 
        score: 95, 
        description: 'Perfect rat and dragon compatibility - a legendary chinese zodiac love match', 
        advice: 'Celebrate your natural harmony and shared vision',
        loveMatch: 'Ideal partnership with mutual respect and admiration'
      },
      'Monkey': { 
        score: 88, 
        description: 'Dynamic and exciting chinese zodiac compatibility', 
        advice: 'Channel your combined energy into positive pursuits',
        loveMatch: 'High energy match with great potential for adventure'
      },
      'Rooster': { 
        score: 85, 
        description: 'Strong partnership with mutual respect and admiration', 
        advice: 'Support each other\'s ambitions and celebrate successes',
        loveMatch: 'Excellent compatibility with shared values and goals'
      }
    }
    // Add more compatibility data as needed
  };

  const analyzeCompatibility = () => {
    if (person1Zodiac && person2Zodiac) {
      const result = compatibilityData[person1Zodiac]?.[person2Zodiac] || 
                    compatibilityData[person2Zodiac]?.[person1Zodiac] || 
                    { 
                      score: 60, 
                      description: 'Moderate chinese zodiac compatibility with potential for growth', 
                      advice: 'Focus on communication and understanding each other\'s differences',
                      loveMatch: 'Average compatibility - success depends on mutual effort and understanding'
                    };
      
      setCompatibilityResult({
        ...result,
        person1: person1Zodiac,
        person2: person2Zodiac
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-500/20';
    if (score >= 60) return 'from-yellow-500/20 to-orange-500/20';
    return 'from-red-500/20 to-pink-500/20';
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* SEO Optimized Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-6 backdrop-blur-sm border border-pink-400/20 relative group shadow-2xl">
            <DragonTigerIcon className="w-12 h-12 group-hover:animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            Chinese Zodiac Compatibility Calculator
          </h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-4">
            Free Chinese Zodiac Love Match & Relationship Analysis
          </h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Discover your chinese zodiac compatibility with our free calculator. Perfect for analyzing rat and dragon compatibility, chinese zodiac love matches, and relationship potential based on ancient Chinese astrology wisdom.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-pink-500/10 backdrop-blur-sm border border-pink-400/20 rounded-full px-4 py-2 shadow-lg">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-300 font-medium">Love Compatibility</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-4 py-2 shadow-lg">
              <Building className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Business Partners</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-500/10 backdrop-blur-sm border border-green-400/20 rounded-full px-4 py-2 shadow-lg">
              <Home className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">Family Harmony</span>
            </div>
          </div>
        </div>

        {/* Interactive Birthday Input Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-center text-white mb-6 flex items-center justify-center">
              <Calendar className="w-6 h-6 mr-2" />
              Quick Birthday Analysis
            </h3>
            <p className="text-center text-white/80 mb-6">
              Enter birthdays to automatically detect Chinese zodiac signs and calculate compatibility
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  First Person's Birthday
                </label>
                <input
                  type="date"
                  value={person1Birthday}
                  onChange={(e) => handleBirthdayChange(e.target.value, 'person1')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400 transition-all duration-300 text-white backdrop-blur-sm"
                  lang="en-US"
                  data-date-format="mm/dd/yyyy"
                  style={{ 
                    colorScheme: 'dark',
                    direction: 'ltr',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                />
                {person1Zodiac && (
                  <div className="mt-2 p-3 bg-pink-500/20 rounded-lg border border-pink-400/30">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{zodiacSigns.find(z => z.name === person1Zodiac)?.emoji}</span>
                      <div>
                        <div className="text-pink-300 font-semibold">{person1Zodiac}</div>
                        <div className="text-pink-200 text-sm">{zodiacSigns.find(z => z.name === person1Zodiac)?.traits}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-white/90 font-semibold mb-3">
                  Second Person's Birthday
                </label>
                <input
                  type="date"
                  value={person2Birthday}
                  onChange={(e) => handleBirthdayChange(e.target.value, 'person2')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300 text-white backdrop-blur-sm"
                  lang="en-US"
                  data-date-format="mm/dd/yyyy"
                  style={{ 
                    colorScheme: 'dark',
                    direction: 'ltr',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                />
                {person2Zodiac && (
                  <div className="mt-2 p-3 bg-purple-500/20 rounded-lg border border-purple-400/30">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{zodiacSigns.find(z => z.name === person2Zodiac)?.emoji}</span>
                      <div>
                        <div className="text-purple-300 font-semibold">{person2Zodiac}</div>
                        <div className="text-purple-200 text-sm">{zodiacSigns.find(z => z.name === person2Zodiac)?.traits}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Manual Zodiac Selection */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Chinese Zodiac Compatibility Calculator
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Person 1 */}
              <div>
                <label className="block text-white/90 font-semibold mb-4">
                  <Users className="w-5 h-5 inline mr-2" />
                  First Person's Chinese Zodiac Sign
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {zodiacSigns.map((sign) => (
                    <label key={sign.name} className="relative">
                      <input
                        type="radio"
                        name="person1"
                        value={sign.name}
                        checked={person1Zodiac === sign.name}
                        onChange={(e) => setPerson1Zodiac(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex items-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        person1Zodiac === sign.name 
                          ? 'border-pink-400 bg-pink-400/20 text-pink-300 shadow-xl' 
                          : 'border-white/20 hover:border-pink-400/50 hover:bg-white/10 text-white/80'
                      }`}>
                        <span className="text-lg">{sign.emoji}</span>
                        <div>
                          <div className="font-semibold text-sm">{sign.name}</div>
                          <div className="text-xs text-white/60">{sign.year.split(',')[0]}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Person 2 */}
              <div>
                <label className="block text-white/90 font-semibold mb-4">
                  <Users className="w-5 h-5 inline mr-2" />
                  Second Person's Chinese Zodiac Sign
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {zodiacSigns.map((sign) => (
                    <label key={sign.name} className="relative">
                      <input
                        type="radio"
                        name="person2"
                        value={sign.name}
                        checked={person2Zodiac === sign.name}
                        onChange={(e) => setPerson2Zodiac(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex items-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        person2Zodiac === sign.name 
                          ? 'border-purple-400 bg-purple-400/20 text-purple-300 shadow-xl' 
                          : 'border-white/20 hover:border-purple-400/50 hover:bg-white/10 text-white/80'
                      }`}>
                        <span className="text-lg">{sign.emoji}</span>
                        <div>
                          <div className="font-semibold text-sm">{sign.name}</div>
                          <div className="text-xs text-white/60">{sign.year.split(',')[0]}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={analyzeCompatibility}
                disabled={!person1Zodiac || !person2Zodiac}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-pink-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Calculate Chinese Zodiac Compatibility</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Results with Love Match Details */}
        {compatibilityResult && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Chinese Zodiac Love Match Results
              </h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {zodiacSigns.find(s => s.name === compatibilityResult.person1)?.emoji}
                  </div>
                  <div className="text-white font-semibold">{compatibilityResult.person1}</div>
                </div>
                <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {zodiacSigns.find(s => s.name === compatibilityResult.person2)?.emoji}
                  </div>
                  <div className="text-white font-semibold">{compatibilityResult.person2}</div>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br ${getScoreBackground(compatibilityResult.score)} rounded-2xl p-6 mb-6`}>
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${getScoreColor(compatibilityResult.score)} mb-2`}>
                  {compatibilityResult.score}%
                </div>
                <div className="text-white/90 text-lg">
                  Chinese Zodiac Compatibility Score
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Chinese Zodiac Compatibility Analysis
                  </h4>
                  <p className="text-white/90 leading-relaxed">{compatibilityResult.description}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-400" />
                    Love Match Insights
                  </h4>
                  <p className="text-white/90 leading-relaxed">{compatibilityResult.loveMatch}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                    Relationship Advice
                  </h4>
                  <p className="text-white/90 leading-relaxed">{compatibilityResult.advice}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Western vs Chinese Zodiac Comparison */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <Globe className="w-8 h-8 mr-3 text-blue-400" />
              Western Zodiac vs Chinese Zodiac
            </h3>
            <p className="text-white/80 max-w-3xl mx-auto">
              Understanding the differences between Western astrology and Chinese zodiac compatibility systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-blue-400/20">
              <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Western Zodiac System
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-white/80">• Based on birth month and sun position</p>
                <p className="text-white/80">• 12 signs covering personality traits</p>
                <p className="text-white/80">• Focus on individual characteristics</p>
                <p className="text-white/80">• Elements: Fire, Earth, Air, Water</p>
                <p className="text-white/80">• Monthly cycle system</p>
              </div>
              
              <div className="mt-4">
                <h5 className="font-semibold text-white mb-2">Sample Western Signs:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {westernZodiacSigns.slice(0, 4).map((sign) => (
                    <div key={sign.name} className="text-xs bg-blue-500/20 rounded-lg p-2">
                      <div className="font-semibold text-blue-300">{sign.name}</div>
                      <div className="text-blue-200">{sign.dates}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-red-400/20">
              <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                <DragonTigerIcon className="w-5 h-5 mr-2" />
                Chinese Zodiac System
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-white/80">• Based on birth year and lunar calendar</p>
                <p className="text-white/80">• 12 animal signs with deep cultural meaning</p>
                <p className="text-white/80">• Focus on compatibility and relationships</p>
                <p className="text-white/80">• Elements: Wood, Fire, Earth, Metal, Water</p>
                <p className="text-white/80">• 12-year cycle system</p>
              </div>
              
              <div className="mt-4">
                <h5 className="font-semibold text-white mb-2">Sample Chinese Signs:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {zodiacSigns.slice(0, 4).map((sign) => (
                    <div key={sign.name} className="text-xs bg-red-500/20 rounded-lg p-2">
                      <div className="font-semibold text-red-300 flex items-center">
                        <span className="mr-1">{sign.emoji}</span>
                        {sign.name}
                      </div>
                      <div className="text-red-200">{sign.element}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
            >
              {showComparison ? 'Hide' : 'Show'} Detailed Comparison
            </button>
          </div>
          
          {showComparison && (
            <div className="mt-6 bg-white/5 rounded-2xl p-6">
              <h5 className="text-lg font-bold text-white mb-4">Key Differences in Compatibility Analysis:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h6 className="font-semibold text-blue-400 mb-2">Western Approach:</h6>
                  <ul className="space-y-1 text-white/80">
                    <li>• Element compatibility (Fire + Air, Earth + Water)</li>
                    <li>• Personality trait matching</li>
                    <li>• Individual birth chart analysis</li>
                    <li>• Focus on romantic chemistry</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-semibold text-red-400 mb-2">Chinese Approach:</h6>
                  <ul className="space-y-1 text-white/80">
                    <li>• Animal relationship dynamics</li>
                    <li>• Cultural harmony and family values</li>
                    <li>• Long-term relationship stability</li>
                    <li>• Business and friendship compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Popular Compatibility Matches */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            Popular Chinese Zodiac Love Matches
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500/20 rounded-2xl p-6 border border-green-400/30">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 text-3xl mb-2">
                  <span>🐭</span>
                  <Heart className="w-6 h-6 text-pink-400" />
                  <span>🐲</span>
                </div>
                <h4 className="font-bold text-green-400">Rat & Dragon</h4>
                <div className="text-2xl font-bold text-green-400">95%</div>
              </div>
              <p className="text-white/80 text-sm text-center">
                Perfect rat and dragon compatibility - legendary chinese zodiac love match with mutual admiration and shared ambitions.
              </p>
            </div>
            
            <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-400/30">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 text-3xl mb-2">
                  <span>🐂</span>
                  <Heart className="w-6 h-6 text-pink-400" />
                  <span>🐍</span>
                </div>
                <h4 className="font-bold text-blue-400">Ox & Snake</h4>
                <div className="text-2xl font-bold text-blue-400">92%</div>
              </div>
              <p className="text-white/80 text-sm text-center">
                Excellent chinese zodiac compatibility with deep understanding and shared values for long-term stability.
              </p>
            </div>
            
            <div className="bg-purple-500/20 rounded-2xl p-6 border border-purple-400/30">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 text-3xl mb-2">
                  <span>🐅</span>
                  <Heart className="w-6 h-6 text-pink-400" />
                  <span>🐴</span>
                </div>
                <h4 className="font-bold text-purple-400">Tiger & Horse</h4>
                <div className="text-2xl font-bold text-purple-400">88%</div>
              </div>
              <p className="text-white/80 text-sm text-center">
                Dynamic chinese zodiac love match with high energy and adventurous spirit for exciting relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Compatibility Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">Love Relationships</h4>
            <p className="text-white/80 text-sm">
              Discover romantic chinese zodiac compatibility and relationship potential based on ancient Chinese wisdom and modern analysis.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">Business Partnerships</h4>
            <p className="text-white/80 text-sm">
              Analyze professional chinese zodiac compatibility for successful business collaborations and long-term partnerships.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Home className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">Family Harmony</h4>
            <p className="text-white/80 text-sm">
              Understand family dynamics and improve relationships between family members using chinese zodiac insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityPage;