"use client";

const CommentLogInCTA: React.FC = () => {
  const showLogInDialog = () => {
    const logInDialog = document.getElementById("login-dialog");
    if (!(logInDialog instanceof HTMLDialogElement)) return;

    logInDialog.show();
  };

  return (
    <>
      <div className="h-40 rounded-lg bg-gray-200 px-4 py-3 dark:bg-gray-600">
        <button
          type="button"
          onClick={showLogInDialog}
          className="font-semibold underline underline-offset-4 hover:decoration-double"
        >
          로그인
        </button>{" "}
        후 댓글을 작성할 수 있습니다.
      </div>
      <button
        type="button"
        onClick={showLogInDialog}
        className="btn btn-outline ml-auto mt-2 block"
      >
        로그인 후 댓글 작성
      </button>
    </>
  );
};

export default CommentLogInCTA;
