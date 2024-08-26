import type { Database } from "#/@types/supabase";

/** 리액션 타입을 이모지로 변환 */
export const reactionToImojiMap: Record<Database["public"]["Enums"]["reaction_type"], string> = {
  GOOD: "👍",
  BAD: "👎",
  FIRE: "🔥",
  SEE: "👀",
  HEART: "❤️",
  SMILE: "😊",
  SED: "😢",
};
/** 이모지를 리액션 타입으로 변환 */
export const imojiToReactionMap: Record<string, Database["public"]["Enums"]["reaction_type"]> = {
  "👍": "GOOD",
  "👎": "BAD",
  "🔥": "FIRE",
  "👀": "SEE",
  "❤️": "HEART",
  "😊": "SMILE",
  "😢": "SED",
};
