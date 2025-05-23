
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't Find Your Game?
          </h2>
          <p className="max-w-lg mb-8">
            We're constantly adding new board game rules to our collection. Let us know which game you'd like to see next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Request a Game
              </Button>
            </Link>
            <Link to="/games">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Browse All Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
