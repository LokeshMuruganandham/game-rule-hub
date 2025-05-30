
// This file is kept for backward compatibility but now uses Supabase data
// The actual data fetching is handled by the useGames hook

export interface GameRule {
  id: string;
  title: string;
  type: string;
  summary: string;
  fullRules: string[];
  setup: string[];
  howToPlay: string[];
}

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  playerCount: string;
  playTime: string;
  age: string;
  complexity: number;
  categories: string[];
  description: string;
  rules: GameRule;
}

// These functions are now handled by the useGames hook
// but kept here for compatibility with existing components
export const GAMES: Game[] = [];

export const getFeaturedGames = (): Game[] => {
  console.warn('getFeaturedGames is deprecated. Use the hook version instead.');
  return [];
};

export const getRecentGames = (): Game[] => {
  console.warn('getRecentGames is deprecated. Use the hook version instead.');
  return [];
};

export const getCategoriesWithGameCount = (): { id: string, name: string, description: string, gameCount: number }[] => {
  console.warn('getCategoriesWithGameCount is deprecated. Use the hook version instead.');
  return [];
};
