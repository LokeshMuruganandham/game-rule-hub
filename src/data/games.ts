
export interface GameRule {
  id: string;
  title: string;
  type: string;
  summary: string;
  fullRules: string[];
  setup: string[];
  howToPlay: string[];
}

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  playerCount: string;
  playTime: string;
  age: string;
  complexity: number;
  categories: string[];
  description: string;
  rules: GameRule;
}

export const GAMES: Game[] = [
  {
    id: "catan",
    title: "Catan",
    coverImage: "https://images.unsplash.com/photo-1661177260227-78c1915ee2cb?q=80&w=2072&auto=format&fit=crop",
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
  },
  {
    id: "ticket-to-ride",
    title: "Ticket to Ride",
    coverImage: "https://images.unsplash.com/photo-1628746404106-4d3843b231b3?q=80&w=2070&auto=format&fit=crop",
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
  },
  {
    id: "pandemic",
    title: "Pandemic",
    coverImage: "https://images.unsplash.com/photo-1587652252770-1f2fc12f1e53?q=80&w=2043&auto=format&fit=crop",
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
  },
  {
    id: "codenames",
    title: "Codenames",
    coverImage: "https://images.unsplash.com/photo-1606503153804-75ea8a22e75f?q=80&w=2070&auto=format&fit=crop",
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
  },
  {
    id: "azul",
    title: "Azul",
    coverImage: "https://images.unsplash.com/photo-1522787376475-1c888bfd907f?q=80&w=2030&auto=format&fit=crop",
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
  },
  {
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
  },
  {
    id: "wingspan",
    title: "Wingspan",
    coverImage: "https://images.unsplash.com/photo-1667734113487-fa438add9462?q=80&w=1992&auto=format&fit=crop",
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
  },
  {
    id: "scythe",
    title: "Scythe",
    coverImage: "https://images.unsplash.com/photo-1618500299034-abce7ed0e8df?q=80&w=2070&auto=format&fit=crop",
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
  },
  {
    id: "7-wonders",
    title: "7 Wonders",
    coverImage: "https://images.unsplash.com/photo-1659492269543-30284a410466?q=80&w=2070&auto=format&fit=crop",
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
  },
  {
    id: "terraforming-mars",
    title: "Terraforming Mars",
    coverImage: "https://images.unsplash.com/photo-1639251102576-30850f5a50dc?q=80&w=2069&auto=format&fit=crop",
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
  }
];

export const getFeaturedGames = (): Game[] => {
  return GAMES.filter(game => 
    ["catan", "ticket-to-ride", "pandemic", "azul"].includes(game.id)
  );
};

export const getRecentGames = (): Game[] => {
  return GAMES.filter(game => 
    ["gloomhaven", "wingspan", "codenames"].includes(game.id)
  );
};

export const getCategoriesWithGameCount = (): { id: string, name: string, description: string, gameCount: number }[] => {
  const categories = [
    {
      id: "strategy",
      name: "Strategy",
      description: "Games that require careful thought and planning",
    },
    {
      id: "family",
      name: "Family",
      description: "Fun for all ages, perfect for family game nights",
    },
    {
      id: "party",
      name: "Party Games",
      description: "Exciting games for larger groups and social gatherings",
    },
    {
      id: "card",
      name: "Card Games",
      description: "Games played primarily with cards",
    },
  ];
  
  return categories.map(category => {
    const gameCount = GAMES.filter(game => game.categories.includes(category.id)).length;
    return {
      ...category,
      gameCount
    };
  });
};
