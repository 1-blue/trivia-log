import type { Tables } from "#/@types/supabase";
import type { TypedSupabaseClient } from "#/types";

/** 답글 생성 요청 매개변수 타입 */
interface PostRecommentRequest {
  readonly userId: Tables<"users">["id"];
  readonly postId: Tables<"posts">["id"];
  readonly commentId: Tables<"comments">["id"];
  readonly content: string;
}
/** 답글 생성 요청 */
const postComment = async (
  supabase: TypedSupabaseClient,
  body: PostRecommentRequest,
) => {
  return await supabase
    .from("recomments")
    .insert({
      user_id: body.userId,
      post_id: body.postId,
      comment_id: body.commentId,
      content: body.content,
    })
    .select();
};

// =========================== 구분선 ===========================

/** 답글 리스트 조회 요청 매개변수 타입 */
interface GetPostRecommentsRequest {
  readonly postId: Tables<"posts">["id"];
  readonly commentId: Tables<"comments">["id"];
}
/** 답글 리스트 조회 요청 */
const getPostComments = async (
  supabase: TypedSupabaseClient,
  body: GetPostRecommentsRequest,
) => {
  return await supabase
    .from("recomments")
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
    reactions (
      reaction
    )
  `,
    )
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId)
    .order("created_at", { ascending: true });
};

// =========================== 구분선 ===========================

/** 답글 개수 조회 요청 매개변수 타입 */
interface GetPostRecommentsCountRequest {
  readonly postId: Tables<"posts">["id"];
  readonly commentId: Tables<"comments">["id"];
}
/** 답글 개수 조회 요청 */
const getPostCommentsCount = async (
  supabase: TypedSupabaseClient,
  body: GetPostRecommentsCountRequest,
) => {
  return await supabase
    .from("recomments")
    .select("*", { count: "exact" })
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId);
};

// =========================== 구분선 ===========================

/** 답글 삭제 요청 매개변수 타입  */
interface DeleteRecommentRequest {
  readonly userId: Tables<"users">["id"];
  readonly postId: Tables<"posts">["id"];
  readonly commentId: Tables<"comments">["id"];
  readonly recommentId: Tables<"recomments">["id"];
}
/** 답글 삭제 요청 */
const deleteComment = async (
  supabase: TypedSupabaseClient,
  body: DeleteRecommentRequest,
) => {
  return await supabase
    .from("recomments")
    .delete()
    .eq("id", body.recommentId)
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId);
};

// =========================== 구분선 ===========================

export const recommentApis = {
  post: {
    /** 답글 생성 key */
    key: (body: PostRecommentRequest) => [
      "post",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      body.content,
    ],
    /** 답글 생성 함수 */
    fn: postComment,
  },
  getMany: {
    /** 답글 리스트 조회 key */
    key: (body: GetPostRecommentsRequest) => [
      "get",
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
    ],
    /** 답글 리스트 조회 함수 */
    fn: getPostComments,
  },
  count: {
    /** 답글 개수 조회 key */
    key: (body: GetPostRecommentsCountRequest) => [
      "get",
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      "count",
    ],
    /** 답글 개수 조회 함수 */
    fn: getPostCommentsCount,
  },
  delete: {
    /** 답글 삭제 key */
    key: (body: DeleteRecommentRequest) => [
      "delete",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      body.recommentId,
    ],
    /** 답글 삭제 함수 */
    fn: deleteComment,
  },
};
