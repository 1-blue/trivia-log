import { createClientFromServer } from "#/supabase/server";
import { format } from "date-fns";

import Avatar from "#/components/atoms/Avatar";
import CommentOptionDropdown from "./CommentOptionDropdown";
import CommentReactionButton from "./CommentReactionButton";
import CommentReactions from "./CommentReactions";

interface Props {
  postId: string;
}

const Comments: React.FC<Props> = async ({ postId }) => {
  const supabase = createClientFromServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: comments } = await supabase
    .from("comments")
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      users (
        id,
        name,
        avatar_url
      ),
      recomments (
        id,
        user_id,
        content,
        created_at
      ),
      reactions (
        reaction
      )
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  const isLoggedIn = !!user;

  if (!comments) return <span>댓글을 불러오는 중입니다.</span>;
  if (comments.length === 0) return <span>댓글이 없습니다.</span>;

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
              <CommentOptionDropdown commentId={comment.id} />
            )}
          </div>
          <p className="whitespace-pre-wrap">{comment.content}</p>
          <div className="flex items-center gap-4">
            <CommentReactionButton
              isLoggedIn={isLoggedIn}
              userId={user?.id}
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
