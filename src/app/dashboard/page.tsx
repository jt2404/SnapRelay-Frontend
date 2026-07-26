"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Camera, ImagePlay, Plus, UsersRound } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { EmptyState } from "@/components/shared/empty-state";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsageMetrics } from "@/lib/api/monitoring";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEventsQuery } from "@/lib/hooks/use-events";

export default function DashboardPage() {
  const { user } = useAuth();

  const metricsQuery = useQuery({
    queryKey: ["usage-metrics"],
    queryFn: getUsageMetrics,
  });

  const eventsQuery = useEventsQuery(user?.studio_id, { skip: 0, limit: 3 });

  const firstName = user?.name.split(" ")[0];

  return (
    <div>
      <PageHeader
        title={`Welcome back${firstName ? `, ${firstName}` : ""}`}
        description="Here's what's happening across your studio."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          label="Events"
          value={metricsQuery.data?.total_events ?? 0}
          icon={CalendarDays}
          tone="gold"
          loading={metricsQuery.isLoading}
        />
        <StatsCard
          label="Photos"
          value={metricsQuery.data?.total_photos ?? 0}
          icon={Camera}
          tone="blush"
          loading={metricsQuery.isLoading}
        />
        <StatsCard
          label="Guests"
          value={metricsQuery.data?.total_guests ?? 0}
          icon={UsersRound}
          tone="muted"
          loading={metricsQuery.isLoading}
        />
        <StatsCard
          label="Active Galleries"
          value={metricsQuery.data?.active_galleries ?? 0}
          icon={ImagePlay}
          tone="accent"
          loading={metricsQuery.isLoading}
        />
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Recent Events
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/events">View all</Link>
          </Button>
        </div>

        {eventsQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-xl" />
            ))}
          </div>
        ) : eventsQuery.data && eventsQuery.data.items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventsQuery.data.items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="No events yet"
            description="Create your first event to start uploading photos and sharing galleries with your clients."
            action={
              <Button asChild>
                <Link href="/dashboard/events/new">
                  <Plus />
                  Create Event
                </Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
