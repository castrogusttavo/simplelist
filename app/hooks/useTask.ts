import {
  type Task,
  createTask,
  deleteAllTasksForList,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksForList,
  updateTask,
} from '@/app/services/taskService';
import {
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useGetTasks(): UseQueryResult<Task[], Error> {
  return useQuery({ queryKey: ['tasks'], queryFn: getTasks });
}

export function useGetTaskById(id: string): UseQueryResult<Task | null, Error> {
  return useQuery({
    queryKey: ['task', id],
    queryFn: (): Promise<Task | null> => getTaskById(id),
    enabled: !!id,
  });
}

export function useGetTasksForList(
  listId: string,
): UseQueryResult<Task[], Error> {
  return useQuery({
    queryKey: ['tasks', listId],
    queryFn: (): Promise<Task[]> => getTasksForList(listId),
    enabled: !!listId,
  });
}

export function useCreateTask(): UseMutationResult<
  Task,
  Error,
  Omit<Task, 'id'>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: Omit<Task, 'id'>): Promise<Task> =>
      createTask(newTask),
    onSuccess: async (): Promise<void> =>
      await queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

export const useUpdateTask = (): UseMutationResult<
  Task | null,
  Error,
  { id: string; updates: Partial<Omit<Task, 'id'>> },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<Task, 'id'>>;
    }): Promise<Task | null> => updateTask(id, updates),
    onSuccess: async (
      _: Task | null,
      { id }: { id: string; updates: Partial<Omit<Task, 'id'>> },
    ): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['task', id] });
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = (): UseMutationResult<
  void,
  Error,
  string,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => deleteTask(id),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteAllTasks = (): UseMutationResult<
  void,
  Error,
  string,
  undefined
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listId: string): Promise<void> =>
      deleteAllTasksForList(listId),
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
