
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
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
                className="h-4 w-4 text-primary-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 9h.01" />
                <path d="M15 15h.01" />
                <path d="M15 9h.01" />
                <path d="M9 15h.01" />
              </svg>
            </div>
            <span className="font-bold">GameRuleHub</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your one-stop resource for board game rules
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/games" className="hover:text-foreground transition-colors">All Games</Link>
              <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Categories</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/categories/strategy" className="hover:text-foreground transition-colors">Strategy</Link>
              <Link to="/categories/family" className="hover:text-foreground transition-colors">Family</Link>
              <Link to="/categories/party" className="hover:text-foreground transition-colors">Party Games</Link>
              <Link to="/categories/card" className="hover:text-foreground transition-colors">Card Games</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GameRuleHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
