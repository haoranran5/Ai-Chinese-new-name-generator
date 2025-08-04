// 增强型用户画像类型定义
export interface EnhancedUserProfile {
  basic: {
    englishName: string;
    gender: 'male' | 'female' | 'neutral';
    age: number;
    profession: string;
  };
  cultural: {
    zodiac: string;
    birthYear: number;
    culturalBackground: string;
    languageLevel: 'beginner' | 'intermediate' | 'advanced';
  };
  preferences: {
    nameLength: 'short' | 'medium' | 'long';
    style: 'traditional' | 'modern' | 'business' | 'cute' | 'neutral';
    uniqueness: 'common' | 'unique' | 'very-unique';
    formality: 'casual' | 'formal' | 'very-formal';
  };
  context: {
    purpose: 'personal' | 'business' | 'social' | 'creative';
    targetAudience: 'chinese' | 'international' | 'mixed';
    usageFrequency: 'one-time' | 'occasional' | 'frequent';
  };
}

export interface UserAction {
  type: 'name_selected' | 'name_rejected' | 'name_viewed' | 'search_performed';
  timestamp: number;
  context: {
    nameId?: string;
    searchTerm?: string;
    page?: string;
  };
  result?: {
    selectedName?: string;
    reason?: string;
  };
}

export interface UserFeedback {
  userId: string;
  action: UserAction;
  preferences?: Partial<EnhancedUserProfile['preferences']>;
}

export interface NameRecommendation {
  id: string;
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
  score: number;
  reasons: string[];
  culturalContext?: {
    zodiac: string;
    profession: string;
    ageGroup: string;
  };
} 