import { useQuery } from "@tanstack/react-query";

import { createClientFromClient } from "#/supabase/client";
import apis from "#/apis";

const usePostRecomments = (postId: string, commentId: string) => {
  const supabase = createClientFromClient();

  return useQuery({
    queryKey: apis.post.comment.recomment.getMany.key({ postId, commentId }),
    queryFn: () =>
      apis.post.comment.recomment.getMany.fn(supabase, { postId, commentId }),
  });
};

export default usePostRecomments;
