"use client";

import useToastStore from "#/store/toast";
import { createClientFromClient } from "#/supabase/client";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LogOutButton: React.FC<Props> = ({ onClick, ...props }) => {
  const supabase = createClientFromClient();
  const { openToast } = useToastStore();

  const onLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return openToast({ type: "error", message: error.message });

      openToast({ type: "success", message: "로그아웃이 되었습니다." });
    } catch (error) {
      openToast({
        type: "error",
        message: `알 수 없는 문제로 로그아웃에 실패했습니다.\n새로고침 후 다시 시도해주세요.`,
      });
    }
  };

  return (
    <button type="button" onClick={onLogOut} {...props}>
      로그아웃
    </button>
  );
};

export default LogOutButton;
