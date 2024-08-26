import { NextResponse } from "next/server";

import { createClientFromServer } from "#/supabase/server";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const supabase = createClientFromServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isDevelopmentMode = process.env.NODE_ENV === "development";

  if (isDevelopmentMode) return NextResponse.redirect(`${origin}${next}`);
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
};
