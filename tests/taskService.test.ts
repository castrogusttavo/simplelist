import { describe, expect, it } from 'vitest';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksForList,
  updateTask,
} from '../app/lib/taskService';

describe('Tasks Service', () => {
  describe('getTasks', () => {
    it('should return all tasks', () => {
      const tasks = getTasks();
      expect(tasks).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', () => {
      const task = createTask({
        listId: 'd5320817-d07c-4b26-a11f-0fcb13ed191a',
        name: 'Test Task',
        isCompleted: false,
      });
      const foundTask = getTaskById(task.id);
      expect(foundTask).toEqual(task);
    });

    it('should return null if task ID is not found', () => {
      const foundTask = getTaskById('non-existent-id');
      expect(foundTask).toBeNull();
    });
  });

  describe('getTasksForList', () => {
    it('should return tasks for a specific list', () => {
      const task1 = createTask({
        listId: 'b01fe3cc-2e73-4ab3-8e3c-51fde7177cb0',
        name: 'Task 1',
        isCompleted: false,
      });
      const task2 = createTask({
        listId: 'b01fe3cc-2e73-4ab3-8e3c-51fde7177cb0',
        name: 'Task 2',
        isCompleted: true,
      });
      const tasks = getTasksForList('b01fe3cc-2e73-4ab3-8e3c-51fde7177cb0');
      expect(tasks).toEqual([task1, task2]);
    });

    it('should return an empty array if no tasks are found for the list', () => {
      const tasks = getTasksForList('non-existent-list-id');
      expect(tasks).toEqual([]);
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const newTask = createTask({
        listId: '0bcef8d6-8cd9-4440-9203-1869b8d2085c',
        name: 'New Task',
        isCompleted: false,
      });
      expect(newTask).toHaveProperty('id');
      expect(newTask).toHaveProperty('name', 'New Task');
    });
  });

  describe('updateTask', () => {
    it('should update a task', () => {
      const task = createTask({
        listId: 'a74d76e3-7fa5-40da-9884-1bc7edcaf23b',
        name: 'Original Task',
        isCompleted: false,
      });
      const updatedTask = updateTask(task.id, { name: 'Updated Task' });
      expect(updatedTask.name).toBe('Updated Task');
    });

    it('should throw an error if updating a non-existent task', () => {
      expect(() =>
        updateTask('non-existent-id', { name: 'Updated Task' }),
      ).toThrowError('Task not found');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', () => {
      const task = createTask({
        listId: 'd5320817-d07c-4b26-a11f-0fcb13ed191a',
        name: 'Task to Delete',
        isCompleted: false,
      });
      deleteTask(task.id);
      const foundTask = getTaskById(task.id);
      expect(foundTask).toBeNull();
    });

    it('should throw an error if deleting a non-existent task', () => {
      expect(() => deleteTask('non-existent-id')).toThrowError(
        'Task not found',
      );
    });
  });
});
