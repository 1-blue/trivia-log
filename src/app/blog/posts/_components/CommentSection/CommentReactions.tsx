import { Database } from "#/@types/supabase";
import { reactionToImojiMap } from "#/libs";

interface Props {
  reactions: Database["public"]["Enums"]["reaction_type"][];
}

const CommentReactions: React.FC<Props> = ({ reactions }) => {
  const reactionCounts = reactions.reduce(
    (acc, reaction) => {
      acc[reaction] = (acc[reaction] || 0) + 1;
      return acc;
    },
    {} as Record<Database["public"]["Enums"]["reaction_type"], number>,
  );

  const reactionCountArray = Object.entries(reactionCounts).map(
    ([reaction, count]) => ({
      reaction: reaction as Database["public"]["Enums"]["reaction_type"],
      count,
    }),
  );

  return (
    <ul className="flex items-center gap-2">
      {reactionCountArray.map(({ reaction, count }) => (
        <li
          key={reaction}
          className="badge badge-outline badge-lg flex items-center gap-1 py-3.5"
        >
          <span className="text-lg">{reactionToImojiMap[reaction]}</span>
          <span className="text-sm">{count}</span>
        </li>
      ))}
    </ul>
  );
};

export default CommentReactions;
