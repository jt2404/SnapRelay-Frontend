import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pagination({
  skip,
  limit,
  total,
  onSkipChange,
}: {
  skip: number;
  limit: number;
  total: number;
  onSkipChange: (skip: number) => void;
}) {
  if (total <= limit) return null;

  const page = Math.floor(skip / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} &middot; {total} total
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={skip === 0}
          onClick={() => onSkipChange(Math.max(0, skip - limit))}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={skip + limit >= total}
          onClick={() => onSkipChange(skip + limit)}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
