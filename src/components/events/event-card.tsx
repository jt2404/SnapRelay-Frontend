import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays, Lock, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import type { Event } from "@/lib/api/types";

export function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/dashboard/events/${event.id}`}>
      <Card className="h-full border-none shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              {event.function_type}
            </span>
            <EventStatusBadge status={event.status} />
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {event.name}
            </h3>
            {event.couple_name && (
              <p className="text-sm text-muted-foreground">
                {event.couple_name}
              </p>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-1.5 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              {format(new Date(event.event_date), "d MMM yyyy")}
            </div>
            <div className="flex items-center gap-2">
              {event.privacy_mode === "private" ? (
                <>
                  <Lock className="size-4" />
                  Private event
                </>
              ) : (
                <>
                  <Users className="size-4" />
                  {event.public_submission_enabled
                    ? "Public · self-submit on"
                    : "Public"}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
