import { useQuery } from "@tanstack/react-query";
import { createClientFromClient } from "#/supabase/client";
import apis from "#/apis";

const usePostCommentCount = (postId: string) => {
  const supabase = createClientFromClient();

  return useQuery({
    queryKey: apis.post.comment.count.key({ postId }),
    queryFn: () => apis.post.comment.count.fn(supabase, { postId }),
  });
};

export default usePostCommentCount;
