import React, { useState } from 'react';
import { Heart, Users, Building, Home, Star, Sparkles, ArrowRight, Calendar } from 'lucide-react';

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
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null);

  const zodiacSigns = [
    { name: 'Rat', year: '2020, 2008, 1996, 1984, 1972', emoji: '🐭' },
    { name: 'Ox', year: '2021, 2009, 1997, 1985, 1973', emoji: '🐂' },
    { name: 'Tiger', year: '2022, 2010, 1998, 1986, 1974', emoji: '🐅' },
    { name: 'Rabbit', year: '2023, 2011, 1999, 1987, 1975', emoji: '🐰' },
    { name: 'Dragon', year: '2024, 2012, 2000, 1988, 1976', emoji: '🐲' },
    { name: 'Snake', year: '2025, 2013, 2001, 1989, 1977', emoji: '🐍' },
    { name: 'Horse', year: '2026, 2014, 2002, 1990, 1978', emoji: '🐴' },
    { name: 'Goat', year: '2027, 2015, 2003, 1991, 1979', emoji: '🐐' },
    { name: 'Monkey', year: '2028, 2016, 2004, 1992, 1980', emoji: '🐵' },
    { name: 'Rooster', year: '2029, 2017, 2005, 1993, 1981', emoji: '🐓' },
    { name: 'Dog', year: '2030, 2018, 2006, 1994, 1982', emoji: '🐕' },
    { name: 'Pig', year: '2031, 2019, 2007, 1995, 1983', emoji: '🐷' }
  ];

  const compatibilityData: Record<string, Record<string, { score: number; description: string; advice: string }>> = {
    'Rat': {
      'Dragon': { score: 95, description: 'Excellent match with strong mutual attraction', advice: 'Focus on shared goals and ambitions' },
      'Monkey': { score: 90, description: 'Great intellectual connection and fun partnership', advice: 'Keep communication open and playful' },
      'Ox': { score: 85, description: 'Stable and reliable relationship', advice: 'Balance spontaneity with routine' },
      'Rat': { score: 75, description: 'Good understanding but may compete', advice: 'Give each other space to shine' },
      'Tiger': { score: 40, description: 'Challenging but passionate', advice: 'Work on compromise and patience' },
      'Horse': { score: 30, description: 'Opposite personalities may clash', advice: 'Focus on finding common ground' }
    },
    'Ox': {
      'Snake': { score: 95, description: 'Perfect harmony and deep understanding', advice: 'Trust in your natural compatibility' },
      'Rooster': { score: 90, description: 'Excellent teamwork and shared values', advice: 'Support each other\'s ambitions' },
      'Rat': { score: 85, description: 'Complementary strengths', advice: 'Appreciate your differences' },
      'Ox': { score: 70, description: 'Stable but may lack excitement', advice: 'Add variety to your routine' },
      'Tiger': { score: 35, description: 'Very different approaches to life', advice: 'Practice patience and understanding' },
      'Goat': { score: 25, description: 'Fundamental differences in values', advice: 'Focus on emotional connection' }
    }
    // Add more compatibility data as needed
  };

  const analyzeCompatibility = () => {
    if (person1Zodiac && person2Zodiac) {
      const result = compatibilityData[person1Zodiac]?.[person2Zodiac] || 
                    compatibilityData[person2Zodiac]?.[person1Zodiac] || 
                    { score: 60, description: 'Moderate compatibility with potential for growth', advice: 'Focus on communication and understanding' };
      
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-6 backdrop-blur-sm border border-pink-400/20 relative group shadow-2xl">
            <DragonTigerIcon className="w-12 h-12 group-hover:animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            Chinese Zodiac Compatibility Analysis
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Discover relationship compatibility based on Chinese Zodiac signs. Perfect for love relationships, business partnerships, and family harmony analysis.
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

        {/* Compatibility Calculator */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Compatibility Calculator
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Person 1 */}
              <div>
                <label className="block text-white/90 font-semibold mb-4">
                  <Users className="w-5 h-5 inline mr-2" />
                  First Person's Zodiac Sign
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
                  Second Person's Zodiac Sign
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
                  <span>Analyze Compatibility</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {compatibilityResult && (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Compatibility Analysis Results
              </h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {zodiacSigns.find(s => s.name === compatibilityResult.person1)?.emoji}
                  </div>
                  <div className="text-white font-semibold">{compatibilityResult.person1}</div>
                </div>
                <Heart className="w-8 h-8 text-pink-400" />
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {zodiacSigns.find(s => s.name === compatibilityResult.person2)?.emoji}
                  </div>
                  <div className="text-white font-semibold">{compatibilityResult.person2}</div>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br ${getScoreBackground(compatibilityResult.score)} rounded-2xl p-6 mb-6`}>
              <div className="text-center mb-4">
                <div className={`text-6xl font-bold ${getScoreColor(compatibilityResult.score)} mb-2`}>
                  {compatibilityResult.score}%
                </div>
                <div className="text-white/90 text-lg">
                  Compatibility Score
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Relationship Analysis
                  </h4>
                  <p className="text-white/90">{compatibilityResult.description}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                    Relationship Advice
                  </h4>
                  <p className="text-white/90">{compatibilityResult.advice}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compatibility Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">Love Relationships</h4>
            <p className="text-white/80 text-sm">
              Discover romantic compatibility and relationship potential based on Chinese Zodiac wisdom.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center">
            <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">Business Partnerships</h4>
            <p className="text-white/80 text-sm">
              Analyze professional compatibility for successful business collaborations and partnerships.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 text-center">
            <Home className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">Family Harmony</h4>
            <p className="text-white/80 text-sm">
              Understand family dynamics and improve relationships between family members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityPage;