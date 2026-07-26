import { format } from "date-fns";
import { CalendarDays, Lock, MapPin, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Event } from "@/lib/api/types";

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function EventSummary({ event }: { event: Event }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Row
          icon={CalendarDays}
          label="Event Date"
          value={format(new Date(event.event_date), "EEEE, d MMMM yyyy")}
        />
        <Row
          icon={MapPin}
          label="Venue"
          value={event.venue || "Not specified"}
        />
        <Row
          icon={Users}
          label="Couple"
          value={event.couple_name || "Not specified"}
        />
        <Row
          icon={Lock}
          label="Privacy"
          value={
            event.privacy_mode === "private"
              ? "Private"
              : event.public_submission_enabled
                ? "Public · self-submission enabled"
                : "Public"
          }
        />
      </CardContent>
    </Card>
  );
}
