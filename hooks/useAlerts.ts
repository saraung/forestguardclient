import { useEffect, useState } from "react";
import {
  getActiveAlerts,
  getHistoryAlerts,
  acknowledgeAlert,
  AlertResponse,
} from "@/api/alerts.api";

type AlertsMode = "active" | "history";

export function useAlerts(mode: AlertsMode = "active") {
  const [alerts, setAlerts] = useState<AlertResponse[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const data =
      mode === "active"
        ? await getActiveAlerts()
        : await getHistoryAlerts();

    setAlerts(data);
    setLoading(false);
  }

  async function acknowledge(id: number) {
    await acknowledgeAlert(id);
    if (mode === "active") {
      await load();
    }
  }

  useEffect(() => {
    load();
  }, [mode]);

  return {
    alerts,
    setAlerts,   // 🔑 expose setter for SSE
    loading,
    reload: load,
    acknowledge,
  };
}
