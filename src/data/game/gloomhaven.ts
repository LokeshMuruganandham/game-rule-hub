import { Game } from "../games";

const gloomhaven: Game = {
  id: "gloomhaven",
  title: "Gloomhaven",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "1-4",
  playTime: "60-120 min",
  age: "14",
  complexity: 4,
  categories: ["strategy", "adventure", "cooperative"],
  description: "A cooperative campaign game of tactical combat set in a persistent fantasy world.",
  rules: {
    id: "gloomhaven-rules",
    title: "Gloomhaven Rules",
    type: "Campaign",
    summary: "Players work together through a campaign of scenarios, fighting monsters and making choices that affect the story.",
    setup: [
      "Select a scenario and set up the map according to the scenario book.",
      "Each player chooses a character and takes their character mat, ability cards, and items.",
      "Set up the monster types specified in the scenario.",
      "Place scenario goal tokens as specified."
    ],
    howToPlay: [
      "Each round begins with players selecting two ability cards from their hand.",
      "Initiative order is determined by the initiative value on the chosen cards.",
      "On a turn, players perform the top action of one card and the bottom action of the other card.",
      "After all players and monsters have acted, a new round begins.",
      "Players must rest when they run out of cards, either taking a short rest (lose one random card) or a long rest (lose one chosen card and recover health).",
      "The scenario is won when the specified goals are completed, and lost if all characters become exhausted."
    ],
    fullRules: [
      "Characters gain experience by using specific abilities and completing scenarios.",
      "Between scenarios, players can visit Gloomhaven to buy items, level up, donate to the sanctuary, and complete city events.",
      "When characters reach certain levels, they retire and new character classes become available.",
      "The campaign progresses through a branching storyline based on completed scenarios and decisions made during events.",
      "The game features a system of permanent enhancements that can be added to ability cards."
    ]
  }
};

export default gloomhaven;