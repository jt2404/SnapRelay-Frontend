import { useQuery } from "@tanstack/react-query";
import { listPhotosForEvent } from "@/lib/api/photos";

export function usePhotosQuery(
  eventId: string,
  params: { skip?: number; limit?: number } = {}
) {
  return useQuery({
    queryKey: ["photos", eventId, params],
    queryFn: () => listPhotosForEvent(eventId, params),
    refetchInterval: (query) => {
      const hasActiveJobs = query.state.data?.items.some((p) =>
        ["pending", "indexing"].includes(p.index_status)
      );
      return hasActiveJobs ? 4000 : false;
    },
  });
}
