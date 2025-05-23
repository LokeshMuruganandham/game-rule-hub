
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-7xl md:text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mb-10">
            Sorry, we couldn't find the game rules you're looking for.
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg" className="px-8">
              Go Back Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
