-- Update Scrabble with detailed rules
UPDATE public.game_rules SET
  summary = 'Form words on a crossword-style board using letter tiles. Score points based on letter values and premium squares. Expand your vocabulary and outsmart opponents with strategic tile placement.',
  setup = ARRAY[
    'Place the Scrabble board in the center of the table. The star in the center is the starting square.',
    'Each player takes a tile rack to hold their letters privately.',
    'Place all 100 letter tiles face down in the bag (or a container) and mix them thoroughly.',
    'Each player draws one tile. The player closest to "A" goes first. Return tiles to the bag and remix.',
    'Each player draws 7 tiles and places them on their rack without showing others.',
    'Keep the bag accessible for drawing replacement tiles.',
    'Have the official Scrabble dictionary nearby for challenges.',
    'Prepare paper and pencil for scorekeeping, or use the score track on the board.'
  ],
  how_to_play = ARRAY[
    'FIRST WORD: The first player forms a word using 2+ tiles. One tile must cover the center star (counts as double word score).',
    'FORMING WORDS: Place tiles in a straight line horizontally (left to right) or vertically (top to bottom) on the board.',
    'CONNECTING: All subsequent words must connect to existing words on the board, like a crossword puzzle.',
    'SCORING: Add up the point values of all letters in your word. Apply premium squares before totaling.',
    'PREMIUM SQUARES - LETTERS: Light blue (DL) = Double Letter Score, Dark blue (TL) = Triple Letter Score.',
    'PREMIUM SQUARES - WORDS: Pink (DW) = Double Word Score, Red (TW) = Triple Word Score.',
    'PREMIUM ORDER: Apply letter bonuses first, then word bonuses. Multiple word bonuses multiply (DW × DW = 4× word score).',
    'MULTIPLE WORDS: If your tiles create multiple words (by adding to existing words), score ALL words formed.',
    'BLANK TILES: Blanks can represent any letter. They score 0 points but help form words. Once placed, the blank''s letter cannot change.',
    'BINGO/BONUS: Using all 7 tiles in one turn earns a 50-point bonus (added after other calculations).',
    'DRAWING TILES: After your turn, draw tiles from the bag to replenish your rack to 7 tiles.',
    'EXCHANGING TILES: Instead of playing a word, you may exchange any number of tiles. Return them to the bag, draw new ones, and end your turn (0 points).',
    'PASSING: You may pass your turn, but if all players pass twice consecutively, the game ends.',
    'CHALLENGES: If you doubt a word, challenge it before the next player draws tiles. If invalid, the player removes tiles and scores 0. If valid (depending on rules), the challenger may lose their turn.'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Score the most points by forming high-scoring words on the board.',
    'TILE DISTRIBUTION: The bag contains 100 tiles: E×12, A×9, I×9, O×8, N×6, R×6, T×6, L×4, S×4, U×4, D×4, G×3, plus others. Two blank tiles are included.',
    'LETTER VALUES: 0 pts: Blank. 1 pt: A, E, I, L, N, O, R, S, T, U. 2 pts: D, G. 3 pts: B, C, M, P. 4 pts: F, H, V, W, Y. 5 pts: K. 8 pts: J, X. 10 pts: Q, Z.',
    'VALID WORDS: Words must be in the official Scrabble dictionary. Proper nouns, abbreviations, hyphenated words, and words requiring apostrophes are NOT allowed.',
    'BOARD LAYOUT: The 15×15 board has premium squares distributed symmetrically. Triple Word squares are in corners and mid-edges.',
    'PREMIUM SQUARE RULE: Premium squares only apply the first time they are covered. After that, they count as regular squares.',
    'PARALLEL PLAYS: You may play a word parallel and adjacent to an existing word, as long as all touching letter combinations form valid words.',
    'HOOKS: Adding a letter to an existing word (like "S" to "CAT" making "CATS") while playing a new word is called "hooking."',
    'TWO-LETTER WORDS: Knowing all valid two-letter words is crucial for high-level play. Examples: AA, AB, AD, AE, QI, XI, XU, ZA.',
    'END OF GAME: The game ends when the bag is empty and one player uses all their tiles, OR all players pass twice.',
    'FINAL SCORING: When the game ends, each player subtracts the value of unplayed tiles from their score. If one player uses all tiles, they ADD the sum of all opponents'' remaining tiles to their score.',
    'WINNING: The player with the highest total score wins.',
    'TIME LIMITS (TOURNAMENT): In competitive play, each player has 25 minutes total. Going over time incurs penalties.',
    'ETIQUETTE: Keep tiles hidden. No looking at tiles in the bag. No using aids (dictionaries, apps) during your turn.'
  ]
