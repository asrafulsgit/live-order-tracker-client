// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyAccessToken } from "./utils/verifyToken";

// export default function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   console.log('Hello i am proxy')
//   const accessToken = request.cookies.get("accessToken")?.value;

//   // User accessible routes
//   const userRoutes = ["/food", "/orders"];

//   // Admin accessible routes
//   const adminRoutes = ["/admin"];

//   // Public routes
//   const authRoute = ["/auth"];

//   const isUserRoute = userRoutes.some(
//     (route) => pathname === route || pathname.startsWith(`${route}/`),
//   );

//   const isAdminRoute = adminRoutes.some(
//     (route) => pathname === route || pathname.startsWith(`${route}/`),
//   );

//   const isAuthRoute = authRoute.some((route) =>
//     pathname.startsWith(route),
//   );
//   console.log(accessToken)
//   // No token → redirect protected routes to auth
//   if (!accessToken) {
//     if (isUserRoute || isAdminRoute) {
//       console.log("token nai",accessToken)
//       return NextResponse.redirect(new URL("/auth", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Verify token
//   const verified = verifyAccessToken(accessToken);
//   // Invalid token
//   if (!verified) {
//     const response = NextResponse.redirect(new URL("/auth", request.url));

//     response.cookies.delete("accessToken");
//     return response;
//   }

//   const userRole = verified.role;

//   // Logged-in user trying to access auth page
//   if (isAuthRoute) {
//     if (userRole === "ADMIN") {
//       return NextResponse.redirect(new URL("/admin", request.url));
//     }
//     if (userRole === "USER") {
//       return NextResponse.redirect(new URL("/", request.url));
//     } 
//   }

//   // Admin route protection
//   if (isAdminRoute && userRole !== "ADMIN") {
//     return NextResponse.redirect(new URL("/not-found", request.url));
//   }

//   // User route protection
//   if (isUserRoute && userRole === "ADMIN") {
//     return NextResponse.redirect(new URL("/admin", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  console.log("i am proxy")
  // return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ["/"],
}
