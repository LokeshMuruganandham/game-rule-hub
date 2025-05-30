
import React from "react";
import CategoryCard from "./CategoryCard";
import { useGames, getCategoriesWithGameCount } from "@/hooks/useGames";

// Icons mapping for categories
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  strategy: (
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
  ),
  family: (
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
  ),
  party: (
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
  ),
  card: (
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
  ),
};

const CategoriesList = () => {
  const { data: games = [], isLoading } = useGames();
  const categories = getCategoriesWithGameCount(games);

  if (isLoading) {
    return (
      <div className="py-8 md:py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Browse By Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-background animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-muted/30">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Browse By Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
              icon={CATEGORY_ICONS[category.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
