import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req);

    const role = req.nextauth.token?.role;

    const adminRoutes = req.nextUrl.pathname.startsWith("/dashboard/admin");
    const customerRoutes = req.nextUrl.pathname.startsWith(
      "/dashboard/customer"
    );

    if (adminRoutes && role !== "ADMIN") {
      return new Response("Forbidden", { status: 403 });
    }

    if (customerRoutes && role !== "CUSTOMER") {
      return new Response("Forbidden", { status: 403 });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
