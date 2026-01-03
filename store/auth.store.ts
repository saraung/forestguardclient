// store/auth.store.ts
import { create } from "zustand";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

// Web fallback storage (memory only)
let webToken: string | null = null;

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setToken: (token: string) => Promise<void>;
  restoreToken: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setToken: async (token) => {
    if (Platform.OS === "web") {
      webToken = token;
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }

    set({
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  restoreToken: async () => {
    let token: string | null = null;

    if (Platform.OS === "web") {
      token = webToken;
    } else {
      token = await SecureStore.getItemAsync(TOKEN_KEY);
    }

    set({
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  },

  logout: async () => {
    if (Platform.OS === "web") {
      webToken = null;
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }

    set({
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
