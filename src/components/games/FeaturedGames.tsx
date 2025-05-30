
import React from "react";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGames, getFeaturedGames } from "@/hooks/useGames";

const FeaturedGames = () => {
  const { data: games = [], isLoading, error } = useGames();
  const featuredGames = getFeaturedGames(games);

  if (isLoading) {
    return (
      <div className="py-8 md:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Games</h2>
            <Link to="/games">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
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
            <p className="text-muted-foreground">Failed to load featured games.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Games</h2>
          <Link to="/games">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredGames.map((game) => (
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

export default FeaturedGames;
