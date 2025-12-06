-- Update Monopoly with detailed rules
UPDATE public.game_rules SET
  summary = 'Buy properties, collect rent, and bankrupt your opponents to become the wealthiest player. Navigate the board, make strategic investments, build houses and hotels, and negotiate trades to dominate the real estate market.',
  setup = ARRAY[
    'Place the board on a flat surface. Each player selects a token and places it on GO.',
    'One player is designated as the Banker and separates money into denominations: $500, $100, $50, $20, $10, $5, and $1 bills.',
    'Each player receives $1,500 starting money: 2×$500, 2×$100, 2×$50, 6×$20, 5×$10, 5×$5, and 5×$1.',
    'Shuffle the Chance and Community Chest cards and place them face down in their designated spaces.',
    'Place all 32 houses and 12 hotels near the board as the bank''s supply.',
    'Sort the Title Deed cards by property color and place them near the board.',
    'The Banker also manages unsold properties, houses, hotels, and handles auctions.',
    'Each player rolls the dice - highest roll goes first, play proceeds clockwise.'
  ],
  how_to_play = ARRAY[
    'On your turn, roll both dice and move your token clockwise that many spaces.',
    'If you roll doubles, take another turn after completing your current action. Rolling doubles three times in a row sends you directly to Jail.',
    'LANDING ON UNOWNED PROPERTY: You may buy it at the listed price. If you decline, the Banker immediately auctions it to the highest bidder (including you).',
    'LANDING ON OWNED PROPERTY: Pay rent to the owner. Rent increases if the owner has a complete color set (monopoly), and increases further with houses/hotels.',
    'CHANCE/COMMUNITY CHEST: Draw the top card, follow its instructions, then return it face down to the bottom of the deck.',
    'INCOME TAX: Pay $200 or 10% of your total worth (cash + property values + buildings at cost).',
    'LUXURY TAX: Pay $100 to the Bank.',
    'GO TO JAIL: Move directly to Jail without passing GO or collecting $200.',
    'JAIL: If "Just Visiting," you may leave on your next turn. If imprisoned, you must pay $50, use a "Get Out of Jail Free" card, or roll doubles within 3 turns.',
    'FREE PARKING: Nothing happens - this is a rest space (house rules may vary).',
    'PASSING GO: Collect $200 each time you pass or land on GO.',
    'BUILDING: Once you own all properties of one color, you may buy houses ($50-$200 each depending on color). Houses must be built evenly across the color group.',
    'HOTELS: After 4 houses on each property of a color group, you may upgrade to a hotel by paying the hotel cost and returning the 4 houses.',
    'MORTGAGING: You may mortgage properties to the Bank for half their purchase price. You cannot collect rent on mortgaged properties.',
    'TRADING: You may trade properties, cash, and "Get Out of Jail Free" cards with other players at any time.'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Be the last player remaining with money. All other players must go bankrupt.',
    'PROPERTY OWNERSHIP: When you buy a property, take its Title Deed card. This shows the rent amounts, mortgage value, and building costs.',
    'MONOPOLIES: Owning all properties of the same color doubles the rent on unimproved properties of that group.',
    'BUILDING RULES: You may only build houses after acquiring a complete color group. Buildings must be distributed evenly - you cannot have more than one house difference between properties in a group.',
    'HOUSING SHORTAGE: If the Bank runs out of houses, players must wait or bid in an auction for available houses.',
    'RENT COLLECTION: The owner must ask for rent before the next player rolls. If forgotten, no rent is owed.',
    'RAILROADS: Rent depends on how many railroads you own: 1=$25, 2=$50, 3=$100, 4=$200.',
    'UTILITIES: If one utility is owned, rent is 4× the dice roll. If both utilities are owned, rent is 10× the dice roll.',
    'BANKRUPTCY TO ANOTHER PLAYER: If you owe more than you can pay to another player, you must sell all buildings (at half price) and mortgage properties. If still unable to pay, you give all remaining assets to that player.',
    'BANKRUPTCY TO THE BANK: If you owe the Bank more than you can pay, all your properties are auctioned off and you are eliminated.',
    'UNMORTGAGING: Pay the mortgage value plus 10% interest to unmortgage a property.',
    'SELLING BUILDINGS: Houses and hotels may be sold back to the Bank at half their purchase price. Hotels must be sold before houses can be removed.',
    'NO LOANS: Players cannot borrow money from each other or the Bank (except through mortgages).',
    'WINNING: The game ends when all players except one have gone bankrupt. That player wins!'
  ]
