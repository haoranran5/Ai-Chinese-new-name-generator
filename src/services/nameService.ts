// 名字搜索和匹配服务
import { NameEntry, namesDatabase, namesByCountry, namesByGender } from '../data/namesDatabase';

export interface SearchFilters {
  gender?: 'male' | 'female' | 'unisex' | 'all';
  country?: string;
  origin?: string;
  minPopularity?: number;
  maxPopularity?: number;
  searchTerm?: string;
}

export interface SortOptions {
  field: 'name' | 'popularity' | 'origin' | 'country';
  direction: 'asc' | 'desc';
}

// 智能搜索函数
export const searchNames = (
  filters: SearchFilters = {},
  sortOptions: SortOptions = { field: 'popularity', direction: 'desc' }
): NameEntry[] => {
  let results = [...namesDatabase];

  // 应用过滤器
  if (filters.gender && filters.gender !== 'all') {
    results = results.filter(name => name.gender === filters.gender);
  }

  if (filters.country) {
    results = results.filter(name => name.country === filters.country);
  }

  if (filters.origin) {
    results = results.filter(name => name.origin === filters.origin);
  }

  if (filters.minPopularity !== undefined) {
    results = results.filter(name => name.popularity >= filters.minPopularity);
  }

  if (filters.maxPopularity !== undefined) {
    results = results.filter(name => name.popularity <= filters.maxPopularity);
  }

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    results = results.filter(name => 
      name.name.toLowerCase().includes(term) ||
      name.meaning.toLowerCase().includes(term) ||
      name.origin.toLowerCase().includes(term) ||
      name.pronunciation.toLowerCase().includes(term)
    );
  }

  // 应用排序
  results.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortOptions.field) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'popularity':
        aValue = a.popularity;
        bValue = b.popularity;
        break;
      case 'origin':
        aValue = a.origin.toLowerCase();
        bValue = b.origin.toLowerCase();
        break;
      case 'country':
        aValue = a.country.toLowerCase();
        bValue = b.country.toLowerCase();
        break;
      default:
        aValue = a.popularity;
        bValue = b.popularity;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOptions.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOptions.direction === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  return results;
};

// 获取随机名字
export const getRandomNames = (
  count: number = 10,
  filters: SearchFilters = {}
): NameEntry[] => {
  const filteredNames = searchNames(filters);
  const shuffled = [...filteredNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 根据含义搜索名字
export const searchByMeaning = (meaning: string): NameEntry[] => {
  const term = meaning.toLowerCase();
  return namesDatabase.filter(name => 
    name.meaning.toLowerCase().includes(term)
  );
};

// 获取相似名字
export const getSimilarNames = (targetName: string, count: number = 5): NameEntry[] => {
  const target = namesDatabase.find(name => 
    name.name.toLowerCase() === targetName.toLowerCase()
  );
  
  if (!target) return [];

  // 基于起源、性别和含义相似度计算
  const scored = namesDatabase
    .filter(name => name.name !== target.name)
    .map(name => {
      let score = 0;
      
      // 相同起源 +3分
      if (name.origin === target.origin) score += 3;
      
      // 相同性别 +2分
      if (name.gender === target.gender) score += 2;
      
      // 相同国家 +2分
      if (name.country === target.country) score += 2;
      
      // 含义相似性 +1分
      const meaningWords = target.meaning.toLowerCase().split(' ');
      const nameWords = name.meaning.toLowerCase().split(' ');
      const commonWords = meaningWords.filter(word => 
        nameWords.some(nWord => nWord.includes(word) || word.includes(nWord))
      );
      if (commonWords.length > 0) score += 1;
      
      // 流行度相近 +1分
      if (Math.abs(name.popularity - target.popularity) <= 10) score += 1;

      return { ...name, similarity: score };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count);

  return scored;
};

// 获取流行趋势数据
export const getPopularityTrends = (country?: string) => {
  const data = country ? namesByCountry[country] || [] : namesDatabase;
  
  const maleNames = data
    .filter(name => name.gender === 'male')
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);
    
  const femaleNames = data
    .filter(name => name.gender === 'female')
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  return { maleNames, femaleNames };
};

// 名字统计信息
export const getNameStatistics = () => {
  const totalNames = namesDatabase.length;
  const maleCount = namesByGender.male.length;
  const femaleCount = namesByGender.female.length;
  const unisexCount = namesByGender.unisex.length;
  
  const countryStats = Object.entries(namesByCountry).map(([country, names]) => ({
    country,
    count: names.length,
    percentage: Math.round((names.length / totalNames) * 100)
  }));

  const originStats = namesDatabase.reduce((acc, name) => {
    acc[name.origin] = (acc[name.origin] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: totalNames,
    byGender: {
      male: maleCount,
      female: femaleCount,
      unisex: unisexCount
    },
    byCountry: countryStats,
    byOrigin: originStats
  };
};

// 名字建议算法
export const getNameSuggestions = (preferences: {
  gender?: 'male' | 'female' | 'unisex';
  preferredOrigins?: string[];
  preferredCountries?: string[];
  meaningKeywords?: string[];
  popularityRange?: [number, number];
}): NameEntry[] => {
  let candidates = [...namesDatabase];

  // 应用偏好过滤
  if (preferences.gender) {
    candidates = candidates.filter(name => name.gender === preferences.gender);
  }

  if (preferences.preferredOrigins?.length) {
    candidates = candidates.filter(name => 
      preferences.preferredOrigins!.includes(name.origin)
    );
  }

  if (preferences.preferredCountries?.length) {
    candidates = candidates.filter(name => 
      preferences.preferredCountries!.includes(name.country)
    );
  }

  if (preferences.popularityRange) {
    const [min, max] = preferences.popularityRange;
    candidates = candidates.filter(name => 
      name.popularity >= min && name.popularity <= max
    );
  }

  if (preferences.meaningKeywords?.length) {
    candidates = candidates.filter(name => 
      preferences.meaningKeywords!.some(keyword => 
        name.meaning.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  // 按流行度排序并返回前20个
  return candidates
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);
};