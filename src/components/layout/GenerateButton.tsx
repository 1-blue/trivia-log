"use client";

import { FingerPrintIcon } from "@heroicons/react/24/outline";

import { createClientFromClient } from "#/supabase/client";
import type { IPostWithETC } from "#/types";

interface Props {
  allPosts: IPostWithETC[];
}

const GenerateButton: React.FC<Props> = ({ allPosts }) => {
  const supabase = createClientFromClient();

  const generatePosts = async () => {
    const promises = allPosts
      .filter((post) => post.id)
      .map((post) =>
        supabase.from("posts").upsert({
          id: post.id,
          title: post.title,
          description: post.description,
          path: post.path,
          created_at: post.date,
        }),
      );

    try {
      const results = await Promise.all(promises);

      console.log("🚀 results >> ", results);
    } catch (error) {
      console.error("🚫 Error error >> ", error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-circle fixed bottom-4 right-4"
      onClick={generatePosts}
    >
      <FingerPrintIcon className="h-6 w-6" />
    </button>
  );
};

export default GenerateButton;
