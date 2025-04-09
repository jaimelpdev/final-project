import { NextResponse } from "next/server";

export default function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname === "/restricted") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
