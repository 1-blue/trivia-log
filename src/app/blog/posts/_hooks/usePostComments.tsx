import { useQuery } from "@tanstack/react-query";
import { createClientFromClient } from "#/supabase/client";
import apis from "#/apis";

const usePostComments = (postId: string) => {
  const supabase = createClientFromClient();

  return useQuery({
    queryKey: apis.post.comment.getMany.key({ postId }),
    queryFn: () => apis.post.comment.getMany.fn(supabase, { postId }),
  });
};

export default usePostComments;
