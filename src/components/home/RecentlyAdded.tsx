
import React from "react";
import GameCard from "../games/GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGames, getRecentGames } from "@/hooks/useGames";

const RecentlyAdded = () => {
  const { data: games = [], isLoading, error } = useGames();
  const recentGames = getRecentGames(games);

  if (isLoading) {
    return (
      <div className="py-8 md:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Recently Added</h2>
            <Link to="/games">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 md:py-12">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">Failed to load recent games.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Recently Added</h2>
          <Link to="/games">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentGames.map((game) => (
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
      </div>
    </div>
  );
};

export default RecentlyAdded;
