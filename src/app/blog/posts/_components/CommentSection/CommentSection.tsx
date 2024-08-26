import { createClientFromServer } from "#/supabase/server";

import LogInDialog from "#/components/auth/LogInDialog";
import LogInButton from "#/components/auth/LogInButton";
import Comments from "#/app/blog/posts/_components/CommentSection/Comments";
import CommentForm from "#/app/blog/posts/_components/CommentSection/CommentForm";

interface Props {
  postId: string;
}

const CommentSection: React.FC<Props> = async ({ postId }) => {
  const supabase = createClientFromServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  const { count } = await supabase
    .from("comments")
    .select("*", { count: "estimated", head: true });

  const me = user && {
    id: user.id,
    name: user.user_metadata.name,
    avatarURL: user.user_metadata.avatar_url,
    provider: user.app_metadata.provider,
  };

  return (
    <>
      <div className="mb-4 flex flex-row items-center gap-1">
        <span className="text-xl font-semibold">댓글</span>
        <span>({count}개)</span>
      </div>

      <Comments postId={postId} />

      <div className="mt-4">
        {isLoggedIn && me ? (
          <CommentForm me={me} postId={postId} />
        ) : (
          <>
            <LogInButton className="btn btn-outline ml-auto block">
              로그인 후 댓글 작성
            </LogInButton>
            <LogInDialog />
          </>
        )}
      </div>
    </>
  );
};

export default CommentSection;
