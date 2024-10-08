import type { Enums, Tables } from "#/@types/supabase";
import type { TypedSupabaseClient } from "#/types";

/** 댓글 리액션 추가 요청 매개변수 타입 */
interface PostCommentReactionRequest {
  reaction: Enums<"reaction_type">;
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
}
/** 댓글 리액션 추가 요청 */
const postCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: PostCommentReactionRequest,
) => {
  return await supabase.from("reactions").insert({
    reaction: body.reaction,
    user_id: body.userId,
    post_id: body.postId,
    comment_id: body.commentId,
  });
};

// =========================== 구분선 ===========================

/** 댓글 리액션 조회 요청 매개변수 타입 */
interface GetCommentReactionRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
}
/** 댓글 리액션 조회 */
const getCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: GetCommentReactionRequest,
) => {
  return await supabase
    .from("reactions")
    .select("*")
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId)
    .single();
};

// =========================== 구분선 ===========================

/** 댓글 리액션 수정 요청 매개변수 타입 */
interface UpdateCommentReactionRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
  reactionId: Tables<"reactions">["id"];
  reaction: Enums<"reaction_type">;
}
/** 댓글 리액션 수정 */
const updateCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: UpdateCommentReactionRequest,
) => {
  return await supabase
    .from("reactions")
    .update({ reaction: body.reaction })
    .eq("id", body.reactionId)
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId);
};

// =========================== 구분선 ===========================

/** 댓글 리액션 삭제 요청 매개변수 타입 */
interface DeleteCommentReactionRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
  reactionId: Tables<"reactions">["id"];
}
/** 댓글 리액션 삭제 요청 */
const deleteCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: DeleteCommentReactionRequest,
) => {
  return await supabase
    .from("reactions")
    .delete()
    .eq("id", body.reactionId)
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId);
};

// =========================== 구분선 ===========================

export const commentReactionApis = {
  post: {
    /** 댓글 리액션 추가 key */
    key: (body: PostCommentReactionRequest) => [
      "post",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "reaction",
    ],
    /** 댓글 리액션 추가 함수 */
    fn: postCommentReaction,
  },
  get: {
    /** 댓글 리액션 조회 key */
    key: (body: GetCommentReactionRequest) => [
      "get",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "reaction",
    ],
    /** 댓글 리액션 조회 함수 */
    fn: getCommentReaction,
  },
  update: {
    /** 댓글 리액션 수정 key */
    key: (body: UpdateCommentReactionRequest) => [
      "update",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "reaction",
      body.reactionId,
      body.reaction,
    ],
    /** 댓글 리액션 수정 함수 */
    fn: updateCommentReaction,
  },
  delete: {
    /** 댓글 리액션 삭제 key */
    key: (body: DeleteCommentReactionRequest) => [
      "delete",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "reaction",
      body.reactionId,
    ],
    /** 댓글 리액션 삭제 함수 */
    fn: deleteCommentReaction,
  },
};
