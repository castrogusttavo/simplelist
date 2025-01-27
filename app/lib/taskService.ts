import { z } from 'zod';

const taskSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  name: z.string(),
  isCompleted: z.boolean(),
});

const partialTaskSchema = taskSchema.partial();

interface Task extends z.infer<typeof taskSchema> {}

const taskCache: Task[] = [];

export function getTasks(): Task[] {
  return taskCache;
}

export function getTaskById(id: string): Task | null {
  return taskCache.find((task: Task): boolean => task.id === id) || null;
}

export function getTasksForList(listId: string): Task[] {
  return taskCache.filter((task: Task): boolean => task.listId === listId);
}

export function createTask({
  listId,
  name,
  isCompleted,
}: Omit<Task, 'id'>): Task {
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

export function updateTask(
  id: string,
  updates: Partial<Omit<Task, 'id'>>,
): Task {
  const task = getTaskById(id);
  if (!task) throw new Error('Task not found');

  const updatedTask = { ...task, ...updates };

  partialTaskSchema.parse(updatedTask);
  Object.assign(task, updatedTask);

  return task;
}

export function deleteTask(id: string): void {
  const index = taskCache.findIndex((task: Task): boolean => task.id === id);
  if (index === -1) throw new Error('Task not found');

  taskCache.splice(index, 1);
}
