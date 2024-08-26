"use client";

import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";

import type { Database } from "#/@types/supabase";
import { REACTIONS } from "#/constants";
import { reactionToImojiMap } from "#/libs";
import useToastStore from "#/store/toast";
import { createClientFromClient } from "#/supabase/client";

interface Props {
  isLoggedIn: boolean;
  userId?: string;
  commentId: string;
}

const CommentReactionButton: React.FC<Props> = ({
  isLoggedIn,
  userId,
  commentId,
}) => {
  const { openToast } = useToastStore();

  const supabase = createClientFromClient();

  const onClickReaction = async (
    reaction: Database["public"]["Enums"]["reaction_type"],
  ) => {
    if (!isLoggedIn) {
      return openToast({
        type: "warning",
        message: "로그인 후 이용해주세요.",
      });
    }
    if (!userId) return;

    const { data: exReaction } = await supabase
      .from("reactions")
      .select("*")
      .eq("user_id", userId)
      .eq("comment_id", commentId)
      .single();

    // 이미 리액션 존재
    if (exReaction) {
      // 존재하는 리액션을 클릭한 경우 (제거)
      if (exReaction.reaction === reaction) {
        const { error } = await supabase
          .from("reactions")
          .delete()
          .eq("id", exReaction.id);

        if (error) {
          return openToast({
            type: "error",
            message: "리액션 취소에 실패했습니다.",
          });
        }

        return openToast({
          type: "info",
          message: `"${reactionToImojiMap[reaction]}"을 취소했습니다.`,
        });
      }

      // 존재하는 리액션과 다른 리액션을 클릭한 경우 (수정)
      const { error } = await supabase
        .from("reactions")
        .update({ reaction })
        .eq("id", exReaction.id);

      if (error) {
        return openToast({
          type: "error",
          message: "리액션 변경에 실패했습니다.",
        });
      }

      return openToast({
        type: "info",
        message: `"${reactionToImojiMap[exReaction.reaction]}"에서 "${reactionToImojiMap[reaction]}"으로 변경했습니다.`,
      });
    }

    // 리액션 추가
    const { error } = await supabase.from("reactions").insert({
      reaction,
      user_id: userId,
      comment_id: commentId,
    });

    if (error) {
      return openToast({
        type: "error",
        message: "리액션 추가에 실패했습니다.",
      });
    }

    openToast({
      type: "info",
      message: `"${reactionToImojiMap[reaction]}"을 추가했습니다.`,
    });
  };

  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-outline btn-sm"
        >
          <CursorArrowRaysIcon className="h-5 w-5" />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] mt-2 grid w-40 grid-cols-4 gap-2 rounded-box bg-base-100 p-2 shadow dark:bg-base-300"
        >
          {REACTIONS.map((reaction) => (
            <li
              key={reaction}
              role="button"
              className="btn btn-circle btn-sm flex items-center justify-center"
              onClick={() => onClickReaction(reaction)}
            >
              {reactionToImojiMap[reaction]}
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default CommentReactionButton;
