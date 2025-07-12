// 搜索历史功能 Hook
import { useState, useEffect } from 'react';
import { SearchFilters } from '../services/nameService';

interface SearchHistoryItem {
  id: string;
  filters: SearchFilters;
  timestamp: number;
  resultsCount: number;
}

const HISTORY_KEY = 'foreign-name-search-history';
const MAX_HISTORY_ITEMS = 20;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // 从本地存储加载历史
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // 保存到本地存储
  const saveHistory = (newHistory: SearchHistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  // 添加搜索记录
  const addToHistory = (filters: SearchFilters, resultsCount: number) => {
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      filters,
      timestamp: Date.now(),
      resultsCount
    };

    // 检查是否已存在相似的搜索
    const existingIndex = history.findIndex(item => 
      JSON.stringify(item.filters) === JSON.stringify(filters)
    );

    let newHistory: SearchHistoryItem[];
    if (existingIndex >= 0) {
      // 更新现有记录的时间戳
      newHistory = [...history];
      newHistory[existingIndex] = newItem;
    } else {
      // 添加新记录
      newHistory = [newItem, ...history];
    }

    // 限制历史记录数量
    if (newHistory.length > MAX_HISTORY_ITEMS) {
      newHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
    }

    saveHistory(newHistory);
  };

  // 删除历史记录
  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
  };

  // 清空历史记录
  const clearHistory = () => {
    saveHistory([]);
  };

  // 获取最近的搜索
  const getRecentSearches = (count: number = 5): SearchHistoryItem[] => {
    return history
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, count);
  };

  // 获取热门搜索（按结果数量排序）
  const getPopularSearches = (count: number = 5): SearchHistoryItem[] => {
    return history
      .sort((a, b) => b.resultsCount - a.resultsCount)
      .slice(0, count);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
    getPopularSearches,
    historyCount: history.length
  };
};