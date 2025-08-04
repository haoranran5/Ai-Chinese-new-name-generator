// 增强型姓名生成服务 - 技术改进版本
import { EnhancedUserProfile, NameRecommendation } from '../types/userProfile';
import { getProfessionalChars, getProfessionalContext } from '../data/professionalNames';
import { getZodiacChars, getZodiacContext, getZodiacPersonality } from '../data/zodiacNames';
import { chineseCharacters, pinyinMap, meaningMap } from '../data/chineseNames';

// 改进的英文名到中文名映射
interface EnhancedNameMapping {
  englishName: string;
  chineseOptions: {
    traditional: string[];
    modern: string[];
    business: string[];
    cute: string[];
    neutral: string[];
  };
  culturalContext: {
    origin: string;
    popularity: number;
    meaning: string;
    famousPeople: string[];
  };
  phoneticSimilarity: number;
}

// 扩展的英文名映射数据库
const enhancedNameMappings: Record<string, EnhancedNameMapping> = {
  'david': {
    englishName: 'David',
    chineseOptions: {
      traditional: ['大', '卫', '德'],
      modern: ['戴', '维', '德'],
      business: ['达', '维', '德'],
      cute: ['小', '卫', '德'],
      neutral: ['戴', '维', '德']
    },
    culturalContext: {
      origin: 'Hebrew',
      popularity: 95,
      meaning: 'Beloved, friend',
      famousPeople: ['David Beckham', 'David Bowie', 'David Cameron']
    },
    phoneticSimilarity: 0.85
  },
  'michael': {
    englishName: 'Michael',
    chineseOptions: {
      traditional: ['迈', '克', '尔'],
      modern: ['迈', '克', '尔'],
      business: ['迈', '克', '尔'],
      cute: ['小', '迈', '克'],
      neutral: ['迈', '克', '尔']
    },
    culturalContext: {
      origin: 'Hebrew',
      popularity: 90,
      meaning: 'Who is like God',
      famousPeople: ['Michael Jackson', 'Michael Jordan', 'Michael Phelps']
    },
    phoneticSimilarity: 0.80
  },
  'emma': {
    englishName: 'Emma',
    chineseOptions: {
      traditional: ['艾', '玛'],
      modern: ['艾', '玛'],
      business: ['艾', '玛'],
      cute: ['小', '艾', '玛'],
      neutral: ['艾', '玛']
    },
    culturalContext: {
      origin: 'Germanic',
      popularity: 92,
      meaning: 'Universal, complete',
      famousPeople: ['Emma Watson', 'Emma Stone', 'Emma Thompson']
    },
    phoneticSimilarity: 0.90
  },
  'sophia': {
    englishName: 'Sophia',
    chineseOptions: {
      traditional: ['索', '菲', '亚'],
      modern: ['索', '菲', '亚'],
      business: ['索', '菲', '亚'],
      cute: ['小', '索', '菲'],
      neutral: ['索', '菲', '亚']
    },
    culturalContext: {
      origin: 'Greek',
      popularity: 88,
      meaning: 'Wisdom',
      famousPeople: ['Sophia Loren', 'Sophia Bush', 'Sophia Grace']
    },
    phoneticSimilarity: 0.85
  }
};

// 语义分析函数
const analyzeNameSemantics = (englishName: string) => {
  const lowerName = englishName.toLowerCase();
  
  return {
    syllables: extractSyllables(englishName),
    meaning: extractMeaning(englishName),
    origin: detectOrigin(englishName),
    personality: analyzePersonality(englishName)
  };
};

// 提取音节
const extractSyllables = (name: string): string[] => {
  const syllables: string[] = [];
  let currentSyllable = '';
  
  for (let i = 0; i < name.length; i++) {
    const char = name[i].toLowerCase();
    currentSyllable += char;
    
    // 简单的音节分割逻辑
    if (isVowel(char) && i < name.length - 1 && !isVowel(name[i + 1])) {
      syllables.push(currentSyllable);
      currentSyllable = '';
    }
  }
  
  if (currentSyllable) {
    syllables.push(currentSyllable);
  }
  
  return syllables.length > 0 ? syllables : [name];
};

// 检测元音
const isVowel = (char: string): boolean => {
  return ['a', 'e', 'i', 'o', 'u'].includes(char);
};

