import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const Avatar: React.FC<Props> = ({ src, alt, className, ...props }) => {
  return (
    <figure className="avatar">
      <div className={twMerge("w-16 rounded-xl", className)} {...props}>
        <img src={src} alt={alt} />
      </div>
    </figure>
  );
};

export default Avatar;
