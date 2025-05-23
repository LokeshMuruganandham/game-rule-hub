
import React from "react";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample data for featured games
const FEATURED_GAMES = [
  {
    id: "catan",
    title: "Catan",
    coverImage: "https://images.unsplash.com/photo-1661177260227-78c1915ee2cb?q=80&w=2072&auto=format&fit=crop",
    playerCount: "3-4",
    playTime: "60-120 min",
    age: "10",
    complexity: 2,
  },
  {
    id: "ticket-to-ride",
    title: "Ticket to Ride",
    coverImage: "https://images.unsplash.com/photo-1628746404106-4d3843b231b3?q=80&w=2070&auto=format&fit=crop",
    playerCount: "2-5",
    playTime: "30-60 min",
    age: "8",
    complexity: 2,
  },
  {
    id: "pandemic",
    title: "Pandemic",
    coverImage: "https://images.unsplash.com/photo-1587652252770-1f2fc12f1e53?q=80&w=2043&auto=format&fit=crop",
    playerCount: "2-4",
    playTime: "45 min",
    age: "8",
    complexity: 3,
  },
  {
    id: "azul",
    title: "Azul",
    coverImage: "https://images.unsplash.com/photo-1522787376475-1c888bfd907f?q=80&w=2030&auto=format&fit=crop",
    playerCount: "2-4",
    playTime: "30-45 min",
    age: "8",
    complexity: 2,
  },
];

const FeaturedGames = () => {
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
