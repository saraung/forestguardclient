// hooks/useMe.ts
import { useEffect, useState } from "react";
import { getMeApi, MeResponse } from "@/api/users.api";

export function useMe() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadMe() {
    setLoading(true);
    const data = await getMeApi();
    setMe(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMe();
  }, []);

  return {
    me,
    loading,
    reload: loadMe,
  };
}
