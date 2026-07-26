"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Info, Loader2, Lock, Users } from "lucide-react";

import { cn } from "@/lib/utils";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  eventFormSchema,
  FUNCTION_TYPES,
  type EventFormValues,
} from "@/lib/validation/event";

export function EventForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Create Event",
}: {
  defaultValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      coupleName: "",
      functionType: "",
      venue: "",
      eventDate: "",
      privacyMode: "public",
      publicSubmissionEnabled: false,
      ...defaultValues,
    },
  });

  const privacyMode = useWatch({ control: form.control, name: "privacyMode" });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Ananya & Rohan's Wedding" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="coupleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Couple Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Ananya & Rohan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="functionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Function Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a function" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FUNCTION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. The Taj Palace, Jaipur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="privacyMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Privacy Level
              </FormLabel>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(
                  [
                    {
                      value: "private" as const,
                      icon: Lock,
                      title: "Private",
                      description:
                        "Invite-only. Best for intimate family functions.",
                    },
                    {
                      value: "public" as const,
                      icon: Users,
                      title: "Public",
                      description:
                        "Accessible via link. Perfect for guests to explore.",
                    },
                  ]
                ).map((option) => {
                  const isSelected = field.value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        field.onChange(option.value);
                        if (option.value === "private") {
                          form.setValue("publicSubmissionEnabled", false);
                        }
                      }}
                      className={cn(
                        "flex flex-col items-start gap-1.5 rounded-lg border p-4 text-left transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-accent"
                      )}
                    >
                      <span className="flex items-center gap-2 font-semibold text-foreground">
                        <option.icon className="size-4" />
                        {option.title}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>
              {privacyMode === "private" && (
                <div className="flex items-start gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground">
                  <Info className="mt-0.5 size-4 shrink-0" />
                  Guests can only join private events via a secure invite link
                  you generate.
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicSubmissionEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
              <div>
                <FormLabel>Allow guest self-submission</FormLabel>
                <FormDescription>
                  Let guests upload their own selfies to find matching photos.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={privacyMode === "private"}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full rounded-lg text-base font-semibold sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
