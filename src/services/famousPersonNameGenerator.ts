// 名人库起名服务 - 基于用户喜欢的名人生成个性化名字
import { FamousPerson, famousChinesePeople } from '../data/famousChinesePeople';
import { chineseCharacters, pinyinMap, meaningMap } from '../data/chineseNames';

export interface FamousPersonNameRequest {
  englishName: string;
  gender: 'male' | 'female' | 'neutral';
  favoritePersonId: string;
  style?: 'traditional' | 'modern' | 'business' | 'cute' | 'neutral';
  additionalPreferences?: {
    personality?: string[];
    achievements?: string[];
    culturalElements?: string[];
  };
}

export interface FamousPersonNameResponse {
  names: Array<{
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
  }>;
  analysis: {
    personalityMatch: number;
    culturalAlignment: number;
    nameStyleCompatibility: number;
    recommendations: string[];
  };
}

// 根据名人特征生成名字
export const generateNamesInspiredByFamousPerson = async (
  request: FamousPersonNameRequest
): Promise<FamousPersonNameResponse> => {
  const { englishName, gender, favoritePersonId, style = 'traditional', additionalPreferences } = request;
  
  // 获取用户喜欢的名人
  const favoritePerson = famousChinesePeople.find(person => person.id === favoritePersonId);
  if (!favoritePerson) {
    throw new Error('未找到指定的名人信息');
  }

  // 分析名人特征
  const personTraits = analyzePersonTraits(favoritePerson);
  const culturalElements = extractCulturalElements(favoritePerson);
  
  // 生成基于名人特征的名字
  const names = generateInspiredNames(englishName, gender, favoritePerson, personTraits, culturalElements, style);
  
  // 分析匹配度
  const analysis = analyzeCompatibility(favoritePerson, gender, style, additionalPreferences);
  
  return {
    names,
    analysis
  };
};

// 分析名人特征
const analyzePersonTraits = (person: FamousPerson) => {
  return {
    personality: person.personality,
    achievements: person.achievements,
    nameStyle: person.nameStyle,
    culturalContext: person.nameComponents.culturalContext,
    nameMeanings: person.nameComponents.meanings,
    popularity: person.popularity
  };
};

// 提取文化元素
const extractCulturalElements = (person: FamousPerson) => {
  return {
    characters: person.nameComponents.characters,
    meanings: person.nameComponents.meanings,
    culturalContext: person.nameComponents.culturalContext,
    era: person.era,
    category: person.category,
    historicalImpact: person.historicalImpact
  };
};

// 生成受名人启发的名字
const generateInspiredNames = (
  englishName: string,
  gender: string,
  person: FamousPerson,
  traits: ReturnType<typeof analyzePersonTraits>,
  culturalElements: ReturnType<typeof extractCulturalElements>,
  style: string
) => {
  const names = [];
  // const englishNameChars = englishName.split('');
  
  // 方法1：使用名人名字中的字符
  const personNameChars = person.nameComponents.characters;
  for (let i = 0; i < 3; i++) {
    const name = generateNameFromPersonChars(personNameChars, englishName, gender, style);
    if (name) {
      names.push({
        id: `person-inspired-${i}`,
        name: name.name,
        pinyin: name.pinyin,
        meaning: name.meaning,
        gender,
        inspiredBy: {
          person,
          elements: ['使用名人名字字符'],
          connection: `借鉴${person.name}的名字结构`
        },
        culturalContext: {
          personality: person.personality,
          achievements: person.achievements,
          culturalSignificance: person.culturalSignificance
        }
      });
    }
  }
  
  // 方法2：基于名人性格特征
  const personalityNames = generateNamesFromPersonality(person.personality, englishName, gender, style);
  personalityNames.forEach((name, index) => {
    names.push({
      id: `personality-${index}`,
      name: name.name,
      pinyin: name.pinyin,
      meaning: name.meaning,
      gender,
      inspiredBy: {
        person,
        elements: person.personality,
        connection: `体现${person.name}的性格特征`
      },
      culturalContext: {
        personality: person.personality,
        achievements: person.achievements,
        culturalSignificance: person.culturalSignificance
      }
    });
  });
  
  // 方法3：基于名人成就
  const achievementNames = generateNamesFromAchievements(person.achievements, englishName, gender, style);
  achievementNames.forEach((name, index) => {
    names.push({
      id: `achievement-${index}`,
      name: name.name,
      pinyin: name.pinyin,
      meaning: name.meaning,
      gender,
      inspiredBy: {
        person,
        elements: person.achievements,
        connection: `传承${person.name}的成就精神`
      },
      culturalContext: {
        personality: person.personality,
        achievements: person.achievements,
        culturalSignificance: person.culturalSignificance
      }
    });
  });
  
  return names.slice(0, 6); // 返回前6个名字
};

