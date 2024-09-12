"use client";

import usePostCommentCount from "../../_hooks/usePostCommentCount";

interface Props {
  postId: string;
}

const CommentTitle: React.FC<Props> = ({ postId }) => {
  const { data } = usePostCommentCount(postId);
  const count = data?.count ?? 0;

  return (
    <div className="mb-4 flex flex-row items-center gap-1">
      <span className="text-xl font-semibold">댓글</span>
      <span>({count}개)</span>
    </div>
  );
};

export default CommentTitle;