WHERE game_id = 'scrabble';

-- Update Jenga with detailed rules
UPDATE public.game_rules SET
  summary = 'Carefully remove wooden blocks from a tower and stack them on top without letting it fall. Steady hands and nerves of steel are required as the tower grows taller and more unstable.',
  setup = ARRAY[
    'Use the loading sleeve to build the tower. Place the sleeve upright on a flat, stable surface.',
    'Stack all 54 wooden blocks inside the sleeve in layers of 3 blocks each.',
    'Each layer is placed perpendicular (at 90 degrees) to the layer below it.',
    'The completed tower will have 18 layers of 3 blocks each.',
    'Carefully remove the loading sleeve straight up, leaving the tower standing.',
    'Place the tower in the center of the playing area, easily reachable by all players.',
    'Ensure the surface is stable - a wobbly table makes the game unfairly difficult.',
    'Decide who goes first (youngest player, birthday closest to today, etc.).'
  ],
  how_to_play = ARRAY[
    'Using ONE HAND ONLY, carefully remove one block from anywhere in the tower (except the top incomplete layer).',
    'You may tap or push blocks to find loose ones before committing to remove one.',
    'Once you touch a block with your pulling hand, you must use that block OR place it back in its original position.',
    'After removing a block, place it on TOP of the tower perpendicular to the layer below.',
    'Complete each layer of 3 blocks on top before starting a new layer.',
    'You can use both hands ONLY when placing the block on top.',
    'Wait for the tower to stabilize before the next player''s turn.',
    'The turn ends 10 seconds after placing your block (to allow for delayed collapses).',
    'Play continues clockwise around the table.',
    'THE LOSER: If the tower falls on your turn (during or within 10 seconds after your move), you lose.',
    'PARTIAL COLLAPSE: If some blocks fall but the tower remains standing, those blocks are out of play. If the tower remains stable, play continues.',
    'WINNING: All other players win! The last player to successfully complete a move before the collapse may claim bragging rights.'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Don''t be the player who causes the tower to fall!',
    'BLOCK SELECTION: You may remove blocks from any layer except the top incomplete layer and the layer directly below it (if the top layer is incomplete).',
    'ONE-HAND RULE: The one-hand rule applies from the moment you touch the tower until the block is removed. Switching hands is not allowed during removal.',
    'LOOSE BLOCKS: Tapping blocks to find loose ones is encouraged. A single-finger touch doesn''t commit you to that block.',
    'COMMITTING TO A BLOCK: Once you significantly move a block from its position (more than a tap), you must complete removing it.',
    'TOWER STRAIGHTENING: You may NOT push blocks back into the tower or adjust blocks you''re not removing.',
    'PLACEMENT PRECISION: When placing on top, blocks must be placed so they don''t overhang the tower''s footprint excessively.',
    'STABILIZATION TIME: The official rule gives 10 seconds after placing a block. If it falls during this time, the current player loses.',
    'GROUP COLLAPSE: In rare cases, multiple blocks may fall on one side while the tower remains standing - these fallen blocks are removed from play.',
    'IMPOSSIBLE TOWERS: If the tower becomes genuinely impossible to remove a block without collapse, the last player to successfully go may be declared the winner.',
    'SPEED JENGA (VARIANT): Set a timer (10-15 seconds per turn). If time runs out, you must remove whatever block you''re touching.',
    'TRUTH OR DARE JENGA (VARIANT): Write challenges on blocks. If you remove that block, you must complete the challenge.',
    'REVERSE JENGA (VARIANT): Start with a fallen pile. Take turns placing blocks to build a tower. First person to knock it down loses.',
    'WINNING: Since Jenga has a loser rather than a winner, you can play for points: 1 point for surviving each round. First to 5 points wins the session.',
    'STRATEGY: Remove from the middle of three-block layers first. End blocks are riskier. Test blocks before committing.'
  ]
WHERE game_id = 'jenga';

