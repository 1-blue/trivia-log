import type { Database } from "#/@types/supabase";

/** 리액션 타입 */
export const REACTIONS: Database["public"]["Enums"]["reaction_type"][] = [
  "GOOD",
  "BAD",
  "FIRE",
  "SEE",
  "HEART",
  "SMILE",
  "SED",
];
