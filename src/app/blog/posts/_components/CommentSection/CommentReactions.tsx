import React from "react";
import type { Enums } from "#/@types/supabase";
import { reactionToImojiMap } from "#/libs";

interface Props {
  reactions: Enums<"reaction_type">[];
}

const CommentReactions: React.FC<Props> = ({ reactions }) => {
  const reactionCounts = reactions.reduce(
    (acc, reaction) => {
      acc[reaction] = (acc[reaction] || 0) + 1;
      return acc;
    },
    {} as Record<Enums<"reaction_type">, number>,
  );

  const reactionCountArray = Object.entries(reactionCounts).map(
    ([reaction, count]) => ({
      reaction: reaction as Enums<"reaction_type">,
      count,
    }),
  );

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {reactionCountArray.map(({ reaction, count }) => (
        <li
          key={reaction}
          className="badge badge-outline badge-lg flex items-center gap-1 px-1.5 py-2.5 sm:px-2.5 sm:py-3.5"
        >
          <span className="text-xs sm:text-sm">
            {reactionToImojiMap[reaction]}
          </span>
          <span className="text-xs sm:text-sm">{count}</span>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(CommentReactions);
