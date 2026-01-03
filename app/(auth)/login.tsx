import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setLoading(true);
      setError(null);

      await login(email, password);

      // success → auth state updates → index.tsx redirects
      router.replace("/(tabs)/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#e6f4ea", "#f7fff9"]}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-center">

          {/* Branding */}
          <View className="mb-12">
            <Text className="text-4xl font-extrabold text-green-900 text-center">
              ForestGuard
            </Text>
            <Text className="text-sm text-green-800 text-center mt-2 tracking-wide">
              Forest Monitoring & Alert System
            </Text>
          </View>

          {/* Login Card */}
          <View className="bg-white rounded-3xl p-6 border border-green-100">

            <Text className="text-xl font-semibold text-gray-800 mb-6">
              Officer Login
            </Text>

            {/* Error */}
            {error && (
              <Text className="text-sm text-red-600 mb-4">
                {error}
              </Text>
            )}

            {/* Email */}
            <View className="mb-4">
              <Text className="text-xs uppercase text-gray-500 mb-1 tracking-wider">
                Email
              </Text>
              <TextInput
                placeholder="officer@forest.gov"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white"
              />
            </View>

            {/* Password */}
            <View className="mb-6">
              <Text className="text-xs uppercase text-gray-500 mb-1 tracking-wider">
                Password
              </Text>
              <TextInput
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 bg-white"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              disabled={loading}
              className={`py-3.5 rounded-xl mt-2 ${
                loading ? "bg-green-400" : "bg-green-800"
              }`}
              onPress={handleLogin}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold text-base tracking-wide">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            <Text className="text-[11px] text-gray-500 text-center mt-5">
              Authorized forest officials only
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}
