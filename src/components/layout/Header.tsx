import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
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
          <Link to="/about" className="font-medium text-gray-700 hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 w-[250px]">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search games..."
              className="bg-transparent border-none focus:ring-0 focus:outline-none w-full pl-2 text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-800"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;