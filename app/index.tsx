// app/index.tsx
import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait until token restore finishes
  if (isLoading) {
    return null; // splash screen can be shown here later
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/dashboard" />;
}
