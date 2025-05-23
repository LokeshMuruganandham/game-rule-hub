import { Game } from "../games";

const wingspan: Game = {
  id: "wingspan",
  title: "Wingspan",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "1-5",
  playTime: "40-70 min",
  age: "10",
  complexity: 2,
  categories: ["strategy", "card"],
  description: "Attract and collect birds in this beautiful, strategic card-driven board game about bird watching.",
  rules: {
    id: "wingspan-rules",
    title: "Wingspan Rules",
    type: "Engine Building",
    summary: "Players collect birds with unique powers to create combinations that help them gain food, lay eggs, and draw more bird cards.",
    setup: [
      "Place the bird feeder dice tower and roll the dice into it.",
      "Shuffle the bird cards and deal 5 to each player.",
      "Give each player 5 food tokens and 2 random bonus cards (keeping 1).",
      "Place the goal tiles for rounds 1-4 face up on the board."
    ],
    howToPlay: [
      "On your turn, choose one of four actions: play a bird, gain food, lay eggs, or draw bird cards.",
      "Play a bird by paying its food cost and placing it in one of your three habitats (forest, grassland, or wetland).",
      "Gain food by placing an action cube in the forest and taking dice from the bird feeder.",
      "Lay eggs by placing an action cube in the grassland and adding egg tokens to your birds.",
      "Draw bird cards by placing an action cube in the wetland.",
      "When you take an action, you also activate any birds you have in that habitat from right to left."
    ],
    fullRules: [
      "Birds have unique powers that activate when played, when taking specific actions, or at the end of rounds.",
      "At the end of each round, score points based on the current round's goal tile.",
      "After four rounds, the game ends and players score points for birds played, eggs laid, food stored on cards, bonus cards, and end-of-round goals.",
      "The player with the most points wins."
    ]
  }
};

export default wingspan;