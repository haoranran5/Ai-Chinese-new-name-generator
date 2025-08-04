// 个性化姓名生成服务
import { EnhancedUserProfile, NameRecommendation } from '../types/userProfile';
import { getProfessionalChars, getProfessionalContext } from '../data/professionalNames';
import { getZodiacChars, getZodiacContext, getZodiacPersonality } from '../data/zodiacNames';
import { chineseCharacters, pinyinMap, meaningMap } from '../data/chineseNames';

export interface PersonalizedGenerateRequest {
  userProfile: EnhancedUserProfile;
  count?: number;
}

export interface PersonalizedGenerateResponse {
  recommendations: NameRecommendation[];
  culturalInsights: {
    profession: string;
    zodiac: string;
    personality: string[];
  };
}

// 计算名字评分
const calculateNameScore = (
  name: string, 
  userProfile: EnhancedUserProfile,
  professionalChars: string[],
  zodiacChars: string[]
): number => {
  let score = 0;
  const chars = name.split('');
  
  // 职业匹配度 (30%)
  const professionalMatch = chars.filter(char => professionalChars.includes(char)).length;
  score += (professionalMatch / chars.length) * 30;
  
  // 生肖匹配度 (25%)
  const zodiacMatch = chars.filter(char => zodiacChars.includes(char)).length;
  score += (zodiacMatch / chars.length) * 25;
  
  // 年龄适配度 (20%)
  const age = userProfile.basic.age;
  if (age < 25) {
    // 年轻人适合现代、活泼的名字
    if (userProfile.preferences.style === 'modern' || userProfile.preferences.style === 'cute') {
      score += 20;
    }
  } else if (age > 40) {
    // 年长者适合传统、稳重的名字
    if (userProfile.preferences.style === 'traditional' || userProfile.preferences.style === 'business') {
      score += 20;
    }
  } else {
    // 中年人适合平衡的名字
    score += 15;
  }
  
  // 使用场景适配度 (15%)
  const purpose = userProfile.context.purpose;
  if (purpose === 'business' && userProfile.preferences.formality === 'formal') {
    score += 15;
  } else if (purpose === 'personal' && userProfile.preferences.formality === 'casual') {
    score += 15;
  } else {
    score += 10;
  }
  
  // 独特性 (10%)
  const uniqueness = userProfile.preferences.uniqueness;
  if (uniqueness === 'unique' && name.length >= 3) {
    score += 10;
  } else if (uniqueness === 'common' && name.length <= 2) {
    score += 10;
  } else {
    score += 5;
  }
  
  return Math.min(100, Math.max(0, score));
};

// 生成个性化推荐原因
const generateRecommendationReasons = (
  name: string,
  userProfile: EnhancedUserProfile,
  professionalContext: string,
  zodiacContext: string
): string[] => {
  const reasons: string[] = [];
  const chars = name.split('');
  
  // 职业相关原因
  if (userProfile.basic.profession) {
    reasons.push(`符合${userProfile.basic.profession}行业特点：${professionalContext}`);
  }
  
  // 生肖相关原因
  if (userProfile.cultural.zodiac) {
    reasons.push(`契合${userProfile.cultural.zodiac}生肖特质：${zodiacContext}`);
  }
  
  // 年龄相关原因
  const age = userProfile.basic.age;
  if (age < 25) {
    reasons.push('适合年轻人的现代风格');
  } else if (age > 40) {
    reasons.push('体现成熟稳重的传统韵味');
  } else {
    reasons.push('平衡传统与现代的中庸之美');
  }
  
  // 使用场景原因
  const purpose = userProfile.context.purpose;
  if (purpose === 'business') {
    reasons.push('适合商务场合的专业形象');
  } else if (purpose === 'personal') {
    reasons.push('体现个人特色的亲切感');
  } else if (purpose === 'creative') {
    reasons.push('富有创意和想象力的表达');
  }
  
  return reasons;
};

