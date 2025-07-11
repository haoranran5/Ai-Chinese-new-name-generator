import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface NameData {
  name: string;
  pinyin: string;
  meaning: string;
  gender: string;
  id: string;
}

interface FavoritesContextType {
  favorites: NameData[];
  addFavorite: (name: NameData) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<NameData[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoritedNames');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addFavorite = (name: NameData) => {
    const newFavorites = [...favorites, name];
    setFavorites(newFavorites);
    localStorage.setItem('favoritedNames', JSON.stringify(newFavorites));
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favoritedNames', JSON.stringify(newFavorites));
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};