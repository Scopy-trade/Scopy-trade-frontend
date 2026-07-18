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