-- Update Clue/Cluedo with detailed rules
UPDATE public.game_rules SET
  summary = 'Solve a murder mystery by deducing the suspect, weapon, and room. Move through the mansion, make clever suggestions, and use logic to eliminate possibilities before making your final accusation.',
  setup = ARRAY[
    'Unfold the board showing the mansion layout with 9 rooms.',
    'Separate the cards into three categories: Suspects (6), Weapons (6), and Rooms (9).',
    'Shuffle each category separately. Without looking, draw one card from each category and place them in the "Confidential" envelope. These are the murder details.',
    'Shuffle all remaining cards together and deal them evenly to all players. Extra cards go face-up as shared information.',
    'Each player takes a Detective Notebook sheet to track deductions.',
    'Place each suspect token in their designated starting location.',
    'Place one weapon token in each of 6 different rooms (randomly or by preference).',
    'Roll to determine who goes first (highest roll). Play proceeds clockwise.'
  ],
  how_to_play = ARRAY[
    'On your turn: Roll the dice and move that many squares.',
    'MOVEMENT: Move horizontally or vertically (not diagonally). You cannot move through other players or pass through the same square twice in one turn.',
    'SECRET PASSAGES: Corner rooms have secret passages to the diagonally opposite corner room (use instead of rolling).',
    'ENTERING ROOMS: You can enter through any doorway. Entering a room uses remaining movement points.',
    'MAKING A SUGGESTION: When in a room, you may suggest the crime was committed there. Name a suspect and weapon.',
    'MOVING PIECES: When you make a suggestion, move the named suspect and weapon to your current room.',
    'DISPROVING: Starting with the player on your left, each player checks if they have any of the three cards you named. If they do, they PRIVATELY show you ONE card. Only you see it.',
    'CONTINUING DISPROOF: If the first player cannot disprove, the next player tries, and so on clockwise.',
    'NO DISPROOF: If no one can disprove your suggestion, the cards might be in the envelope - or in your own hand!',
    'RECORDING: Mark shown cards in your notebook. You now know those items are NOT in the envelope.',
    'MAKING AN ACCUSATION: Once confident, on your turn you may make an accusation: name the suspect, weapon, and room.',
    'CHECKING THE ACCUSATION: Secretly look at the cards in the envelope.',
    'CORRECT ACCUSATION: If all three match, reveal the cards - you win!',
    'INCORRECT ACCUSATION: Return the cards without showing anyone. You''re eliminated from making accusations but still disprove others'' suggestions.',
    'STRATEGY: Use suggestions to narrow down possibilities. Sometimes suggest cards you hold to see who can''t disprove them.'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Be the first to correctly identify the three cards in the envelope: WHO committed the murder, with WHAT weapon, and in which ROOM.',
    'THE SUSPECTS: Miss Scarlet, Colonel Mustard, Mrs. White, Mr. Green, Mrs. Peacock, Professor Plum.',
    'THE WEAPONS: Candlestick, Knife, Lead Pipe, Revolver, Rope, Wrench.',
    'THE ROOMS: Kitchen, Ballroom, Conservatory, Dining Room, Billiard Room, Library, Lounge, Hall, Study.',
    'BEING SUMMONED: When someone suggests your character, your token moves to that room. On your next turn, you may stay there and make a suggestion without rolling.',
    'BLOCKED DOORWAYS: In some rules, if a player blocks a doorway, you cannot enter that room via that door.',
    'STAYING IN ROOMS: You may stay in a room for multiple turns to make additional suggestions (without leaving and re-entering).',
    'STARTING POSITIONS: Miss Scarlet always goes first (she starts nearest the center). Then clockwise: Colonel Mustard, Mrs. White, Mr. Green, Mrs. Peacock, Professor Plum.',
    'FEWER PLAYERS: With fewer than 6 players, unused character tokens remain on the board and can be suggested/moved.',
    'ACCUSATION LOCATION: You can make an accusation from ANYWHERE - you don''t need to be in the accused room.',
    'ONE ACCUSATION ONLY: You get one accusation per game. If wrong, you continue to disprove but cannot make new suggestions.',
    'DEDUCTION TIPS: If someone can''t disprove a suggestion, mark those three items as "possible" for the envelope.',
    'ADVANCED TRACKING: Note which player disproved, not just what was disproved. This reveals information about their hand.',
    'BLUFFING: Suggesting cards you hold can mislead opponents about what you know.',
    'SPEED CLUE (VARIANT): Set a timer. Players have limited time to move and suggest, adding pressure and mistakes.',
    'WINNING: First correct accusation wins. If everyone makes wrong accusations, open the envelope to reveal the solution.'
  ]
WHERE game_id = 'clue';

