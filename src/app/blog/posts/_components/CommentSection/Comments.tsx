"use client";

import React from "react";
import type { User } from "@supabase/supabase-js";

import Comment from "#/app/blog/posts/_components/CommentSection/Comment";
import usePostComments from "#/app/blog/posts/_hooks/usePostComments";

interface Props {
  user: User | null;
  postId: string;
}

const Comments: React.FC<Props> = ({ user, postId }) => {
  const { data, isLoading } = usePostComments(postId);
  const comments = data?.data ?? [];

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <li
              key={index}
              className="skeleton h-32 w-full dark:bg-gray-700/60"
            />
          ))}
      </ul>
    );
  }
  if (!comments || comments.length === 0) return null;

  const me = user && {
    id: user.id,
    name: user.user_metadata.name,
    avatarURL: user.user_metadata.avatar_url,
    provider: user.app_metadata.provider,
  };

  return (
    <ul className="flex flex-col gap-2">
      {comments.map((comment) => (
        <Comment key={comment.id} me={me} postId={postId} comment={comment} />
      ))}
    </ul>
  );
};

export default Comments;
