import React from "react";

import usePostRecomments from "#/app/blog/posts/_hooks/usePostRecomments";

import Recomment from "#/app/blog/posts/_components/CommentSection/RecommentSection/Recomment";

interface Props {
  me?: {
    id: string;
    name: any;
    avatarURL: any;
    provider: string | undefined;
  } | null;
  postId: string;
  commentId: string;
  allCount: number;
}

const Recomments: React.FC<Props> = ({ me, postId, commentId, allCount }) => {
  const { data, isLoading } = usePostRecomments(postId, commentId);
  const recomments = data?.data ?? [];

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2 border-t pt-4">
        {Array(allCount)
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
  if (!recomments || recomments.length === 0) return null;

  return (
    <ul className="mt-4 flex flex-col gap-2 border-t pt-4">
      {recomments.map((recomment) => (
        <Recomment
          key={recomment.id}
          me={me}
          postId={postId}
          commentId={commentId}
          recomment={recomment}
        />
      ))}
    </ul>
  );
};

export default Recomments;
