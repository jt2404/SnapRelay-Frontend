"use client";

import * as React from "react";
import { Camera, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

export function SelfieCapture({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewUrl = React.useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Your selfie"
            className="aspect-[3/4] w-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow"
          >
            <RotateCcw className="size-3.5" />
            Retake
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/40 bg-card transition-colors hover:bg-accent"
          )}
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Camera className="size-7" />
          </div>
          <p className="font-medium text-foreground">Take or upload a selfie</p>
          <p className="max-w-[220px] text-sm text-muted-foreground">
            Natural light, no glasses, look at the camera
          </p>
        </button>
      )}
    </div>
  );
}
