import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const authPages = ["/sign-in", "/sign-up"];
  const protectedPages = ["/dashboard"];

  const isAuthPage = authPages.some(
    (page) => request.nextUrl.pathname === page
  );
  const isProtectedRoute = protectedPages.some((page) =>
    request.nextUrl.pathname.startsWith(page)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Se tem token e está em página de login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
