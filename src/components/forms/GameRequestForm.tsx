
import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useCreateGameRequest } from "@/hooks/useGameRequests";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  gameName: z.string().min(2, {
    message: "Game name is required and must be at least 2 characters long. Please enter the full name of the board game.",
  }),
  description: z.string().min(10, {
    message: "Description is required and must be at least 10 characters long. Please provide more details about the game, its theme, and main mechanics.",
  }),
  priority: z.string({
    required_error: "Please select a priority level for your request. This helps us understand how urgently you need this game added.",
  }),
  yourName: z.string().min(2, {
    message: "Your name is required and must be at least 2 characters long. Please enter your full name so we can contact you.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address (e.g., john@example.com). We'll use this to notify you when the game is added.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface GameRequestFormProps {
  initialGameName?: string;
}

const GameRequestForm = ({ initialGameName = "" }: GameRequestFormProps) => {
  const createGameRequest = useCreateGameRequest();
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: initialGameName,
      description: "",
      priority: "",
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
    console.log("Game request form submitted:", values);
    
    // Ensure all required fields are present
    const requestData = {
      gameName: values.gameName,
      description: values.description,
      priority: values.priority,
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

  const handleInvalidSubmit = () => {
    const errors = form.formState.errors;
    const errorMessages: string[] = [];
    
    if (errors.gameName) errorMessages.push(errors.gameName.message || "Game name is required");
    if (errors.description) errorMessages.push(errors.description.message || "Description is required");
    if (errors.priority) errorMessages.push(errors.priority.message || "Priority is required");
    if (errors.yourName) errorMessages.push(errors.yourName.message || "Your name is required");
    if (errors.email) errorMessages.push(errors.email.message || "Valid email is required");
    
    if (errorMessages.length > 0) {
      setFormErrors(errorMessages);
      setShowErrorDialog(true);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
      {initialGameName && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Requesting:</strong> {initialGameName}
          </p>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, handleInvalidSubmit)} className="space-y-6">
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Priority *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={createGameRequest.isPending}
          >
            {createGameRequest.isPending ? "Submitting..." : "Submit Game Request"}
          </Button>
        </form>
      </Form>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Please Fix These Issues
            </DialogTitle>
            <DialogDescription className="text-left">
              Please correct the following errors before submitting:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {formErrors.map((error, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowErrorDialog(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameRequestForm;
