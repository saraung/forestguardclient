// hooks/useAuth.ts
import { useEffect } from "react";
import { loginApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const {
    token,
    isAuthenticated,
    isLoading,
    setToken,
    restoreToken,
    logout,
  } = useAuthStore();

  // Restore token when app starts
  useEffect(() => {
    restoreToken();
  }, []);

  async function login(email: string, password: string) {
    const response = await loginApi(email, password);
    await setToken(response.token);
  }

  return {
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
