// 纯前端中文名字生成服务
import { chineseCharacters, pinyinMap, meaningMap, predefinedNames, ChineseName } from '../data/chineseNames';

export interface GenerateRequest {
  englishName: string;
  gender: 'male' | 'female' | 'neutral';
  style: 'traditional' | 'modern' | 'business' | 'cute' | 'neutral';
}

export interface NameData {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
}

export interface GenerateResponse {
  names: NameData[];
}

// 英文名到中文名的映射规则
const nameMapping: Record<string, { chars: string[], meaning: string }> = {
  // 常见英文名映射
  'david': { chars: ['大', '卫'], meaning: '大卫，象征勇敢与智慧的王者' },
  'michael': { chars: ['迈', '克'], meaning: '迈克，寓意超越与征服' },
  'john': { chars: ['约', '翰'], meaning: '约翰，代表上帝的恩典' },
  'james': { chars: ['詹', '姆'], meaning: '詹姆，象征坚定与可靠' },
  'robert': { chars: ['罗', '伯'], meaning: '罗伯，寓意光明与荣耀' },
  'william': { chars: ['威', '廉'], meaning: '威廉，代表坚强的保护者' },
  'richard': { chars: ['理', '查'], meaning: '理查，象征勇敢的统治者' },
  'thomas': { chars: ['托', '马'], meaning: '托马，寓意双胞胎般的完美' },
  'charles': { chars: ['查', '尔'], meaning: '查尔，代表自由的男子汉' },
  'daniel': { chars: ['丹', '尼'], meaning: '丹尼，象征上帝的审判' },
  
  'mary': { chars: ['玛', '丽'], meaning: '玛丽，象征纯洁与美丽' },
  'patricia': { chars: ['帕', '特'], meaning: '帕特，代表高贵的出身' },
  'jennifer': { chars: ['珍', '妮'], meaning: '珍妮，寓意白色的精灵' },
  'linda': { chars: ['琳', '达'], meaning: '琳达，象征美丽的蛇' },
  'elizabeth': { chars: ['伊', '丽'], meaning: '伊丽，代表上帝的誓约' },
  'barbara': { chars: ['芭', '芭'], meaning: '芭芭，寓意异国的美人' },
  'susan': { chars: ['苏', '珊'], meaning: '苏珊，象征百合花的纯洁' },
  'jessica': { chars: ['杰', '西'], meaning: '杰西，代表上帝的恩赐' },
  'sarah': { chars: ['莎', '拉'], meaning: '莎拉，寓意公主般的高贵' },
  'karen': { chars: ['凯', '伦'], meaning: '凯伦，象征纯洁的心灵' }
};

// 根据英文名生成中文字符
const generateCharsFromEnglishName = (englishName: string, gender: string, style: string): string[] => {
  const lowerName = englishName.toLowerCase();
  
  // 检查是否有直接映射
  if (nameMapping[lowerName]) {
    return nameMapping[lowerName].chars;
  }
  
  // 根据英文名的特征生成
  const chars: string[] = [];
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  // 根据英文名长度和特征选择字符
  const nameLength = englishName.length;
  
  if (nameLength <= 4) {
    // 短名字，生成2个字符
    chars.push(getCharByPosition(englishName, 0, styleChars));
    chars.push(getCharByPosition(englishName, 1, styleChars));
  } else if (nameLength <= 7) {
    // 中等长度，生成2-3个字符
    chars.push(getCharByPosition(englishName, 0, styleChars));
    chars.push(getCharByPosition(englishName, Math.floor(nameLength / 2), styleChars));
    if (Math.random() > 0.5) {
      chars.push(getCharByPosition(englishName, nameLength - 1, styleChars));
    }
  } else {
    // 长名字，生成3个字符
    chars.push(getCharByPosition(englishName, 0, styleChars));
    chars.push(getCharByPosition(englishName, Math.floor(nameLength / 2), styleChars));
    chars.push(getCharByPosition(englishName, nameLength - 1, styleChars));
  }
  
  return chars;
};

// 根据位置和英文字符选择中文字符
const getCharByPosition = (englishName: string, position: number, availableChars: string[]): string => {
  const char = englishName[position] || englishName[0];
  const charCode = char.toLowerCase().charCodeAt(0);
  const index = (charCode - 97) % availableChars.length; // a=97
  return availableChars[index];
};

// 生成拼音
const generatePinyin = (chars: string[]): string => {
  return chars.map(char => pinyinMap[char] || char).join(' ');
};

