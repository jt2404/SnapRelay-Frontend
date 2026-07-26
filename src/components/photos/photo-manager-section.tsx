"use client";

import * as React from "react";

import {
  UploadDropzone,
  UploadProgressList,
} from "@/components/photos/upload-dropzone";
import { PhotoGrid } from "@/components/photos/photo-grid";
import { usePhotoUploadQueue } from "@/lib/hooks/use-photo-upload-queue";
import { usePhotosQuery } from "@/lib/hooks/use-photos";

const PAGE_SIZE = 20;

export function PhotoManagerSection({ eventId }: { eventId: string }) {
  const [skip, setSkip] = React.useState(0);
  const { items, addFiles, removeItem } = usePhotoUploadQueue(eventId);
  const photosQuery = usePhotosQuery(eventId, { skip, limit: PAGE_SIZE });

  return (
    <div className="space-y-8">
      <div>
        <UploadDropzone onFilesSelected={addFiles} />
        <UploadProgressList items={items} onRemove={removeItem} />
      </div>

      <div>
        <h3 className="font-heading mb-4 text-lg font-semibold text-foreground">
          Photos
        </h3>
        <PhotoGrid
          photos={photosQuery.data?.items ?? []}
          isLoading={photosQuery.isLoading}
          total={photosQuery.data?.total ?? 0}
          skip={skip}
          limit={PAGE_SIZE}
          onSkipChange={setSkip}
        />
      </div>
    </div>
  );
}
