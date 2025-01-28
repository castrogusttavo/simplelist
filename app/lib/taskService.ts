import { z } from 'zod';

const taskSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  name: z.string(),
  isCompleted: z.boolean(),
});

const partialTaskSchema = taskSchema.partial();

export interface Task extends z.infer<typeof taskSchema> {}

const taskCache: Task[] = [];

export async function getTasks(): Promise<Task[]> {
  return taskCache;
}

export async function getTaskById(id: string): Promise<Task | null> {
  return taskCache.find((task: Task): boolean => task.id === id) || null;
}

export async function getTasksForList(listId: string): Promise<Task[]> {
  return taskCache.filter((task: Task): boolean => task.listId === listId);
}

export async function createTask({
  listId,
  name,
  isCompleted,
}: Omit<Task, 'id'>): Promise<Task> {
  const newTask: Task = {
    listId,
    name,
    isCompleted,
    id: crypto.randomUUID(),
  };

  taskSchema.parse(newTask);
  taskCache.push(newTask);
  return newTask;
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, 'id'>>,
): Promise<Task | null> {
  const task = getTaskById(id);
  if (!task) throw new Error('Task not found');

  const updatedTask = { ...task, ...updates };

  partialTaskSchema.parse(updatedTask);
  Object.assign(task, updatedTask);

  return task;
}

export async function deleteTask(id: string): Promise<void> {
  const index = taskCache.findIndex((task: Task): boolean => task.id === id);
  if (index === -1) throw new Error('Task not found');

  taskCache.splice(index, 1);
}
