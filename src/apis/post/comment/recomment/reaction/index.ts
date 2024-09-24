import type { Enums, Tables } from "#/@types/supabase";
import type { TypedSupabaseClient } from "#/types";

/** 답글 리액션 추가 요청 매개변수 타입 */
interface PostRecommentReactionRequest {
  reaction: Enums<"reaction_type">;
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
  recommentId: Tables<"recomments">["id"];
}
/** 답글 리액션 추가 요청 */
const postCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: PostRecommentReactionRequest,
) => {
  return await supabase.from("reactions").insert({
    reaction: body.reaction,
    user_id: body.userId,
    post_id: body.postId,
    comment_id: body.commentId,
    recomment_id: body.recommentId,
  });
};

// =========================== 구분선 ===========================

/** 답글 리액션 조회 요청 매개변수 타입 */
interface GetRecommentReactionRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
  recommentId: Tables<"recomments">["id"];
}
/** 답글 리액션 조회 */
const getCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: GetRecommentReactionRequest,
) => {
  return await supabase
    .from("reactions")
    .select("*")
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId)
    .eq("recomment_id", body.recommentId)
    .single();
};

// =========================== 구분선 ===========================

/** 답글 리액션 수정 요청 매개변수 타입 */
interface UpdateRecommentReactionRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
  recommentId: Tables<"recomments">["id"];
  reactionId: Tables<"reactions">["id"];
  reaction: Enums<"reaction_type">;
}
/** 답글 리액션 수정 */
const updateCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: UpdateRecommentReactionRequest,
) => {
  return await supabase
    .from("reactions")
    .update({ reaction: body.reaction })
    .eq("id", body.reactionId)
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId)
    .eq("recomment_id", body.recommentId);
};

// =========================== 구분선 ===========================

/** 답글 리액션 삭제 요청 매개변수 타입 */
interface DeleteRecommentReactionRequest {
  userId: Tables<"users">["id"];
  postId: Tables<"posts">["id"];
  commentId: Tables<"comments">["id"];
  recommentId: Tables<"recomments">["id"];
  reactionId: Tables<"reactions">["id"];
}
/** 답글 리액션 삭제 요청 */
const deleteCommentReaction = async (
  supabase: TypedSupabaseClient,
  body: DeleteRecommentReactionRequest,
) => {
  return await supabase
    .from("reactions")
    .delete()
    .eq("id", body.reactionId)
    .eq("user_id", body.userId)
    .eq("post_id", body.postId)
    .eq("comment_id", body.commentId)
    .eq("recomment_id", body.recommentId);
};

// =========================== 구분선 ===========================

export const recommentReactionApis = {
  post: {
    /** 답글 리액션 추가 key */
    key: (body: PostRecommentReactionRequest) => [
      "post",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      body.recommentId,
      "reaction",
    ],
    /** 답글 리액션 추가 함수 */
    fn: postCommentReaction,
  },
  get: {
    /** 답글 리액션 조회 key */
    key: (body: GetRecommentReactionRequest) => [
      "get",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      body.recommentId,
      "reaction",
    ],
    /** 답글 리액션 조회 함수 */
    fn: getCommentReaction,
  },
  update: {
    /** 답글 리액션 수정 key */
    key: (body: UpdateRecommentReactionRequest) => [
      "update",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      body.recommentId,
      "reaction",
      body.reactionId,
      body.reaction,
    ],
    /** 답글 리액션 수정 함수 */
    fn: updateCommentReaction,
  },
  delete: {
    /** 답글 리액션 삭제 key */
    key: (body: DeleteRecommentReactionRequest) => [
      "delete",
      body.userId,
      "post",
      body.postId,
      "comment",
      body.commentId,
      "recomment",
      body.recommentId,
      "reaction",
      body.reactionId,
    ],
    /** 답글 리액션 삭제 함수 */
    fn: deleteCommentReaction,
  },
};
