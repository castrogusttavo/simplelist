import { z } from 'zod';

const listSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  iconColor: z.string(),
  iconName: z.string(),
  totalTasks: z.number(),
});

const partialListSchema = listSchema.omit({ id: true }).partial();

interface List extends z.infer<typeof listSchema> {}

const listCache: List[] = [];

export function getLists(): List[] {
  return listCache;
}

export function getListById(id: string): List | null {
  return listCache.find((list: List): boolean => list.id === id) || null;
}

export function createList({
  name,
  iconName,
  iconColor,
  totalTasks,
}: Omit<List, 'id'>): List {
  const newList: List = {
    name,
    iconName,
    iconColor,
    totalTasks,
    id: crypto.randomUUID(),
  };

  listSchema.parse(newList);
  listCache.push(newList);
  return newList;
}

export function updateList(
  id: string,
  updates: Partial<Omit<List, 'id'>>,
): List {
  const list = getListById(id);
  if (!list) throw new Error('List not found');

  const updateList = { ...list, ...updates };

  partialListSchema.parse(updateList);
  Object.assign(list, updateList);

  return list;
}

export function deleteList(id: string): void {
  const index = listCache.findIndex((list: List): boolean => list.id === id);
  if (index === -1) throw new Error('List not found');

  listCache.splice(index, 1);
}
