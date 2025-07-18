import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, Home, Building, Bed, DollarSign, Sparkles, Sun, Moon } from 'lucide-react';

const FengShuiTipsPage: React.FC = () => {
  const { t } = useTranslation();

  const fengShuiTips = [
    {
      icon: Home,
      title: 'Home Feng Shui Tips',
      color: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-400',
      tips: [
        'Keep your entrance clear and well-lit to welcome positive Qi flow',
        'Place mirrors strategically to reflect light and expand space energy',
        'Use plants to purify air and enhance natural Chi circulation',
        'Maintain clutter-free spaces for optimal energy movement',
        'Position furniture to create smooth traffic flow throughout rooms'
      ]
    },
    {
      icon: Building,
      title: 'Office Feng Shui for Success',
      color: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400',
      tips: [
        'Position your desk facing the door for command and control',
        'Keep your back to a solid wall for support and stability',
        'Add water elements like fountains to enhance wealth Chi',
        'Use crystals to amplify positive energy and focus',
        'Maintain organized workspace for clear thinking and productivity'
      ]
    },
    {
      icon: Bed,
      title: 'Bedroom Harmony & Rest',
      color: 'from-red-500/20 to-pink-500/20',
      iconColor: 'text-red-400',
      tips: [
        'Position bed diagonally opposite to the door for security',
        'Use soft, calming colors to promote restful sleep',
        'Remove electronics to reduce electromagnetic interference',
        'Keep pairs of objects to enhance relationship energy',
        'Ensure good air circulation for healthy Chi flow'
      ]
    },
    {
      icon: DollarSign,
      title: 'Wealth Corner Activation',
      color: 'from-pink-500/20 to-purple-500/20',
      iconColor: 'text-pink-400',
      tips: [
        'Locate the southeast corner of your home for wealth energy',
        'Add purple or green elements to activate money Chi',
        'Place healthy plants or water features in wealth areas',
        'Keep wealth corners clean and well-maintained',
        'Use symbols of abundance like coins or prosperity plants'
      ]
    }
  ];

  const seasonalTips = [
    {
      season: 'Spring',
      icon: Sun,
      color: 'text-green-400',
      tips: ['Add fresh flowers and plants', 'Open windows for fresh air', 'Use light, bright colors']
    },
    {
      season: 'Summer',
      icon: Sun,
      color: 'text-yellow-400',
      tips: ['Enhance fire elements', 'Use red and orange accents', 'Maximize natural light']
    },
    {
      season: 'Autumn',
      icon: Moon,
      color: 'text-orange-400',
      tips: ['Add metal elements', 'Use earth tones', 'Organize and declutter']
    },
    {
      season: 'Winter',
      icon: Moon,
      color: 'text-blue-400',
      tips: ['Enhance water elements', 'Use darker colors', 'Focus on rest and reflection']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/20 relative group shadow-2xl">
            <Compass className="w-10 h-10 text-yellow-400 group-hover:animate-spin drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">
            Essential Feng Shui Tips for Better Qi Flow
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Master Feng Shui tips to improve Qi flow and achieve perfect Chi balance in your home and office. Expert guidance for harmonious living spaces.
          </p>
        </div>

        {/* Main Feng Shui Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {fengShuiTips.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3 text-white/80">
                        <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seasonal Feng Shui */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Seasonal Feng Shui Adjustments
            </h2>
            <p className="text-white/80">Adapt your space to the natural energy cycles of the seasons</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalTips.map((season, index) => {
              const Icon = season.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-white/10 to-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-8 h-8 ${season.color}`} />
                  </div>
                  <h4 className="font-semibold text-white mb-3">{season.season}</h4>
                  <ul className="space-y-2">
                    {season.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-white/70">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FengShuiTipsPage;