"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api/client";
import type { Admin, User, UserRole } from "@/lib";

type AuthScope = "user" | "admin";
type Account = User | Admin;

interface AuthContextValue {
  account: Account;
  user: User | null;
  admin: Admin | null;
  scope: AuthScope;
  refreshAccount: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
  scope?: AuthScope;
  requiredRole?: UserRole;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const ADMIN_INACTIVITY_MS = 20 * 60 * 1000;
const ADMIN_ACTIVITY_STORAGE_KEY = "adminLastActivityAt";

function normalizeRole(role?: string) {
  return role?.replace(/\s+/g, "").toLowerCase();
}

export function AuthProvider({
  children,
  scope = "user",
  requiredRole,
}: AuthProviderProps) {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginPath = scope === "admin" ? "/admin/login" : "/login";

  const refreshAccount = useCallback(async () => {
    try {
      const nextAccount =
        scope === "admin" ? await authAPI.getAdmin() : await authAPI.getUser();

      if (
        scope === "user" &&
        requiredRole &&
        normalizeRole((nextAccount as User).role) !== normalizeRole(requiredRole)
      ) {
        throw new Error("This account cannot access this dashboard.");
      }

      setAccount(nextAccount);
    } catch {
      setAccount(null);
      router.replace(loginPath);
    } finally {
      setIsLoading(false);
    }
  }, [loginPath, requiredRole, router, scope]);

  useEffect(() => {
    void refreshAccount();
  }, [refreshAccount]);

  const logout = useCallback(async () => {
    setAccount(null);

    if (scope === "admin") {
      await authAPI.adminLogout();
    } else {
      await authAPI.logout();
    }

    router.replace(loginPath);
  }, [loginPath, router, scope]);

  useEffect(() => {
    if (scope !== "admin" || !account) return;

    let inactivityTimer: ReturnType<typeof setTimeout>;
    let lastRecordedAt = 0;

    const scheduleLogout = () => {
      clearTimeout(inactivityTimer);
      const storedActivity = Number(
        localStorage.getItem(ADMIN_ACTIVITY_STORAGE_KEY),
      );
      const lastActivity = Number.isFinite(storedActivity) && storedActivity > 0
        ? storedActivity
        : Date.now();
      const remaining = ADMIN_INACTIVITY_MS - (Date.now() - lastActivity);

      if (remaining <= 0) {
        void logout();
        return;
      }
      inactivityTimer = setTimeout(() => void logout(), remaining);
    };

    const recordActivity = () => {
      const now = Date.now();
      if (now - lastRecordedAt < 1000) return;
      lastRecordedAt = now;
      localStorage.setItem(ADMIN_ACTIVITY_STORAGE_KEY, String(now));
      scheduleLogout();
    };

    const syncActivity = (event: StorageEvent) => {
      if (event.key === ADMIN_ACTIVITY_STORAGE_KEY) scheduleLogout();
    };

    if (!localStorage.getItem(ADMIN_ACTIVITY_STORAGE_KEY)) {
      localStorage.setItem(ADMIN_ACTIVITY_STORAGE_KEY, String(Date.now()));
    }
    scheduleLogout();

    const activityEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "pointermove",
      "keydown",
      "scroll",
      "touchstart",
    ];
    activityEvents.forEach((eventName) =>
      window.addEventListener(eventName, recordActivity, { passive: true }),
    );
    window.addEventListener("storage", syncActivity);

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((eventName) =>
        window.removeEventListener(eventName, recordActivity),
      );
      window.removeEventListener("storage", syncActivity);
    };
  }, [account, logout, scope]);

  const value = useMemo<AuthContextValue | null>(() => {
    if (!account) return null;

    return {
      account,
      user: scope === "user" ? (account as User) : null,
      admin: scope === "admin" ? (account as Admin) : null,
      scope,
      refreshAccount,
      logout,
    };
  }, [account, logout, refreshAccount, scope]);

  if (isLoading || !value) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-secondary/25 border-t-secondary"
          role="status"
          aria-label="Checking your session"
        />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}

export function getAccountName(account: Account) {
  const fullName = [account.firstName, account.lastName].filter(Boolean).join(" ");
  return fullName || account.email.split("@")[0];
}

export function getAccountInitials(account: Account) {
  const initials = [account.firstName, account.lastName]
    .filter(Boolean)
    .map((name) => name?.[0])
    .join("");

  return (initials || account.email.slice(0, 2)).toUpperCase();
}
