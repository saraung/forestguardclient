import { useAlerts } from "@/hooks/useAlerts";
import { Dimensions, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
  const { alerts, loading } = useAlerts();

  const initialRegion = {
    latitude: alerts[0]?.latitude ?? 10.8505,
    longitude: alerts[0]?.longitude ?? 76.2711,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900">Map</Text>
        <Text className="text-sm text-gray-600 mt-1">
          Live alert locations
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm text-gray-500">Loading map…</Text>
        </View>
      ) : (
        <MapView
          style={{ width: Dimensions.get("window").width, flex: 1 }}
          initialRegion={initialRegion}
        >
          {alerts.map((alert) => {
            const isCritical =
              alert.type === "chainsaw" || alert.type === "fire";

            const color = isCritical ? "#DC2626" : "#F97316"; // red / orange

            return (
              <Marker
                key={alert.id}
                coordinate={{
                  latitude: alert.latitude,
                  longitude: alert.longitude,
                }}
                title={alert.type.toUpperCase()}
                description={`Device ${alert.deviceId}`}
              >
                {/* 🔴 Clean circular marker */}
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: color,
                    borderWidth: 3,
                    borderColor: "#ffffff",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                  }}
                >
                  {/* center dot */}
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ffffff",
                    }}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
}
