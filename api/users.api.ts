// api/users.api.ts
import { api } from "./client";

export type MeResponse = {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  enabled: boolean;
  emailVerified: boolean;
};

// GET /api/users/me
export async function getMeApi(): Promise<MeResponse> {
  const response = await api.get("/api/users/me");
  return response.data;
}
