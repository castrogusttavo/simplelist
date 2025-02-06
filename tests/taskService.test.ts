import { beforeEach, describe, expect, it } from 'vitest';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksForList,
  updateTask,
} from '../app/services/taskService';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('Tasks Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getTasks', () => {
    it('should return all tasks', async () => {
      const tasks = await getTasks();
      expect(tasks).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const task = await createTask({
        listId: 'd5320817-d07c-4b26-a11f-0fcb13ed191a',
        name: 'Test Task',
        isCompleted: false,
      });
      const foundTask = await getTaskById(task.id);
      expect(foundTask).toEqual(task);
    });

    it('should return null if task ID is not found', async () => {
      const foundTask = await getTaskById('non-existent-id');
      expect(foundTask).toBeNull();
    });
  });

  describe('getTasksForList', () => {
    it('should return tasks for a specific list', async () => {
      const task1 = await createTask({
        listId: 'b01fe3cc-2e73-4ab3-8e3c-51fde7177cb0',
        name: 'Task 1',
        isCompleted: false,
      });
      const task2 = await createTask({
        listId: 'b01fe3cc-2e73-4ab3-8e3c-51fde7177cb0',
        name: 'Task 2',
        isCompleted: true,
      });
      const tasks = await getTasksForList(
        'b01fe3cc-2e73-4ab3-8e3c-51fde7177cb0',
      );
      expect(tasks).toEqual([task1, task2]);
    });

    it('should return an empty array if no tasks are found for the list', async () => {
      const tasks = await getTasksForList('non-existent-list-id');
      expect(tasks).toEqual([]);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = await createTask({
        listId: '0bcef8d6-8cd9-4440-9203-1869b8d2085c',
        name: 'New Task',
        isCompleted: false,
      });
      expect(newTask).toHaveProperty('id');
      expect(newTask).toHaveProperty('name', 'New Task');
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const task = await createTask({
        listId: 'a74d76e3-7fa5-40da-9884-1bc7edcaf23b',
        name: 'Original Task',
        isCompleted: false,
      });
      const updatedTask = await updateTask(task.id, { name: 'Updated Task' });
      expect(updatedTask?.name).toBe('Updated Task');
    });

    it('should throw an error if updating a non-existent task', async () => {
      await expect(
        updateTask('non-existent-id', { name: 'Updated Task' }),
      ).rejects.toThrowError('Task not found');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = await createTask({
        listId: 'd5320817-d07c-4b26-a11f-0fcb13ed191a',
        name: 'Task to Delete',
        isCompleted: false,
      });
      await deleteTask(task.id);
      const foundTask = await getTaskById(task.id);
      expect(foundTask).toBeNull();
    });

    it('should throw an error if deleting a non-existent task', async () => {
      await expect(deleteTask('non-existent-id')).rejects.toThrowError(
        'Task not found',
      );
    });
  });
});
