import { useAuthStore } from "@/lib/stores/auth-store";
import { apiRequest, ApiError } from "@/lib/api/client";
import type { Event, EventShareLink, Paginated } from "@/lib/api/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type CreateEventPayload = {
  studio_id: string;
  name: string;
  couple_name?: string | null;
  function_type: string;
  venue?: string | null;
  event_date: string;
  status?: string;
  privacy_mode: "public" | "private";
  public_submission_enabled: boolean;
};

export type UpdateEventPayload = Partial<
  Omit<CreateEventPayload, "studio_id">
>;

export function createEvent(payload: CreateEventPayload) {
  return apiRequest<Event>("/events", {
    method: "POST",
    body: payload,
  });
}

export function listEventsForStudio(
  studioId: string,
  params: { skip?: number; limit?: number } = {}
) {
  return apiRequest<Paginated<Event>>(`/events/studio/${studioId}`, {
    query: params,
  });
}

export function getEvent(eventId: string) {
  return apiRequest<Event>(`/events/${eventId}`);
}

export function updateEvent(eventId: string, payload: UpdateEventPayload) {
  return apiRequest<Event>(`/events/${eventId}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteEvent(eventId: string) {
  return apiRequest<void>(`/events/${eventId}`, {
    method: "DELETE",
  });
}

export function getEventShareLink(eventId: string) {
  return apiRequest<EventShareLink>(`/events/${eventId}/share-link`);
}

export async function fetchEventQrCodeBlobUrl(eventId: string) {
  const token = useAuthStore.getState().token;
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/qr-code`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!response.ok) {
    throw new ApiError(response.status, "Could not load the QR code.");
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
