
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-16 md:pt-20 md:pb-24 min-h-screen flex items-center">
      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iIzM3NDE1MSIgZmlsbC1vcGFjaXR5PSIwLjEiPgogICAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=')] opacity-30" />
      </div>

      {/* Floating elements for depth */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2">
          <span className="text-sm text-white/90">🎲 Your Board Game Companion</span>
        </div>
        
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Master Every{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Board Game
          </span>
          {" "}With Ease
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/80">
          Discover rules, strategies, and gameplay guides for thousands of board games. 
          From classics to modern favorites, we've got you covered.
        </p>
        
        <div className="mt-12 flex w-full max-w-lg flex-col items-center gap-y-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/95 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search for any board game..."
                  className="pl-12 pr-4 py-6 text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-4 py-6 text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Find Game Rules
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-white/60 text-sm">Popular:</span>
            {['Catan', 'Azul', 'Wingspan', 'Pandemic'].map((game) => (
              <button
                key={game}
                onClick={() => setSearchQuery(game)}
                className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white/80 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                {game}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
