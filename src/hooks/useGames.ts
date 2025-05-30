
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Game } from '@/types/game';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async (): Promise<Game[]> => {
      const { data: gamesData, error: gamesError } = await supabase
        .from('games')
        .select('*');

      if (gamesError) throw gamesError;

      const { data: rulesData, error: rulesError } = await supabase
        .from('game_rules')
        .select('*');

      if (rulesError) throw rulesError;

      // Combine games with their rules and map database columns to interface properties
      const games: Game[] = gamesData.map(game => {
        const rules = rulesData.find(rule => rule.game_id === game.id);
        return {
          id: game.id,
          title: game.title,
          coverImage: game.cover_image, // Map snake_case to camelCase
          playerCount: game.player_count,
          playTime: game.play_time,
          age: game.age,
          complexity: game.complexity,
          categories: game.categories,
          description: game.description,
          rules: rules ? {
            id: rules.id,
            title: rules.title,
            type: rules.type,
            summary: rules.summary,
            fullRules: rules.full_rules, // Map snake_case to camelCase
            setup: rules.setup,
            howToPlay: rules.how_to_play // Map snake_case to camelCase
          } : {
            id: `${game.id}-rules`,
            title: `${game.title} Rules`,
            type: 'General',
            summary: 'Rules not available',
            fullRules: [],
            setup: [],
            howToPlay: []
          }
        };
      });

      return games;
    }
  });
};

export const useGame = (id: string) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: async (): Promise<Game | null> => {
      const { data: gameData, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (gameError) throw gameError;
      if (!gameData) return null;

      const { data: rulesData, error: rulesError } = await supabase
        .from('game_rules')
        .select('*')
        .eq('game_id', id)
        .maybeSingle();

      if (rulesError) throw rulesError;

      return {
        id: gameData.id,
        title: gameData.title,
        coverImage: gameData.cover_image,
        playerCount: gameData.player_count,
        playTime: gameData.play_time,
        age: gameData.age,
        complexity: gameData.complexity,
        categories: gameData.categories,
        description: gameData.description,
        rules: rulesData ? {
          id: rulesData.id,
          title: rulesData.title,
          type: rulesData.type,
          summary: rulesData.summary,
          fullRules: rulesData.full_rules,
          setup: rulesData.setup,
          howToPlay: rulesData.how_to_play
        } : {
          id: `${gameData.id}-rules`,
          title: `${gameData.title} Rules`,
          type: 'General',
          summary: 'Rules not available',
          fullRules: [],
          setup: [],
          howToPlay: []
        }
      };
    }
  });
};

export const getFeaturedGames = (games: Game[]): Game[] => {
  return games.filter(game => 
    ["catan", "ticket-to-ride", "pandemic", "azul"].includes(game.id)
  );
};

export const getRecentGames = (games: Game[]): Game[] => {
  return games.filter(game => 
    ["gloomhaven", "wingspan", "codenames"].includes(game.id)
  );
};

export const getCategoriesWithGameCount = (games: Game[]): { id: string, name: string, description: string, gameCount: number }[] => {
  const categories = [
    {
      id: "strategy",
      name: "Strategy",
      description: "Games that require careful thought and planning",
    },
    {
      id: "family",
      name: "Family",
      description: "Fun for all ages, perfect for family game nights",
    },
    {
      id: "party",
      name: "Party Games",
      description: "Exciting games for larger groups and social gatherings",
    },
    {
      id: "card",
      name: "Card Games",
      description: "Games played primarily with cards",
    },
  ];
  
  return categories.map(category => {
    const gameCount = games.filter(game => game.categories.includes(category.id)).length;
    return {
      ...category,
      gameCount
    };
  });
};
