import { commentApis } from "#/apis/post/comment";
import { commentReactionApis } from "#/apis/post/comment/reaction";
import { recommentApis } from "#/apis/post/comment/recomment";
import { recommentReactionApis } from "#/apis/post/comment/recomment/reaction";

const apis = {
  post: {
    comment: {
      ...commentApis,
      reaction: {
        ...commentReactionApis,
      },

      recomment: {
        ...recommentApis,
        reaction: {
          ...recommentReactionApis,
        },
      },
    },
  },
};

export default apis;
