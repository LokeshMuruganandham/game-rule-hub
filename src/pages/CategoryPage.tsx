
import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GAMES, getCategoriesWithGameCount } from "@/data/games";
import GameCard from "@/components/games/GameCard";
import { ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categories = getCategoriesWithGameCount();
  const category = categories.find((cat) => cat.id === id);
  
  // Filter games by category
  const gamesInCategory = GAMES.filter((game) => 
    game.categories.includes(id || '')
  );
  
  // Get category icon
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "strategy":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M9 18h6" />
            <path d="m9 9 3 3 3-3" />
            <path d="M12 12v6" />
            <circle cx="12" cy="6" r="3" />
          </svg>
        );
      case "family":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect width="7" height="7" x="7" y="7" rx="1" />
          </svg>
        );
      case "party":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
            <path d="m17 3-5 4-5-4" />
            <path d="M8 12h7" />
            <path d="M8 16h4" />
          </svg>
        );
      case "card":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-24">
          <div className="container py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
              <p className="mb-6">Sorry, we couldn't find the category you're looking for.</p>
              <Link to="/">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 bg-muted/30">
        <div className="py-8">
          <div className="container">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/categories" className="hover:underline">Categories</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-foreground font-medium">{category.name}</span>
            </div>
            
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {getCategoryIcon(category.id)}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{category.name}</h1>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {gamesInCategory.length} {gamesInCategory.length === 1 ? "game" : "games"}
              </p>
            </div>
            
            {/* Games in this category */}
            {gamesInCategory.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gamesInCategory.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No games found</h3>
                <p className="text-muted-foreground">
                  There are no games in this category yet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
