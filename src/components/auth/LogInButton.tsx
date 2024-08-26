"use client";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LogInButton: React.FC<React.PropsWithChildren<Props>> = ({
  onClick,
  children = "로그인",
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        (
          document.getElementById("login-dialog") as HTMLDialogElement
        )?.showModal();
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default LogInButton;
