import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function StatsCard({
  label,
  value,
  icon: Icon,
  loading,
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn("border-none shadow-sm", className)}>
      <CardContent className="flex items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Icon className="size-5 text-secondary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          {loading ? (
            <Skeleton className="mt-1.5 h-7 w-16" />
          ) : (
            <p className="font-heading text-2xl font-semibold text-foreground">
              {value}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
