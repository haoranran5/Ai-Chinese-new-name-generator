import React, { useState, useEffect } from 'react';
import { Search, Users, Heart, Shield, Brain, BookOpen, Palette, TestTube, Briefcase, Music, RefreshCw, Award } from 'lucide-react';
import { FamousPerson, famousChinesePeople } from '../data/famousChinesePeople';

interface FamousPersonSelectorProps {
  gender: string;
  style: string;
  onPersonSelect: (person: FamousPerson) => void;
  selectedPerson?: FamousPerson | null;
}

const FamousPersonSelector: React.FC<FamousPersonSelectorProps> = ({
  gender,
  style,
  onPersonSelect,
  selectedPerson
}) => {
  const [displayedPeople, setDisplayedPeople] = useState<FamousPerson[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // 获取适合的名人列表
  const getSuitablePeople = () => {
    return famousChinesePeople.filter(person => 
      person.gender === gender || person.gender === 'neutral'
    );
  };

  // 随机选择10个名人
  const selectRandomPeople = () => {
    const suitablePeople = getSuitablePeople();
    const shuffled = [...suitablePeople].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  // 刷新名人列表
  const refreshPeople = () => {
    setDisplayedPeople(selectRandomPeople());
    setSearchTerm('');
    setSelectedCategory('');
  };

  useEffect(() => {
    refreshPeople();
  }, [gender, style]);

  const filteredPeople = displayedPeople.filter(person => {
    if (searchTerm === '') {
      return selectedCategory === '' || person.category === selectedCategory;
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    // Search in multiple fields
    const matchesSearch = 
      person.name.toLowerCase().includes(searchLower) ||
      person.pinyin.toLowerCase().includes(searchLower) ||
      person.englishName?.toLowerCase().includes(searchLower) ||
      person.briefIntroduction?.toLowerCase().includes(searchLower) ||
      person.achievements.some(achievement => achievement.toLowerCase().includes(searchLower)) ||
      person.personality.some(trait => trait.toLowerCase().includes(searchLower)) ||
      person.keyContributions.some(contribution => contribution.toLowerCase().includes(searchLower));
    
    const matchesCategory = selectedCategory === '' || person.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: 'philosopher', label: 'Philosophers', icon: Brain },
    { key: 'poet', label: 'Poets & Writers', icon: BookOpen },
    { key: 'politician', label: 'Politicians', icon: Users },
    { key: 'military', label: 'Military Leaders', icon: Shield },
    { key: 'artist', label: 'Artists', icon: Palette },
    { key: 'scientist', label: 'Scientists', icon: TestTube },
    { key: 'business', label: 'Business Leaders', icon: Briefcase },
    { key: 'entertainer', label: 'Entertainers', icon: Music }
  ];

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 9) return 'text-yellow-400';
    if (popularity >= 7) return 'text-orange-400';
    return 'text-blue-400';
  };

  const getPopularityBg = (popularity: number) => {
    if (popularity >= 9) return 'bg-yellow-500/20';
    if (popularity >= 7) return 'bg-orange-500/20';
    return 'bg-blue-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <Users className="w-6 h-6 mr-2 text-yellow-400" />
          Choose Your Favorite Chinese Historical Figure
        </h3>
        <p className="text-white/70">
          We've selected 10 random Chinese historical figures for you. If you're not satisfied, click the refresh button to get a new selection!
        </p>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={refreshPeople}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh Selection
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, achievements, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.key} value={category.key}>{category.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.map(person => (
          <div
            key={person.id}
            className={`bg-white/10 backdrop-blur-sm rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
              selectedPerson?.id === person.id 
                ? 'border-yellow-400 bg-yellow-500/20' 
                : 'border-white/20 hover:border-yellow-400/50'
            }`}
            onClick={() => onPersonSelect(person)}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">{person.name}</h4>
                  <p className="text-yellow-400 text-sm">{person.pinyin}</p>
                  {person.englishName && (
                    <p className="text-white/70 text-sm">{person.englishName}</p>
                  )}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getPopularityBg(person.popularity)} ${getPopularityColor(person.popularity)}`}>
                  {person.popularity}/10
                </div>
              </div>

              {/* Category and Era */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {categories.find(c => c.key === person.category)?.label || person.category}
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  {person.era}
                </span>
              </div>

              {/* Brief Introduction */}
              <p className="text-white/80 text-sm mb-3 line-clamp-2">
                {person.briefIntroduction}
              </p>

              {/* Key Achievements */}
              <div className="space-y-1">
                {person.achievements.slice(0, 2).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    <span className="text-white/70 text-xs">{achievement}</span>
                  </div>
                ))}
              </div>

              {/* Personality Traits */}
              <div className="mt-3 flex flex-wrap gap-1">
                {person.personality.slice(0, 3).map((trait, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Details Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(showDetails === person.id ? null : person.id);
                }}
                className="mt-3 w-full bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition-colors"
              >
                {showDetails === person.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {/* Expanded Details */}
            {showDetails === person.id && (
              <div className="px-4 pb-4 border-t border-white/10">
                <div className="pt-4 space-y-3">
                  {/* Key Contributions */}
                  <div>
                    <h5 className="text-white font-semibold mb-2">Key Contributions:</h5>
                    <ul className="space-y-1">
                      {person.keyContributions.slice(0, 3).map((contribution, index) => (
                        <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Famous Quotes */}
                  {person.famousQuotes && person.famousQuotes.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-2">Famous Quotes:</h5>
                      <div className="space-y-1">
                        {person.famousQuotes.slice(0, 2).map((quote, index) => (
                          <p key={index} className="text-white/70 text-sm italic">
                            "{quote}"
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Historical Impact */}
                  <div>
                    <h5 className="text-white font-semibold mb-2">Historical Impact:</h5>
                    <p className="text-white/80 text-sm">{person.historicalImpact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPeople.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/70">No historical figures match your search criteria.</p>
          <button
            onClick={refreshPeople}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Refresh Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default FamousPersonSelector; 