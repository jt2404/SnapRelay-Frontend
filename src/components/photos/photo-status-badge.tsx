import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  indexing: "bg-secondary text-secondary-foreground",
  indexed: "bg-primary/20 text-primary-foreground",
  failed: "bg-destructive/15 text-destructive",
  quota_exceeded: "bg-destructive/15 text-destructive",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  indexing: "Indexing",
  indexed: "Indexed",
  failed: "Failed",
  quota_exceeded: "Quota Exceeded",
};

export function PhotoStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-none capitalize",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
}
