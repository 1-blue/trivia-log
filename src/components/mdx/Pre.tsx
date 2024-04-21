import CodeBlockClipBoardButton from "./CodeBlockClipBoardButton";

interface Props extends React.HTMLAttributes<HTMLPreElement> {}

const Pre: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  ...restProps
}) => {
  return (
    <pre {...restProps}>
      <div className="flex pl-4 items-center bg-[#2A4759]">
        <div className="flex gap-2 mr-auto">
          <div className="w-4 h-4 rounded-full bg-red-400" />
          <div className="w-4 h-4 rounded-full bg-yellow-400" />
          <div className="w-4 h-4 rounded-full bg-green-400 mr-auto" />
        </div>

        <CodeBlockClipBoardButton />
      </div>

      {children}
    </pre>
  );
};

export default Pre;
