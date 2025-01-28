import type { Task } from '@/app/lib/taskService';
import {
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  type List,
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from '../lib/listService';

export function useGetLists(): UseQueryResult<List[], Error> {
  return useQuery({ queryKey: ['lists'], queryFn: getLists });
}

export function useGetListById(id: string): UseQueryResult<List | null, Error> {
  return useQuery({
    queryKey: ['list', id],
    queryFn: (): Promise<List | null> => getListById(id),
    enabled: !!id,
  });
}

export function useCreateList(): UseMutationResult<
  List,
  Error,
  Omit<List, 'id'>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newList: Omit<List, 'id'>): Promise<List> =>
      createList(newList),
    onSuccess: async (): Promise<void> =>
      await queryClient.invalidateQueries({ queryKey: ['lists'] }),
  });
}

export const useUpdateList = (): UseMutationResult<
  List | null,
  Error,
  { id: string; updates: Partial<Omit<List, 'id'>> },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<List, 'id'>>;
    }): Promise<List | null> => updateList(id, updates),
    onSuccess: async (
      _: List | null,
      { id }: { id: string; updates: Partial<Omit<List, 'id'>> },
    ): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['list', id] });
      await queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });
};

export const useDeleteList = (): UseMutationResult<
  void,
  Error,
  string,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => deleteList(id),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });
};
