// app/services/taskService.ts
import { z } from 'zod';

const taskSchema = z.object({
  id: z.string().uuid(),
  listId: z.string().uuid(),
  name: z.string(),
  isCompleted: z.boolean(),
});

const partialTaskSchema = taskSchema.partial();

export interface Task extends z.infer<typeof taskSchema> {}

const TASKS_STORAGE_KEY = 'tasks';

function loadTasksFromStorage(): Task[] {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export async function getTasks(): Promise<Task[]> {
  return loadTasksFromStorage();
}

export async function getTaskById(id: string): Promise<Task | null> {
  const tasks = loadTasksFromStorage();
  return tasks.find((task: Task): boolean => task.id === id) || null;
}

export async function getTasksForList(listId: string): Promise<Task[]> {
  const tasks = loadTasksFromStorage();
  return tasks.filter((task: Task): boolean => task.listId === listId);
}

export async function createTask({
  listId,
  name,
  isCompleted,
}: Omit<Task, 'id'>): Promise<Task> {
  const tasks = loadTasksFromStorage();

  const newTask: Task = {
    listId,
    name,
    isCompleted,
    id: crypto.randomUUID(),
  };

  taskSchema.parse(newTask);
  tasks.push(newTask);
  saveTasksToStorage(tasks);

  return newTask;
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, 'id'>>,
): Promise<Task | null> {
  const tasks = loadTasksFromStorage();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) throw new Error('Task not found');

  const updatedTask = { ...tasks[taskIndex], ...updates };
  partialTaskSchema.parse(updatedTask);

  tasks[taskIndex] = updatedTask;
  saveTasksToStorage(tasks);

  return updatedTask;
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = loadTasksFromStorage();
  const index = tasks.findIndex((task: Task): boolean => task.id === id);

  if (index === -1) throw new Error('Task not found');

  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
}
