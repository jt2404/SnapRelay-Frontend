import { ImageIcon } from "lucide-react";
import type { MatchResult } from "@/lib/api/galleries";

function confidenceLabel(confidence: number) {
  if (confidence >= 95) return "Best Match";
  if (confidence >= 80) return "High Confidence";
  return "Possible Match";
}

export function MatchPhotoCard({ match }: { match: MatchResult }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted via-secondary/40 to-primary/10">
      <div className="flex h-full items-center justify-center">
        <ImageIcon className="size-8 text-foreground/15" />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/85 to-transparent px-2 pt-6 pb-1.5">
        <span className="text-xs font-semibold text-foreground">
          {confidenceLabel(match.confidence)}
        </span>
      </div>
    </div>
  );
}