WHERE game_id = 'monopoly';

-- Update UNO with detailed rules
UPDATE public.game_rules SET
  summary = 'Race to empty your hand by matching cards by color or number. Use action cards strategically to disrupt opponents, and don''t forget to shout "UNO!" when you have one card left!',
  setup = ARRAY[
    'Use one standard UNO deck of 108 cards.',
    'The deck contains: Number cards 0-9 in four colors (Red, Yellow, Green, Blue) - one 0 and two of each 1-9 per color.',
    'Action cards in each color: 2 Skip, 2 Reverse, 2 Draw Two.',
    'Wild cards: 4 Wild and 4 Wild Draw Four.',
    'Select a dealer. The dealer shuffles thoroughly and deals 7 cards to each player face down.',
    'Place the remaining cards face down as the draw pile.',
    'Turn over the top card of the draw pile to start the discard pile.',
    'If the first card is a Wild Draw Four, return it to the deck and draw another.',
    'If the first card is an action card, its effect applies to the first player.',
    'The player to the dealer''s left goes first. Play proceeds clockwise (unless reversed).'
  ],
  how_to_play = ARRAY[
    'On your turn, you must play a card that matches the discard pile''s top card by COLOR, NUMBER, or SYMBOL.',
    'EXAMPLE: If the top card is a Red 7, you may play any Red card OR any color 7.',
    'NUMBER CARDS (0-9): Simply match color or number. The next player must then match your card.',
    'SKIP: The next player loses their turn.',
    'REVERSE: Changes direction of play. In 2-player games, acts like a Skip.',
    'DRAW TWO (+2): Next player draws 2 cards and loses their turn.',
    'WILD: May be played on any card. You choose what color continues play.',
    'WILD DRAW FOUR: Play only when you have no other legal card. Next player draws 4 cards and loses turn. You choose the continuing color.',
    'If you cannot play any card, draw one card from the draw pile. If it''s playable, you may (but don''t have to) play it immediately.',
    'UNO CALL: When you play your second-to-last card, you MUST shout "UNO!" before the next player starts their turn.',
    'FAILURE TO CALL UNO: If caught before the next player plays, you must draw 2 penalty cards.',
    'CHALLENGING WILD DRAW FOUR: If you believe a Wild Draw Four was played illegally, challenge the player. They must show their hand. If guilty, they draw 4 cards instead. If innocent, you draw 6 cards.',
    'When the draw pile is empty, shuffle the discard pile (except the top card) to form a new draw pile.'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Be the first player to score 500 points across multiple rounds. You score points by being first to empty your hand each round.',
    'WINNING A ROUND: The first player to play all their cards wins the round. All other players'' remaining cards count as points for the winner.',
    'SCORING: Number cards = face value. Skip/Reverse/Draw Two = 20 points each. Wild/Wild Draw Four = 50 points each.',
    'STACKING DRAW CARDS (HOUSE RULE - NOT OFFICIAL): Many play that Draw Two cards can be stacked, making the next player draw 4, 6, etc. This is NOT in official rules.',
    'PLAYING OUT OF TURN: If you play out of turn and are caught, take your card back and draw 2 cards as penalty.',
    'FORGETTING TO DRAW: If caught not drawing when required, draw the required cards plus 2 extra.',
    'RENEGING: Playing a Wild Draw Four when you have a matching color is illegal if challenged.',
    'SPECIAL RULE - 7-0 (HOUSE RULE): When playing a 7, swap hands with another player. When playing a 0, all players pass their hands in the direction of play.',
    'TWO-PLAYER RULES: Skip cards act as another turn for you. Reverse also acts as a Skip.',
    'TIE BREAKER: If the draw pile runs out and no one can play, the player with the fewest cards wins the round. If still tied, the round is a draw.',
    'DECLARING WINNER: First player to reach 500 points wins the game. Alternatively, play a set number of rounds and highest scorer wins.',
    'TEAM PLAY (4+ players): Partners sit across from each other. When one partner goes out, continue until both partners are out. Combined hand points go to opponents.',
    'QUICK WIN VARIANT: Instead of 500 points, the first to go out 3 times wins.'
  ]
