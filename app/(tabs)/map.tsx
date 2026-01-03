// app/(tabs)/map.tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">

        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900">
            Map
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            Sensor location visualization
          </Text>
        </View>

        {/* Map Placeholder */}
        <View className="flex-1 bg-white border border-dashed border-gray-300 rounded-xl items-center justify-center">

          <Text className="text-sm font-medium text-gray-700 mb-1">
            Map View (Planned)
          </Text>

          <Text className="text-xs text-gray-500 text-center px-6">
            This module will display sensor and alert locations when multiple
            ForestGuard nodes are deployed.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}
