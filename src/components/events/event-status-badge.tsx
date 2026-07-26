import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EventStatus } from "@/lib/api/types";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-secondary text-secondary-foreground",
  completed: "bg-primary/20 text-primary-foreground",
  archived: "bg-accent text-accent-foreground",
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-none capitalize", STATUS_STYLES[status] ?? "bg-muted text-muted-foreground")}
    >
      {status}
    </Badge>
  );
}
