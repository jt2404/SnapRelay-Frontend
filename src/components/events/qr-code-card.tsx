"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { fetchEventQrCodeBlobUrl, getEventShareLink } from "@/lib/api/events";

export function QRCodeCard({ eventId }: { eventId: string }) {
  const shareLinkQuery = useQuery({
    queryKey: ["event-share-link", eventId],
    queryFn: () => getEventShareLink(eventId),
  });

  const qrQuery = useQuery({
    queryKey: ["event-qr-code", eventId],
    queryFn: () => fetchEventQrCodeBlobUrl(eventId),
    staleTime: Infinity,
  });

  React.useEffect(() => {
    const url = qrQuery.data;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [qrQuery.data]);

  React.useEffect(() => {
    if (qrQuery.isError) toast.error("Could not load the QR code.");
  }, [qrQuery.isError]);

  function copyLink() {
    if (!shareLinkQuery.data?.url) return;
    navigator.clipboard.writeText(shareLinkQuery.data.url);
    toast.success("Gallery link copied");
  }

  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-primary p-6 text-center">
      <div>
        <p className="font-heading text-lg font-semibold text-primary-foreground">
          Event QR Entry
        </p>
        <p className="mt-1 text-sm text-primary-foreground/80">
          Display this at the venue for instant guest access
        </p>
      </div>

      <div className="flex size-44 items-center justify-center rounded-lg bg-card p-3">
        {qrQuery.isLoading ? (
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        ) : qrQuery.data ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrQuery.data}
            alt="Event QR code"
            className="size-full object-contain"
          />
        ) : (
          <span className="text-sm text-muted-foreground">Unavailable</span>
        )}
      </div>

      <div className="w-full space-y-2">
        <div className="truncate rounded-lg bg-card-foreground/10 px-3 py-2 text-xs text-primary-foreground/90">
          {shareLinkQuery.data?.url ?? "Loading link..."}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={copyLink}
            disabled={!shareLinkQuery.data}
          >
            <Copy />
            Copy Link
          </Button>
          <Button
            className="flex-1 bg-card text-foreground hover:bg-card/90"
            disabled={!qrQuery.data}
            asChild={Boolean(qrQuery.data)}
          >
            {qrQuery.data ? (
              <a href={qrQuery.data} download={`event-${eventId}-qr.png`}>
                <Download />
                Download
              </a>
            ) : (
              <>
                <Download />
                Download
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
