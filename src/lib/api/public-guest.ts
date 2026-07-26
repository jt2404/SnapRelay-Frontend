import { apiRequest } from "@/lib/api/client";

export type PublicEvent = {
  id: string;
  name: string;
  function_type: string;
  event_date: string;
  privacy_mode: "public" | "private";
  public_submission_enabled: boolean;
};

export function getEventByShareToken(shareToken: string) {
  return apiRequest<PublicEvent>(`/events/public/${shareToken}`, {
    auth: false,
  });
}

export type SubmitGuestPayload = {
  eventId: string;
  name: string;
  email: string;
  whatsapp: string;
  consent: boolean;
  selfie: File;
};

export type PublicGuest = {
  id: string;
  event_id: string;
  name: string;
  email: string;
  whatsapp: string;
  match_status: string;
  consent: boolean;
  created_at: string;
  updated_at: string;
};

export function submitPublicGuest(payload: SubmitGuestPayload) {
  const formData = new FormData();
  formData.append("event_id", payload.eventId);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("whatsapp", payload.whatsapp);
  formData.append("consent", String(payload.consent));
  formData.append("file", payload.selfie);

  return apiRequest<PublicGuest>("/guests/public/submit", {
    method: "POST",
    formData,
    auth: false,
  });
}
