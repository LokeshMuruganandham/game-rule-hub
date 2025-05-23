import { Game } from "../games";

const azul: Game = {
  id: "azul",
  title: "Azul",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "2-4",
  playTime: "30-45 min",
  age: "8",
  complexity: 2,
  categories: ["strategy", "abstract", "family"],
  description: "Compete to create the most beautiful mosaic by drafting colorful tiles in this abstract strategy game.",
  rules: {
    id: "azul-rules",
    title: "Azul Rules",
    type: "Abstract Strategy",
    summary: "Players draft colored tiles to decorate their palace wall, aiming to score the most points by creating specific patterns.",
    setup: [
      "Give each player a player board and a scoring marker.",
      "Fill the factory displays with tiles drawn randomly from the bag.",
      "Place the first player marker to the side."
    ],
    howToPlay: [
      "On your turn, select all tiles of one color from any single factory display or from the center of the table.",
      "Place the selected tiles in one of the pattern lines on your player board from right to left.",
      "If you take tiles from a factory display, move the remaining tiles to the center of the table.",
      "If you're the first player to take tiles from the center, take the first player marker and place it in your penalty row.",
      "When all tiles have been drafted, move to the wall-tiling phase.",
      "During the wall-tiling phase, move one tile from each completed pattern line to the corresponding position on your wall and score points."
    ],
    fullRules: [
      "Points are scored for placing tiles next to previously placed tiles, in complete rows, or in complete columns.",
      "Excess tiles that don't fit in your pattern lines go to your floor line and cause negative points.",
      "The game ends when at least one player completes a horizontal row on their wall.",
      "Final scoring includes bonuses for completed horizontal rows (2 points each), completed vertical columns (7 points each), and completed sets of all five colors (10 points).",
      "The player with the most points wins."
    ]
  }
};

export default azul;