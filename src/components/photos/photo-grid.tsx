"use client";

import * as React from "react";
import { ImagesIcon } from "lucide-react";

import { PhotoCard } from "@/components/photos/photo-card";
import { PhotoPreview } from "@/components/photos/photo-preview";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Photo } from "@/lib/api/photos";

export function PhotoGrid({
  photos,
  isLoading,
  total,
  skip,
  limit,
  onSkipChange,
}: {
  photos: Photo[];
  isLoading: boolean;
  total: number;
  skip: number;
  limit: number;
  onSkipChange: (skip: number) => void;
}) {
  const [previewPhoto, setPreviewPhoto] = React.useState<Photo | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <EmptyState
        icon={ImagesIcon}
        title="No photos yet"
        description="Upload photos above to start building this event's gallery."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => setPreviewPhoto(photo)}
          />
        ))}
      </div>
      <Pagination
        skip={skip}
        limit={limit}
        total={total}
        onSkipChange={onSkipChange}
      />
      <PhotoPreview
        photo={previewPhoto}
        open={previewPhoto !== null}
        onOpenChange={(open) => !open && setPreviewPhoto(null)}
      />
    </>
  );
}
