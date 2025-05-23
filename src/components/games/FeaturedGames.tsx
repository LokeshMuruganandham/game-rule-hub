
import React from "react";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getFeaturedGames } from "@/data/games";

const FeaturedGames = () => {
  const FEATURED_GAMES = getFeaturedGames();

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
          {FEATURED_GAMES.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedGames;
