import { apiRequest, ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Paginated } from "@/lib/api/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type Photo = {
  id: string;
  event_id: string;
  s3_key_original: string;
  s3_key_thumb: string | null;
  s3_key_analysis: string | null;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  duplicate_hash: string | null;
  index_status: string;
  face_count: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PhotoProcessingJob = {
  id: string;
  event_id: string;
  photo_id: string;
  status: string;
  retry_count: number;
  max_retries: number;
  last_error: string | null;
  dead_letter_reason: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
  updated_at: string;
};

function parseErrorBody(xhr: XMLHttpRequest): string {
  try {
    const body = JSON.parse(xhr.responseText);
    if (typeof body?.detail === "string") return body.detail;
  } catch {
    // fall through to generic message
  }
  return xhr.status === 413
    ? "File is too large or not a supported image format."
    : "Upload failed. Please try again.";
}

export function uploadPhotoWithProgress(
  eventId: string,
  file: File,
  onProgress: (pct: number) => void
): { promise: Promise<Photo>; abort: () => void } {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("event_id", eventId);
  formData.append("file", file);

  const promise = new Promise<Photo>((resolve, reject) => {
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve(JSON.parse(xhr.responseText) as Photo);
      } else if (xhr.status === 401) {
        useAuthStore.getState().clear();
        reject(new ApiError(401, "Your session expired. Please sign in again."));
      } else {
        reject(new ApiError(xhr.status, parseErrorBody(xhr)));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new ApiError(0, "Could not reach the server. Check your connection and try again."));
    });

    xhr.addEventListener("abort", () => {
      reject(new ApiError(0, "Upload cancelled."));
    });

    const token = useAuthStore.getState().token;
    xhr.open("POST", `${API_BASE_URL}/photos/upload`);
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send(formData);
  });

  return { promise, abort: () => xhr.abort() };
}

export function listPhotosForEvent(
  eventId: string,
  params: { skip?: number; limit?: number } = {}
) {
  return apiRequest<Paginated<Photo>>(`/photos/event/${eventId}`, {
    query: params,
  });
}

export function getPhotoProcessingJob(photoId: string) {
  return apiRequest<PhotoProcessingJob>(`/photos/${photoId}/processing-job`);
}

export function reprocessPhoto(photoId: string) {
  return apiRequest<PhotoProcessingJob>(`/photos/${photoId}/reprocess`, {
    method: "POST",
    body: { process_now: false },
  });
}
