
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useGames } from "@/hooks/useGames";
import { smartSearchGames } from "@/lib/smartSearch";
import SearchResults from "@/components/search/SearchResults";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: games = [] } = useGames();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to games page with search query
      window.location.href = `/games?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  // Get search results
  const searchResults = searchQuery.length > 0 ? smartSearchGames(games, searchQuery) : {
    exactMatches: [],
    similarMatches: [],
    categoryMatches: []
  };

  const showResults = searchQuery.length > 0;

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md shadow-md rounded-xl px-6 py-2 w-[98%] max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-foreground"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 9h.01" />
                  <path d="M15 15h.01" />
                  <path d="M15 9h.01" />
                  <path d="M9 15h.01" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-800">GameRuleHub</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/games" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Games
            </Link>
            <Link to="/categories" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Categories
            </Link>
          </nav>

          {/* Search Icon and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Expandable Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              aria-label="Search games"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DrawerTrigger asChild>
                  <button className="p-2" aria-label="Open mobile menu">
                    <Menu className="h-5 w-5 text-gray-800" />
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Navigation</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-4">
                    <Link 
                      to="/" 
                      className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={handleMobileNavClick}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/games" 
                      className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={handleMobileNavClick}
                    >
                      Games
                    </Link>
                    <Link 
                      to="/categories" 
                      className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={handleMobileNavClick}
                    >
                      Categories
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="flex items-center gap-3 w-full py-3 px-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Search className="h-5 w-5" />
                      Search Games
                    </button>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 max-h-[80vh]">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-lg font-semibold">Search Games</DialogTitle>
          </DialogHeader>
          
          <div className="p-6 border-b">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for board games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 focus:border-primary rounded-lg"
                  autoFocus
                />
              </div>
            </form>
            
            {/* Quick suggestions when no search */}
            {!showResults && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Catan', 'Azul', 'Wingspan', 'Pandemic', 'Scythe'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSearchQuery(suggestion);
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {showResults && (
            <SearchResults
              query={searchQuery}
              exactMatches={searchResults.exactMatches}
              similarMatches={searchResults.similarMatches}
              categoryMatches={searchResults.categoryMatches}
              onClose={() => setIsSearchOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
