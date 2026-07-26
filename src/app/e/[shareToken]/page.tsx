"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  CalendarHeart,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { AuthInput } from "@/components/auth/auth-input";
import { SelfieCapture } from "@/components/guest/selfie-capture";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApiError } from "@/lib/api/client";
import { getEventByShareToken, submitPublicGuest } from "@/lib/api/public-guest";
import {
  guestDetailsSchema,
  type GuestDetailsValues,
} from "@/lib/validation/guest";

type Step = "details" | "selfie" | "done";

export default function GuestEntryPage() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const [step, setStep] = React.useState<Step>("details");
  const [selfie, setSelfie] = React.useState<File | null>(null);
  const [details, setDetails] = React.useState<GuestDetailsValues | null>(null);

  const eventQuery = useQuery({
    queryKey: ["public-event", shareToken],
    queryFn: () => getEventByShareToken(shareToken),
  });

  const form = useForm<GuestDetailsValues>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: { name: "", email: "", whatsapp: "", consent: undefined },
  });

  const submitMutation = useMutation({
    mutationFn: submitPublicGuest,
    onSuccess: () => setStep("done"),
    onError: (error) => {
      const message =
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  function onDetailsSubmit(values: GuestDetailsValues) {
    setDetails(values);
    setStep("selfie");
  }

  function onFinalSubmit() {
    if (!details || !selfie || !eventQuery.data) return;
    submitMutation.mutate({
      eventId: eventQuery.data.id,
      name: details.name,
      email: details.email,
      whatsapp: details.whatsapp,
      consent: details.consent,
      selfie,
    });
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-5 py-6">
      <div className="mb-6 flex items-center gap-3">
        {step === "selfie" && (
          <button
            type="button"
            onClick={() => setStep("details")}
            aria-label="Back"
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        <span className="font-heading text-xl font-bold text-gold">
          SnapRelay
        </span>
      </div>

      {eventQuery.isLoading ? (
        <div className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ) : eventQuery.isError || !eventQuery.data ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="font-heading text-xl font-semibold text-foreground">
            Gallery not found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            This link may be invalid, private, or no longer active.
          </p>
        </div>
      ) : step === "done" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/15">
            <CheckCircle2 className="size-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            You&apos;re all set, {details?.name.split(" ")[0]}!
          </h1>
          <p className="max-w-xs text-sm text-muted-foreground">
            Our AI is matching your selfie against {eventQuery.data.name}
            &apos;s photos. We&apos;ll send your private gallery link to{" "}
            <span className="font-medium text-foreground">
              {details?.whatsapp}
            </span>{" "}
            and {details?.email} once it&apos;s ready.
          </p>
        </div>
      ) : (
        <>
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-secondary via-muted to-primary/20">
            <CalendarHeart className="size-10 text-foreground/20" />
            <span className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-bold tracking-widest text-muted-foreground uppercase backdrop-blur-sm">
              Guest Access
            </span>
          </div>

          {step === "details" ? (
            <>
              <h1 className="font-heading mt-6 text-2xl font-bold text-foreground">
                Welcome to {eventQuery.data.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {eventQuery.data.function_type} &middot;{" "}
                {format(new Date(eventQuery.data.event_date), "d MMMM yyyy")}
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onDetailsSubmit)}
                  className="mt-8 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <AuthInput autoComplete="name" {...field} />
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
                        <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <AuthInput
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                          WhatsApp Number
                        </FormLabel>
                        <FormControl>
                          <AuthInput
                            type="tel"
                            placeholder="+91 98765 43210"
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value === true}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              className="mt-0.5"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-muted-foreground">
                            I agree to the privacy policy and consent to AI
                            processing of my selfie to find my photos in the
                            gallery.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-full text-base font-semibold"
                  >
                    Continue to Selfie
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <>
              <h1 className="font-heading mt-6 text-2xl font-bold text-foreground">
                Find Your Moments
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Take a quick selfie and our AI will find every photo of you
                from the gallery.
              </p>

              <div className="mt-6">
                <SelfieCapture file={selfie} onChange={setSelfie} />
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                Our private AI securely matches your face against the gallery.
                Your selfie is never shared publicly.
              </div>

              <Button
                type="button"
                className="mt-6 h-12 w-full rounded-full text-base font-semibold"
                disabled={!selfie || submitMutation.isPending}
                onClick={onFinalSubmit}
              >
                {submitMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles />
                )}
                Find My Photos
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}
