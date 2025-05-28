
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface GameCardProps {
  id: string;
  title: string;
  coverImage: string;
  playerCount: string;
  playTime: string;
  age: string;
  complexity: number;
}

const GameCard = ({
  id,
  title,
  coverImage,
  playerCount,
  playTime,
  age,
  complexity,
}: GameCardProps) => {
  // Generate an Amazon affiliate link
  const getAffiliateLink = (gameTitle: string) => {
    const formattedTitle = encodeURIComponent(gameTitle);
    return `https://www.amazon.com/s?k=${formattedTitle}+board+game&tag=boardgameapp-20`;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <Link to={`/games/${id}`} className="flex-1 flex flex-col">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold line-clamp-2 mb-3">{title}</h3>
          <div className="grid grid-cols-3 gap-2 mt-auto text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 flex-shrink-0"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="truncate">{playerCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="truncate">{playTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 flex-shrink-0"
              >
                <path d="M9 20H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2" />
                <path d="M9 18h6" />
              </svg>
              <span className="truncate">{age}+</span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 flex-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${
                  i < complexity
                    ? "text-amber-500 fill-current"
                    : "text-muted-foreground"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill={i < complexity ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">Complexity</span>
        </div>
        <a
          href={getAffiliateLink(title)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0"
        >
          <Button size="sm" variant="outline" className="text-xs h-8 px-2">
            <ExternalLink className="h-3 w-3 mr-1" />
            Buy
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
