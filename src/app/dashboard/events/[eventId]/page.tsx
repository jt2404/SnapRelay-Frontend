"use client";

import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { EventSummary } from "@/components/events/event-summary";
import { EventForm } from "@/components/events/event-form";
import { QRCodeCard } from "@/components/events/qr-code-card";
import { PhotoManagerSection } from "@/components/photos/photo-manager-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getEvent } from "@/lib/api/events";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/hooks/use-auth";
import { useUpdateEventMutation } from "@/lib/hooks/use-events";
import type { EventFormValues } from "@/lib/validation/event";

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [editOpen, setEditOpen] = React.useState(false);
  const [tab, setTab] = React.useState(searchParams.get("tab") ?? "overview");

  const eventQuery = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId),
  });

  const updateMutation = useUpdateEventMutation(user?.studio_id);

  function onEditSubmit(values: EventFormValues) {
    updateMutation.mutate(
      {
        eventId,
        payload: {
          name: values.name,
          couple_name: values.coupleName || null,
          function_type: values.functionType,
          venue: values.venue || null,
          event_date: new Date(values.eventDate).toISOString(),
          privacy_mode: values.privacyMode,
          public_submission_enabled: values.publicSubmissionEnabled,
        },
      },
      {
        onSuccess: () => {
          toast.success("Event updated");
          setEditOpen(false);
          eventQuery.refetch();
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

  if (eventQuery.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-56 lg:col-span-2" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (eventQuery.isError || !eventQuery.data) {
    return (
      <p className="text-sm text-muted-foreground">
        This event could not be found.
      </p>
    );
  }

  const event = eventQuery.data;

  return (
    <div>
      <PageHeader
        title={event.name}
        description={event.function_type}
        action={
          <div className="flex items-center gap-3">
            <EventStatusBadge status={event.status} />
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil />
              Edit
            </Button>
          </div>
        }
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6 w-full sm:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <EventSummary event={event} />
        </TabsContent>

        <TabsContent value="photos">
          <PhotoManagerSection eventId={event.id} />
        </TabsContent>

        <TabsContent value="share">
          <div className="max-w-md">
            <QRCodeCard eventId={event.id} />
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <EventForm
            submitLabel="Save Changes"
            isSubmitting={updateMutation.isPending}
            defaultValues={{
              name: event.name,
              coupleName: event.couple_name ?? "",
              functionType: event.function_type,
              venue: event.venue ?? "",
              eventDate: event.event_date.slice(0, 10),
              privacyMode: event.privacy_mode,
              publicSubmissionEnabled: event.public_submission_enabled,
            }}
            onSubmit={onEditSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
