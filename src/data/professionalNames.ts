// 职业相关姓名数据库
export interface ProfessionalNameMapping {
  profession: string;
  categories: string[];
  recommendedChars: string[];
  culturalContext: string;
  examples: string[];
}

export const professionalNameMappings: ProfessionalNameMapping[] = [
  {
    profession: 'technology',
    categories: ['software', 'engineer', 'developer', 'programmer', 'IT', 'tech'],
    recommendedChars: ['智', '科', '创', '新', '技', '术', '数', '码', '云', '网', '智', '慧', '创', '新'],
    culturalContext: '科技行业注重创新和智慧，适合使用体现智能、创新的字',
    examples: ['智创', '科新', '技云', '数智', '码创']
  },
  {
    profession: 'business',
    categories: ['manager', 'executive', 'CEO', 'entrepreneur', 'business', 'finance'],
    recommendedChars: ['成', '达', '胜', '利', '富', '贵', '荣', '昌', '兴', '旺', '发', '财', '金', '银', '宝'],
    culturalContext: '商业领域注重成功和财富，适合使用体现成就、财富的字',
    examples: ['成达', '胜利', '富贵', '荣昌', '兴旺']
  },
  {
    profession: 'education',
    categories: ['teacher', 'professor', 'educator', 'academic', 'researcher'],
    recommendedChars: ['文', '学', '教', '育', '知', '识', '书', '画', '诗', '词', '博', '雅', '德', '智'],
    culturalContext: '教育行业注重知识和文化传承，适合使用体现学问、品德的字',
    examples: ['文博', '学德', '教智', '育雅', '知书']
  },
  {
    profession: 'healthcare',
    categories: ['doctor', 'nurse', 'physician', 'medical', 'health', 'therapist'],
    recommendedChars: ['医', '康', '健', '安', '宁', '和', '谐', '平', '静', '清', '纯', '真', '善', '美'],
    culturalContext: '医疗行业注重健康和安宁，适合使用体现健康、平安的字',
    examples: ['康安', '健宁', '医和', '康平', '安宁']
  },
  {
    profession: 'arts',
    categories: ['artist', 'designer', 'musician', 'actor', 'creative', 'art'],
    recommendedChars: ['艺', '术', '美', '丽', '雅', '静', '琴', '棋', '书', '画', '诗', '词', '花', '月'],
    culturalContext: '艺术行业注重美感和创造力，适合使用体现艺术、美丽的字',
    examples: ['艺美', '术雅', '美琴', '丽画', '雅诗']
  },
  {
    profession: 'law',
    categories: ['lawyer', 'attorney', 'judge', 'legal', 'law'],
    recommendedChars: ['正', '直', '善', '良', '真', '诚', '智', '慧', '德', '义', '理', '法', '公', '平'],
    culturalContext: '法律行业注重正义和公正，适合使用体现正直、公正的字',
    examples: ['正义', '正直', '善德', '真智', '公理']
  },
  {
    profession: 'media',
    categories: ['journalist', 'reporter', 'writer', 'editor', 'media', 'communication'],
    recommendedChars: ['文', '字', '言', '语', '传', '播', '声', '音', '光', '影', '视', '听', '闻', '见'],
    culturalContext: '媒体行业注重传播和表达，适合使用体现文字、传播的字',
    examples: ['文传', '字播', '言声', '语光', '传视']
  },
  {
    profession: 'sales',
    categories: ['sales', 'marketing', 'advertising', 'promotion', 'commerce'],
    recommendedChars: ['成', '达', '胜', '利', '富', '贵', '荣', '昌', '兴', '旺', '发', '财', '金', '银', '宝'],
    culturalContext: '销售行业注重成功和业绩，适合使用体现成就、财富的字',
    examples: ['成达', '胜利', '富贵', '荣昌', '兴旺']
  },
  {
    profession: 'service',
    categories: ['service', 'hospitality', 'customer', 'support', 'care'],
    recommendedChars: ['和', '谐', '平', '静', '清', '纯', '真', '善', '美', '好', '佳', '优', '秀', '安', '宁'],
    culturalContext: '服务行业注重和谐和友善，适合使用体现和谐、友善的字',
    examples: ['和谐', '平静', '清纯', '真善', '美好']
  }
];

// 根据职业获取推荐字符
export const getProfessionalChars = (profession: string): string[] => {
  const lowerProfession = profession.toLowerCase();
  
  for (const mapping of professionalNameMappings) {
    if (mapping.categories.some(cat => lowerProfession.includes(cat))) {
      return mapping.recommendedChars;
    }
  }
  
  // 默认返回通用字符
  return ['文', '明', '德', '志', '华', '国', '建', '军', '伟', '强', '勇', '刚', '峰', '龙'];
};

// 获取职业文化背景
export const getProfessionalContext = (profession: string): string => {
  const lowerProfession = profession.toLowerCase();
  
  for (const mapping of professionalNameMappings) {
    if (mapping.categories.some(cat => lowerProfession.includes(cat))) {
      return mapping.culturalContext;
    }
  }
  
  return '体现个人特色和文化内涵';
}; 