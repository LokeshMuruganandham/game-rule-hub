
import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameRequestForm from "@/components/forms/GameRequestForm";

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const prefilledGame = searchParams.get("game") || "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Request a Game
              </h1>
              <p className="text-lg text-muted-foreground">
                {prefilledGame ? 
                  `Request "${prefilledGame}" to be added to our collection.` :
                  "Can't find the rules for your favorite board game? Let us know which game you'd like to see added to our collection."
                }
              </p>
            </div>
            <GameRequestForm initialGameName={prefilledGame} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
