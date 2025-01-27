import { describe, expect, it } from 'vitest';
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from '../app/lib/listService';

describe('Lists Service', () => {
  describe('getLists', () => {
    it('should return all lists', () => {
      const lists = getLists();
      expect(lists).toEqual([]);
    });
  });

  describe('getListById', () => {
    it('should return a list by ID', () => {
      const list = createList({
        name: 'Test List',
        iconName: 'sd-card',
        iconColor: '#F7F7F7',
        totalTasks: 5,
      });
      const foundList = getListById(list.id);
      expect(foundList).toEqual(list);
    });

    it('should return null if list ID is not found', () => {
      const foundList = getListById('non-existent-id');
      expect(foundList).toBeNull();
    });
  });

  describe('createList', () => {
    it('should create a new list', () => {
      const newList = createList({
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
    it('should update a list', () => {
      const list = createList({
        name: 'Original List',
        iconName: 'smile',
        iconColor: '#F7F7F7',
        totalTasks: 3,
      });
      const updatedList = updateList(list.id, { name: 'Updated List' });
      expect(updatedList.name).toBe('Updated List');
    });

    it('should throw an error if updating a non-existent list', () => {
      expect(() =>
        updateList('non-existent-id', { name: 'Updated List' }),
      ).toThrowError('List not found');
    });
  });

  describe('deleteList', () => {
    it('should delete a list', () => {
      const list = createList({
        name: 'List to Delete',
        iconName: 'trash',
        iconColor: '#FF0000',
        totalTasks: 0,
      });
      deleteList(list.id);
      const foundList = getListById(list.id);
      expect(foundList).toBeNull();
    });

    it('should throw an error if deleting a non-existent list', () => {
      expect(() => deleteList('non-existent-id')).toThrowError(
        'List not found',
      );
    });
  });
});
