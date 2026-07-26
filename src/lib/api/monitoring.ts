import { apiRequest } from "@/lib/api/client";

export type UsageMetrics = {
  generated_at: string;
  studio_id: string;
  total_events: number;
  public_events: number;
  private_events: number;
  total_guests: number;
  opted_out_guests: number;
  matched_guests: number;
  total_photos: number;
  total_galleries: number;
  active_galleries: number;
  total_deliveries: number;
  sent_deliveries: number;
  failed_deliveries: number;
};

export function getUsageMetrics() {
  return apiRequest<UsageMetrics>("/monitoring/usage");
}
