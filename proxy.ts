import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "./lib/authOptions";

type Rule = (req: NextRequest, session: any) => NextResponse | void;

const redirectToLogin = (req: NextRequest) =>
  NextResponse.redirect(new URL("/auth", req.url));

// 1) قواعد مخصوص مسیرهای Admin
const adminRules: Rule[] = [
  (req, session) => {
    if (!session) return redirectToLogin(req);
  },
  (req, session) => {
    if (session?.user?.role !== "ADMIN") return redirectToLogin(req);
  },
];

// 2) قواعد مخصوص مسیرهای Customer
const customerRules: Rule[] = [
  (req, session) => {
    if (!session?.user) return redirectToLogin(req);
  },
];

// 3) قوانین امنیتی API ها (اختیاری ولی خوبه)
const apiRules: Rule[] = [
  (req, session) => {
    // مثلا اگه بخوای فقط کاربران لاگین کرده API رو بخونن
    if (!session)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  },
  (req, session) => {
    // مثال: برای API admin
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      if (session?.user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  },
];

// 4) انتخاب rule بر اساس مسیر
function getRulesForPath(pathname: string): Rule[] {
  if (pathname.startsWith("/admin")) return adminRules;
  if (pathname.startsWith("/customer")) return customerRules;
  if (pathname.startsWith("/api/admin") || pathname.startsWith("/api/customer"))
    return apiRules;

  return [];
}

// 5) تابع اصلی proxy
export async function proxy(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const pathname = req.nextUrl.pathname;

  const rules = getRulesForPath(pathname);

  for (const rule of rules) {
    const result = rule(req, session);
    if (result instanceof NextResponse) return result;
  }

  return NextResponse.next();
}

// 6) مجوز مسیرها
export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/api/:path*"],
};
