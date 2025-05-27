import { NextResponse } from "next/server";

/**
 * Middleware function to handle route protection and redirects
 * This middleware runs on every request and can modify the response
 * @param {Object} req - The incoming request object
 * @returns {NextResponse} - The modified response
 */
export default function middleware(req) {
  const url = req.nextUrl;

  // Redirect unauthenticated users from restricted routes to login page
  if (url.pathname === "/restricted") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue with the request if no redirect is needed
  return NextResponse.next();
}
