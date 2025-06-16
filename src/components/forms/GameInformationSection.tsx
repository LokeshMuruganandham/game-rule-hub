
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameInformationSectionProps {
  control: Control<any>;
}

const GameInformationSection = ({ control }: GameInformationSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Game Information</h3>
      
      <FormField
        control={control}
        name="gameName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Game Name *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Wingspan, Azul, Gloomhaven" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Game Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Briefly describe what the game is about, its theme, and main mechanics..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Help us understand what makes this game special.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Request Priority</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="How urgent is this request? (Default: Low)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">Low - Would be nice to have</SelectItem>
                <SelectItem value="medium">Medium - Planning to play soon</SelectItem>
                <SelectItem value="high">High - Need it urgently</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              If not selected, priority will default to "Low".
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default GameInformationSection;
