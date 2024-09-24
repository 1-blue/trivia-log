"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { createClientFromClient } from "#/supabase/client";
import useToastStore from "#/store/toast";
import apis from "#/apis";

interface Props {
  userId: string;
  postId: string;
  commentId: string;
  recommentId: string;
}

const RecommentOptionDropdown: React.FC<Props> = ({
  userId,
  postId,
  commentId,
  recommentId,
}) => {
  const queryClient = useQueryClient();
  const supabase = createClientFromClient();
  const { openToast } = useToastStore();

  const onDeleteRecomment = async (recommentId: string) => {
    const { error } = await apis.post.comment.recomment.delete.fn(supabase, {
      userId,
      postId,
      commentId,
      recommentId,
    });

    if (error) return openToast({ type: "error", message: error.message });

    openToast({ type: "success", message: "답글을 삭제했습니다." });

    queryClient.invalidateQueries({
      queryKey: apis.post.comment.recomment.getMany.key({
        postId,
        commentId,
      }),
    });
  };

  return (
    <div className="dropdown dropdown-end dropdown-bottom dropdown-hover h-6 w-6 self-start">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost btn-sm"
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-2 w-20 rounded-box bg-base-100 p-2 shadow dark:bg-base-200"
      >
        <li>
          <button type="button" onClick={() => onDeleteRecomment(recommentId)}>
            삭제
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(RecommentOptionDropdown);