// 提取含义（简化版）
const extractMeaning = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  // 这里可以扩展更复杂的含义分析
  const meaningMap: Record<string, string> = {
    'david': 'beloved, friend',
    'michael': 'who is like God',
    'emma': 'universal, complete',
    'sophia': 'wisdom',
    'alexander': 'defender of the people',
    'isabella': 'pledged to God',
    'william': 'resolute protector',
    'olivia': 'olive tree'
  };
  
  return meaningMap[lowerName] || 'beautiful, meaningful';
};

// 检测名字起源
const detectOrigin = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  // 简化的起源检测
  if (['david', 'michael', 'sarah', 'rachel'].includes(lowerName)) {
    return 'Hebrew';
  } else if (['sophia', 'alexander', 'nicholas'].includes(lowerName)) {
    return 'Greek';
  } else if (['william', 'henry', 'emma'].includes(lowerName)) {
    return 'Germanic';
  } else if (['maria', 'antonio', 'carlos'].includes(lowerName)) {
    return 'Latin';
  }
  
  return 'International';
};

// 分析性格特征
const analyzePersonality = (name: string): string[] => {
  const lowerName = name.toLowerCase();
  
  // 基于名字的性格特征分析
  const personalityMap: Record<string, string[]> = {
    'david': ['friendly', 'loyal', 'strong'],
    'michael': ['powerful', 'protective', 'leader'],
    'emma': ['universal', 'complete', 'nurturing'],
    'sophia': ['wise', 'intelligent', 'thoughtful']
  };
  
  return personalityMap[lowerName] || ['unique', 'special', 'individual'];
};

// 文化匹配算法
const matchCulturalElements = (
  englishName: string, 
  userProfile: EnhancedUserProfile
) => {
  const culturalElements = {
    zodiac: userProfile.cultural.zodiac,
    birthYear: userProfile.cultural.birthYear,
    profession: userProfile.basic.profession,
    personality: userProfile.preferences,
    age: userProfile.basic.age
  };
  
  return generateCulturallyAppropriateNames(englishName, culturalElements);
};

// 生成文化适配的名字
const generateCulturallyAppropriateNames = (
  englishName: string,
  culturalElements: any
): string[][] => {
  const nameVariations: string[][] = [];
  const semantics = analyzeNameSemantics(englishName);
  
  // 基于语义分析生成名字变体
  for (const syllable of semantics.syllables) {
    const chars = mapSyllableToChinese(syllable, culturalElements);
    if (chars.length > 0) {
      nameVariations.push(chars);
    }
  }
  
  return nameVariations;
};

// 音节到中文字符的映射
const mapSyllableToChinese = (syllable: string, culturalElements: any): string[] => {
  const chars: string[] = [];
  
  // 根据音节特征和文化元素选择字符
  if (syllable.includes('d') || syllable.includes('t')) {
    chars.push('德', '达', '大');
  }
  if (syllable.includes('m')) {
    chars.push('明', '美', '敏');
  }
  if (syllable.includes('s')) {
    chars.push('思', '善', '书');
  }
  if (syllable.includes('a')) {
    chars.push('安', '爱', '雅');
  }
  if (syllable.includes('e')) {
    chars.push('恩', '尔', '儿');
  }
  
  return chars;
};

// 改进的字符选择算法
const getCharByPosition = (
  englishName: string, 
  position: number, 
  availableChars: string[],
  culturalContext: any
): string => {
  const char = englishName[position] || englishName[0];
  const charCode = char.toLowerCase().charCodeAt(0);
  
  // 考虑文化背景的字符选择
  let selectedChars = availableChars;
  
  // 根据年龄调整字符选择
  if (culturalContext.age < 25) {
    selectedChars = selectedChars.filter(c => 
      ['新', '创', '智', '慧', '美', '丽', '雅', '静'].includes(c)
    );
  } else if (culturalContext.age > 40) {
    selectedChars = selectedChars.filter(c => 
      ['德', '志', '华', '国', '建', '军', '伟', '强'].includes(c)
    );
  }
  
  // 根据职业调整字符选择
  if (culturalContext.profession) {
    const professionalChars = getProfessionalChars(culturalContext.profession);
    selectedChars = selectedChars.filter(c => professionalChars.includes(c));
  }
  
  // 如果没有合适的字符，使用原始算法
  if (selectedChars.length === 0) {
    selectedChars = availableChars;
  }
  
  const index = (charCode - 97) % selectedChars.length;
  return selectedChars[index];
};

