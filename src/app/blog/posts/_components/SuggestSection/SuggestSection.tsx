import { getAllRelatedPostMetadata } from "#/libs";

import ListView from "#/app/blog/_components/organisms/ListView";

interface Props {
  baseUrl: string;
}

const DIVISION_PATH = "/blog/posts";

const SuggestSection: React.FC<Props> = ({ baseUrl }) => {
  const relatedPostMetadatas = getAllRelatedPostMetadata(baseUrl);

  const filteredPostMetadatas = relatedPostMetadatas.filter(({ path }) => {
    const targetPath = path.slice(
      path.indexOf(DIVISION_PATH) + DIVISION_PATH.length,
    );

    return targetPath !== `/${baseUrl}`;
  });

  return (
    <section>
      <ListView posts={filteredPostMetadatas} />
    </section>
  );
};

export default SuggestSection;
