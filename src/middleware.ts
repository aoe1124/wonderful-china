import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 如果用户已登录但访问登录页，重定向到后台首页
    if (req.nextUrl.pathname === "/admin/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // 登录页不需要验证
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // 其他后台页面需要验证
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// 配置需要保护的路由
export const config = {
  matcher: ["/admin/:path*"],
}; 