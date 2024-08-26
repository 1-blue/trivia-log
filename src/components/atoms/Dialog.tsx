import { twMerge } from "tailwind-merge";

interface Props extends React.DialogHTMLAttributes<HTMLDialogElement> {
  /** 우측 상단 `X`버튼 렌더링 여부 */
  showClose?: boolean;
  /** 외부 클릭 시 닫히는지 여부 */
  closeOnOutsideClick?: boolean;
  /** 제목 */
  title?: string;
}

const Dialog: React.FC<React.PropsWithChildren<Props>> = ({
  showClose = true,
  closeOnOutsideClick = true,
  title,
  children,
  className,
  ...props
}) => {
  return (
    <dialog className={twMerge("modal", className)} {...props}>
      <div className="modal-box">
        {showClose && (
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
        )}
        {title && (
          <h3 className="mb-6 text-center text-2xl font-bold">{title}</h3>
        )}
        {children}
      </div>
      <form method="dialog" className="modal-backdrop bg-black/50">
        <button type={closeOnOutsideClick ? "submit" : "button"}>close</button>
      </form>
    </dialog>
  );
};

export default Dialog;
