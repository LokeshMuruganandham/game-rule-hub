
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useCreateGameRequest } from "@/hooks/useGameRequests";
import RequestBanner from "./RequestBanner";
import GameInformationSection from "./GameInformationSection";
import ContactInformationSection from "./ContactInformationSection";

const formSchema = z.object({
  gameName: z.string().min(2, {
    message: "Game name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  priority: z.string().optional(),
  yourName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface GameRequestFormProps {
  initialGameName?: string;
}

const GameRequestForm = ({ initialGameName = "" }: GameRequestFormProps) => {
  const createGameRequest = useCreateGameRequest();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: initialGameName,
      description: "",
      priority: "low",
      yourName: "",
      email: "",
    },
  });

  // Update form when initialGameName changes
  useEffect(() => {
    if (initialGameName) {
      form.setValue("gameName", initialGameName);
      // Set higher priority if coming from search
      form.setValue("priority", "medium");
    }
  }, [initialGameName, form]);

  function onSubmit(values: FormData) {
    console.log("Game request form submission started");
    
    // Ensure all required fields are present and set default priority if not provided
    const requestData = {
      gameName: values.gameName,
      description: values.description,
      priority: values.priority || "low",
      yourName: values.yourName,
      email: values.email
    };
    
    createGameRequest.mutate(requestData, {
      onSuccess: () => {
        toast({
          title: "Request Submitted!",
          description: "Thank you for your game request. We'll review it and get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        console.error("Error submitting game request:", error);
        toast({
          title: "Error",
          description: "Failed to submit your request. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="bg-card p-6 rounded-lg border">
      {initialGameName && <RequestBanner gameName={initialGameName} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <GameInformationSection control={form.control} />
          <ContactInformationSection control={form.control} />

          <Button 
            type="submit" 
            className="w-full"
            disabled={createGameRequest.isPending}
          >
            {createGameRequest.isPending ? "Submitting..." : "Submit Game Request"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GameRequestForm;