WHERE game_id = 'uno';

-- Update Chess with detailed rules
UPDATE public.game_rules SET
  summary = 'The ultimate game of strategy. Command an army of pieces with unique movements to checkmate your opponent''s King. Every move matters in this timeless battle of wits.',
  setup = ARRAY[
    'Place the board so each player has a white (light) square in their right-hand corner.',
    'Set up the back row (closest to each player) from left to right: Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook.',
    'IMPORTANT: The Queen always starts on her own color (White Queen on white square, Black Queen on black square).',
    'Place all 8 Pawns on the second row in front of the other pieces.',
    'White always moves first. Players then alternate turns.',
    'Each piece has a unique movement pattern that cannot be changed during the game.',
    'You cannot skip a turn - you must make a legal move if one is available.',
    'A game can end in checkmate, stalemate, resignation, or draw by agreement.'
  ],
  how_to_play = ARRAY[
    'KING: Moves one square in any direction (horizontally, vertically, or diagonally). The King can never move into check.',
    'QUEEN: The most powerful piece. Moves any number of squares in any direction (horizontally, vertically, or diagonally).',
    'ROOK: Moves any number of squares horizontally or vertically. Cannot jump over pieces.',
    'BISHOP: Moves any number of squares diagonally. Each Bishop stays on its starting color for the entire game.',
    'KNIGHT: Moves in an "L" shape: 2 squares in one direction, then 1 square perpendicular. The ONLY piece that can jump over others.',
    'PAWN: Moves forward one square, but captures diagonally. On its first move, a Pawn may advance 2 squares.',
    'CAPTURING: Move your piece to a square occupied by an opponent''s piece. Remove their piece from the board. Pawns capture diagonally forward.',
    'CHECK: When a King is under attack, it is "in check." The player must immediately get out of check by moving the King, blocking, or capturing the attacker.',
    'CHECKMATE: When a King is in check and cannot escape, the game ends. The attacking player wins.',
    'STALEMATE: If a player has no legal moves and is NOT in check, the game is a draw.',
    'CASTLING: A special King+Rook move. The King moves 2 squares toward a Rook, and that Rook moves to the other side of the King. Requirements: Neither piece has moved, no pieces between them, King is not in check and doesn''t pass through check.',
    'EN PASSANT: If a Pawn advances 2 squares and lands beside an enemy Pawn, the enemy may capture it "in passing" as if it moved only 1 square. Must be done immediately.',
    'PAWN PROMOTION: When a Pawn reaches the opposite end of the board, it must be promoted to a Queen, Rook, Bishop, or Knight (usually Queen).'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Checkmate your opponent''s King. This means the King is in check and has no legal move to escape.',
    'PIECE VALUES (for strategy): Pawn=1, Knight=3, Bishop=3, Rook=5, Queen=9. The King is invaluable.',
    'ILLEGAL MOVES: You cannot make a move that puts or leaves your own King in check.',
    'TOUCH-MOVE RULE (tournament play): If you touch a piece, you must move it if legal. If you touch an opponent''s piece, you must capture it if legal.',
    'DRAW CONDITIONS: Stalemate, threefold repetition (same position 3 times), 50-move rule (50 moves without a Pawn move or capture), insufficient material, or mutual agreement.',
    'INSUFFICIENT MATERIAL: Some endgames cannot force checkmate: King vs King, King+Bishop vs King, King+Knight vs King.',
    'TIME CONTROLS: In timed games, running out of time loses the game (unless opponent has insufficient material to checkmate).',
    'NOTATION: Moves are recorded using algebraic notation. Each square has a coordinate (a1-h8). Pieces are noted by letter (K, Q, R, B, N). Pawns use only the destination square.',
    'KINGSIDE CASTLING: Written as O-O. Queenside Castling is O-O-O.',
    'DISCOVERED CHECK: Moving one piece to reveal an attack on the King by another piece.',
    'DOUBLE CHECK: When two pieces give check simultaneously. The only escape is to move the King.',
    'PERPETUAL CHECK: Repeatedly checking the King with no way to escape leads to a draw by threefold repetition.',
    'RESIGNATION: A player may resign at any time, conceding defeat.',
    'OFFERING A DRAW: You may offer a draw after making a move. Your opponent may accept or decline.',
    'STRATEGY BASICS: Control the center, develop pieces early, protect your King (castle!), don''t move the same piece twice in the opening, connect your Rooks.'
  ]
