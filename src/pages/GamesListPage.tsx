
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameCard from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useGames } from "@/hooks/useGames";
import { smartSearchGames } from "@/lib/smartSearch";

const GamesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [playerFilter, setPlayerFilter] = useState<string>("all");
  const [complexityFilter, setComplexityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const { data: games = [], isLoading, error } = useGames();

  // Effect to handle URL search parameter
  useEffect(() => {
    const searchFromURL = searchParams.get("search");
    if (searchFromURL) {
      setSearchQuery(searchFromURL);
      
      // Check for exact match
      const exactMatch = games.find(game => 
        game.title.toLowerCase() === searchFromURL.toLowerCase()
      );
      
      if (exactMatch) {
        navigate(`/games/${exactMatch.id}`);
        return;
      }
    }
  }, [searchParams, navigate, games]);

  // Update URL when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    if (newValue) {
      setSearchParams({ search: newValue });
    } else {
      setSearchParams({});
    }
  };

  // Extract all unique categories
  const allCategories = Array.from(
    new Set(games.flatMap((game) => game.categories))
  );

  // Get smart search results
  const searchResults = searchQuery ? smartSearchGames(games, searchQuery) : {
    exactMatches: games,
    similarMatches: [],
    categoryMatches: []
  };

  // Combine all search results
  const searchedGames = searchQuery 
    ? [...searchResults.exactMatches, ...searchResults.similarMatches, ...searchResults.categoryMatches]
    : games;

  // Remove duplicates
  const uniqueSearchedGames = searchedGames.filter((game, index, self) => 
    index === self.findIndex(g => g.id === game.id)
  );

  // Apply additional filters
  const filteredGames = uniqueSearchedGames.filter((game) => {
    // Player count filter
    const matchesPlayerCount = playerFilter === "all" || (() => {
      const playerCount = game.playerCount.toLowerCase();
      switch (playerFilter) {
        case "1-2":
          return playerCount.includes("1") || playerCount.includes("2");
        case "3-4":
          return playerCount.includes("3") || playerCount.includes("4");
        case "5+":
          return playerCount.includes("5") || playerCount.includes("6") || playerCount.includes("7") || playerCount.includes("8") || playerCount.includes("9");
        default:
          return true;
      }
    })();

    // Complexity filter
    const matchesComplexity = complexityFilter === "all" || 
      game.complexity === parseInt(complexityFilter);

    // Category filter
    const matchesCategory = categoryFilter === "all" || 
      game.categories.includes(categoryFilter);

    return matchesPlayerCount && matchesComplexity && matchesCategory;
  });

  const hasNoResults = searchQuery && filteredGames.length === 0;
  const hasSimilarResults = searchQuery && searchResults.exactMatches.length === 0 && 
    (searchResults.similarMatches.length > 0 || searchResults.categoryMatches.length > 0);

  const handleRequestGame = () => {
    navigate(`/contact?game=${encodeURIComponent(searchQuery)}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="bg-muted/30 py-8">
            <div className="container">
              <h1 className="text-3xl font-bold mb-6">All Games</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="bg-muted/30 py-8">
            <div className="container">
              <h1 className="text-3xl font-bold mb-6">All Games</h1>
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Failed to load games</h3>
                <p className="text-muted-foreground">
                  Please try again later
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted/30 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-6">All Games</h1>
            
            {/* Search and filters */}
            <div className="grid gap-4 mb-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
              {/* Search box */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search games..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              {/* Player count filter */}
              <div className="space-y-2">
                <Label htmlFor="player-count">Player Count</Label>
                <Select 
                  value={playerFilter} 
                  onValueChange={setPlayerFilter}
                >
                  <SelectTrigger id="player-count">
                    <SelectValue placeholder="Any players" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any players</SelectItem>
                    <SelectItem value="1-2">1-2 players</SelectItem>
                    <SelectItem value="3-4">3-4 players</SelectItem>
                    <SelectItem value="5+">5+ players</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Complexity filter */}
              <div className="space-y-2">
                <Label htmlFor="complexity">Complexity</Label>
                <Select 
                  value={complexityFilter} 
                  onValueChange={setComplexityFilter}
                >
                  <SelectTrigger id="complexity">
                    <SelectValue placeholder="Any complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any complexity</SelectItem>
                    <SelectItem value="1">1 - Easy</SelectItem>
                    <SelectItem value="2">2 - Moderate</SelectItem>
                    <SelectItem value="3">3 - Medium</SelectItem>
                    <SelectItem value="4">4 - Hard</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Category filter */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search feedback messages */}
            {hasSimilarResults && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">
                  {searchResults.similarMatches.length > 0 ? 
                    `Did you mean one of these games?` : 
                    `Found games in similar categories`
                  }
                </h3>
                <p className="text-blue-700 text-sm">
                  We couldn't find an exact match for "{searchQuery}", but here are some similar options.
                </p>
              </div>
            )}
            
            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Found {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              
              {searchQuery && !hasNoResults && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRequestGame}
                >
                  Request "{searchQuery}"
                </Button>
              )}
            </div>
            
            {/* Games grid or no results */}
            {hasNoResults ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No games found for "{searchQuery}"</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any games matching your search and filters.
                </p>
                <Button onClick={handleRequestGame}>
                  Request "{searchQuery}" to be added
                </Button>
              </div>
            ) : filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    id={game.id}
                    title={game.title}
                    coverImage={game.coverImage}
                    playerCount={game.playerCount}
                    playTime={game.playTime}
                    age={game.age}
                    complexity={game.complexity}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamesListPage;
