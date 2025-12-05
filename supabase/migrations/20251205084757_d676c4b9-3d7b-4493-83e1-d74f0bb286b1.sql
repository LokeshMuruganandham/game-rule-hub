-- Add explicit deny policies for games table (public cannot write)
CREATE POLICY "Deny public insert on games"
ON public.games
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "Deny public update on games"
ON public.games
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Deny public delete on games"
ON public.games
FOR DELETE
TO public
USING (false);

-- Add explicit deny policies for game_rules table (public cannot write)
CREATE POLICY "Deny public insert on game_rules"
ON public.game_rules
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "Deny public update on game_rules"
ON public.game_rules
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Deny public delete on game_rules"
ON public.game_rules
FOR DELETE
TO public
USING (false);