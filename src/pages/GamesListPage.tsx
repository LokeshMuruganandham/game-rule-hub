
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
import { Search, Filter, X } from "lucide-react";
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

  // Clear all filters
  const clearFilters = () => {
    setPlayerFilter("all");
    setComplexityFilter("all");
    setCategoryFilter("all");
    setSearchQuery("");
    setSearchParams({});
  };

  // Check if any filters are active
  const hasActiveFilters = playerFilter !== "all" || complexityFilter !== "all" || categoryFilter !== "all" || searchQuery;

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
        <main className="flex-1 pt-20">
          <div className="bg-muted/30 py-6">
            <div className="container px-4 md:px-6">
              <h1 className="text-3xl font-bold mb-4">All Games</h1>
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
        <main className="flex-1 pt-20">
          <div className="bg-muted/30 py-6">
            <div className="container px-4 md:px-6">
              <h1 className="text-3xl font-bold mb-4">All Games</h1>
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
      <main className="flex-1 pt-20">
        <div className="bg-muted/30 min-h-screen">
          <div className="container px-4 md:px-6">
            {/* Compact Header */}
            <div className="mb-6 pt-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">All Games</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Discover and learn the rules for your favorite board games
              </p>
            </div>
            
            {/* Compact Search and Filters Section */}
            <div className="mb-6 space-y-4">
              {/* Left-aligned Search Bar */}
              <div className="flex flex-col gap-4 items-start justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search board games..."
                    className="pl-10 h-10 bg-background border border-border focus:border-primary transition-colors"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground bg-background px-1">
                      {filteredGames.length}
                    </div>
                  )}
                </div>
                
                {searchQuery && !hasNoResults && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRequestGame}
                    className="whitespace-nowrap w-full md:w-auto"
                  >
                    Request "{searchQuery}"
                  </Button>
                )}
              </div>

              {/* Mobile-optimized Filters */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>Filters:</span>
                  </div>
                  
                  {/* Mobile: Stack filters vertically, Desktop: Horizontal */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Player Count Filter */}
                    <div className="w-full">
                      <Select value={playerFilter} onValueChange={setPlayerFilter}>
                        <SelectTrigger className="h-10 text-sm w-full">
                          <SelectValue placeholder="Players" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any players</SelectItem>
                          <SelectItem value="1-2">1-2 players</SelectItem>
                          <SelectItem value="3-4">3-4 players</SelectItem>
                          <SelectItem value="5+">5+ players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Complexity Filter */}
                    <div className="w-full">
                      <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                        <SelectTrigger className="h-10 text-sm w-full">
                          <SelectValue placeholder="Complexity" />
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
                    
                    {/* Category Filter */}
                    <div className="w-full">
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="h-10 text-sm w-full">
                          <SelectValue placeholder="Category" />
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

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground h-10 w-full md:w-auto self-start"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear all filters
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Search feedback messages */}
            {hasSimilarResults && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-1 text-sm">
                  {searchResults.similarMatches.length > 0 ? 
                    `Did you mean one of these games?` : 
                    `Found games in similar categories`
                  }
                </h3>
                <p className="text-blue-700 text-xs">
                  We couldn't find an exact match for "{searchQuery}", but here are some similar options.
                </p>
              </div>
            )}
            
            {/* Results Section */}
            <div className="pb-6">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-base md:text-lg font-semibold">
                    {searchQuery ? `Search Results` : `All Games`}
                  </h2>
                  <span className="text-xs md:text-sm text-muted-foreground px-2 py-1 bg-muted rounded-full">
                    {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
                  </span>
                </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamesListPage;
