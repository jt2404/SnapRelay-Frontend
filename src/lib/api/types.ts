export type User = {
  id: string;
  studio_id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "platform_admin";
  status: string;
  created_at: string;
  updated_at: string;
};

export type Token = {
  access_token: string;
  token_type: string;
  user: User;
};

export type Studio = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  status: string;
  plan_id: string | null;
  plan_started_at: string | null;
  plan_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PrivacyMode = "public" | "private";

export type EventStatus = "draft" | "active" | "completed" | "archived" | string;

export type Event = {
  id: string;
  studio_id: string;
  name: string;
  couple_name: string | null;
  function_type: string;
  venue: string | null;
  event_date: string;
  status: EventStatus;
  privacy_mode: PrivacyMode;
  public_submission_enabled: boolean;
  rekognition_collection_id: string | null;
  share_token: string | null;
  created_at: string;
  updated_at: string;
};

export type EventShareLink = {
  share_token: string;
  url: string;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiErrorBody = {
  detail: string | { msg: string; loc?: (string | number)[] }[];
};
