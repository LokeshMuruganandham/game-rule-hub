
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/games/GameCard";
import type { Game } from "@/types/game";

interface SearchResultsProps {
  query: string;
  exactMatches: Game[];
  similarMatches: Game[];
  categoryMatches: Game[];
  onClose: () => void;
}

const SearchResults = ({ 
  query, 
  exactMatches, 
  similarMatches, 
  categoryMatches, 
  onClose 
}: SearchResultsProps) => {
  const navigate = useNavigate();
  
  const hasResults = exactMatches.length > 0 || similarMatches.length > 0 || categoryMatches.length > 0;

  const handleRequestGame = () => {
    navigate(`/contact?game=${encodeURIComponent(query)}`);
    onClose();
  };

  if (!hasResults) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">No games found for "{query}"</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any games matching your search.
          </p>
        </div>
        <Button onClick={handleRequestGame} className="w-full">
          Request "{query}" to be added
        </Button>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {exactMatches.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-medium mb-3">Exact matches</h3>
          <div className="space-y-2">
            {exactMatches.slice(0, 3).map(game => (
              <div
                key={game.id}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => {
                  navigate(`/games/${game.id}`);
                  onClose();
                }}
              >
                <img 
                  src={game.coverImage} 
                  alt={game.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{game.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {game.playerCount} players • {game.playTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {similarMatches.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-medium mb-3">Did you mean?</h3>
          <div className="space-y-2">
            {similarMatches.slice(0, 3).map(game => (
              <div
                key={game.id}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => {
                  navigate(`/games/${game.id}`);
                  onClose();
                }}
              >
                <img 
                  src={game.coverImage} 
                  alt={game.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{game.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {game.playerCount} players • {game.playTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {categoryMatches.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-medium mb-3">Similar games</h3>
          <div className="space-y-2">
            {categoryMatches.slice(0, 3).map(game => (
              <div
                key={game.id}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => {
                  navigate(`/games/${game.id}`);
                  onClose();
                }}
              >
                <img 
                  src={game.coverImage} 
                  alt={game.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{game.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {game.categories.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        <Button 
          variant="outline" 
          onClick={handleRequestGame}
          className="w-full"
        >
          Can't find "{query}"? Request it here
        </Button>
      </div>
    </div>
  );
};

export default SearchResults;
