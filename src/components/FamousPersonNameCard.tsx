import React, { useState } from 'react';
import { Heart, Star, Users, Award, ArrowRight, Info, Copy, Check } from 'lucide-react';
import { FamousPerson } from '../data/famousChinesePeople';

interface FamousPersonNameCardProps {
  name: {
    id: string;
    name: string;
    pinyin: string;
    meaning: string;
    gender: string;
    inspiredBy: {
      person: FamousPerson;
      elements: string[];
      connection: string;
    };
    culturalContext: {
      personality: string[];
      achievements: string[];
      culturalSignificance: string;
    };
  };
  analysis?: {
    personalityMatch: number;
    culturalAlignment: number;
    nameStyleCompatibility: number;
    recommendations: string[];
  };
  onFavorite?: (name: FamousPersonNameCardProps['name']) => void;
  isFavorite?: boolean;
}

const FamousPersonNameCard: React.FC<FamousPersonNameCardProps> = ({
  name,
  analysis,
  onFavorite,
  isFavorite = false
}) => {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name.name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMatchBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 p-6">
        {/* 头部：名字和拼音 */}
        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
            {name.name}
          </h3>
          <p className="text-lg text-white/80 font-medium">{name.pinyin}</p>
        </div>

        {/* 名人信息 */}
        <div className="bg-yellow-500/10 rounded-xl p-4 mb-4 border border-yellow-400/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">受 {name.inspiredBy.person.name} 启发</h4>
              <p className="text-white/70 text-xs">{name.inspiredBy.connection}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {name.inspiredBy.elements.slice(0, 3).map((element, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full"
              >
                {element}
              </span>
            ))}
          </div>
        </div>

        {/* 名字含义 */}
        <div className="mb-4">
          <h5 className="font-semibold text-white mb-2 flex items-center">
            <Award className="w-4 h-4 mr-2 text-blue-400" />
            名字含义
          </h5>
          <p className="text-white/80 text-sm leading-relaxed">{name.meaning}</p>
        </div>

        {/* 文化背景 */}
        <div className="mb-4">
          <h5 className="font-semibold text-white mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2 text-purple-400" />
            文化背景
          </h5>
          <div className="space-y-2">
            <div>
              <span className="text-white/60 text-xs">性格特征：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {name.culturalContext.personality.slice(0, 3).map((trait, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-white/60 text-xs">主要成就：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {name.culturalContext.achievements.slice(0, 2).map((achievement, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 匹配度分析 */}
        {analysis && (
          <div className="mb-4">
            <h5 className="font-semibold text-white mb-2 flex items-center">
              <Info className="w-4 h-4 mr-2 text-cyan-400" />
              匹配度分析
            </h5>
            <div className="grid grid-cols-3 gap-2">
              <div className={`text-center p-2 rounded-lg ${getMatchBg(analysis.personalityMatch)}`}>
                <div className={`text-xs font-medium ${getMatchColor(analysis.personalityMatch)}`}>
                  {analysis.personalityMatch}%
                </div>
                <div className="text-white/60 text-xs">性格匹配</div>
              </div>
              <div className={`text-center p-2 rounded-lg ${getMatchBg(analysis.culturalAlignment)}`}>
                <div className={`text-xs font-medium ${getMatchColor(analysis.culturalAlignment)}`}>
                  {analysis.culturalAlignment}%
                </div>
                <div className="text-white/60 text-xs">文化契合</div>
              </div>
              <div className={`text-center p-2 rounded-lg ${getMatchBg(analysis.nameStyleCompatibility)}`}>
                <div className={`text-xs font-medium ${getMatchColor(analysis.nameStyleCompatibility)}`}>
                  {analysis.nameStyleCompatibility}%
                </div>
                <div className="text-white/60 text-xs">风格兼容</div>
              </div>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors duration-300 text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>复制</span>
                </>
              )}
            </button>
            
            {onFavorite && (
              <button
                onClick={() => onFavorite(name)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-300 text-sm ${
                  isFavorite
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? '已收藏' : '收藏'}</span>
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors duration-300 text-sm"
          >
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
            <span>详情</span>
          </button>
        </div>

        {/* 详细信息 */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <div>
              <h6 className="font-semibold text-white mb-2">详细说明</h6>
              <p className="text-white/70 text-sm leading-relaxed">
                这个名字借鉴了{name.inspiredBy.person.name}的{name.inspiredBy.elements.join('、')}等特点，
                体现了{name.culturalContext.culturalSignificance}的文化内涵。
              </p>
            </div>
            
            {analysis?.recommendations && analysis.recommendations.length > 0 && (
              <div>
                <h6 className="font-semibold text-white mb-2">建议</h6>
                <ul className="text-white/70 text-sm space-y-1">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamousPersonNameCard; 