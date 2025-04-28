import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/bookings", "/chat", "/service", "/event", "/retreat"];

// Middleware function
export async function middleware(req) {
  const token = await getToken({ req });

  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: [
    // Apply middleware to all routes except those that should be excluded
    "/((?!api|_next/static|_next/image|.*\\..*).*)",
  ],
};
