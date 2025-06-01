
import type { Game } from '@/types/game';

// Simple fuzzy matching function
export const fuzzyMatch = (search: string, target: string, threshold: number = 0.6): boolean => {
  const searchLower = search.toLowerCase();
  const targetLower = target.toLowerCase();
  
  // Exact match
  if (targetLower.includes(searchLower)) return true;
  
  // Calculate similarity score using Levenshtein-like approach
  const similarity = calculateSimilarity(searchLower, targetLower);
  return similarity >= threshold;
};

const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

export const smartSearchGames = (games: Game[], query: string) => {
  if (!query.trim()) return { exactMatches: [], similarMatches: [], categoryMatches: [] };
  
  const exactMatches: Game[] = [];
  const similarMatches: Game[] = [];
  const categoryMatches: Game[] = [];
  
  games.forEach(game => {
    // Exact title match
    if (game.title.toLowerCase().includes(query.toLowerCase())) {
      exactMatches.push(game);
      return;
    }
    
    // Fuzzy title match
    if (fuzzyMatch(query, game.title, 0.6)) {
      similarMatches.push(game);
      return;
    }
    
    // Category match
    const categoryMatch = game.categories.some(cat => 
      cat.toLowerCase().includes(query.toLowerCase()) ||
      fuzzyMatch(query, cat, 0.7)
    );
    
    if (categoryMatch) {
      categoryMatches.push(game);
    }
  });
  
  return {
    exactMatches,
    similarMatches: similarMatches.slice(0, 6), // Limit suggestions
    categoryMatches: categoryMatches.slice(0, 4)
  };
};
