"use client";

import { useQueryClient } from "@tanstack/react-query";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";

import type { Enums } from "#/@types/supabase";
import { REACTIONS } from "#/constants";
import { reactionToImojiMap } from "#/libs";
import useToastStore from "#/store/toast";
import { createClientFromClient } from "#/supabase/client";
import apis from "#/apis";

interface Props {
  isLoggedIn: boolean;
  userId: string;
  postId: string;
  commentId: string;
  recommentId: string;
}

const RecommentReactionButton: React.FC<Props> = ({
  isLoggedIn,
  userId,
  postId,
  commentId,
  recommentId,
}) => {
  const queryClient = useQueryClient();
  const { openToast } = useToastStore();

  const supabase = createClientFromClient();

  const refetchReaction = () => {
    queryClient.invalidateQueries({
      queryKey: apis.post.comment.recomment.getMany.key({
        postId,
        commentId,
      }),
    });
  };

  /** 리액션 취소 */
  const deleteReaction = async (
    reactionId: string,
    changedReaction: Enums<"reaction_type">,
  ) => {
    if (!userId) return;

    const { error } = await apis.post.comment.recomment.reaction.delete.fn(
      supabase,
      {
        userId,
        postId,
        commentId,
        recommentId,
        reactionId,
      },
    );

    if (error) {
      return openToast({
        type: "error",
        message: "리액션 취소에 실패했습니다.",
      });
    }

    refetchReaction();

    openToast({
      type: "info",
      message: `"${reactionToImojiMap[changedReaction]}"을 취소했습니다.`,
    });
  };
  /** 리액션 수정 */
  const updateReaction = async (
    reactionId: string,
    prevReaction: Enums<"reaction_type">,
    changedReaction: Enums<"reaction_type">,
  ) => {
    if (!userId) return;

    // 존재하는 리액션과 다른 리액션을 클릭한 경우 (수정)
    const { error } = await apis.post.comment.recomment.reaction.update.fn(
      supabase,
      {
        userId,
        postId,
        commentId,
        recommentId,
        reactionId,
        reaction: changedReaction,
      },
    );

    if (error) {
      return openToast({
        type: "error",
        message: "리액션 변경에 실패했습니다.",
      });
    }

    refetchReaction();

    openToast({
      type: "info",
      message: `"${reactionToImojiMap[prevReaction]}"에서 "${reactionToImojiMap[changedReaction]}"으로 변경했습니다.`,
    });
  };
  /** 리액션 추가 */
  const postReaction = async (reaction: Enums<"reaction_type">) => {
    if (!userId) return;

    // 리액션 추가
    const { error } = await apis.post.comment.recomment.reaction.post.fn(
      supabase,
      {
        userId,
        postId,
        commentId,
        recommentId,
        reaction,
      },
    );

    if (error) {
      return openToast({
        type: "error",
        message: "리액션 추가에 실패했습니다.",
      });
    }

    refetchReaction();

    openToast({
      type: "info",
      message: `"${reactionToImojiMap[reaction]}"을 추가했습니다.`,
    });
  };
  const onClickReaction = async (reaction: Enums<"reaction_type">) => {
    if (!isLoggedIn || !userId) {
      return openToast({
        type: "warning",
        message: "로그인 후 이용해주세요.",
      });
    }

    const { data: exReaction } =
      await apis.post.comment.recomment.reaction.get.fn(supabase, {
        userId,
        postId,
        commentId,
        recommentId,
      });

    // 리액션 존재하지 않음 ( 생성 )
    if (!exReaction) return postReaction(reaction);

    // 존재하는 리액션을 클릭한 경우 ( 제거 )
    if (exReaction.reaction === reaction) {
      return deleteReaction(exReaction.id, exReaction.reaction);
    }

    // 존재하는 리액션을 클릭한 경우 ( 수정 )
    updateReaction(exReaction.id, exReaction.reaction, reaction);
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
        </ul>
      </div>
    </div>
  );
};

export default RecommentReactionButton;
