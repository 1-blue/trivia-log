import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import apis from "#/apis";
import { createClientFromServer } from "#/supabase/server";

import Comments from "#/app/blog/posts/_components/CommentSection/Comments";
import CommentForm from "#/app/blog/posts/_components/CommentSection/CommentForm";
import CommentTitle from "#/app/blog/posts/_components/CommentSection/CommentTitle";
import CommentLogInCTA from "#/app/blog/posts/_components/CommentSection/CommentLogInCTA";

interface Props {
  postId: string;
}

const CommentSection: React.FC<Props> = async ({ postId }) => {
  const supabase = createClientFromServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const me = user && {
    id: user.id,
    name: user.user_metadata.name,
    avatarURL: user.user_metadata.avatar_url,
    provider: user.app_metadata.provider,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: apis.post.comment.getMany.key({ postId }),
    queryFn: () => apis.post.comment.getMany.fn(supabase, { postId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div id="post-comment-section" />

      <CommentTitle postId={postId} />

      <Comments user={user} postId={postId} />

      <div className="mt-4">
        {me ? <CommentForm me={me} postId={postId} /> : <CommentLogInCTA />}
      </div>
    </HydrationBoundary>
  );
};

export default CommentSection;
