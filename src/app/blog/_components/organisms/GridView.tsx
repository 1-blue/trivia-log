import type { PostMetadataWithETC } from "#/types";

import PostCard from "../molecules/PostCard";

interface Props {
  posts: PostMetadataWithETC[];
}

const GridView: React.FC<Props> = ({ posts }) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </ul>
  );
};

export default GridView;
