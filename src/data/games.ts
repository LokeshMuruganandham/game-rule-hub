
import catan from "./game/catan";
import ticketToRide from "./game/ticketToRide";
import pandemic from "./game/pandemic";
import codenames from "./game/codenames";
import azul from "./game/azul";
import gloomhaven from "./game/gloomhaven";
import wingspan from "./game/wingspan";
import scythe from "./game/scythe";
import sevenWonders from "./game/sevenWonders";
import terraformingMars from "./game/terraformingMars";

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

export const GAMES: Game[] = [
  catan,
  ticketToRide,
  pandemic,
  codenames,
  azul,
  gloomhaven,
  wingspan,
  scythe,
  sevenWonders,
  terraformingMars,
];

export const getFeaturedGames = (): Game[] => {
  return GAMES.filter(game => 
    ["catan", "ticket-to-ride", "pandemic", "azul"].includes(game.id)
  );
};

export const getRecentGames = (): Game[] => {
  return GAMES.filter(game => 
    ["gloomhaven", "wingspan", "codenames"].includes(game.id)
  );
};

export const getCategoriesWithGameCount = (): { id: string, name: string, description: string, gameCount: number }[] => {
  const categories = [
    {
      id: "strategy",
      name: "Strategy",
      description: "Games that require careful thought and planning",
    },
    {
      id: "family",
      name: "Family",
      description: "Fun for all ages, perfect for family game nights",
    },
    {
      id: "party",
      name: "Party Games",
      description: "Exciting games for larger groups and social gatherings",
    },
    {
      id: "card",
      name: "Card Games",
      description: "Games played primarily with cards",
    },
  ];
  
  return categories.map(category => {
    const gameCount = GAMES.filter(game => game.categories.includes(category.id)).length;
    return {
      ...category,
      gameCount
    };
  });
};
