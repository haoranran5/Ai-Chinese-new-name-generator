// 本地收藏功能 Hook
import { useState, useEffect } from 'react';
import { NameEntry } from '../data/namesDatabase';

const FAVORITES_KEY = 'foreign-name-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<NameEntry[]>([]);

  // 从本地存储加载收藏
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // 保存到本地存储
  const saveFavorites = (newFavorites: NameEntry[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // 添加到收藏
  const addFavorite = (name: NameEntry) => {
    const newFavorites = [...favorites, name];
    saveFavorites(newFavorites);
  };

  // 从收藏中移除
  const removeFavorite = (nameToRemove: string) => {
    const newFavorites = favorites.filter(name => name.name !== nameToRemove);
    saveFavorites(newFavorites);
  };

  // 检查是否已收藏
  const isFavorite = (nameToCheck: string): boolean => {
    return favorites.some(name => name.name === nameToCheck);
  };

  // 切换收藏状态
  const toggleFavorite = (name: NameEntry) => {
    if (isFavorite(name.name)) {
      removeFavorite(name.name);
    } else {
      addFavorite(name);
    }
  };

  // 清空收藏
  const clearFavorites = () => {
    saveFavorites([]);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};