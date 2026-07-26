import { apiRequest } from "@/lib/api/client";
import type { Token, User } from "@/lib/api/types";

export type RegisterPayload = {
  studio_id: string;
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function registerUser(payload: RegisterPayload) {
  return apiRequest<User>("/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiRequest<Token>("/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });
}
