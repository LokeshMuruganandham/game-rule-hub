import { Game } from "../games";

const codenames: Game = {
  id: "codenames",
  title: "Codenames",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "2-8+",
  playTime: "15 min",
  age: "10",
  complexity: 1,
  categories: ["party", "word"],
  description: "A social word game where teams compete to find all their agents using one-word clues.",
  rules: {
    id: "codenames-rules",
    title: "Codenames Rules",
    type: "Word Game",
    summary: "Two teams compete to contact all their agents first using one-word clues that can point to multiple words on the board.",
    setup: [
      "Players split into two teams: red and blue.",
      "One player from each team becomes the spymaster, the others are field operatives.",
      "Place 25 word cards in a 5x5 grid.",
      "The spymasters sit on one side and look at the key card showing which words belong to which team."
    ],
    howToPlay: [
      "Spymasters take turns giving one-word clues followed by a number, indicating how many words on the board relate to that clue.",
      "Field operatives try to guess which words their spymaster is hinting at.",
      "Teams can guess up to the number indicated by the clue plus one additional guess.",
      "If they guess a word belonging to their team, they can continue guessing.",
      "If they guess a neutral word, their turn ends.",
      "If they guess a word belonging to the other team, their turn ends and the other team gets a free guess.",
      "If they guess the assassin word, they immediately lose the game."
    ],
    fullRules: [
      "The team that goes first has 9 agents to find, while the second team has 8 agents.",
      "The game ends when one team finds all their agents, or when one team selects the assassin word.",
      "Spymasters must give only one word and one number as their clue, and cannot use any form of the words visible on the table.",
      "Teams can end their turn at any time if they're unsure about making more guesses."
    ]
  }
};

export default codenames;