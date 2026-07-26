import { apiRequest } from "@/lib/api/client";

export type GuestGallery = {
  id: string;
  guest_id: string;
  event_id: string;
  access_token: string | null;
  expires_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MatchResult = {
  id: string;
  event_id: string;
  guest_id: string;
  photo_id: string;
  status: string;
  confidence: number;
  source: string;
  created_at: string;
  updated_at: string;
};

export function getGalleryByToken(accessToken: string) {
  return apiRequest<GuestGallery>(`/galleries/token/${accessToken}`, {
    auth: false,
  });
}

export function getGalleryPhotosByToken(accessToken: string) {
  return apiRequest<MatchResult[]>(`/galleries/token/${accessToken}/photos`, {
    auth: false,
  });
}
