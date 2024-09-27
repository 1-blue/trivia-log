"use client";

import React, { useRef } from "react";

import useToastStore from "#/store/toast";
import { createClientFromClient } from "#/supabase/client";
import apis from "#/apis";

import Textarea from "#/components/atoms/Textarea";
import Avatar from "#/components/atoms/Avatar";

import usePostComments from "#/app/blog/posts/_hooks/usePostComments";

interface Props {
  me: {
    id: string;
    name: string;
    avatarURL: string;
    provider: string | undefined;
  };
  postId: string;
  commentId: string;
}

const RecommentForm: React.FC<Props> = ({ me, postId, commentId }) => {
  const supabase = createClientFromClient();
  const { openToast } = useToastStore();
  const { refetch } = usePostComments(postId);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const content = e.currentTarget.content.value;

    if (content.trim().length === 0) {
      return openToast({ type: "warning", message: "답글을 작성해주세요." });
    }

    try {
      const { error } = await apis.post.comment.recomment.post.fn(supabase, {
        userId: me.id,
        postId,
        commentId,
        content,
      });

      if (error) return openToast({ type: "error", message: error.message });

      formRef.current?.reset();
      openToast({ type: "success", message: "답글을 작성했습니다." });
      refetch();
    } catch (error) {
      openToast({
        type: "error",
        message: `알 수 없는 문제로 답글 작성에 실패했습니다.\n새로고침 후 다시 시도해주세요.`,
      });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="mt-2 flex flex-col gap-3 border-t pt-4"
    >
      <Textarea
        name="content"
        className="max-h-[200px] flex-1"
        rows={3}
        placeholder="ex) 게시글 출처만 링크로 남겨주시면 마음대로 사용해도 됩니다!"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={me.avatarURL}
            alt={`${me.name}님의 프로필 이미지`}
            className="w-14"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{me.name}</span>
            {me.provider && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                ( {me.provider.charAt(0).toUpperCase() + me.provider.slice(1)} )
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-outline self-start">
          답글 작성
        </button>
      </div>
    </form>
  );
};

export default React.memo(RecommentForm);