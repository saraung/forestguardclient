// api/alerts.api.ts
import { api } from "./client";

export type AlertResponse = {
  id: number;
  deviceId: string;
  type: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  acknowledged: boolean;
};

// Active alerts (acknowledged = false)
export async function getActiveAlerts(): Promise<AlertResponse[]> {
  const response = await api.get("/api/alerts");
  return response.data;
}

// History alerts (acknowledged = true)
export async function getHistoryAlerts(): Promise<AlertResponse[]> {
  const response = await api.get("/api/alerts/history");
  return response.data;
}

// Acknowledge alert
export async function acknowledgeAlert(alertId: number): Promise<void> {
  await api.post(`/api/alerts/${alertId}/acknowledge`);
}

// Get single alert by id (details page)
export async function getAlertById(
  id: number
): Promise<AlertResponse> {
  const response = await api.get(`/api/alerts/${id}`);
  return response.data;
}
