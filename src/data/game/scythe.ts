import { Game } from "../games";

const scythe: Game = {
  id: "scythe",
  title: "Scythe",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "1-5",
  playTime: "90-115 min",
  age: "14",
  complexity: 4,
  categories: ["strategy", "area-control"],
  description: "Build economic engines and conquer territories in an alternate-history 1920s Eastern Europe.",
  rules: {
    id: "scythe-rules",
    title: "Scythe Rules",
    type: "Area Control",
    summary: "Players represent different factions competing to earn the most coins by building infrastructure, recruiting workers, and conquering territories.",
    setup: [
      "Each player selects a faction mat and a player mat.",
      "Place your character, 4 workers, and popularity/power markers on the board.",
      "Shuffle the encounter, objective, and factory cards.",
      "Place resources, coins, and stars near the board as a general supply."
    ],
    howToPlay: [
      "On your turn, place your action token on a different section of your player mat than your previous turn.",
      "Perform the top action of that section (optional).",
      "Perform the bottom action of that section (optional).",
      "Each section offers different actions: move units, bolster power/draw combat cards, trade resources, produce resources, etc.",
      "Bottom actions generally cost resources but provide greater benefits.",
      "End your turn by checking if you've achieved any stars."
    ],
    fullRules: [
      "Players achieve stars by completing objectives such as deploying all mechs, building all structures, enlisting all recruits, completing an objective card, winning combat, and reaching maximum power or popularity.",
      "Combat occurs when two characters or mechs are on the same territory. Each player secretly selects power and combat cards, and the higher total wins.",
      "The game ends when any player places their 6th star on the achievement track.",
      "Final scoring is based on stars placed, territories controlled, resources controlled, and popularity level.",
      "The player with the most coins wins."
    ]
  }
};

export default scythe;