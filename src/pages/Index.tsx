
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedGames from "@/components/games/FeaturedGames";
import CategoriesList from "@/components/categories/CategoriesList";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedGames />
        <CategoriesList />
        <RecentlyAdded />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
