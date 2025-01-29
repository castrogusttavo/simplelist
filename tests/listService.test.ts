import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from '../app/lib/listService';

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

describe('Lists Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLists', () => {
    it('should return all lists', async () => {
      const lists = await getLists();
      expect(lists).toEqual([]);
    });
  });

  describe('getListById', () => {
    it('should return a list by ID', async () => {
      const list = await createList({
        name: 'Test List',
        iconName: 'sd-card',
        iconColor: '#F7F7F7',
        totalTasks: 5,
      });
      const foundList = await getListById(list.id);
      expect(foundList).toEqual(list);
    });

    it('should return null if list ID is not found', async () => {
      const foundList = await getListById('non-existent-id');
      expect(foundList).toBeNull();
    });
  });

  describe('createList', () => {
    it('should create a new list', async () => {
      const newList = await createList({
        name: 'New List',
        iconName: 'folder',
        iconColor: '#FFFFFF',
        totalTasks: 0,
      });
      expect(newList).toHaveProperty('id');
      expect(newList).toHaveProperty('name', 'New List');
    });
  });

  describe('updateList', () => {
    it('should update a list', async () => {
      const list = await createList({
        name: 'Original List',
        iconName: 'smile',
        iconColor: '#F7F7F7',
        totalTasks: 3,
      });
      const updatedList = await updateList(list.id, { name: 'Updated List' });
      expect(updatedList?.name).toBe('Updated List');
    });

    it('should throw an error if updating a non-existent list', async () => {
      await expect(
        updateList('non-existent-id', { name: 'Updated List' }),
      ).rejects.toThrowError('List not found');
    });
  });

  describe('deleteList', () => {
    it('should delete a list', async () => {
      const list = await createList({
        name: 'List to Delete',
        iconName: 'trash',
        iconColor: '#FF0000',
        totalTasks: 0,
      });
      await deleteList(list.id);
      const foundList = await getListById(list.id);
      expect(foundList).toBeNull();
    });

    it('should throw an error if deleting a non-existent list', async () => {
      await expect(deleteList('non-existent-id')).rejects.toThrowError(
        'List not found',
      );
    });
  });
});
