
import { api } from "./client";

export type MeResponse = {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
  enabled: boolean;
  emailVerified: boolean;
};


export async function getMeApi(): Promise<MeResponse> {
  const response = await api.get("/api/users/me");
  return response.data;
}
