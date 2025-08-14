import React from 'react';
import { Sun, Moon, Star, Sparkles } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const AstrologyPage: React.FC = () => {
  // SEO optimization for astrology page
  React.useEffect(() => {
    document.title = 'Chinese Astrology Guide - Zodiac Signs & BaZi Analysis | Free Chinese Horoscope';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete Chinese astrology guide with zodiac signs, BaZi analysis, and horoscope readings. Discover your Chinese zodiac characteristics, fortune predictions, and compatibility with free AI-powered insights.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'chinese astrology, chinese zodiac signs, bazi analysis, chinese horoscope, chinese zodiac animals, chinese fortune telling, zodiac characteristics, chinese astrology guide');
    
    // Track page view
    trackPageView('Astrology Page', '/astrology');
  }, []);

  const zodiacSigns = [
    { name: 'Rat', year: '2020, 2008, 1996', traits: 'Intelligent, Adaptable, Quick-witted', element: 'Water', color: 'Blue' },
    { name: 'Ox', year: '2021, 2009, 1997', traits: 'Reliable, Patient, Honest', element: 'Earth', color: 'Yellow' },
    { name: 'Tiger', year: '2022, 2010, 1998', traits: 'Brave, Confident, Competitive', element: 'Wood', color: 'Green' },
    { name: 'Rabbit', year: '2023, 2011, 1999', traits: 'Gentle, Quiet, Elegant', element: 'Wood', color: 'Green' },
    { name: 'Dragon', year: '2024, 2012, 2000', traits: 'Confident, Intelligent, Enthusiastic', element: 'Earth', color: 'Yellow' },
    { name: 'Snake', year: '2025, 2013, 2001', traits: 'Wise, Enigmatic, Intuitive', element: 'Fire', color: 'Red' },
    { name: 'Horse', year: '2026, 2014, 2002', traits: 'Animated, Active, Energetic', element: 'Fire', color: 'Red' },
    { name: 'Goat', year: '2027, 2015, 2003', traits: 'Calm, Gentle, Sympathetic', element: 'Earth', color: 'Yellow' },
    { name: 'Monkey', year: '2028, 2016, 2004', traits: 'Sharp, Smart, Curious', element: 'Metal', color: 'White' },
    { name: 'Rooster', year: '2029, 2017, 2005', traits: 'Observant, Hardworking, Courageous', element: 'Metal', color: 'White' },
    { name: 'Dog', year: '2030, 2018, 2006', traits: 'Loyal, Responsible, Reliable', element: 'Earth', color: 'Yellow' },
    { name: 'Pig', year: '2031, 2019, 2007', traits: 'Compassionate, Generous, Diligent', element: 'Water', color: 'Blue' }
  ];

  const baziElements = [
    {
      name: 'Wood',
      characteristics: 'Growth, Creativity, Flexibility',
      personality: 'Creative, compassionate, and growth-oriented individuals',
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      name: 'Fire',
      characteristics: 'Energy, Passion, Leadership',
      personality: 'Dynamic, enthusiastic, and natural leaders',
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-pink-500/20'
    },
    {
      name: 'Earth',
      characteristics: 'Stability, Reliability, Nurturing',
      personality: 'Grounded, practical, and supportive individuals',
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      name: 'Metal',
      characteristics: 'Precision, Organization, Determination',
      personality: 'Disciplined, organized, and goal-oriented people',
      color: 'text-gray-400',
      bgColor: 'from-gray-500/20 to-slate-500/20'
    },
    {
      name: 'Water',
      characteristics: 'Wisdom, Intuition, Adaptability',
      personality: 'Intuitive, wise, and adaptable individuals',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/20 relative group shadow-2xl">
            <Sun className="w-10 h-10 text-yellow-400 group-hover:animate-spin drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            Chinese Astrology & Zodiac Signs Guide - Free BaZi Analysis
          </h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-4">
            Complete Chinese Horoscope with 12 Zodiac Animals & Fortune Predictions
          </h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Explore Chinese astrology through detailed Chinese zodiac signs analysis and BaZi readings. Discover your zodiac animal characteristics, fortune predictions, and destiny insights with ancient wisdom and modern AI analysis designed for Western users.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-4 py-2 shadow-lg">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-medium">12 Chinese Zodiac Animals</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm border border-red-400/20 rounded-full px-4 py-2 shadow-lg">
              <Star className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">Free BaZi Readings</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 rounded-full px-4 py-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">Chinese Horoscope</span>
            </div>
          </div>
        </div>

        {/* Chinese Zodiac Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              12 Chinese Zodiac Signs & Animal Characteristics
            </h2>
            <p className="text-white/80">Discover the unique characteristics, personality traits, and fortune predictions for each Chinese zodiac animal</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zodiacSigns.map((sign, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {sign.name}
                    </h3>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-white/60">Years: </span>
                      <span className="text-white/90">{sign.year}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Traits: </span>
                      <span className="text-white/90">{sign.traits}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Element: </span>
                      <span className="text-white/90">{sign.element}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Lucky Color: </span>
                      <span className="text-white/90">{sign.color}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BaZi Elements Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              BaZi Five Elements Analysis - Chinese Astrology Foundation
            </h2>
            <p className="text-white/80">Understanding the five fundamental elements in Chinese astrology that shape your destiny and personality according to BaZi principles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {baziElements.map((element, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${element.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className={`w-6 h-6 ${element.color}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${element.color}`}>
                    {element.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/80 font-medium">{element.characteristics}</p>
                    <p className="text-white/70">{element.personality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fortune Reading Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5"></div>
            <div className="relative z-10">
              <Moon className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Get Your Free Personalized BaZi Reading & Chinese Horoscope
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Get a detailed analysis of your Chinese astrology birth chart using traditional BaZi principles combined with modern AI insights for accurate fortune telling, zodiac compatibility, and personalized life guidance.
              </p>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-xl">
                Get Free BaZi Reading & Chinese Horoscope
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstrologyPage;