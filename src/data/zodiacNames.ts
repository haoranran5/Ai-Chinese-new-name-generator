// 生肖相关姓名数据库
export interface ZodiacNameMapping {
  zodiac: string;
  englishName: string;
  chineseName: string;
  recommendedChars: string[];
  culturalContext: string;
  personality: string[];
  luckyElements: string[];
  examples: string[];
}

export const zodiacNameMappings: ZodiacNameMapping[] = [
  {
    zodiac: 'rat',
    englishName: 'Rat',
    chineseName: '鼠',
    recommendedChars: ['智', '慧', '机', '灵', '巧', '敏', '捷', '快', '活', '泼', '聪', '明', '精', '细'],
    culturalContext: '鼠年出生的人聪明机智，适合使用体现智慧、敏捷的字',
    personality: ['聪明', '机智', '灵活', '敏捷', '勤奋', '机警'],
    luckyElements: ['水', '金'],
    examples: ['智敏', '慧灵', '机巧', '敏捷', '聪慧']
  },
  {
    zodiac: 'ox',
    englishName: 'Ox',
    chineseName: '牛',
    recommendedChars: ['勤', '劳', '实', '干', '稳', '重', '诚', '信', '忠', '厚', '朴', '实', '坚', '毅'],
    culturalContext: '牛年出生的人勤劳踏实，适合使用体现勤劳、诚实的字',
    personality: ['勤劳', '踏实', '稳重', '诚实', '忠诚', '坚韧'],
    luckyElements: ['土', '金'],
    examples: ['勤劳', '实干', '稳重', '诚实', '忠厚']
  },
  {
    zodiac: 'tiger',
    englishName: 'Tiger',
    chineseName: '虎',
    recommendedChars: ['勇', '猛', '威', '武', '强', '壮', '豪', '迈', '雄', '伟', '霸', '气', '威', '风'],
    culturalContext: '虎年出生的人勇敢威猛，适合使用体现勇敢、威武的字',
    personality: ['勇敢', '威猛', '豪迈', '威武', '霸气', '威风'],
    luckyElements: ['木', '火'],
    examples: ['勇猛', '威武', '强壮', '豪迈', '威风']
  },
  {
    zodiac: 'rabbit',
    englishName: 'Rabbit',
    chineseName: '兔',
    recommendedChars: ['温', '和', '善', '良', '柔', '美', '雅', '静', '纯', '真', '可', '爱', '甜', '美'],
    culturalContext: '兔年出生的人温和善良，适合使用体现温和、善良的字',
    personality: ['温和', '善良', '优雅', '安静', '纯洁', '可爱'],
    luckyElements: ['木', '水'],
    examples: ['温和', '善良', '柔美', '雅静', '纯真']
  },
  {
    zodiac: 'dragon',
    englishName: 'Dragon',
    chineseName: '龙',
    recommendedChars: ['龙', '腾', '飞', '翔', '升', '华', '贵', '尊', '威', '武', '雄', '伟', '霸', '气'],
    culturalContext: '龙年出生的人尊贵威武，适合使用体现尊贵、威武的字',
    personality: ['尊贵', '威武', '雄壮', '霸气', '威严', '高贵'],
    luckyElements: ['土', '水'],
    examples: ['龙腾', '飞升', '华贵', '威武', '雄伟']
  },
  {
    zodiac: 'snake',
    englishName: 'Snake',
    chineseName: '蛇',
    recommendedChars: ['智', '慧', '灵', '巧', '敏', '捷', '精', '细', '深', '邃', '神', '秘', '优', '雅'],
    culturalContext: '蛇年出生的人智慧灵巧，适合使用体现智慧、灵巧的字',
    personality: ['智慧', '灵巧', '敏捷', '精细', '深邃', '优雅'],
    luckyElements: ['火', '土'],
    examples: ['智慧', '灵巧', '敏捷', '精细', '优雅']
  },
  {
    zodiac: 'horse',
    englishName: 'Horse',
    chineseName: '马',
    recommendedChars: ['奔', '腾', '飞', '驰', '快', '速', '活', '泼', '开', '朗', '豪', '迈', '自', '由'],
    culturalContext: '马年出生的人奔放自由，适合使用体现奔放、自由的字',
    personality: ['奔放', '自由', '开朗', '豪迈', '活泼', '快速'],
    luckyElements: ['火', '木'],
    examples: ['奔腾', '飞驰', '快速', '活泼', '豪迈']
  },
  {
    zodiac: 'goat',
    englishName: 'Goat',
    chineseName: '羊',
    recommendedChars: ['温', '和', '善', '良', '柔', '美', '雅', '静', '纯', '真', '可', '爱', '甜', '美'],
    culturalContext: '羊年出生的人温和善良，适合使用体现温和、善良的字',
    personality: ['温和', '善良', '优雅', '安静', '纯洁', '可爱'],
    luckyElements: ['土', '火'],
    examples: ['温和', '善良', '柔美', '雅静', '纯真']
  },
  {
    zodiac: 'monkey',
    englishName: 'Monkey',
    chineseName: '猴',
    recommendedChars: ['机', '灵', '巧', '敏', '捷', '快', '活', '泼', '聪', '明', '精', '细', '智', '慧'],
    culturalContext: '猴年出生的人机灵活泼，适合使用体现机灵、活泼的字',
    personality: ['机灵', '活泼', '聪明', '敏捷', '精细', '智慧'],
    luckyElements: ['金', '水'],
    examples: ['机灵', '巧敏', '活泼', '聪明', '智慧']
  },
  {
    zodiac: 'rooster',
    englishName: 'Rooster',
    chineseName: '鸡',
    recommendedChars: ['勤', '劳', '实', '干', '稳', '重', '诚', '信', '忠', '厚', '朴', '实', '坚', '毅'],
    culturalContext: '鸡年出生的人勤劳踏实，适合使用体现勤劳、诚实的字',
    personality: ['勤劳', '踏实', '稳重', '诚实', '忠诚', '坚韧'],
    luckyElements: ['金', '土'],
    examples: ['勤劳', '实干', '稳重', '诚实', '忠厚']
  },
  {
    zodiac: 'dog',
    englishName: 'Dog',
    chineseName: '狗',
    recommendedChars: ['忠', '诚', '信', '义', '勇', '敢', '正', '直', '善', '良', '友', '爱', '可', '靠'],
    culturalContext: '狗年出生的人忠诚勇敢，适合使用体现忠诚、勇敢的字',
    personality: ['忠诚', '勇敢', '正直', '善良', '友爱', '可靠'],
    luckyElements: ['土', '金'],
    examples: ['忠诚', '勇敢', '正直', '善良', '友爱']
  },
  {
    zodiac: 'pig',
    englishName: 'Pig',
    chineseName: '猪',
    recommendedChars: ['诚', '实', '善', '良', '温', '和', '友', '爱', '可', '靠', '忠', '厚', '朴', '实'],
    culturalContext: '猪年出生的人诚实善良，适合使用体现诚实、善良的字',
    personality: ['诚实', '善良', '温和', '友爱', '可靠', '忠厚'],
    luckyElements: ['水', '土'],
    examples: ['诚实', '善良', '温和', '友爱', '可靠']
  }
];

// 根据生肖获取推荐字符
export const getZodiacChars = (zodiac: string): string[] => {
  const lowerZodiac = zodiac.toLowerCase();
  
  for (const mapping of zodiacNameMappings) {
    if (mapping.zodiac === lowerZodiac) {
      return mapping.recommendedChars;
    }
  }
  
  // 默认返回通用字符
  return ['文', '明', '德', '志', '华', '国', '建', '军', '伟', '强', '勇', '刚', '峰', '龙'];
};

// 获取生肖文化背景
export const getZodiacContext = (zodiac: string): string => {
  const lowerZodiac = zodiac.toLowerCase();
  
  for (const mapping of zodiacNameMappings) {
    if (mapping.zodiac === lowerZodiac) {
      return mapping.culturalContext;
    }
  }
  
  return '体现个人特色和文化内涵';
};

// 获取生肖性格特征
export const getZodiacPersonality = (zodiac: string): string[] => {
  const lowerZodiac = zodiac.toLowerCase();
  
  for (const mapping of zodiacNameMappings) {
    if (mapping.zodiac === lowerZodiac) {
      return mapping.personality;
    }
  }
  
  return ['聪明', '善良', '勇敢', '诚实'];
}; 