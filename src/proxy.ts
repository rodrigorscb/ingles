import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Public pages and the public demo still work before local keys are configured.
  if (!url || !key) return response;

  const isPrivateRoute = request.nextUrl.pathname.startsWith("/progresso") || request.nextUrl.pathname.startsWith("/conta");
  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
          for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
        },
      },
    });

    const { data, error } = await supabase.auth.getClaims();
    if (error) throw error;
    if (isPrivateRoute && !data?.claims) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      for (const cookie of response.cookies.getAll()) {
        redirectResponse.cookies.set(cookie);
      }
      for (const [name, value] of response.headers.entries()) {
        if (name.toLowerCase() !== "location") redirectResponse.headers.set(name, value);
      }
      return redirectResponse;
    }

    return response;
  } catch (error) {
    console.error("[auth] Proxy could not verify the request session:", error instanceof Error ? error.name : "unknown error");
    if (isPrivateRoute) {
      const loginUrl = new URL("/login?error=unavailable", request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      for (const cookie of response.cookies.getAll()) redirectResponse.cookies.set(cookie);
      return redirectResponse;
    }
    return response;
  }
}

export const config = {
  matcher: ["/conta/:path*", "/login/:path*", "/auth/:path*"],
};
