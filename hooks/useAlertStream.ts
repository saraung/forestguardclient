import { useEffect } from "react";
import EventSource from "react-native-sse";
import { AlertResponse } from "@/api/alerts.api";

export function useAlertStream(
  onAlert: (alert: AlertResponse) => void
) {
  useEffect(() => {
    const es = new EventSource(
      "http://10.149.108.114:8070/api/alerts/stream"
    );

    es.onmessage = (event) => {
      if (!event.data) return;
      onAlert(JSON.parse(event.data));
    };

    es.onerror = (err) => {
      console.log("SSE error", err);
    };

    return () => {
      es.close();
    };
  }, []);
}
