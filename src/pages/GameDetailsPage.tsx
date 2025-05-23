
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GAMES } from "@/data/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/games/GameCard";
import { ExternalLink } from "lucide-react";

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find((g) => g.id === id);

  // Generate an Amazon affiliate link
  const getAffiliateLink = (gameTitle: string) => {
    const formattedTitle = encodeURIComponent(gameTitle);
    return `https://www.amazon.com/s?k=${formattedTitle}+board+game&tag=boardgameapp-20`;
  };

  // Recommend similar games (games in the same categories)
  const similarGames = game
    ? GAMES.filter(
        (g) =>
          g.id !== game.id &&
          g.categories.some((cat) => game.categories.includes(cat))
      ).slice(0, 3)
    : [];

  if (!game) {
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
          <div className="container absolute inset-0 z-20 flex flex-col justify-end pb-8">
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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
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
        <div className="container py-8">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Game details */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 shadow-sm">
                <h2 className="font-semibold text-xl mb-4">Game Details</h2>
                
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
                    <p className="text-base">{game.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Game rules */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="summary">
                <TabsList className="w-full border-b">
                  <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
                  <TabsTrigger value="setup" className="flex-1">Setup</TabsTrigger>
                  <TabsTrigger value="how-to-play" className="flex-1">How to Play</TabsTrigger>
                  <TabsTrigger value="full-rules" className="flex-1">Full Rules</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="p-4">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Game Summary</h2>
                    <p className="text-lg mb-4">{game.rules.summary}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="setup" className="p-4">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Game Setup</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {game.rules.setup.map((step, index) => (
                        <li key={index} className="text-base">{step}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="how-to-play" className="p-4">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {game.rules.howToPlay.map((step, index) => (
                        <li key={index} className="text-base">{step}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="full-rules" className="p-4">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Full Rules</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {game.rules.fullRules.map((rule, index) => (
                        <li key={index} className="text-base">{rule}</li>
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
              <h2 className="text-2xl font-bold mb-6">Similar Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {similarGames.map((game) => (
                  <GameCard key={game.id} {...game} />
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
