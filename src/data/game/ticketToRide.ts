import { Game } from "../games";

const ticketToRide: Game = {
  id: "ticket-to-ride",
  title: "Ticket to Ride",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "2-5",
  playTime: "30-60 min",
  age: "8",
  complexity: 2,
  categories: ["strategy", "family"],
  description: "Collect cards, claim railway routes, and connect cities across North America in this classic route-building game.",
  rules: {
    id: "ttr-rules",
    title: "Ticket to Ride Rules",
    type: "Route Building",
    summary: "Players collect colored cards to claim railway routes between cities, aiming to complete destination tickets for points.",
    setup: [
      "Place the board in the center of the table.",
      "Give each player 45 train cars of their chosen color, along with the matching scoring marker.",
      "Shuffle the train car cards and deal 4 cards to each player.",
      "Place the remaining deck near the board and turn over 5 cards face-up next to the deck.",
      "Deal 3 destination ticket cards to each player, who must keep at least 2 of them."
    ],
    howToPlay: [
      "On your turn, you must take one of three actions: draw train car cards, claim a route, or draw destination ticket cards.",
      "To draw train car cards, take 2 cards from either the face-up display or the top of the deck.",
      "To claim a route, play a set of matching colored cards equal to the number of spaces in the route, then place your trains on that route.",
      "To draw destination tickets, take 3 tickets and keep at least 1 of them.",
      "The game ends when any player has 2 or fewer train cars remaining. Each player then takes one final turn."
    ],
    fullRules: [
      "Points are scored immediately when claiming routes.",
      "At the end of the game, players score additional points for completed destination tickets, or lose points for incomplete tickets.",
      "The player who has built the longest continuous path of routes receives the Longest Path bonus card worth 10 points.",
      "The player with the most points wins the game."
    ]
  }
};

export default ticketToRide;