// 生成含义
const generateMeaning = (chars: string[], englishName: string, gender: string, style: string): string => {
  const lowerName = englishName.toLowerCase();
  
  // 检查是否有预定义含义
  if (nameMapping[lowerName]) {
    return nameMapping[lowerName].meaning;
  }
  
  // 组合字符含义
  const meanings = chars.map(char => meaningMap[char] || '美好').join('，');
  
  // 根据风格添加描述
  const styleDescriptions = {
    traditional: '体现传统文化的深厚底蕴',
    modern: '展现现代时尚的独特魅力',
    business: '彰显职场精英的专业素养',
    cute: '散发天真可爱的纯真气质',
    neutral: '保持平衡和谐的中庸之美'
  };
  
  const genderDescriptions = {
    male: '寓意男子汉的',
    female: '象征女性的',
    neutral: '代表人格的'
  };
  
  return `${meanings}，${genderDescriptions[gender as keyof typeof genderDescriptions]}${styleDescriptions[style as keyof typeof styleDescriptions]}`;
};

// 生成变体名字
const generateVariations = (baseChars: string[], gender: string, style: string): string[][] => {
  const variations: string[][] = [];
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  // 保持第一个字符，变化其他字符
  for (let i = 0; i < 4; i++) {
    const variation = [...baseChars];
    for (let j = 1; j < variation.length; j++) {
      const randomIndex = Math.floor(Math.random() * styleChars.length);
      variation[j] = styleChars[randomIndex];
    }
    variations.push(variation);
  }
  
  return variations;
};

// 主要的名字生成函数
export const generateNames = async (request: GenerateRequest): Promise<GenerateResponse> => {
  const { englishName, gender, style } = request;

  // 参数验证
  if (!englishName?.trim()) {
    throw new Error('英文名不能为空');
  }

  console.log('🚀 开始生成中文名字:', { englishName, gender, style });

  try {
    const names: NameData[] = [];
    
    // 首先尝试从预定义名字中找到匹配的
    const matchingPredefined = predefinedNames.filter(name => 
      (gender === 'neutral' || name.gender === gender || name.gender === 'neutral') &&
      (style === 'neutral' || name.style === style || name.style === 'neutral')
    );
    
    // 添加1-2个预定义名字
    if (matchingPredefined.length > 0) {
      const shuffled = matchingPredefined.sort(() => 0.5 - Math.random());
      for (let i = 0; i < Math.min(2, shuffled.length); i++) {
        const predefined = shuffled[i];
        names.push({
          id: predefined.id,
          name: predefined.name,
          pinyin: predefined.pinyin,
          meaning: predefined.meaning,
          gender: gender
        });
      }
    }
    
    // 生成基于英文名的中文名
    const baseChars = generateCharsFromEnglishName(englishName, gender, style);
    const baseName = baseChars.join('');
    const basePinyin = generatePinyin(baseChars);
    const baseMeaning = generateMeaning(baseChars, englishName, gender, style);
    
    names.push({
      id: `generated-base-${Date.now()}`,
      name: baseName,
      pinyin: basePinyin,
      meaning: baseMeaning,
      gender: gender
    });
    
    // 生成变体名字
    const variations = generateVariations(baseChars, gender, style);
    variations.forEach((chars, index) => {
      const name = chars.join('');
      const pinyin = generatePinyin(chars);
      const meaning = generateMeaning(chars, englishName, gender, style);
      
      names.push({
        id: `generated-var-${Date.now()}-${index}`,
        name: name,
        pinyin: pinyin,
        meaning: meaning,
        gender: gender
      });
    });
    
    // 确保返回5个名字
    while (names.length < 5) {
      const randomChars = generateRandomChars(gender, style);
      const name = randomChars.join('');
      const pinyin = generatePinyin(randomChars);
      const meaning = generateMeaning(randomChars, englishName, gender, style);
      
      names.push({
        id: `generated-random-${Date.now()}-${names.length}`,
        name: name,
        pinyin: pinyin,
        meaning: meaning,
        gender: gender
      });
    }
    
    console.log('✅ 成功生成名字:', names.length, '个');
    return { names: names.slice(0, 5) };

  } catch (error) {
    console.error('❌ 生成名字时出错:', error);
    
    // 返回兜底名字
    const fallbackNames = getFallbackNames(gender);
    return { names: fallbackNames };
  }
};

// 生成随机字符组合
const generateRandomChars = (gender: string, style: string): string[] => {
  const genderChars = chineseCharacters[gender as keyof typeof chineseCharacters] || chineseCharacters.male;
  const styleChars = genderChars[style as keyof typeof genderChars] || genderChars.traditional;
  
  const length = Math.random() > 0.7 ? 3 : 2; // 30% 概率生成3个字符
  const chars: string[] = [];
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * styleChars.length);
    chars.push(styleChars[randomIndex]);
  }
  
  return chars;
};

