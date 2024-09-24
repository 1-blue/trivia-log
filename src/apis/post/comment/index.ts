import type { Tables } from "#/@types/supabase";
import type { TypedSupabaseClient } from "#/types";

/** 댓글 생성 요청 매개변수 타입 */
interface PostCommentRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  content: string;
}
/** 댓글 생성 요청 */
const postComment = async (
  supabase: TypedSupabaseClient,
  body: PostCommentRequest,
) => {
  return await supabase
    .from("comments")
    .insert({
      user_id: body.userId,
      post_id: body.postId,
      content: body.content,
    })
    .select();
};

// =========================== 구분선 ===========================

/** 댓글 리스트 조회 요청 매개변수 타입 */
interface GetPostCommentsRequest {
  postId: Tables<"posts">["id"];
}
/** 댓글 리스트 조회 요청 */
const getPostComments = async (
  supabase: TypedSupabaseClient,
  body: GetPostCommentsRequest,
) => {
  return await supabase
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
    reactions (
      reaction
    ),
    recomments (count)
  `,
    )
    .eq("post_id", body.postId)
    .order("created_at", { ascending: true });
};

// =========================== 구분선 ===========================

/** 댓글 개수 조회 요청 매개변수 타입 */
interface GetPostCommentsCountRequest {
  postId: Tables<"posts">["id"];
}
/** 댓글 개수 조회 요청 */
const getPostCommentsCount = async (
  supabase: TypedSupabaseClient,
  body: GetPostCommentsCountRequest,
) => {
  return await supabase
    .from("comments")
    .select("*", { count: "exact" })
    .eq("post_id", body.postId);
};

// =========================== 구분선 ===========================

/** 댓글 삭제 요청 매개변수 타입  */
interface DeleteCommentRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
}
/** 댓글 삭제 요청 */
const deleteComment = async (
  supabase: TypedSupabaseClient,
  body: DeleteCommentRequest,
) => {
  return await supabase
    .from("comments")
    .delete()
    .eq("id", body.commentId)
    .eq("user_id", body.userId)
    .eq("post_id", body.postId);
};

// =========================== 구분선 ===========================

export const commentApis = {
  post: {
    /** 댓글 생성 key */
    key: (body: PostCommentRequest) => [
      "post",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.content,
    ],
    /** 댓글 생성 함수 */
    fn: postComment,
  },
  getMany: {
    /** 댓글 리스트 조회 key */
    key: (body: GetPostCommentsRequest) => [
      "get",
      "post",
      body.postId,
      "comment",
    ],
    /** 댓글 리스트 조회 함수 */
    fn: getPostComments,
  },
  count: {
    /** 댓글 개수 조회 key */
    key: (body: GetPostCommentsCountRequest) => [
      "get",
      "post",
      body.postId,
      "comment",
      "count",
    ],
    /** 댓글 개수 조회 함수 */
    fn: getPostCommentsCount,
  },
  delete: {
    /** 댓글 삭제 key */
    key: (body: DeleteCommentRequest) => [
      "delete",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
    ],
    /** 댓글 삭제 함수 */
    fn: deleteComment,
  },
};
