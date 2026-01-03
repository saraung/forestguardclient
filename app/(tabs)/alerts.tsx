// app/(tabs)/alerts.tsx
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Alerts() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900">
                        Alerts
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                        Recent detected events
                    </Text>
                </View>

                {/* Alert Card – Critical */}
                <View className="bg-white border border-red-200 rounded-xl p-4 mb-4">
                    <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-sm font-semibold text-red-700">
                            Chainsaw Detected
                        </Text>
                        <Text className="text-xs font-medium text-red-600">
                            CRITICAL
                        </Text>
                    </View>

                    <Text className="text-xs text-gray-600">
                        Sector B · Confidence 82%
                    </Text>

                    <Text className="text-xs text-gray-500 mt-1">
                        2 minutes ago
                    </Text>
                </View>

                {/* Alert Card – Warning */}
                <View className="bg-white border border-orange-200 rounded-xl p-4 mb-4">
                    <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-sm font-semibold text-orange-700">
                            Animal Movement
                        </Text>
                        <Text className="text-xs font-medium text-orange-600">
                            WARNING
                        </Text>
                    </View>

                    <Text className="text-xs text-gray-600">
                        Sector D · Confidence 67%
                    </Text>

                    <Text className="text-xs text-gray-500 mt-1">
                        10 minutes ago
                    </Text>
                </View>

                {/* Alert Card – Info */}
                <View className="bg-white border border-gray-200 rounded-xl p-4">
                    <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-sm font-semibold text-gray-800">
                            Background Noise
                        </Text>
                        <Text className="text-xs font-medium text-gray-500">
                            INFO
                        </Text>
                    </View>

                    <Text className="text-xs text-gray-600">
                        Sector A · Confidence 41%
                    </Text>

                    <Text className="text-xs text-gray-500 mt-1">
                        25 minutes ago
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
