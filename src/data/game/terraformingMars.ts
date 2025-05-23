import { Game } from "../games";

const terraformingMars: Game = {
  id: "terraforming-mars",
  title: "Terraforming Mars",
  coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
  playerCount: "1-5",
  playTime: "120 min",
  age: "12",
  complexity: 3,
  categories: ["strategy", "resource-management"],
  description: "Compete with rival CEOs to make Mars habitable and build your corporate empire in the process.",
  rules: {
    id: "terraforming-mars-rules",
    title: "Terraforming Mars Rules",
    type: "Engine Building",
    summary: "Players represent corporations working to terraform Mars by raising temperature, creating oxygen, and covering the surface with water.",
    setup: [
      "Each player chooses a corporation card and receives the corresponding starting resources and production.",
      "Shuffle the project cards and deal 10 to each player, who can buy cards for 3 megacredits each.",
      "Set the global parameters (temperature, oxygen, and ocean) to their starting values.",
      "Place player markers on the production tracks and the TR track."
    ],
    howToPlay: [
      "The game is played over a series of generations (rounds).",
      "Each generation begins with players receiving income based on their terraform rating and production.",
      "The action phase follows, where players take 1 or 2 actions on their turn, or pass.",
      "Actions include: playing a project card, using a standard project, claiming a milestone, funding an award, converting plants to greenery, converting heat to temperature, and using the action on a blue card.",
      "When all players have passed, the production phase begins, where players receive resources based on their production values.",
      "The game ends when all three global parameters (temperature, oxygen, and oceans) have reached their maximum values."
    ],
    fullRules: [
      "Project cards have requirements that must be met before they can be played.",
      "Playing cards often increases production of resources or provides other benefits.",
      "Placing tiles on Mars can grant bonuses and count towards area control scoring.",
      "Milestones and awards provide additional scoring opportunities but must be purchased.",
      "Final scoring includes points from terraform rating, tile placement, milestones, awards, and cards.",
      "The player with the most victory points wins."
    ]
  }
};

export default terraformingMars;