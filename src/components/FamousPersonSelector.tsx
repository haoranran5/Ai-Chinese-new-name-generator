import React, { useState, useEffect } from 'react';
import { Search, Users, Heart, Shield, Brain, BookOpen, Palette, TestTube, Briefcase, Music } from 'lucide-react';
import { getRecommendedFamousPeople, getFamousPersonDetails } from '../services/famousPersonNameGenerator';
import { FamousPerson } from '../data/famousChinesePeople';

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
  const [recommendedPeople, setRecommendedPeople] = useState<FamousPerson[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    const people = getRecommendedFamousPeople(gender, style);
    setRecommendedPeople(people);
  }, [gender, style]);

  const filteredPeople = recommendedPeople.filter(person => {
    const matchesSearch = searchTerm === '' || 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.englishName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.achievements.some(achievement => achievement.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === '' || person.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: 'philosopher', label: '哲学家', icon: Brain },
    { key: 'poet', label: '诗人', icon: BookOpen },
    { key: 'politician', label: '政治家', icon: Users },
    { key: 'military', label: '军事家', icon: Shield },
    { key: 'artist', label: '艺术家', icon: Palette },
    { key: 'scientist', label: '科学家', icon: TestTube },
    { key: 'business', label: '商业家', icon: Briefcase },
    { key: 'entertainer', label: '演艺家', icon: Music }
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
      {/* 标题和说明 */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <Users className="w-6 h-6 mr-2 text-yellow-400" />
          选择您喜欢的中国名人
        </h3>
        <p className="text-white/70">
          根据您选择的性别和风格，我们为您推荐了以下中国名人。选择您喜欢的名人，我们将基于其特点为您生成个性化的中文名字。
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索名人..."
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
            <option value="">所有类别</option>
            {categories.map(category => (
              <option key={category.key} value={category.key}>{category.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 名人列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            className={`bg-white/10 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
              selectedPerson?.id === person.id
                ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/30'
                : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/20'
            }`}
            onClick={() => onPersonSelect(person)}
          >
            <div className="p-4">
              {/* 名人头像和基本信息 */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-yellow-400">{person.name[0]}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{person.name}</h4>
                  <p className="text-white/70 text-sm">{person.pinyin}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPopularityBg(person.popularity)} ${getPopularityColor(person.popularity)}`}>
                  {person.popularity}/10
                </div>
              </div>

              {/* 成就和性格 */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {person.achievements.slice(0, 2).map((achievement, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {person.personality.slice(0, 3).map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* 时代和类别 */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                <span className="text-white/60 text-xs">
                  {person.era === 'ancient' ? '古代' : 
                   person.era === 'imperial' ? '帝国' : 
                   person.era === 'modern' ? '近代' : '当代'}
                </span>
                <span className="text-white/60 text-xs">
                  {categories.find(c => c.key === person.category)?.label || person.category}
                </span>
              </div>

              {/* 选择按钮 */}
              {selectedPerson?.id === person.id && (
                <div className="mt-3 pt-3 border-t border-yellow-400/30">
                  <div className="flex items-center justify-center text-yellow-400 text-sm font-medium">
                    <Heart className="w-4 h-4 mr-1" />
                    已选择
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 详细信息模态框 */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {(() => {
                const person = getFamousPersonDetails(showDetails);
                if (!person) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{person.name}</h3>
                      <button
                        onClick={() => setShowDetails(null)}
                        className="text-white/70 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">基本信息</h4>
                        <div className="space-y-2 text-white/80 text-sm">
                          <p><strong>拼音：</strong>{person.pinyin}</p>
                          <p><strong>英文名：</strong>{person.englishName}</p>
                          <p><strong>生卒年：</strong>{person.birthYear} - {person.deathYear}</p>
                          <p><strong>时代：</strong>{person.era}</p>
                          <p><strong>类别：</strong>{person.category}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-2">性格特征</h4>
                        <div className="flex flex-wrap gap-1">
                          {person.personality.map((trait, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">主要成就</h4>
                      <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                        {person.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">名言名句</h4>
                      <div className="space-y-2">
                        {person.famousQuotes?.map((quote, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-3 text-white/90 text-sm italic">
                            "{quote}"
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">历史影响</h4>
                      <p className="text-white/80 text-sm">{person.historicalImpact}</p>
                    </div>
                    
                    <div className="flex justify-center pt-4">
                      <button
                        onClick={() => {
                          onPersonSelect(person);
                          setShowDetails(null);
                        }}
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:from-yellow-400 hover:to-orange-500 transition-all duration-300"
                      >
                        选择这位名人
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 空状态 */}
      {filteredPeople.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/50">没有找到匹配的名人</p>
        </div>
      )}
    </div>
  );
};

export default FamousPersonSelector; 