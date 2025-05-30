
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface GameRequestData {
  gameName: string;
  description: string;
  priority: string;
  yourName: string;
  email: string;
}

export const useCreateGameRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GameRequestData) => {
      const { error } = await supabase
        .from('game_requests')
        .insert({
          game_name: data.gameName,
          description: data.description,
          priority: data.priority,
          your_name: data.yourName,
          email: data.email
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game-requests'] });
    }
  });
};
