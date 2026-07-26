"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { EventForm } from "@/components/events/event-form";
import { Card, CardContent } from "@/components/ui/card";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/hooks/use-auth";
import { useCreateEventMutation } from "@/lib/hooks/use-events";
import type { EventFormValues } from "@/lib/validation/event";

export default function NewEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const mutation = useCreateEventMutation();

  function onSubmit(values: EventFormValues) {
    if (!user) return;

    mutation.mutate(
      {
        studio_id: user.studio_id,
        name: values.name,
        couple_name: values.coupleName || null,
        function_type: values.functionType,
        venue: values.venue || null,
        event_date: new Date(values.eventDate).toISOString(),
        privacy_mode: values.privacyMode,
        public_submission_enabled: values.publicSubmissionEnabled,
      },
      {
        onSuccess: (event) => {
          toast.success("Event created");
          router.push(`/dashboard/events/${event.id}?tab=photos`);
        },
        onError: (error) => {
          const message =
            error instanceof ApiError
              ? error.message
              : "Something went wrong. Please try again.";
          toast.error(message);
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Create Event"
        description="Set up a new event to start uploading photos and sharing galleries."
      />
      <Card className="border-none shadow-sm">
        <CardContent>
          <EventForm
            onSubmit={onSubmit}
            isSubmitting={mutation.isPending}
            submitLabel="Save & Continue to Upload"
          />
        </CardContent>
      </Card>
    </div>
  );
}
