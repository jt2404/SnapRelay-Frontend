import { useAuthStore } from "@/lib/stores/auth-store";

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clear = useAuthStore((s) => s.clear);

  return {
    token,
    user,
    hasHydrated,
    isAuthenticated: Boolean(token && user),
    setAuth,
    logout: clear,
  };
}
