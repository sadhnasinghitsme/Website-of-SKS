/**
 * Thin client for the SKS World School backend REST API (Express + MongoDB,
 * see /backend). Base URL comes from NEXT_PUBLIC_API_URL and must include the
 * `/api` suffix, e.g. `http://localhost:5000/api`.
 *
 * Every call resolves to the parsed JSON body on success, or throws an
 * `ApiError` with a human-friendly `message` on failure — including the case
 * where the backend is unreachable / blocked by CORS (`isNetwork === true`).
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export interface FieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  /** HTTP status, or 0 when the request never completed (network / CORS). */
  status: number;
  /** Per-field validation errors from the backend (422 responses). */
  fieldErrors?: FieldError[];
  /** True when fetch itself threw — server down, DNS, offline, CORS block. */
  isNetwork: boolean;

  constructor(
    message: string,
    opts: { status?: number; fieldErrors?: FieldError[]; isNetwork?: boolean } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = opts.status ?? 0;
    this.fieldErrors = opts.fieldErrors;
    this.isNetwork = opts.isNetwork ?? false;
  }
}

const NETWORK_MESSAGE =
  "We couldn't reach the school's server right now. Please check your connection and try again in a moment — or contact us directly by phone.";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  /** Pass a number of seconds to enable ISR caching for a GET (server-side). */
  revalidate?: number;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, query, revalidate, headers, ...rest } = options;

  let url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (query) {
    const qs = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        qs.set(key, String(value));
      }
    }
    const q = qs.toString();
    if (q) url += `?${q}`;
  }

  const init: RequestInit = {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };
  // `next` is added to RequestInit by Next.js' ambient types.
  if (typeof revalidate === "number") {
    (init as RequestInit & { next?: { revalidate: number } }).next = { revalidate };
  }

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch {
    // fetch() rejects with a TypeError for: connection refused, DNS failure,
    // offline, and CORS pre-flight failures. Treat them all the same.
    throw new ApiError(NETWORK_MESSAGE, { isNetwork: true });
  }

  const text = await res.text();
  let payload: Record<string, unknown> | null = null;
  if (text) {
    try {
      payload = JSON.parse(text) as Record<string, unknown>;
    } catch {
      /* non-JSON response — leave payload null */
    }
  }

  if (!res.ok) {
    const message =
      (typeof payload?.message === "string" && payload.message) ||
      (typeof payload?.error === "string" && payload.error) ||
      `Request failed (HTTP ${res.status}).`;
    const fieldErrors = Array.isArray(payload?.errors)
      ? (payload!.errors as FieldError[])
      : undefined;
    throw new ApiError(message, { status: res.status, fieldErrors });
  }

  return (payload ?? {}) as T;
}

/* ------------------------------------------------------------------ */
/* Types matching the backend Mongoose models                          */
/* ------------------------------------------------------------------ */

/** Fields the backend `Enquiry` schema / validator expects. */
export interface EnquiryInput {
  name: string;
  phone: string;
  email?: string;
  grade?: string;
  message?: string;
}

/** Fields the backend `ContactMessage` schema / validator expects. */
export interface ContactInput {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AchievementItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
  year?: string;
  date?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface MutationResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

/* ------------------------------------------------------------------ */
/* Public API surface                                                  */
/* ------------------------------------------------------------------ */

export const api = {
  /** POST /api/enquiry — public. */
  submitEnquiry(input: EnquiryInput) {
    return request<MutationResponse>("/enquiry", { method: "POST", body: input });
  },

  /** POST /api/contact — public. */
  submitContact(input: ContactInput) {
    return request<MutationResponse>("/contact", { method: "POST", body: input });
  },

  /** GET /api/news — public, paginated. */
  getNews(
    params: { page?: number; limit?: number; category?: string } = {},
    opts: { revalidate?: number } = {},
  ) {
    return request<PaginatedResponse<NewsItem>>("/news", {
      method: "GET",
      query: params,
      revalidate: opts.revalidate,
    });
  },

  /** GET /api/news/:id — public. */
  getNewsItem(id: string, opts: { revalidate?: number } = {}) {
    return request<{ success: boolean; data: NewsItem }>(`/news/${encodeURIComponent(id)}`, {
      method: "GET",
      revalidate: opts.revalidate,
    });
  },

  /** GET /api/achievements — public, paginated. */
  getAchievements(
    params: { page?: number; limit?: number } = {},
    opts: { revalidate?: number } = {},
  ) {
    return request<PaginatedResponse<AchievementItem>>("/achievements", {
      method: "GET",
      query: params,
      revalidate: opts.revalidate,
    });
  },
};

export default api;
