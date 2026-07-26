"use client";

import * as React from "react";
import {
  CheckCircle2,
  FileImage,
  FolderUp,
  UploadCloud,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { UploadItem } from "@/lib/hooks/use-photo-upload-queue";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function UploadDropzone({
  onFilesSelected,
}: {
  onFilesSelected: (files: File[]) => void;
}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const folderInputRef = React.useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    onFilesSelected(Array.from(fileList));
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-primary/40 bg-card"
      )}
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
        <UploadCloud className="size-7 text-muted-foreground" />
      </div>
      <p className="font-medium text-foreground">Drag and drop photos here</p>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Supports high-resolution JPEG, PNG, WebP, GIF, and HEIC. Photos are
        automatically organized by AI face detection.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className="rounded-lg font-semibold"
          onClick={() => fileInputRef.current?.click()}
        >
          Select Files
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-lg font-semibold"
          onClick={() => folderInputRef.current?.click()}
        >
          <FolderUp />
          Upload Folder
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="hidden"
        // @ts-expect-error -- non-standard attribute for folder selection, supported in Chromium/Firefox
        webkitdirectory=""
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function UploadProgressList({
  items,
  onRemove,
}: {
  items: UploadItem[];
  onRemove: (id: string) => void;
}) {
  if (items.length === 0) return null;

  const done = items.filter((i) => i.status === "done").length;

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between text-sm">
        <p className="font-medium text-foreground">Upload Progress</p>
        <p className="text-muted-foreground">
          {done} of {items.length} photos uploaded
        </p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
              <FileImage className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {item.file.name}
              </p>
              {item.status === "error" ? (
                <p className="truncate text-xs text-destructive">
                  {item.error}
                </p>
              ) : item.status === "uploading" ? (
                <Progress value={item.progress} className="mt-1.5 h-1" />
              ) : (
                <p className="text-xs text-muted-foreground">
                  {formatBytes(item.file.size)}
                  {item.status === "queued" ? " · Queued" : ""}
                </p>
              )}
            </div>
            {item.status === "done" ? (
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
            ) : (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label="Remove"
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
