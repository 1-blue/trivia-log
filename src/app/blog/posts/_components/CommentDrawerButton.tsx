import {
  ChatBubbleLeftEllipsisIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import CommentSection from "#/app/blog/posts/_components/CommentSection/CommentSection";

interface Props {
  postId: string;
}

const CommentDrawerButton: React.FC<Props> = ({ postId }) => {
  return (
    <div className="drawer drawer-end w-fit">
      <input id="comment-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="comment-drawer">
          <ChatBubbleLeftEllipsisIcon
            role="button"
            className="h-8 w-8 rounded-md border border-gray-500 p-1.5 transition-colors hover:border-gray-200 dark:hover:border-gray-100"
          />
        </label>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="comment-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="min-h-full min-w-[400px] bg-base-200 px-8 pb-8 pt-6 sm:min-w-[520px] ">
          <label
            htmlFor="comment-drawer"
            aria-label="close sidebar"
            className="absolute right-2 top-3"
          >
            <XCircleIcon className="h-8 w-8 cursor-pointer" />
          </label>
          <CommentSection postId={postId} />
        </ul>
      </div>
    </div>
  );
};

export default CommentDrawerButton;
