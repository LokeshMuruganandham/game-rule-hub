import { Game } from "../games";

const catan: Game = {
  id: "catan",
  title: "Catan",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "3-4",
  playTime: "60-120 min",
  age: "10",
  complexity: 2,
  categories: ["strategy", "family"],
  description: "Trade, build and settle the island of Catan in this award-winning strategy game.",
  rules: {
    id: "catan-rules",
    title: "Catan Rules",
    type: "Resource Management",
    summary: "Players collect resources to build roads, settlements, and cities to score points. First player to 10 points wins.",
    setup: [
      "Place the hexagonal terrain tiles in a specific layout to create the island of Catan.",
      "Place number tokens on each hex in alphabetical order.",
      "Each player chooses a color and takes all pieces of that color.",
      "Each player places 2 settlements and 2 roads on the board.",
      "Players collect starting resource cards based on the hexes adjacent to their second settlement."
    ],
    howToPlay: [
      "On your turn, roll two dice to determine which hexes produce resources.",
      "Players collect resource cards if they have settlements adjacent to hexes matching the dice roll.",
      "Trade resources with other players or the bank.",
      "Build roads, settlements, or cities using specific resource combinations.",
      "Purchase development cards that provide various benefits.",
      "The first player to reach 10 victory points wins."
    ],
    fullRules: [
      "The game begins with the setup phase where players take turns placing settlements and roads.",
      "During the game, players take turns rolling dice, collecting resources, trading, and building.",
      "Players earn victory points for settlements (1 point), cities (2 points), longest road (2 points), largest army (2 points), and certain development cards.",
      "When a player rolls a 7, the robber is activated, potentially causing players to discard cards and blocking resource production.",
      "The game ends immediately when a player reaches 10 victory points on their turn."
    ]
  }
};

export default catan;