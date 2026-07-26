import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  type CreateEventPayload,
  listEventsForStudio,
  updateEvent,
  type UpdateEventPayload,
} from "@/lib/api/events";

export function useEventsQuery(
  studioId: string | undefined,
  params: { skip?: number; limit?: number } = {}
) {
  return useQuery({
    queryKey: ["events", studioId, params],
    queryFn: () => listEventsForStudio(studioId as string, params),
    enabled: Boolean(studioId),
  });
}

export function useCreateEventMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: (event) => {
      queryClient.invalidateQueries({ queryKey: ["events", event.studio_id] });
    },
  });
}

export function useUpdateEventMutation(studioId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      payload,
    }: {
      eventId: string;
      payload: UpdateEventPayload;
    }) => updateEvent(eventId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", studioId] });
    },
  });
}
