"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { createClientFromClient } from "#/supabase/client";
import useToastStore from "#/store/toast";
import apis from "#/apis";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  userId: string;
  postId: string;
  commentId: string;
}

const CommentOptionDropdown: React.FC<Props> = ({
  userId,
  postId,
  commentId,
}) => {
  const queryClient = useQueryClient();
  const supabase = createClientFromClient();
  const { openToast } = useToastStore();

  const onDeleteComment = async (commentId: string) => {
    const { error } = await apis.post.comment.delete.fn(supabase, {
      userId,
      postId,
      commentId,
    });

    if (error) return openToast({ type: "error", message: error.message });

    openToast({ type: "success", message: "댓글을 삭제했습니다." });

    queryClient.invalidateQueries({
      queryKey: apis.post.comment.getMany.key({ postId }),
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
          <button type="button" onClick={() => onDeleteComment(commentId)}>
            삭제
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CommentOptionDropdown;
