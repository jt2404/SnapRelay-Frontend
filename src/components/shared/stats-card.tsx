import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TONE_STYLES = {
  gold: "bg-primary/15 text-primary-foreground",
  blush: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
} as const;

export function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "gold",
  loading,
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  tone?: keyof typeof TONE_STYLES;
  loading?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn("border-none shadow-sm", className)}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              TONE_STYLES[tone]
            )}
          >
            <Icon className="size-5" />
          </div>
          {trend && (
            <span className="text-xs font-semibold text-primary-foreground/80">
              {trend}
            </span>
          )}
        </div>
        <div className="min-w-0">
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="font-heading text-3xl font-bold text-foreground">
              {value}
            </p>
          )}
          <p className="mt-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
