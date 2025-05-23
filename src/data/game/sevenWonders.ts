import { Game } from "../games";

const sevenWonders: Game = {
  id: "7-wonders",
  title: "7 Wonders",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "2-7",
  playTime: "30 min",
  age: "10",
  complexity: 2,
  categories: ["strategy", "card-drafting"],
  description: "Lead an ancient civilization and build your city through three ages by drafting cards.",
  rules: {
    id: "7-wonders-rules",
    title: "7 Wonders Rules",
    type: "Card Drafting",
    summary: "Players draft cards over three ages to develop their cities, build their Wonders, and compete in military, science, and commerce.",
    setup: [
      "Each player randomly receives a Wonder board with side A facing up.",
      "Give each player 3 coins from the bank.",
      "Separate the cards by age (I, II, and III) and shuffle each deck separately.",
      "Deal 7 cards to each player from the Age I deck."
    ],
    howToPlay: [
      "Each age consists of 6 rounds of card drafting.",
      "On each round, players simultaneously select one card from their hand to play.",
      "Selected cards can be: built (by paying its cost), used to build a Wonder stage, or discarded for 3 coins.",
      "After selecting a card, pass the remaining cards to the left (in Ages I and III) or to the right (in Age II).",
      "At the end of each age, players compare military strength with their immediate neighbors and gain victory points accordingly."
    ],
    fullRules: [
      "Cards come in 7 types: brown (raw materials), grey (manufactured goods), blue (civilian structures), green (scientific structures), red (military structures), yellow (commercial structures), and purple (guilds).",
      "Resources from brown and grey cards are used to build other cards and Wonders.",
      "Some cards provide free construction of future cards.",
      "Green cards are collected in sets for scientific victory points.",
      "At the end of Age III, players score points for their buildings, Wonders, treasury, military conflicts, and science.",
      "The player with the most victory points wins."
    ]
  }
};

export default sevenWonders;