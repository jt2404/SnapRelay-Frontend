"use client";

import { ImageIcon, ScanFace } from "lucide-react";

import { PhotoStatusBadge } from "@/components/photos/photo-status-badge";
import type { Photo } from "@/lib/api/photos";

export function photoFileName(photo: Photo) {
  return photo.s3_key_original.split("/").pop() ?? photo.s3_key_original;
}

export function PhotoCard({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted via-secondary/40 to-primary/10 text-left"
    >
      <div className="flex h-full items-center justify-center">
        <ImageIcon className="size-8 text-foreground/15" />
      </div>

      <div className="absolute top-2 left-2">
        <PhotoStatusBadge status={photo.index_status} />
      </div>

      {photo.face_count > 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm">
          <ScanFace className="size-3" />
          {photo.face_count}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-background/80 to-transparent px-2 pt-4 pb-1.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {photoFileName(photo)}
      </div>
    </button>
  );
}