// 从名人名字字符生成名字
const generateNameFromPersonChars = (personChars: string[], englishName: string, gender: string, style: string) => {
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  // 结合名人字符和风格字符
  const availableChars = [...new Set([...personChars, ...styleChars])];
  
  const nameLength = englishName.length <= 4 ? 2 : 3;
  const chars: string[] = [];
  
  for (let i = 0; i < nameLength; i++) {
    const charPool = i === 0 ? personChars : availableChars;
    const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
    chars.push(randomChar);
  }
  
  const name = chars.join('');
  const pinyin = chars.map(char => pinyinMap[char] || char).join(' ');
  const meaning = chars.map(char => meaningMap[char] || '美好').join('，');
  
  return { name, pinyin, meaning };
};

// 从名人性格生成名字
const generateNamesFromPersonality = (personality: string[], englishName: string, gender: string, style: string) => {
  const names = [];
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  // 根据性格特征选择字符
  personality.forEach((trait) => {
    const traitChars = styleChars.filter(char => {
      const charMeaning = meaningMap[char] || '';
      return charMeaning.includes(trait) || trait.includes(char);
    });
    
    if (traitChars.length > 0) {
      const chars = [traitChars[0]];
      if (englishName.length > 4) {
        chars.push(styleChars[Math.floor(Math.random() * styleChars.length)]);
      }
      
      const name = chars.join('');
      const pinyin = chars.map(char => pinyinMap[char] || char).join(' ');
      const meaning = `${trait}，${chars.map(char => meaningMap[char] || '美好').join('，')}`;
      
      names.push({ name, pinyin, meaning });
    }
  });
  
  return names.slice(0, 2);
};

// 从名人成就生成名字
const generateNamesFromAchievements = (achievements: string[], englishName: string, gender: string, style: string) => {
  const names = [];
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  achievements.forEach((achievement) => {
    // 提取成就中的关键词
    const keywords = achievement.split(/[，、]/);
    const relevantChars = styleChars.filter(char => {
      const charMeaning = meaningMap[char] || '';
      return keywords.some(keyword => charMeaning.includes(keyword) || keyword.includes(char));
    });
    
    if (relevantChars.length > 0) {
      const chars = [relevantChars[0]];
      if (englishName.length > 4) {
        chars.push(styleChars[Math.floor(Math.random() * styleChars.length)]);
      }
      
      const name = chars.join('');
      const pinyin = chars.map(char => pinyinMap[char] || char).join(' ');
      const meaning = `传承${achievement}的精神，${chars.map(char => meaningMap[char] || '美好').join('，')}`;
      
      names.push({ name, pinyin, meaning });
    }
  });
  
  return names.slice(0, 2);
};

// 分析兼容性
const analyzeCompatibility = (
  person: FamousPerson,
  gender: string,
  style: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  additionalPreferences?: Record<string, unknown>
) => {
  let personalityMatch = 0;
  let culturalAlignment = 0;
  let nameStyleCompatibility = 0;
  const recommendations: string[] = [];
  
  // 性格匹配度
  if (person.gender === gender || person.gender === 'neutral') {
    personalityMatch += 30;
  }
  if (person.nameStyle === style) {
    personalityMatch += 40;
  }
  if (person.popularity >= 8) {
    personalityMatch += 30;
  }
  
  // 文化契合度
  culturalAlignment = Math.min(100, person.popularity * 10);
  
  // 名字风格兼容性
  if (person.nameStyle === style) {
    nameStyleCompatibility = 100;
  } else if (person.nameStyle === 'traditional' && style === 'modern') {
    nameStyleCompatibility = 70;
  } else if (person.nameStyle === 'modern' && style === 'traditional') {
    nameStyleCompatibility = 70;
  } else {
    nameStyleCompatibility = 50;
  }
  
  // 生成建议
  if (personalityMatch < 50) {
    recommendations.push(`建议选择与${person.name}性别或风格更匹配的选项`);
  }
  if (culturalAlignment < 70) {
    recommendations.push(`${person.name}的文化影响力很高，建议深入了解其背景`);
  }
  if (nameStyleCompatibility < 80) {
    recommendations.push(`考虑调整名字风格以更好地体现${person.name}的特点`);
  }
  
  return {
    personalityMatch,
    culturalAlignment,
    nameStyleCompatibility,
    recommendations
  };
};

// 获取推荐名人列表
export const getRecommendedFamousPeople = (gender: string, style: string) => {
  return famousChinesePeople
    .filter(person => 
      (person.gender === gender || person.gender === 'neutral') &&
      person.popularity >= 6 // 降低人气要求，显示更多名人
    )
    .sort((a, b) => {
      // 优先考虑风格匹配和人气
      const aScore = (a.nameStyle === style ? 2 : 1) * a.popularity;
      const bScore = (b.nameStyle === style ? 2 : 1) * b.popularity;
      return bScore - aScore;
    })
    .slice(0, 20); // 增加显示数量
};

// 获取名人详细信息
export const getFamousPersonDetails = (personId: string): FamousPerson | null => {
  return famousChinesePeople.find(person => person.id === personId) || null;
}; 