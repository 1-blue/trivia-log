import { commentApis } from "./post/comment";
import { reactionApis } from "./post/comment/reaction";

const apis = {
  post: {
    comment: {
      ...commentApis,

      reaction: {
        ...reactionApis,
      },
    },
  },
};

export default apis;
