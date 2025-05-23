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