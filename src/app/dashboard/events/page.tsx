"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarDays, Plus, Search } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { EventCard } from "@/components/events/event-card";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEventsQuery } from "@/lib/hooks/use-events";

const PAGE_SIZE = 9;

export default function EventsPage() {
  const { user } = useAuth();
  const [skip, setSkip] = React.useState(0);
  const [search, setSearch] = React.useState("");

  const eventsQuery = useEventsQuery(user?.studio_id, {
    skip,
    limit: PAGE_SIZE,
  });

  const items = eventsQuery.data?.items ?? [];
  const filtered = search.trim()
    ? items.filter((event) =>
        [event.name, event.couple_name, event.venue, event.function_type]
          .filter(Boolean)
          .some((value) =>
            value!.toLowerCase().includes(search.trim().toLowerCase())
          )
      )
    : items;

  return (
    <div>
      <PageHeader
        title="Events"
        description="Every wedding and function your studio is managing."
        action={
          <Button asChild>
            <Link href="/dashboard/events/new">
              <Plus />
              New Event
            </Link>
          </Button>
        }
      />

      <div className="mb-6 max-w-sm">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {eventsQuery.isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination
            skip={skip}
            limit={PAGE_SIZE}
            total={eventsQuery.data?.total ?? 0}
            onSkipChange={setSkip}
          />
        </>
      ) : (
        <EmptyState
          icon={CalendarDays}
          title={search ? "No matching events" : "No events yet"}
          description={
            search
              ? "Try a different search term."
              : "Create your first event to start uploading photos and sharing galleries."
          }
          action={
            !search && (
              <Button asChild>
                <Link href="/dashboard/events/new">
                  <Plus />
                  Create Event
                </Link>
              </Button>
            )
          }
        />
      )}
    </div>
  );
}
