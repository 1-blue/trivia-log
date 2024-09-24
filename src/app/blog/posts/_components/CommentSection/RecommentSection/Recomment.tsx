import React from "react";
import { format } from "date-fns";

import type { CustomHookReturnType } from "#/libs";
import usePostRecomments from "#/app/blog/posts/_hooks/usePostRecomments";
import Avatar from "#/components/atoms/Avatar";

import RecommentOptionDropdown from "#/app/blog/posts/_components/CommentSection/RecommentSection/RecommentOptionDropdown";
import RecommentReactionButton from "#/app/blog/posts/_components/CommentSection/RecommentSection/RecommentReactionButton";
import RecommentReactions from "#/app/blog/posts/_components/CommentSection/RecommentSection/RecommentReactions";

interface Props {
  me?: {
    id: string;
    name: any;
    avatarURL: any;
    provider: string | undefined;
  } | null;
  postId: string;
  commentId: string;
  recomment: CustomHookReturnType<typeof usePostRecomments>;
}

const Recomment: React.FC<Props> = ({ me, postId, commentId, recomment }) => {
  const isLoggedIn = !!me;

  return (
    <li
      key={recomment.id}
      className="flex flex-col gap-3 rounded-md border border-gray-700 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={recomment.users?.avatar_url ?? ""}
            alt={recomment.users?.name ?? ""}
            className="w-12 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {recomment.users?.name}
            </span>
            <time
              dateTime={recomment.created_at}
              className="text-xs text-gray-500"
            >
              {format(recomment.created_at, "yyyy-MM-dd HH:mm:ss")}
            </time>
          </div>
        </div>

        {me?.id === recomment.user_id && (
          <RecommentOptionDropdown
            userId={me.id}
            postId={postId}
            commentId={commentId}
            recommentId={recomment.id}
          />
        )}
      </div>
      <p className="whitespace-pre-wrap">{recomment.content}</p>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <RecommentReactionButton
            isLoggedIn={isLoggedIn}
            userId={me.id}
            postId={postId}
            commentId={commentId}
            recommentId={recomment.id}
          />
        )}
        <RecommentReactions
          reactions={recomment.reactions.map((reaction) => reaction.reaction)}
        />
      </div>
    </li>
  );
};

export default React.memo(Recomment);
