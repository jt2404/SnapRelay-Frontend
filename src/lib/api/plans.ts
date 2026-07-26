import { apiRequest } from "@/lib/api/client";

export type Plan = {
  id: string;
  key: string;
  name: string;
  storage_limit_bytes: number;
  ai_quota: number;
  price_paise: number;
  currency: string;
  duration_days: number;
  is_active: boolean;
  sort_order: number;
};

export function listPlans() {
  return apiRequest<Plan[]>("/plans", { auth: false });
}
