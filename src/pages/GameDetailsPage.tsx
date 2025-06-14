
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/games/GameCard";
import { ExternalLink } from "lucide-react";
import { useGame, useGames, getFeaturedGames } from "@/hooks/useGames";

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isLoading: gameLoading, error: gameError } = useGame(id!);
  const { data: allGames = [], isLoading: allGamesLoading } = useGames();

  // Generate an Amazon affiliate link
  const getAffiliateLink = (gameTitle: string) => {
    const formattedTitle = encodeURIComponent(gameTitle);
    return `https://www.amazon.com/s?k=${formattedTitle}+board+game&tag=boardgameapp-20`;
  };

  // Recommend similar games (games in the same categories)
  const similarGames = game && !allGamesLoading
    ? allGames.filter(
        (g) =>
          g.id !== game.id &&
          g.categories.some((cat) => game.categories.includes(cat))
      ).slice(0, 3)
    : [];

  if (gameLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (gameError || !game) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the game you're looking for.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section with game cover */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="container absolute inset-0 z-20 flex flex-col justify-end pb-8 px-4 md:px-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {game.categories.map((category) => (
                <Link
                  key={category}
                  to={`/categories/${category}`}
                  className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                {game.title}
              </h1>
              <a
                href={getAffiliateLink(game.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button className="bg-amber-500 hover:bg-amber-600">
                  Buy on Amazon <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Game info and rules */}
        <div className="container py-8 px-4 md:px-6">
          <div className="md:hidden mb-6">
            <a
              href={getAffiliateLink(game.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="bg-amber-500 hover:bg-amber-600 w-full">
                Buy on Amazon <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left column - Game details */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-4 md:p-6 shadow-sm">
                <h2 className="font-semibold text-lg md:text-xl mb-4">Game Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Players
                    </h3>
                    <p className="text-base">{game.playerCount}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Play Time
                    </h3>
                    <p className="text-base">{game.playTime}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Age
                    </h3>
                    <p className="text-base">{game.age}+</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Complexity
                    </h3>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < game.complexity
                              ? "text-amber-500 fill-current"
                              : "text-muted-foreground"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={i < game.complexity ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Game Type
                    </h3>
                    <p className="text-base">{game.rules.type}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Description
                    </h3>
                    <p className="text-sm md:text-base">{game.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Game rules */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full h-auto p-1 bg-muted rounded-lg grid grid-cols-2 md:grid-cols-4 gap-1">
                  <TabsTrigger 
                    value="summary" 
                    className="text-xs md:text-sm py-2 px-2 data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md transition-all"
                  >
                    Summary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="setup" 
                    className="text-xs md:text-sm py-2 px-2 data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md transition-all"
                  >
                    Setup
                  </TabsTrigger>
                  <TabsTrigger 
                    value="how-to-play" 
                    className="text-xs md:text-sm py-2 px-2 data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md transition-all"
                  >
                    How to Play
                  </TabsTrigger>
                  <TabsTrigger 
                    value="full-rules" 
                    className="text-xs md:text-sm py-2 px-2 data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md transition-all"
                  >
                    Full Rules
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="mt-4 p-4 bg-background rounded-lg border">
                  <div className="prose max-w-none">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Game Summary</h2>
                    <p className="text-base md:text-lg mb-4">{game.rules.summary}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="setup" className="mt-4 p-4 bg-background rounded-lg border">
                  <div className="prose max-w-none">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Game Setup</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {game.rules.setup.map((step, index) => (
                        <li key={index} className="text-sm md:text-base">{step}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="how-to-play" className="mt-4 p-4 bg-background rounded-lg border">
                  <div className="prose max-w-none">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">How to Play</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {game.rules.howToPlay.map((step, index) => (
                        <li key={index} className="text-sm md:text-base">{step}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="full-rules" className="mt-4 p-4 bg-background rounded-lg border">
                  <div className="prose max-w-none">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Full Rules</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {game.rules.fullRules.map((rule, index) => (
                        <li key={index} className="text-sm md:text-base">{rule}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Similar games section */}
          {similarGames.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Similar Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {similarGames.map((game) => (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetailsPage;
