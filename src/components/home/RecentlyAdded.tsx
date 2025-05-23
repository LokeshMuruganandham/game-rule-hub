
import React from "react";
import GameCard from "../games/GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getRecentGames } from "@/data/games";

const RecentlyAdded = () => {
  const RECENT_GAMES = getRecentGames();
  
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
          {RECENT_GAMES.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
