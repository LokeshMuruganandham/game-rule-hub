
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  gameName: z.string().min(2, {
    message: "Game name must be at least 2 characters.",
  }),
  publisher: z.string().optional(),
  designer: z.string().optional(),
  playerCount: z.string().min(1, {
    message: "Please specify player count.",
  }),
  playTime: z.string().min(1, {
    message: "Please specify play time.",
  }),
  ageRecommendation: z.string().optional(),
  complexity: z.string({
    required_error: "Please select a complexity level.",
  }),
  categories: z.array(z.string()).min(1, {
    message: "Please select at least one category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  rulesAvailability: z.string({
    required_error: "Please specify where rules can be found.",
  }),
  priority: z.string({
    required_error: "Please select priority level.",
  }),
  yourName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  additionalNotes: z.string().optional(),
});

const categories = [
  "Strategy",
  "Card Game",
  "Party Game",
  "Cooperative",
  "Worker Placement",
  "Deck Building",
  "Area Control",
  "Roll and Write",
  "Abstract",
  "Thematic",
  "Engine Building",
  "Social Deduction",
];

const GameRequestForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: "",
      publisher: "",
      designer: "",
      playerCount: "",
      playTime: "",
      ageRecommendation: "",
      description: "",
      categories: [],
      yourName: "",
      email: "",
      additionalNotes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Game request submitted:", values);
    toast({
      title: "Request Submitted!",
      description: "Thank you for your game request. We'll review it and get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="bg-card p-6 rounded-lg border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Game Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Game Information</h3>
            
            <FormField
              control={form.control}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publisher</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Stonemaier Games" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Elizabeth Hargrave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="playerCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player Count *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2-4, 1-5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="playTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Play Time *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 60-90 min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ageRecommendation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Recommendation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10+" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="complexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complexity Level *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complexity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 - Light (Easy to learn)</SelectItem>
                      <SelectItem value="2">2 - Medium Light</SelectItem>
                      <SelectItem value="3">3 - Medium</SelectItem>
                      <SelectItem value="4">4 - Medium Heavy</SelectItem>
                      <SelectItem value="5">5 - Heavy (Complex)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Game Categories *</FormLabel>
                  <FormDescription>
                    Select all categories that apply to this game.
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, category])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== category
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {category}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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
              control={form.control}
              name="rulesAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rules Availability *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Where can the official rules be found?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="publisher-website">Publisher's Website</SelectItem>
                      <SelectItem value="boardgamegeek">BoardGameGeek</SelectItem>
                      <SelectItem value="game-box">Game Box Only</SelectItem>
                      <SelectItem value="multiple-sources">Multiple Sources</SelectItem>
                      <SelectItem value="hard-to-find">Hard to Find</SelectItem>
                      <SelectItem value="not-sure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Priority *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent is this request?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low - Would be nice to have</SelectItem>
                      <SelectItem value="medium">Medium - Planning to play soon</SelectItem>
                      <SelectItem value="high">High - Need it urgently</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll contact you when the game is added.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information, special requirements, or clarifications..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Game Request
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GameRequestForm;
