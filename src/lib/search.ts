import { Game } from "@/types/game";

// Score weights for different match types
const WEIGHTS = {
  EXACT_TITLE: 100,
  PARTIAL_TITLE: 80,
  TITLE_WORDS: 60,
  CATEGORY: 40,
  DESCRIPTION: 20,
  RULES_SUMMARY: 15,
  RULES_TYPE: 10,
};

// Helper function to normalize text for comparison
const normalizeText = (text: string): string => {
  return text.toLowerCase().trim();
};

// Helper function to check if a string contains all words from a search query
const containsAllWords = (text: string, searchWords: string[]): boolean => {
  const normalizedText = normalizeText(text);
  return searchWords.every(word => normalizedText.includes(normalizeText(word)));
};

// Calculate match score for a game based on search query
const calculateMatchScore = (game: Game, searchQuery: string): number => {
  const normalizedQuery = normalizeText(searchQuery);
  const searchWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
  let score = 0;

  // Exact title match
  if (normalizeText(game.title) === normalizedQuery) {
    score += WEIGHTS.EXACT_TITLE;
  }

  // Partial title match
  if (normalizeText(game.title).includes(normalizedQuery)) {
    score += WEIGHTS.PARTIAL_TITLE;
  }

  // Title words match
  if (containsAllWords(game.title, searchWords)) {
    score += WEIGHTS.TITLE_WORDS;
  }

  // Category matches
  const categoryMatches = game.categories.filter(category =>
    containsAllWords(category, searchWords)
  ).length;
  score += categoryMatches * WEIGHTS.CATEGORY;

  // Description matches
  if (containsAllWords(game.description, searchWords)) {
    score += WEIGHTS.DESCRIPTION;
  }

  // Rules summary matches
  if (containsAllWords(game.rules.summary, searchWords)) {
    score += WEIGHTS.RULES_SUMMARY;
  }

  // Rules type matches
  if (containsAllWords(game.rules.type, searchWords)) {
    score += WEIGHTS.RULES_TYPE;
  }

  return score;
};

interface SearchOptions {
  playerCount?: string;
  complexity?: string;
  category?: string;
}

export const searchGames = (
  games: Game[],
  searchQuery: string,
  options: SearchOptions = {}
): Game[] => {
  const { playerCount, complexity, category } = options;
  
  // First, filter games based on the options
  let filteredGames = games.filter(game => {
    // Player count filter
    if (playerCount && playerCount !== "all") {
      const minPlayers = parseInt(game.playerCount.split("-")[0]);
      switch (playerCount) {
        case "1-2":
          if (minPlayers > 2) return false;
          break;
        case "3-4":
          if (minPlayers < 3 || minPlayers > 4) return false;
          break;
        case "5+":
          if (minPlayers < 5) return false;
          break;
      }
    }

    // Complexity filter
    if (complexity && complexity !== "all") {
      if (game.complexity !== parseInt(complexity)) return false;
    }

    // Category filter
    if (category && category !== "all") {
      if (!game.categories.includes(category)) return false;
    }

    return true;
  });

  // If there's no search query, return the filtered results
  if (!searchQuery.trim()) {
    return filteredGames;
  }

  // Calculate scores for each game
  const scoredGames = filteredGames.map(game => ({
    game,
    score: calculateMatchScore(game, searchQuery),
  }));

  // Filter out games with no match (score = 0) and sort by score
  return scoredGames
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ game }) => game);
};

export const findExactMatch = (games: Game[], searchQuery: string): Game | undefined => {
  const normalizedQuery = normalizeText(searchQuery);
  return games.find(game => normalizeText(game.title) === normalizedQuery);
}; 