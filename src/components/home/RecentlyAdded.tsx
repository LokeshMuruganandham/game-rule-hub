
import React from "react";
import GameCard from "../games/GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample data for recently added games
const RECENT_GAMES = [
  {
    id: "gloomhaven",
    title: "Gloomhaven",
    coverImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
    playerCount: "1-4",
    playTime: "60-120 min",
    age: "14",
    complexity: 4,
  },
  {
    id: "codenames",
    title: "Codenames",
    coverImage: "https://images.unsplash.com/photo-1606503153804-75ea8a22e75f?q=80&w=2070&auto=format&fit=crop",
    playerCount: "2-8+",
    playTime: "15 min",
    age: "10",
    complexity: 1,
  },
  {
    id: "wingspan",
    title: "Wingspan",
    coverImage: "https://images.unsplash.com/photo-1667734113487-fa438add9462?q=80&w=1992&auto=format&fit=crop",
    playerCount: "1-5",
    playTime: "40-70 min",
    age: "10",
    complexity: 2,
  },
];

const RecentlyAdded = () => {
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
