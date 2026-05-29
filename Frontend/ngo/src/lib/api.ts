const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type ApiError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type ApiResult<T> = {
  data: T | null;
  error: ApiError | null;
  status: number;
};

export const setAuth = (token: string, role: string) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_role", role);
};

export const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_role");
};

export const getAuthToken = () => localStorage.getItem("auth_token");

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
  includeAuth = false
): Promise<ApiResult<T>> => {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  let payload: T | ApiError | null = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    return {
      data: null,
      error: (payload as ApiError) || { message: "Request failed" },
      status: response.status
    };
  }

  return {
    data: payload as T,
    error: null,
    status: response.status
  };
};
