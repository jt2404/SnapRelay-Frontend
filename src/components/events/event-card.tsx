import Link from "next/link";
import { format } from "date-fns";
import { Camera, ImagesIcon, Lock, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import type { Event } from "@/lib/api/types";

export function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/dashboard/events/${event.id}`}>
      <Card className="h-full gap-0 overflow-hidden border-none py-0 shadow-sm transition-shadow hover:shadow-md">
        <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-secondary via-muted to-primary/20">
          <Camera className="size-8 text-foreground/20" />
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-background/80 px-2.5 py-1 text-xs font-bold tracking-widest text-muted-foreground uppercase backdrop-blur-sm">
              {event.function_type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <EventStatusBadge status={event.status} />
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 pt-4">
          <div>
            <h3 className="font-heading truncate text-lg font-semibold text-foreground">
              {event.name}
            </h3>
            {event.couple_name && (
              <p className="truncate text-sm text-muted-foreground">
                {event.couple_name}
              </p>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ImagesIcon className="size-3.5" />
              {format(new Date(event.event_date), "d MMM yyyy")}
            </div>
            <div className="flex items-center gap-1.5">
              {event.privacy_mode === "private" ? (
                <>
                  <Lock className="size-3.5" />
                  Private
                </>
              ) : (
                <>
                  <Users className="size-3.5" />
                  {event.public_submission_enabled ? "Self-submit on" : "Public"}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
