import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLElement> {
  thumbnail: string;
}

const Thumbnail: React.FC<Props> = ({ thumbnail, className, ...restProps }) => {
  return (
    <figure
      className={twMerge(
        "relative aspect-video rounded-md object-contain",
        className,
      )}
      {...restProps}
    >
      <Image src={thumbnail} alt="게시글 썸네일" fill />
    </figure>
  );
};

export default Thumbnail;
