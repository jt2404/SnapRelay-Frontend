import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { uploadPhotoWithProgress } from "@/lib/api/photos";

export type UploadItem = {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  error?: string;
};

const MAX_CONCURRENT = 3;

export function usePhotoUploadQueue(eventId: string) {
  const [items, setItems] = React.useState<UploadItem[]>([]);
  const queryClient = useQueryClient();
  const startedRef = React.useRef<Set<string>>(new Set());
  const abortersRef = React.useRef<Map<string, () => void>>(new Map());

  React.useEffect(() => {
    const uploading = items.filter((i) => i.status === "uploading").length;
    const queued = items.filter(
      (i) => i.status === "queued" && !startedRef.current.has(i.id)
    );
    const capacity = MAX_CONCURRENT - uploading;
    if (capacity <= 0 || queued.length === 0) return;

    const toStart = queued.slice(0, capacity);
    for (const item of toStart) {
      startedRef.current.add(item.id);
      setItems((current) =>
        current.map((i) =>
          i.id === item.id ? { ...i, status: "uploading" as const } : i
        )
      );

      const { promise, abort } = uploadPhotoWithProgress(
        eventId,
        item.file,
        (pct) => {
          setItems((current) =>
            current.map((i) => (i.id === item.id ? { ...i, progress: pct } : i))
          );
        }
      );
      abortersRef.current.set(item.id, abort);

      promise
        .then(() => {
          setItems((current) =>
            current.map((i) =>
              i.id === item.id ? { ...i, status: "done", progress: 100 } : i
            )
          );
          queryClient.invalidateQueries({ queryKey: ["photos", eventId] });
        })
        .catch((error) => {
          const message =
            error instanceof ApiError
              ? error.message
              : "Upload failed. Please try again.";
          setItems((current) =>
            current.map((i) =>
              i.id === item.id ? { ...i, status: "error", error: message } : i
            )
          );
        })
        .finally(() => {
          abortersRef.current.delete(item.id);
          startedRef.current.delete(item.id);
        });
    }
  }, [items, eventId, queryClient]);

  const addFiles = React.useCallback((files: File[]) => {
    const newItems: UploadItem[] = files.map((file) => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      progress: 0,
      status: "queued",
    }));
    setItems((current) => [...current, ...newItems]);
  }, []);

  const removeItem = React.useCallback((id: string) => {
    abortersRef.current.get(id)?.();
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearFinished = React.useCallback(() => {
    setItems((current) => current.filter((item) => item.status !== "done"));
  }, []);

  return { items, addFiles, removeItem, clearFinished };
}
