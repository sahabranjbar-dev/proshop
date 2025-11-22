// proxy.ts (Refactored & Secure)
import { getServerSession } from "next-auth/next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "./lib/authOptions";

export async function proxy(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/admin", "/customer"];
  const loginUrl = new URL("/auth", req.url);

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!session) {
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!session?.user || session.user.role !== "ADMIN") {
      console.warn(`Unauthorized access attempt to ${pathname}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
