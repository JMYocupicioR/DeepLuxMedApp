import { create } from 'zustand';
import { Scale } from '@/types/scale';

interface ScalesState {
  favorites: string[];
  recentlyViewed: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
}

export const useScalesStore = create<ScalesState>((set) => ({
  favorites: [],
  recentlyViewed: [],
  addFavorite: (id) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, id])],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),
  addRecentlyViewed: (id) =>
    set((state) => ({
      recentlyViewed: [id, ...state.recentlyViewed.filter((viewedId) => viewedId !== id)].slice(0, 10),
    })),
}));