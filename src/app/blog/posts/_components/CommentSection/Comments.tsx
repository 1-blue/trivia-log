"use client";

import { format } from "date-fns";
import type { User } from "@supabase/supabase-js";

import Avatar from "#/components/atoms/Avatar";
import CommentOptionDropdown from "./CommentOptionDropdown";
import CommentReactionButton from "./CommentReactionButton";
import CommentReactions from "./CommentReactions";
import usePostComments from "../../_hooks/usePostComments";

interface Props {
  user: User | null;
  postId: string;
}

const Comments: React.FC<Props> = ({ user, postId }) => {
  const { data, isLoading } = usePostComments(postId);
  const comments = data?.data ?? [];

  const isLoggedIn = !!user;

  if (isLoading) return <span>댓글을 불러오는 중입니다.</span>;
  if (!comments || comments.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="flex flex-col gap-3 rounded-md border border-gray-700 px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                src={comment.users?.avatar_url ?? ""}
                alt={comment.users?.name ?? ""}
                className="w-12 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {comment.users?.name}
                </span>
                <time
                  dateTime={comment.created_at}
                  className="text-xs text-gray-500"
                >
                  {format(comment.created_at, "yyyy-MM-dd HH:mm:ss")}
                </time>
              </div>
            </div>

            {user?.id === comment.user_id && (
              <CommentOptionDropdown
                userId={user.id}
                postId={postId}
                commentId={comment.id}
              />
            )}
          </div>
          <p className="whitespace-pre-wrap">{comment.content}</p>
          <div className="flex items-center gap-4">
            <CommentReactionButton
              isLoggedIn={isLoggedIn}
              userId={user?.id}
              postId={postId}
              commentId={comment.id}
            />
            <CommentReactions
              reactions={comment.reactions.map((reaction) => reaction.reaction)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
