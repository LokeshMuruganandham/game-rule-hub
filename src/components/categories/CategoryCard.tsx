
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gameCount: number;
}

const CategoryCard = ({
  id,
  name,
  description,
  icon,
  gameCount,
}: CategoryCardProps) => {
  return (
    <Link to={`/categories/${id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="mt-auto text-xs text-muted-foreground">
            {gameCount} {gameCount === 1 ? "game" : "games"}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
