import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/api/client";

type MeResponse = {
  email: string;
  role: string;
  enabled: boolean;
  emailVerified: boolean;
};

export default function Profile() {
  const { logout } = useAuth();
  const [me, setMe] = useState<MeResponse | null>(null);

  useEffect(() => {
    api.get("/api/users/me").then((res) => {
      setMe(res.data);
    });
  }, []);

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Profile
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            Officer account details
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <Text className="text-sm text-gray-500 mb-1">EMAIL</Text>
          <Text className="text-base font-semibold text-gray-900 mb-4">
            {me?.email ?? "—"}
          </Text>

          <Text className="text-sm text-gray-500 mb-1">ROLE</Text>
          <Text className="text-base text-gray-700 mb-4">
            {me?.role ?? "—"}
          </Text>

          <Text className="text-sm text-gray-500 mb-1">STATUS</Text>
          <Text
            className={`text-base font-medium ${
              me?.enabled ? "text-green-700" : "text-red-600"
            }`}
          >
            {me?.enabled ? "Active" : "Disabled"}
          </Text>
        </View>

        {/* Settings */}
        <View className="bg-white border border-gray-200 rounded-xl mb-6">
          <TouchableOpacity className="p-4 border-b border-gray-200">
            <Text className="text-gray-800">Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4">
            <Text className="text-gray-800">About ForestGuard</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="bg-red-600 py-3 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-medium">
            Logout
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