// 获取兜底名字
const getFallbackNames = (gender: string): NameData[] => {
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const femaleNames = [
    { id: generateId(), name: '雅琪', pinyin: 'Yǎ Qí', meaning: '优雅如美玉，象征高贵与纯洁', gender },
    { id: generateId(), name: '诗涵', pinyin: 'Shī Hán', meaning: '诗意盎然，内涵丰富，寓意才华与智慧', gender },
    { id: generateId(), name: '梦瑶', pinyin: 'Mèng Yáo', meaning: '如梦似幻，美玉般珍贵，象征美好与希望', gender },
    { id: generateId(), name: '晓萱', pinyin: 'Xiǎo Xuān', meaning: '晨曦中的萱草，寓意清新与活力', gender },
    { id: generateId(), name: '语桐', pinyin: 'Yǔ Tóng', meaning: '语言如梧桐叶，寓意优雅与智慧', gender }
  ];

  const maleNames = [
    { id: generateId(), name: '晓峰', pinyin: 'Xiǎo Fēng', meaning: '晨光中的山峰，象征清新与坚定', gender },
    { id: generateId(), name: '雅轩', pinyin: 'Yǎ Xuān', meaning: '优雅的轩窗，寓意高雅与舒适', gender },
    { id: generateId(), name: '泽宇', pinyin: 'Zé Yǔ', meaning: '恩泽普照天地，象征广阔与福气', gender },
    { id: generateId(), name: '思源', pinyin: 'Sī Yuán', meaning: '不忘初心，常念根源，寓意感恩与踏实', gender },
    { id: generateId(), name: '茗熙', pinyin: 'Míng Xī', meaning: '茶香与晨曦，象征清雅与朝气', gender }
  ];

  const neutralNames = [
    { id: generateId(), name: '晨曦', pinyin: 'Chén Xī', meaning: '清晨的阳光，象征希望与新开始', gender },
    { id: generateId(), name: '悦心', pinyin: 'Yuè Xīn', meaning: '心情愉悦，寓意快乐与满足', gender },
    { id: generateId(), name: '智远', pinyin: 'Zhì Yuǎn', meaning: '智慧深远，象征聪明与远见', gender },
    { id: generateId(), name: '和风', pinyin: 'Hé Fēng', meaning: '温和的风，寓意平和与舒适', gender },
    { id: generateId(), name: '星辰', pinyin: 'Xīng Chén', meaning: '天空中的星星，象征光明与指引', gender }
  ];

  if (gender === 'female') return femaleNames;
  if (gender === 'male') return maleNames;
  return neutralNames;
};

// 测试连接函数（纯前端版本）
export const testConnection = async (): Promise<{ success: boolean; message: string; details?: any }> => {
  try {
    console.log('🔍 开始纯前端名字生成器测试...');
    
    // 测试生成功能
    const testResult = await generateNames({
      englishName: 'Test',
      gender: 'neutral',
      style: 'neutral'
    });
    
    return { 
      success: true, 
      message: '纯前端名字生成器测试成功',
      details: {
        testNamesGenerated: testResult.names.length,
        sampleName: testResult.names[0]
      }
    };
    
  } catch (error) {
    console.error('❌ 纯前端名字生成器测试失败:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '未知错误',
      details: { error: error instanceof Error ? error.stack : String(error) }
    };
  }
};

// 调试函数
export const debugNameGenerator = async (): Promise<void> => {
  console.log('🔍 开始完整的纯前端名字生成器调试...');
  
  try {
    // 1. 环境检查
    console.log('🌍 环境检查:');
    console.log('- 浏览器环境:', typeof window !== 'undefined');
    console.log('- 字符数据库大小:', Object.keys(chineseCharacters).length);
    console.log('- 拼音映射数量:', Object.keys(pinyinMap).length);
    console.log('- 预定义名字数量:', predefinedNames.length);
    
    // 2. 功能测试
    console.log('\n🎯 功能测试:');
    const names = await generateNames({
      englishName: 'Debug',
      gender: 'neutral',
      style: 'neutral'
    });
    console.log('- 生成的名字数量:', names.names.length);
    console.log('- 示例名字:', names.names[0]);
    
    // 3. 不同参数测试
    console.log('\n🧪 参数测试:');
    const testCases = [
      { englishName: 'David', gender: 'male', style: 'traditional' },
      { englishName: 'Sarah', gender: 'female', style: 'modern' },
      { englishName: 'Alex', gender: 'neutral', style: 'business' }
    ];
    
    for (const testCase of testCases) {
      const result = await generateNames(testCase as any);
      console.log(`- ${testCase.englishName} (${testCase.gender}, ${testCase.style}):`, result.names[0].name);
    }
    
  } catch (error) {
    console.error('❌ 调试过程中出错:', error);
  }
};