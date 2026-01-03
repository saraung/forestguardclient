// app/(tabs)/dashboard.tsx
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                        Live forest monitoring overview
                    </Text>
                </View>

                {/* KPI Cards */}
                <View className="flex-row gap-4 mb-6">
                    <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4">
                        <Text className="text-xs text-gray-500 mb-1">
                            ACTIVE ALERTS
                        </Text>
                        <Text className="text-3xl font-bold text-red-600">
                            3
                        </Text>
                    </View>

                    <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4">
                        <Text className="text-xs text-gray-500 mb-1">
                            DEVICES ONLINE
                        </Text>
                        <Text className="text-3xl font-bold text-green-700">
                            18 / 20
                        </Text>
                    </View>
                </View>

                {/* System Status */}
                <View className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                    <Text className="text-sm font-semibold text-gray-800 mb-3">
                        System Status
                    </Text>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-sm text-gray-600">
                            Network Connectivity
                        </Text>
                        <Text className="text-sm font-medium text-green-700">
                            Stable
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-sm text-gray-600">
                            Last Sync
                        </Text>
                        <Text className="text-sm text-gray-800">
                            2 minutes ago
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-sm text-gray-600">
                            Model Version
                        </Text>
                        <Text className="text-sm text-gray-800">
                            TinyML v1.2
                        </Text>
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="bg-white border border-gray-200 rounded-xl p-4">
                    <Text className="text-sm font-semibold text-gray-800 mb-3">
                        Recent Activity
                    </Text>

                    <View className="mb-3">
                        <Text className="text-sm font-medium text-red-600">
                            Chainsaw detected
                        </Text>
                        <Text className="text-xs text-gray-500">
                            Sector B • Confidence 82% • 2 mins ago
                        </Text>
                    </View>

                    <View>
                        <Text className="text-sm font-medium text-orange-600">
                            Animal movement detected
                        </Text>
                        <Text className="text-xs text-gray-500">
                            Sector D • Confidence 67% • 10 mins ago
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
