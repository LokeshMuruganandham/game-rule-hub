import { Game } from "../games";

const pandemic: Game = {
  id: "pandemic",
  title: "Pandemic",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "2-4",
  playTime: "45 min",
  age: "8",
  complexity: 3,
  categories: ["strategy", "cooperative"],
  description: "Work together as a team to treat infections and find cures before diseases spread throughout the world.",
  rules: {
    id: "pandemic-rules",
    title: "Pandemic Rules",
    type: "Cooperative",
    summary: "Players work together as disease-fighting specialists to treat and cure four diseases before they spread out of control.",
    setup: [
      "Place the board on the table and put a research station in Atlanta.",
      "Place disease cubes on the board according to the initial infection cards.",
      "Shuffle the player deck and deal cards to each player based on player count.",
      "Assign each player a random role with unique abilities.",
      "Place all pawns in Atlanta to start."
    ],
    howToPlay: [
      "On your turn, you have 4 actions to use from these options: move, treat disease, share knowledge, build research station, or discover a cure.",
      "After taking actions, draw 2 player cards. If epidemic cards are drawn, follow special epidemic procedures.",
      "Finally, draw infection cards and add disease cubes to the board.",
      "Players win if they discover all four cures before running out of player cards or before too many outbreaks occur."
    ],
    fullRules: [
      "Movement options include: drive/ferry to adjacent cities, direct flight by discarding a city card to move to that city, charter flight by discarding the card of your current city to move anywhere, or shuttle flight between research stations.",
      "To treat a disease, remove 1 disease cube from your current city (or all cubes if the disease is cured).",
      "To share knowledge, give or take a card that matches your current city when in the same city as another player.",
      "To build a research station, discard the card matching your current city.",
      "To discover a cure, discard 5 cards of the same color at a research station."
    ]
  }
};

export default pandemic;