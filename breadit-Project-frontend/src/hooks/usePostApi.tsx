import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { repositories } from '../apis';

type PostParameters = {
  _id: string;
  nickname: string;
  profile?: string;
  title: string;
  content: string;
  like_count: number;
  thumbnail: string;
  location?: string | '';
};

export type PostCreateParameters = {
  user_id: string;
  thumbnail: string;
  nickname: string;
  profile: string;
  title: string;
  content: string;
  images: string;
};

export type PostEditParameters = {
  user_id: string;
  thumbnail: string;
  title: string;
  content: string;
};

export const useGetPostListApi = () => {
  return useQuery<PostParameters[]>({
    queryKey: ['posts'],
    queryFn: repositories.postsApis.getPostList,
    enabled: true,
  });
};

export const useGetPostByQueryApi = (query: string) => {
  return useQuery({
    queryKey: ['posts', query],
    queryFn: () => repositories.postsApis.getPostQuery(query),
  });
};

export const useGetPostByIdApi = ({
  targetId = '',
  accessToken,
}: {
  targetId?: string;
  accessToken: string | null;
}) => {
  return useQuery({
    queryKey: ['post', targetId, accessToken],
    queryFn: () => repositories.postsApis.getPost(targetId, accessToken),
    enabled: !!targetId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetPostByUserIdQueryApi = ({
  userId,
  query = '',
}: {
  userId: string;
  query: string;
}) => {
  return useQuery({
    queryKey: ['posts', userId, query],
    queryFn: () => repositories.postsApis.getPostByUserIdQuery(userId, query),
    enabled: !!userId,
  });
};

export const useDeletePostByIdApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: string) =>
      repositories.postsApis.deletePost(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePostByCheckApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetIdList: string[]) =>
      repositories.postsApis.deletePostByCheck(targetIdList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useCreatePostApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createData: PostCreateParameters) =>
      repositories.postsApis.createPost(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useEditPostApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      editData,
      targetId,
    }: {
      editData: PostEditParameters;
      targetId: string;
    }) => repositories.postsApis.editPost(editData, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};
