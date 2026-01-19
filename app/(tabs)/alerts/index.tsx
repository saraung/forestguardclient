import { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAlerts } from "@/hooks/useAlerts";
import { router } from "expo-router";

function severity(type: string) {
  switch (type) {
    case "chainsaw":
    case "gun_shot":
      return {
        label: "CRITICAL",
        border: "border-red-300",
        title: "text-red-700",
        badge: "text-red-700 bg-red-100",
      };
    case "fire":
      return {
        label: "WARNING",
        border: "border-orange-300",
        title: "text-orange-700",
        badge: "text-orange-700 bg-orange-100",
      };
    default:
      return {
        label: "INFO",
        border: "border-gray-300",
        title: "text-gray-800",
        badge: "text-gray-700 bg-gray-100",
      };
  }
}

export default function Alerts() {
  const [mode, setMode] = useState<"active" | "history">("active");
  const { alerts, loading } = useAlerts(mode);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Header */}
        <View className="mb-5">
          <Text className="text-3xl font-bold text-gray-900">
            Alerts
          </Text>
          <Text className="text-base text-gray-600 mt-1">
            {mode === "active"
              ? "Active unacknowledged alerts"
              : "Resolved alerts"}
          </Text>
        </View>

        {/* Active / Resolved toggle */}
        <View className="flex-row bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
          <Pressable
            onPress={() => setMode("active")}
            className={`flex-1 py-3 ${
              mode === "active" ? "bg-gray-100" : ""
            }`}
          >
            <Text
              className={`text-center text-base font-semibold ${
                mode === "active"
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Active
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setMode("history")}
            className={`flex-1 py-3 ${
              mode === "history" ? "bg-gray-100" : ""
            }`}
          >
            <Text
              className={`text-center text-base font-semibold ${
                mode === "history"
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Resolved
            </Text>
          </Pressable>
        </View>

        {loading && (
          <Text className="text-base text-gray-500">
            Loading alerts…
          </Text>
        )}

        {!loading && alerts.length === 0 && (
          <Text className="text-base text-gray-500">
            No alerts found
          </Text>
        )}

        {alerts.map((alert) => {
          const s = severity(alert.type);

          return (
            <Pressable
              key={alert.id}
              onPress={() =>
                router.push({
                  pathname: "/alerts/[id]",
                  params: { id: String(alert.id) },
                })
              }
              className="mb-5"
            >
              <View
                className={`bg-white ${s.border} border rounded-2xl p-5`}
              >
                {/* Title row */}
                <View className="flex-row justify-between items-start mb-2">
                  <Text
                    className={`text-lg font-bold ${s.title}`}
                  >
                    {alert.type.toUpperCase()}
                  </Text>

                  <View
                    className={`px-3 py-1 rounded-full ${s.badge}`}
                  >
                    <Text className="text-sm font-semibold">
                      {s.label}
                    </Text>
                  </View>
                </View>

                {/* Device */}
                <Text className="text-base text-gray-700">
                  Device{" "}
                  <Text className="font-semibold">
                    {alert.deviceId}
                  </Text>
                </Text>

                {/* Time */}
                <Text className="text-base text-gray-600 mt-1">
                  {new Date(alert.timestamp).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  IST
                </Text>
              </View>
            </Pressable>
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}
