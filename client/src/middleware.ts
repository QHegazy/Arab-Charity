
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from "jsonwebtoken"
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname
  const isPublicPath = path == '/signin' || path == '/signup' || path == '/' || path == '/login';
  const orgPath = path.startsWith("/org")
  const userPath = path.startsWith("/user")
  const token = request.cookies.get('accessToken')?.value || '';
  const tokenData = jwt.decode(token)
  // console.log(tokenData)
  // handle if user is not login and tray to access
  // if (!token && !isPublicPath) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }

  // if ((tokenData.Role === "Beneficiary" || tokenData.Role === "donor") && !userPath) {
  //   return NextResponse.redirect(new URL("/user", request.nextUrl))
  // }

  // if (tokenData.Role === "org" && !orgPath) {
  //   return NextResponse.redirect(new URL("/org", request.nextUrl))
  // }

  // console.log(userPath)

  // // handle if user is login and try to access public route 
  // if (token && isPublicPath) {
  //   if (tokenData.Role === "Beneficiary" || tokenData.Role === "donor") {
  //     return NextResponse.redirect(new URL('/user', request.nextUrl))
  //   } else {
  //     return NextResponse.redirect(new URL('/org', request.nextUrl))
  //   }
  // }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/org/:path*',
    '/user/:path*',
    '/login',
    '/signup',
    '/signin',

  ]
}
