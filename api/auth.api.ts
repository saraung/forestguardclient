// api/auth.api.ts
import { api } from "./client";

export type LoginResponse = {
  token: string;
};

export async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  // Axios automatically throws on 4xx/5xx
  return response.data; // { token }
}

export async function meApi(): Promise<string> {
  const response = await api.get("/api/auth/me");
  return response.data; // "Authenticated user"
}
