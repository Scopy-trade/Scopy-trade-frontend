import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string) {
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return true;
  } catch (err) {
    console.error("Token verification failed:", err); // see the real reason

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
      ? await verifyToken(userToken)
      : false;

    if (isUserDashboard && !isUserAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // ADMIN FLOW
  if (isAdminDashboard || isAdminAuthPage) {
    const isAdminAuthenticated = adminToken
      ? await verifyToken(adminToken)
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
