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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const userToken = request.cookies.get("user_token")?.value;

  const adminToken = request.cookies.get("admin_token")?.value;

  const isUserDashboard = pathname.startsWith("/dashboard");
  const isUserAuthPage = pathname === "/login" || pathname === "/register";

  const isAdminDashboard = pathname.startsWith("/admin/dashboard");
  const isAdminAuthPage = pathname === "/admin/login";

  // USER FLOW
  if (isUserDashboard || isUserAuthPage) {
    const isUserAuthenticated = userToken
      ? hasExpectedTokenType(userToken, "user_access")
      : false;

    if (isUserDashboard && !isUserAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // ADMIN FLOW
  if (isAdminDashboard || isAdminAuthPage) {
    const isAdminAuthenticated = adminToken
      ? hasExpectedTokenType(adminToken, "admin_access")
      : false;

    if (isAdminDashboard && !isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isAdminAuthPage && isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

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