// 增强的名字生成函数
export const generateEnhancedNames = async (
  userProfile: EnhancedUserProfile,
  count: number = 5
): Promise<NameRecommendation[]> => {
  const recommendations: NameRecommendation[] = [];
  const englishName = userProfile.basic.englishName;
  
  // 语义分析
  const semantics = analyzeNameSemantics(englishName);
  console.log('🔍 语义分析结果:', semantics);
  
  // 文化匹配
  const culturalMatch = matchCulturalElements(englishName, userProfile);
  console.log('🎭 文化匹配结果:', culturalMatch);
  
  // 生成名字变体
  for (let i = 0; i < count * 2; i++) {
    const nameVariation = generateNameVariation(
      englishName,
      userProfile,
      semantics,
      culturalMatch
    );
    
    if (nameVariation) {
      recommendations.push(nameVariation);
    }
  }
  
  // 按评分排序并返回
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
};

// 生成名字变体
const generateNameVariation = (
  englishName: string,
  userProfile: EnhancedUserProfile,
  semantics: any,
  culturalMatch: string[][]
): NameRecommendation | null => {
  const gender = userProfile.basic.gender;
  const style = userProfile.preferences.style;
  
  // 获取可用字符
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  // 生成字符组合
  const chars: string[] = [];
  const nameLength = userProfile.preferences.nameLength === 'short' ? 2 : 
                    userProfile.preferences.nameLength === 'long' ? 3 : 
                    Math.random() > 0.5 ? 2 : 3;
  
  for (let j = 0; j < nameLength; j++) {
    const culturalContext = {
      age: userProfile.basic.age,
      profession: userProfile.basic.profession,
      zodiac: userProfile.cultural.zodiac
    };
    
    const char = getCharByPosition(englishName, j, styleChars, culturalContext);
    chars.push(char);
  }
  
  const name = chars.join('');
  const pinyin = chars.map(char => pinyinMap[char] || char).join(' ');
  const meaning = chars.map(char => meaningMap[char] || '美好').join('，');
  
  // 计算评分
  const professionalChars = getProfessionalChars(userProfile.basic.profession);
  const zodiacChars = getZodiacChars(userProfile.cultural.zodiac);
  
  let score = 0;
  const nameChars = name.split('');
  
  // 职业匹配度
  const professionalMatch = nameChars.filter(char => professionalChars.includes(char)).length;
  score += (professionalMatch / nameChars.length) * 30;
  
  // 生肖匹配度
  const zodiacMatch = nameChars.filter(char => zodiacChars.includes(char)).length;
  score += (zodiacMatch / nameChars.length) * 25;
  
  // 语义匹配度
  if (semantics.meaning.includes('wisdom') && nameChars.includes('智')) {
    score += 15;
  }
  if (semantics.meaning.includes('beloved') && nameChars.includes('爱')) {
    score += 15;
  }
  
  // 年龄适配度
  const age = userProfile.basic.age;
  if (age < 25 && (style === 'modern' || style === 'cute')) {
    score += 15;
  } else if (age > 40 && (style === 'traditional' || style === 'business')) {
    score += 15;
  } else {
    score += 10;
  }
  
  // 独特性
  const uniqueness = userProfile.preferences.uniqueness;
  if (uniqueness === 'unique' && name.length >= 3) {
    score += 10;
  } else if (uniqueness === 'common' && name.length <= 2) {
    score += 10;
  } else {
    score += 5;
  }
  
  if (score > 50) {
    return {
      id: `enhanced-${Date.now()}-${Math.random()}`,
      name,
      pinyin,
      meaning,
      gender,
      score: Math.min(100, Math.max(0, score)),
      reasons: [
        `基于"${englishName}"的语义分析生成`,
        `符合${userProfile.basic.profession || '个人'}特点`,
        `契合${userProfile.cultural.zodiac || '文化'}特质`,
        `适合${age < 25 ? '年轻人' : age > 40 ? '成熟人士' : '各年龄段'}使用`
      ],
      culturalContext: {
        zodiac: userProfile.cultural.zodiac,
        profession: userProfile.basic.profession,
        ageGroup: age < 25 ? 'young' : age > 40 ? 'senior' : 'middle'
      }
    };
  }
  
  return null;
}; 