-- Update Risk with detailed rules
UPDATE public.game_rules SET
  summary = 'Command armies to conquer the world! Deploy troops, attack enemy territories, and fortify your positions across continents. Forge and break alliances in this epic game of global domination.',
  setup = ARRAY[
    'Unfold the board showing the world map with 42 territories grouped into 6 continents.',
    'Each player selects an army color. Pieces represent: Infantry = 1 army, Cavalry = 5 armies, Artillery = 10 armies.',
    'INITIAL ARMIES by player count: 2 players = 40 each, 3 players = 35 each, 4 players = 30 each, 5 players = 25 each, 6 players = 20 each.',
    'TERRITORY DISTRIBUTION: Shuffle the territory cards and deal them evenly. Players place one army on each territory they receive. Return cards to the deck.',
    'REMAINING ARMIES: Players take turns placing remaining armies one at a time on territories they own until all are placed.',
    'ALTERNATIVE SETUP: Players take turns choosing territories one at a time, placing one army on each, until all 42 are claimed. Then place remaining armies.',
    'Shuffle the Risk cards (territory cards + wild cards) and place face down.',
    'Place the 5 dice nearby (3 red for attacker, 2 white for defender).',
    'Determine first player by highest die roll.'
  ],
  how_to_play = ARRAY[
    'TURN PHASES: 1) Receive reinforcements, 2) Attack (optional), 3) Fortify (optional).',
    'REINFORCEMENTS: Count territories you own ÷ 3 (minimum 3). Add continent bonuses if you control entire continents.',
    'CONTINENT BONUSES: Asia = 7, North America = 5, Europe = 5, Africa = 3, Australia = 2, South America = 2.',
    'CARD SETS: Trade matching sets for bonus armies: 3 infantry = 4 armies, 3 cavalry = 6, 3 artillery = 8, one of each = 10. Bonuses increase with each set traded game-wide.',
    'ATTACKING: Attack adjacent territories from any of your territories with 2+ armies.',
    'BATTLE DICE: Attacker rolls up to 3 dice (must leave 1 army behind). Defender rolls up to 2 dice.',
    'COMPARING DICE: Compare highest dice. Higher wins; defender wins ties. Then compare second-highest if applicable.',
    'CASUALTIES: Each comparison lost removes 1 army from the loser. Both sides can lose armies in one battle.',
    'CONQUERING: When a territory has 0 defending armies, move attacking armies in (minimum = dice rolled, maximum = all but 1).',
    'EARNING CARDS: If you conquered at least one territory this turn, draw one Risk card at end of turn.',
    'FORTIFYING: At end of turn, you may move armies from ONE territory to ONE adjacent territory you control.',
    'ELIMINATING PLAYERS: When you eliminate a player, you take all their Risk cards. If you have 6+, immediately trade sets.',
    'WILD CARDS: Wild cards match any picture. Territory cards give +2 armies if you control that territory when trading.',
    'WINNING: Control all 42 territories to win! (In Mission Risk variant, complete your secret mission.)'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Eliminate all opponents and control the entire world.',
    'ARMY LIMITS: There are limited pieces. If needed, use substitutes or track on paper.',
    'ATTACK RESTRICTIONS: You can only attack adjacent territories (connected by lines or sharing borders).',
    'ATTACKING ACROSS WATER: Some territories connect across water (lines shown on board).',
    'MUST LEAVE ONE: You must always leave at least 1 army in every territory you own.',
    'UNLIMITED ATTACKS: You may attack as many times as you want on your turn, from multiple territories.',
    'RETREAT: You may stop attacking at any time and end the combat phase.',
    'FORTIFY RULE: You may only fortify once per turn, from one territory to one adjacent territory.',
    'CONNECTED FORTIFICATION (VARIANT): Some versions allow moving through connected territories you control.',
    'CARD TRADING ESCALATION: The default escalation is 4, 6, 8, 10, 12, 15, and then +5 for each subsequent set.',
    'MANDATORY TRADING: If you have 5+ cards at the START of your turn, you must trade.',
    'TWO-PLAYER RULES: Use a neutral third army. Each player and the neutral gets 14 territories. Neutral doesn''t attack but defends.',
    'MISSION RISK (VARIANT): Each player gets a secret mission card. First to complete their mission wins.',
    'CAPITAL RISK (VARIANT): Each player designates a capital. Lose your capital = eliminated.',
    'ALLIANCE RULES: Players may make deals, but there can only be one winner. Alliances will eventually break.',
    'STRATEGY - CONTINENT CONTROL: Australia is easiest to hold (1 entry point, 2 bonus). Asia is hardest (7 entry points).',
    'STRATEGY - TURTLE DEFENSE: Fortifying one region heavily can make you a less attractive target.',
    'STRATEGY - CARD COLLECTION: Consistently conquering 1 territory per turn to build card sets is valuable.',
    'TIME LIMIT (OPTIONAL): Set a turn limit or time limit. Most territories at end wins.'
  ]
WHERE game_id = 'risk';