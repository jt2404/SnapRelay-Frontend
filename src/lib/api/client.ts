import { useAuthStore } from "@/lib/stores/auth-store";
import type { ApiErrorBody } from "@/lib/api/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export class ApiError extends Error {
  status: number;
  fieldErrors?: { field: string; message: string }[];

  constructor(status: number, message: string, fieldErrors?: { field: string; message: string }[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function parseDetail(body: ApiErrorBody | undefined): {
  message: string;
  fieldErrors?: { field: string; message: string }[];
} {
  if (!body?.detail) {
    return { message: "Something went wrong. Please try again." };
  }
  if (typeof body.detail === "string") {
    return { message: body.detail };
  }
  const fieldErrors = body.detail.map((d) => ({
    field: String(d.loc?.[d.loc.length - 1] ?? "field"),
    message: d.msg,
  }));
  return {
    message: fieldErrors[0]?.message ?? "Validation error",
    fieldErrors,
  };
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  formData?: FormData;
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, query?: RequestOptions["query"]) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, formData, auth = true, query } = options;

  const headers: Record<string, string> = {};
  if (!formData) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = useAuthStore.getState().token;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: formData ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });
  } catch {
    throw new ApiError(0, "Could not reach the server. Check your connection and try again.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => undefined) : undefined;

  if (!response.ok) {
    if (response.status === 401 && auth) {
      useAuthStore.getState().clear();
    }
    const { message, fieldErrors } = parseDetail(payload);
    throw new ApiError(response.status, message, fieldErrors);
  }

  return payload as T;
}
