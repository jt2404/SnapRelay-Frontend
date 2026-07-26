"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Lock, Sparkles } from "lucide-react";

import { MatchPhotoCard } from "@/components/guest/match-photo-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { getGalleryByToken, getGalleryPhotosByToken } from "@/lib/api/galleries";

export default function GuestGalleryPage() {
  const { accessToken } = useParams<{ accessToken: string }>();

  const galleryQuery = useQuery({
    queryKey: ["gallery", accessToken],
    queryFn: () => getGalleryByToken(accessToken),
    retry: false,
  });

  const photosQuery = useQuery({
    queryKey: ["gallery-photos", accessToken],
    queryFn: () => getGalleryPhotosByToken(accessToken),
    enabled: galleryQuery.isSuccess,
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col bg-background px-5 py-6">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
          <Lock className="size-3.5" />
          Private Gallery
        </div>
        <span className="font-heading mt-1 text-xl font-bold text-gold">
          SnapRelay
        </span>
      </div>

      {galleryQuery.isLoading ? (
        <div className="space-y-4">
          <Skeleton className="mx-auto h-8 w-48" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      ) : galleryQuery.isError ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="font-heading text-xl font-semibold text-foreground">
            This link isn&apos;t available
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            It may have expired, been revoked, or the event may be private.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Your Moments
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              AI-matched photographs where you shine the brightest.
            </p>
          </div>

          {photosQuery.isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : photosQuery.data && photosQuery.data.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photosQuery.data.map((match) => (
                  <MatchPhotoCard key={match.id} match={match} />
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {photosQuery.data.length} photo
                {photosQuery.data.length === 1 ? "" : "s"} found
              </p>
            </>
          ) : (
            <EmptyState
              icon={Sparkles}
              title="Still finding your moments"
              description="Our AI is still processing photos for this event. Check back soon — this page updates automatically once matches are ready."
            />
          )}
        </>
      )}
    </div>
  );
}
