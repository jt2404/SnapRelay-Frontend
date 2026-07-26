import { apiRequest } from "@/lib/api/client";
import type { Studio } from "@/lib/api/types";

export type CreateStudioPayload = {
  name: string;
  slug: string;
};

export function createStudio(payload: CreateStudioPayload) {
  return apiRequest<Studio>("/studios", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export function getStudio(studioId: string) {
  return apiRequest<Studio>(`/studios/${studioId}`);
}
