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

export const getApiErrorMessage = (
  error: ApiError | null,
  fallback: string
): string => {
  if (!error) {
    return fallback;
  }
  if (error.message) {
    return error.message;
  }
  if (error.errors) {
    const first = Object.values(error.errors).flat()[0];
    if (first) {
      return first;
    }
  }
  return fallback;
};

export const setAuth = (
  token: string,
  role: string,
  profile?: { name?: string; email?: string }
) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_role", role);
  if (profile?.name) {
    localStorage.setItem("auth_name", profile.name);
  }
  if (profile?.email) {
    localStorage.setItem("auth_email", profile.email);
  }
};

export const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_role");
  localStorage.removeItem("auth_name");
  localStorage.removeItem("auth_email");
};

export const getAuthToken = () => localStorage.getItem("auth_token");

export const getAuthRole = () => localStorage.getItem("auth_role");

export const getAuthName = () => localStorage.getItem("auth_name");

export const getAuthEmail = () => localStorage.getItem("auth_email");

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
