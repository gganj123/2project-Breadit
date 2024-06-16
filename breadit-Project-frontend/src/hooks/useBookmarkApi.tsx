import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { repositories } from '../apis';

type BookmarkPrameters = {
  userId: string;
  postId: string;
  location: string;
};

export const usePostMagazineBookmarkToggleApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId, location }: BookmarkPrameters) =>
      repositories.bookmarksApis.postMagazineBookmarkToggle(
        userId,
        postId,
        location
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazine'] });
    },
  });
};

export const usePostPostBookmarkToggleApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId, location }: BookmarkPrameters) =>
      repositories.bookmarksApis.postPostBookmarkToggle(
        userId,
        postId,
        location
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export const usePostRecipeBookmarkToggleApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId, location }: BookmarkPrameters) =>
      repositories.bookmarksApis.postRecipeBookmarkToggle(
        userId,
        postId,
        location
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    },
  });
};

export const useGetBookmarkByUserIdApi = ({
  userId,
  query = '',
}: {
  userId: string;
  query: string;
}) => {
  return useQuery({
    queryKey: ['bookmarks', userId, query],
    queryFn: () =>
      repositories.bookmarksApis.getBookmarkByUserId(userId, query),
    enabled: !!userId,
  });
};
