import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { repositories } from '../apis';

type MagazineParameters = {
  _id: string;
  nickname: string;
  thumbnail: string;
  title: string;
  content: string;
  like_count: number;
};

export type MagazineCreateParameters = {
  user_id: string;
  thumbnail: string;
  nickname: string;
  profile: string;
  title: string;
  content: string;
  images: string;
};

export type MagazineEditParameters = {
  user_id: string;
  thumbnail: string;
  title: string;
  content: string;
};

export const useGetMagazineListApi = () => {
  return useQuery<MagazineParameters[]>({
    queryKey: ['magazines'],
    queryFn: repositories.magazinesApis.getMagazineList,
    enabled: true,
  });
};

export const useGetMagazineByQueryApi = (query: string) => {
  return useQuery({
    queryKey: ['magazines', query],
    queryFn: () => repositories.magazinesApis.getMagazineQuery(query),
  });
};

export const useGetMagazineByIdApi = ({
  targetId = '',
  accessToken,
}: {
  targetId?: string;
  accessToken: string | null;
}) => {
  return useQuery({
    queryKey: ['magazine', targetId, accessToken],
    queryFn: () =>
      repositories.magazinesApis.getMagazine(targetId, accessToken),
    enabled: !!targetId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useDeleteMagazineByIdApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: string) =>
      repositories.magazinesApis.deleteMagazine(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazines'] });
    },
  });
};

export const useDeleteMagazineByCheckApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetIdList: string[]) =>
      repositories.magazinesApis.deleteMagazineByCheck(targetIdList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazines'] });
    },
  });
};

export const useCreateMagazineApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createData: MagazineCreateParameters) =>
      repositories.magazinesApis.createMagazine(createData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazines'] });
    },
  });
};

export const useEditMagazineApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      editData,
      targetId,
    }: {
      editData: MagazineEditParameters;
      targetId: string;
    }) => repositories.magazinesApis.editMagazine(editData, targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazine'] });
    },
  });
};
