import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

function hasExpectedTokenType(token: string, type: "user_access" | "admin_access") {
  try {
    const payload = decodeJwt(token);
    return payload.tokenType === type && typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userToken = request.cookies.get("user_token")?.value;
  const adminToken = request.cookies.get("admin_token")?.value;

  const isUserDashboard = pathname.startsWith("/dashboard");
  const isUserAuthPage = pathname === "/login" || pathname === "/register";
  const isAdminDashboard = pathname.startsWith("/admin/dashboard");

  if (isUserDashboard || isUserAuthPage) {
    const isUserAuthenticated = userToken
      ? hasExpectedTokenType(userToken, "user_access")
      : false;

    if (isUserDashboard && !isUserAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  if (isAdminDashboard) {
    const isAdminAuthenticated = adminToken
      ? hasExpectedTokenType(adminToken, "admin_access")
      : false;

    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Never redirect away from the login page based only on an optimistic JWT
  // decode. The API performs the authoritative session-version check.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/admin/dashboard/:path*",
    "/admin/login",
  ],
};
