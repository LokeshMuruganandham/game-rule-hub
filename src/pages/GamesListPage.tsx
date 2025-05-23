
import React, { useState } from "react";
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

const GamesListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [playerFilter, setPlayerFilter] = useState<string>("");
  const [complexityFilter, setComplexityFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Extract all unique categories
  const allCategories = Array.from(
    new Set(GAMES.flatMap((game) => game.categories))
  );

  // Filter games based on search query and filters
  const filteredGames = GAMES.filter((game) => {
    // Search filter
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Player count filter
    let matchesPlayerCount = true;
    if (playerFilter) {
      const playerCount = parseInt(game.playerCount.split("-")[0]);
      
      switch (playerFilter) {
        case "1-2":
          matchesPlayerCount = playerCount <= 2;
          break;
        case "3-4":
          matchesPlayerCount = playerCount >= 3 && playerCount <= 4;
          break;
        case "5+":
          matchesPlayerCount = playerCount >= 5;
          break;
        default:
          matchesPlayerCount = true;
      }
    }

    // Complexity filter
    let matchesComplexity = true;
    if (complexityFilter) {
      const complexity = parseInt(complexityFilter);
      matchesComplexity = game.complexity === complexity;
    }

    // Category filter
    let matchesCategory = true;
    if (categoryFilter) {
      matchesCategory = game.categories.includes(categoryFilter);
    }

    return matchesSearch && matchesPlayerCount && matchesComplexity && matchesCategory;
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                    <SelectItem value="">Any players</SelectItem>
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
                    <SelectItem value="">Any complexity</SelectItem>
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
                    <SelectItem value="">All categories</SelectItem>
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
