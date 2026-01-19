import { useAlerts } from "@/hooks/useAlerts";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Dashboard() {
  const { alerts, loading, reload } = useAlerts();

  // 🔁 Refetch alerts whenever Dashboard gains focus
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  const activeCount = alerts.length;
  const recent = alerts.slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Header */}
        <View className="mb-7">
          <Text className="text-3xl font-bold text-gray-900">
            Dashboard
          </Text>
          <Text className="text-base text-gray-600 mt-1">
            Live forest monitoring overview
          </Text>
        </View>

        {/* KPI Cards */}
        <View className="flex-row gap-4 mb-8">
          {/* Active Alerts */}
          <View className="flex-1 bg-white border border-red-200 rounded-2xl p-5">
            <Text className="text-sm text-gray-500 mb-2">
              ACTIVE ALERTS
            </Text>
            <Text className="text-4xl font-bold text-red-600">
              {loading ? "…" : activeCount}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Require attention
            </Text>
          </View>

          {/* System Status */}
          <View className="flex-1 bg-white border border-green-200 rounded-2xl p-5">
            <Text className="text-sm text-gray-500 mb-2">
              SYSTEM STATUS
            </Text>
            <Text className="text-2xl font-bold text-green-700">
              ONLINE
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              All services operational
            </Text>
          </View>
        </View>

        {/* System Status Details */}
        <View className="bg-white border border-gray-200 rounded-2xl p-5 mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </Text>

          <View className="flex-row justify-between mb-3">
            <Text className="text-base text-gray-600">
              Network
            </Text>
            <Text className="text-base font-semibold text-green-700">
              Stable
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-base text-gray-600">
              Model Version
            </Text>
            <Text className="text-base text-gray-800">
              TinyML v1.2
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white border border-gray-200 rounded-2xl p-5">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Recent Alerts
          </Text>

          {recent.length === 0 && (
            <Text className="text-base text-gray-500">
              No recent alerts
            </Text>
          )}

          {recent.map((a) => (
            <View
              key={a.id}
              className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <Text className="text-base font-semibold text-red-600">
                {a.type.toUpperCase()}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                Device {a.deviceId}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
