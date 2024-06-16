import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { repositories } from '../apis';

export type CommentParameters = {
  _id: string;
  nickname: string;
  profile: string;
  user_id: string;
  post_id: string;
  content: string;
  can_post: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type CreateCommentParameters = {
  nickname: string;
  profile: string;
  user_id: string;
  post_id: string;
  content: string;
};

export const useCommentByPostIdApi = (targetId: string) => {
  return useQuery<CommentParameters[]>({
    queryKey: ['comments', targetId],
    queryFn: () => repositories.commentsApis.getCommentListByPostId(targetId),
    enabled: true,
  });
};

export const useDeleteCommentByIdApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: string) =>
      repositories.commentsApis.deleteComment(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export const useCreateCommentApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentData: CreateCommentParameters) =>
      repositories.commentsApis.createComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export const useEditCommentApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      targetId,
      editData,
    }: {
      targetId: string;
      editData: string;
    }) => repositories.commentsApis.editComment(targetId, editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
