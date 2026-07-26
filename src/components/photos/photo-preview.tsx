import { format } from "date-fns";
import { ImageIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhotoStatusBadge } from "@/components/photos/photo-status-badge";
import { photoFileName } from "@/components/photos/photo-card";
import type { Photo } from "@/lib/api/photos";

function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

export function PhotoPreview({
  photo,
  open,
  onOpenChange,
}: {
  photo: Photo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="truncate">
            {photo ? photoFileName(photo) : ""}
          </DialogTitle>
        </DialogHeader>
        {photo && (
          <div className="space-y-4">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-muted via-secondary/40 to-primary/10">
              <ImageIcon className="size-10 text-foreground/15" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Status
                </p>
                <div className="mt-1">
                  <PhotoStatusBadge status={photo.index_status} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Faces Detected
                </p>
                <p className="mt-1 text-foreground">{photo.face_count}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Size
                </p>
                <p className="mt-1 text-foreground">
                  {formatBytes(photo.size_bytes)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Uploaded
                </p>
                <p className="mt-1 text-foreground">
                  {format(new Date(photo.created_at), "d MMM yyyy, h:mm a")}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
