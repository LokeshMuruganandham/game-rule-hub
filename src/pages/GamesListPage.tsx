import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GAMES } from "@/data/games";
import GameCard from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { searchGames, findExactMatch } from "@/lib/search";

const GamesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [playerFilter, setPlayerFilter] = useState<string>("all");
  const [complexityFilter, setComplexityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Effect to handle URL search parameter
  useEffect(() => {
    const searchFromURL = searchParams.get("search");
    if (searchFromURL) {
      setSearchQuery(searchFromURL);
      
      // Check for exact match
      const exactMatch = findExactMatch(GAMES, searchFromURL);
      
      if (exactMatch) {
        navigate(`/games/${exactMatch.id}`);
        return;
      }
    }
  }, [searchParams, navigate]);

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
    new Set(GAMES.flatMap((game) => game.categories))
  );

  // Get filtered and searched games using the new search utility
  const filteredGames = searchGames(GAMES, searchQuery, {
    playerCount: playerFilter,
    complexity: complexityFilter,
    category: categoryFilter,
  });

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
            
            {/* Results count */}
            <p className="text-muted-foreground mb-6">
              Found {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"}
            </p>
            
            {/* Games grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} {...game} />
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
