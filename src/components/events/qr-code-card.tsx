"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Download, Loader2, QrCode } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="size-4.5" />
          Share Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <div className="flex size-48 items-center justify-center rounded-lg bg-muted">
          {qrQuery.isLoading ? (
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          ) : qrQuery.data ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrQuery.data}
              alt="Event QR code"
              className="size-48 rounded-lg object-contain"
            />
          ) : (
            <span className="text-sm text-muted-foreground">Unavailable</span>
          )}
        </div>

        <div className="w-full space-y-2">
          <div className="truncate rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            {shareLinkQuery.data?.url ?? "Loading link..."}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={copyLink}
              disabled={!shareLinkQuery.data}
            >
              <Copy />
              Copy Link
            </Button>
            <Button
              variant="outline"
              className="flex-1"
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
      </CardContent>
    </Card>
  );
}
