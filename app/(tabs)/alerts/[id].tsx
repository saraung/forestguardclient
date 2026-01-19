import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getAlertById,
  acknowledgeAlert,
  AlertResponse,
} from "@/api/alerts.api";

export default function AlertDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [alert, setAlert] = useState<AlertResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [ackLoading, setAckLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    getAlertById(Number(id))
      .then(setAlert)
      .finally(() => setLoading(false));
  }, [id]);

  async function onAcknowledge() {
    if (!alert) return;

    setAckLoading(true);
    await acknowledgeAlert(alert.id);
    setAckLoading(false);

    router.back();
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!alert) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-base text-gray-600">
          Alert not found
        </Text>
      </SafeAreaView>
    );
  }

  const isCritical =
    alert.type === "chainsaw" || alert.type === "gun_shot";

  const color = isCritical ? "#DC2626" : "#F97316";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">

        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 mb-4">
          Alert Details
        </Text>

        {/* Summary Card */}
        <View className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <Text
            style={{ color }}
            className="text-xl font-bold mb-1"
          >
            {alert.type.toUpperCase()}
          </Text>

          <Text className="text-base text-gray-700 mb-2">
            Device:{" "}
            <Text className="font-semibold">
              {alert.deviceId}
            </Text>
          </Text>

          <Text className="text-base text-gray-700">
            Status:{" "}
            <Text
              className={`font-semibold ${
                alert.acknowledged
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {alert.acknowledged ? "ACKNOWLEDGED" : "ACTIVE"}
            </Text>
          </Text>

          <Text className="text-base text-gray-700 mt-3">
            Time
          </Text>
          <Text className="text-base text-gray-900 font-medium">
            {new Date(alert.timestamp).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "full",
              timeStyle: "short",
            })}{" "}
            IST
          </Text>
        </View>

        {/* Location */}
        <View className="mb-5">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Location
          </Text>

          <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <MapView
              style={{
                width: Dimensions.get("window").width - 32,
                height: 220,
              }}
              initialRegion={{
                latitude: alert.latitude,
                longitude: alert.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
              }}
            >
              <Marker
                coordinate={{
                  latitude: alert.latitude,
                  longitude: alert.longitude,
                }}
              >
                {/* Same clean marker style */}
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: color,
                    borderWidth: 3,
                    borderColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 5,
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#fff",
                    }}
                  />
                </View>
              </Marker>
            </MapView>

            <View className="p-4">
              <Text className="text-base text-gray-700">
                Latitude:{" "}
                <Text className="font-medium">
                  {alert.latitude.toFixed(5)}
                </Text>
              </Text>
              <Text className="text-base text-gray-700 mt-1">
                Longitude:{" "}
                <Text className="font-medium">
                  {alert.longitude.toFixed(5)}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Acknowledge Button */}
        {!alert.acknowledged && (
          <Pressable
            onPress={onAcknowledge}
            disabled={ackLoading}
            className={`rounded-2xl py-4 ${
              ackLoading ? "bg-gray-400" : "bg-green-600"
            }`}
          >
            <Text className="text-center text-lg text-white font-semibold">
              {ackLoading
                ? "Acknowledging…"
                : "Acknowledge Alert"}
            </Text>
          </Pressable>
        )}

      </View>
    </SafeAreaView>
  );
}
