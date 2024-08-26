"use client";

import { usePathname } from "next/navigation";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

import { createClientFromClient } from "#/supabase/client";
import useToastStore from "#/store/toast";

import Dialog from "#/components/atoms/Dialog";

type TProvider = "github" | "google" | "kakao";

const LogInDialog = () => {
  const pathname = usePathname();
  const supabase = createClientFromClient();
  const { openToast } = useToastStore();

  const onLogIn = async (provider: TProvider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/callback?next=${pathname}`,
      },
    });

    if (error) return openToast({ type: "error", message: error.message });

    openToast({
      type: "success",
      message: `"${provider[0].toUpperCase()}${provider.slice(1)}"로 로그인이 되었습니다.`,
    });
  };

  return (
    <Dialog id="login-dialog" title="로그인">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => onLogIn("github")}
          className="btn btn-outline flex w-full items-center justify-center"
        >
          <CheckBadgeIcon className="h-6 w-6" />
          <span>GitHub</span>
        </button>
        <button
          type="button"
          onClick={() => onLogIn("google")}
          className="btn btn-outline flex w-full items-center justify-center"
        >
          <CheckBadgeIcon className="h-6 w-6" />
          <span>Google</span>
        </button>
        <button
          type="button"
          onClick={() => onLogIn("kakao")}
          className="btn btn-outline flex w-full items-center justify-center"
        >
          <CheckBadgeIcon className="h-6 w-6" />
          <span>Kakao</span>
        </button>
      </div>
    </Dialog>
  );
};

export default LogInDialog;