WHERE game_id = 'chess';

-- Update Checkers with detailed rules  
UPDATE public.game_rules SET
  summary = 'Jump and capture your opponent''s pieces to dominate the board. Crown your pieces to gain the powerful King''s ability to move backward. Simple to learn, but mastering requires careful strategy.',
  setup = ARRAY[
    'Use an 8×8 checkerboard. Place it so each player has a dark square in their left corner.',
    'Each player takes 12 pieces (checkers) of one color - traditionally red/black or white/black.',
    'Place all pieces on the dark squares of the three rows closest to each player.',
    'The two middle rows remain empty at the start.',
    'Black (or the darker color) moves first.',
    'Players alternate turns throughout the game.',
    'Pieces can only move and capture on the dark squares - light squares are never used.',
    'The board should have 12 dark squares with pieces on each side, totaling 24 occupied squares.'
  ],
  how_to_play = ARRAY[
    'BASIC MOVEMENT: Regular pieces (men) move diagonally forward one square to an adjacent empty dark square.',
    'CAPTURING: Jump over an adjacent opponent''s piece to an empty square directly beyond it. Remove the captured piece from the board.',
    'MANDATORY CAPTURES: If a capture is available, you MUST take it. You cannot make a non-capturing move when a jump is possible.',
    'MULTIPLE JUMPS: If after a capture another jump is available with the same piece, you must continue jumping. Multiple pieces can be captured in one turn.',
    'CHOOSING JUMPS: If multiple capture sequences are available, you may choose any one (you don''t have to take the maximum captures in standard rules).',
    'CROWNING - BECOMING A KING: When a piece reaches the opponent''s back row (the row farthest from you), it becomes a King.',
    'KING MARKER: Place a captured piece of the same color on top, or flip the piece to show its crowned side.',
    'KING MOVEMENT: Kings can move diagonally forward OR backward, one square at a time.',
    'KING CAPTURING: Kings can jump forward or backward, following the same capturing rules.',
    'KING PROMOTION TIMING: A piece is crowned immediately upon reaching the back row. If it can continue jumping backward, it must wait until the next turn.',
    'BLOCKED PIECES: If all your pieces are blocked and cannot move, you lose the game.',
    'WINNING: Capture all opponent pieces OR block them so they cannot make a legal move.'
  ],
  full_rules = ARRAY[
    'OBJECTIVE: Eliminate all of your opponent''s pieces or block them so they cannot move.',
    'DRAW CONDITIONS: If neither player can win (e.g., one King each with no way to capture), the game is a draw. Players may also agree to a draw.',
    'NO BACKWARD MOVEMENT FOR MEN: Regular pieces (non-Kings) can NEVER move backward, only forward.',
    'HUFFING (OBSOLETE RULE): The old rule of "huffing" - removing a piece that failed to make a mandatory capture - is no longer used. Captures are simply mandatory.',
    'TOURNAMENT RULE - 40-MOVE RULE: If 40 moves pass without a capture or a piece being crowned, the game is a draw.',
    'FLYING KINGS (INTERNATIONAL DRAUGHTS): In International/Polish Checkers (10×10 board), Kings can move multiple squares diagonally like a Bishop in chess. Standard American Checkers does NOT use this rule.',
    'THREE-MOVE RESTRICTION (TOURNAMENT): In tournament play, the first three moves may be determined by cards to prevent memorized openings.',
    'STRATEGY - CONTROL THE CENTER: Pieces in the center control more squares and are harder to trap.',
    'STRATEGY - KING ADVANTAGE: Try to crown pieces while preventing your opponent from doing so.',
    'STRATEGY - PIECE TRADES: When ahead in pieces, trading evenly benefits you. When behind, avoid even trades.',
    'STRATEGY - BACK ROW DEFENSE: Keeping pieces on your back row prevents easy crowning for your opponent.',
    'STRATEGY - FORCING MOVES: Set up positions where your opponent must make moves that benefit you.',
    'DOUBLE CORNER: The double corner (King row corners) is easier to defend and promote from.',
    'WINNING ENDGAMES: King vs. single piece is usually a win for the King player through careful maneuvering.',
    'ETIQUETTE: In casual play, you may point out available jumps to newer players as a teaching tool.'
  ]
WHERE game_id = 'checkers';