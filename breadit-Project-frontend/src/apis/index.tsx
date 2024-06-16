import { magazinesApis } from './magazines';
import { postsApis } from './posts';
import { usersApi } from './users';
import { commentsApis } from './comments';
import { likesApis } from './likes';
import { recipesApis } from './recipes';
import { bookmarksApis } from './bookmarks';

const repositories = {
  magazinesApis,
  postsApis,
  usersApi,
  commentsApis,
  likesApis,
  recipesApis,
  bookmarksApis,
};
Object.freeze(repositories);

export { repositories };
