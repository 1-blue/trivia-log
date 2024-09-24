import React, { useState } from "react";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import type { CustomHookReturnType } from "#/libs";

import Avatar from "#/components/atoms/Avatar";

import usePostComments from "#/app/blog/posts/_hooks/usePostComments";

import CommentOptionDropdown from "#/app/blog/posts/_components/CommentSection/CommentOptionDropdown";
import CommentReactionButton from "#/app/blog/posts/_components/CommentSection/CommentReactionButton";
import CommentReactions from "#/app/blog/posts/_components/CommentSection/CommentReactions";
import RecommentForm from "#/app/blog/posts/_components/CommentSection/RecommentSection/RescommentForm";
import Recomments from "#/app/blog/posts/_components/CommentSection/RecommentSection/Recomments";

interface Props {
  me?: {
    id: string;
    name: any;
    avatarURL: any;
    provider: string | undefined;
  } | null;
  postId: string;
  comment: CustomHookReturnType<typeof usePostComments>;
}

const Comment: React.FC<Props> = ({ me, postId, comment }) => {
  const [showRecomments, setShowRecomments] = useState(false);
  const toggleRecomments = () => setShowRecomments((prev) => !prev);

  const [showRecommentForm, setShowRecommentForm] = useState(false);
  const toggleRecommentForm = () => setShowRecommentForm((prev) => !prev);

  const isLoggedIn = !!me;
  const hasRecomments = comment.recomments[0].count > 0;

  return (
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
            <span className="text-sm font-semibold">{comment.users?.name}</span>
            <time
              dateTime={comment.created_at}
              className="text-xs text-gray-500"
            >
              {format(comment.created_at, "yyyy-MM-dd HH:mm:ss")}
            </time>
          </div>
        </div>

        {me?.id === comment.user_id && (
          <CommentOptionDropdown
            userId={me.id}
            postId={postId}
            commentId={comment.id}
          />
        )}
      </div>
      <p className="whitespace-pre-wrap">{comment.content}</p>
      <div className="flex items-center gap-4">
        {hasRecomments && (
          <button
            type="button"
            className="btn btn-outline btn-sm flex items-center gap-1.5"
            onClick={toggleRecomments}
          >
            <PaperAirplaneIcon
              className={twMerge("h-4 w-4", showRecomments && "rotate-90")}
            />
            <span>{comment.recomments[0].count}</span>
          </button>
        )}
        {isLoggedIn && (
          <CommentReactionButton
            isLoggedIn={isLoggedIn}
            userId={me.id}
            postId={postId}
            commentId={comment.id}
          />
        )}
        <CommentReactions
          reactions={comment.reactions.map((reaction) => reaction.reaction)}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm ml-auto gap-1"
          onClick={toggleRecommentForm}
        >
          {showRecommentForm ? (
            <XCircleIcon className="h-5 w-5" />
          ) : (
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          )}
          <span>{showRecommentForm ? "닫기" : "답글달기"}</span>
        </button>
      </div>

      {showRecomments && hasRecomments && (
        <Recomments
          me={me}
          postId={postId}
          commentId={comment.id}
          allCount={comment.recomments[0].count}
        />
      )}

      {me && showRecommentForm && (
        <RecommentForm me={me} postId={postId} commentId={comment.id} />
      )}
    </li>
  );
};

export default React.memo(Comment);
