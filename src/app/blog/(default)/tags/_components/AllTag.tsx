import Tag from "#/app/blog/_components/atoms/Tag";

interface Props {
  tags: Record<string, number>;
  targetTag?: string;
}

const AllTag: React.FC<Props> = ({ tags, targetTag }) => {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-3">
      {Object.entries(tags).map(([tag, count]) => (
        <Tag
          key={tag}
          tag={`${tag} - [${count}]`}
          href={`/blog/tags?tag=${tag}`}
          {...(tag === targetTag && { className: "bg-main-500 text-main-50" })}
        />
      ))}
    </ul>
  );
};

export default AllTag;