// 生成个性化名字列表
const generatePersonalizedNameList = (
  userProfile: EnhancedUserProfile,
  professionalChars: string[],
  zodiacChars: string[],
  count: number = 5
): NameRecommendation[] => {
  const recommendations: NameRecommendation[] = [];
  const gender = userProfile.basic.gender;
  const style = userProfile.preferences.style;
  
  // 获取可用字符
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  // 混合职业和生肖字符
  const allChars = [...new Set([...professionalChars, ...zodiacChars, ...styleChars])];
  
  // 生成名字组合
  for (let i = 0; i < count * 2; i++) {
    const nameLength = userProfile.preferences.nameLength === 'short' ? 2 : 
                      userProfile.preferences.nameLength === 'long' ? 3 : 
                      Math.random() > 0.5 ? 2 : 3;
    
    const chars: string[] = [];
    for (let j = 0; j < nameLength; j++) {
      const charPool = j === 0 ? allChars : styleChars;
      const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
      chars.push(randomChar);
    }
    
    const name = chars.join('');
    const pinyin = chars.map(char => pinyinMap[char] || char).join(' ');
    const meaning = chars.map(char => meaningMap[char] || '美好').join('，');
    
    const score = calculateNameScore(name, userProfile, professionalChars, zodiacChars);
    
    if (score > 50) { // 只保留评分较高的名字
      recommendations.push({
        id: `personalized-${Date.now()}-${i}`,
        name,
        pinyin,
        meaning,
        gender,
        score,
        reasons: generateRecommendationReasons(name, userProfile, 
          getProfessionalContext(userProfile.basic.profession),
          getZodiacContext(userProfile.cultural.zodiac)
        ),
        culturalContext: {
          zodiac: userProfile.cultural.zodiac,
          profession: userProfile.basic.profession,
          ageGroup: userProfile.basic.age < 25 ? 'young' : userProfile.basic.age > 40 ? 'senior' : 'middle'
        }
      });
    }
  }
  
  // 按评分排序并返回指定数量
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
};

// 主要生成函数
export const generatePersonalizedNames = async (
  request: PersonalizedGenerateRequest
): Promise<PersonalizedGenerateResponse> => {
  const { userProfile, count = 5 } = request;
  
  try {
    console.log('🚀 开始生成个性化中文名字:', { userProfile, count });
    
    // 获取职业推荐字符
    const professionalChars = getProfessionalChars(userProfile.basic.profession);
    const professionalContext = getProfessionalContext(userProfile.basic.profession);
    
    // 获取生肖推荐字符
    const zodiacChars = getZodiacChars(userProfile.cultural.zodiac);
    const zodiacContext = getZodiacContext(userProfile.cultural.zodiac);
    const zodiacPersonality = getZodiacPersonality(userProfile.cultural.zodiac);
    
    // 生成个性化推荐
    const recommendations = generatePersonalizedNameList(
      userProfile,
      professionalChars,
      zodiacChars,
      count
    );
    
    console.log('✅ 成功生成个性化名字:', recommendations.length, '个');
    
    return {
      recommendations,
      culturalInsights: {
        profession: professionalContext,
        zodiac: zodiacContext,
        personality: zodiacPersonality
      }
    };
    
  } catch (error) {
    console.error('❌ 生成个性化名字时出错:', error);
    throw error;
  }
};

// 用户行为追踪
export const trackUserBehavior = (userId: string, action: any) => {
  const behaviorData = {
    userId,
    action: action.type,
    timestamp: Date.now(),
    context: action.context,
    result: action.result
  };
  
  // 存储到本地存储
  const existingData = localStorage.getItem('userBehavior') || '[]';
  const behaviors = JSON.parse(existingData);
  behaviors.push(behaviorData);
  localStorage.setItem('userBehavior', JSON.stringify(behaviors));
  
  console.log('📊 用户行为已记录:', behaviorData);
};

// 获取用户偏好
export const getUserPreferences = (userId: string) => {
  try {
    const behaviorData = localStorage.getItem('userBehavior');
    if (!behaviorData) return null;
    
    const behaviors = JSON.parse(behaviorData);
    const userBehaviors = behaviors.filter((b: any) => b.userId === userId);
    
    // 分析用户偏好
    const preferences = {
      selectedStyles: [] as string[],
      selectedLengths: [] as string[],
      culturalPreferences: [] as string[],
      phoneticPreferences: [] as string[]
    };
    
    // 这里可以添加更复杂的偏好分析逻辑
    
    return preferences;
  } catch (error) {
    console.error('获取用户偏好失败:', error);
    return null;
  }
}; 