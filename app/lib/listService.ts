import { z } from 'zod';

const listSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  iconColor: z.string(),
  iconName: z.string(),
  totalTasks: z.number(),
});

const partialListSchema = listSchema.omit({ id: true }).partial();

export interface List extends z.infer<typeof listSchema> {}

const listCache: List[] = [];

export async function getLists(): Promise<List[]> {
  return listCache;
}

export async function getListById(id: string): Promise<List | null> {
  return listCache.find((list: List): boolean => list.id === id) || null;
}

export async function createList({
  name,
  iconName,
  iconColor,
  totalTasks,
}: Omit<List, 'id'>): Promise<List> {
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

export async function updateList(
  id: string,
  updates: Partial<Omit<List, 'id'>>,
): Promise<List | null> {
  const list = getListById(id);
  if (!list) throw new Error('List not found');

  const updateList = { ...list, ...updates };

  partialListSchema.parse(updateList);
  Object.assign(list, updateList);

  return list;
}

export async function deleteList(id: string): Promise<void> {
  const index = listCache.findIndex((list: List): boolean => list.id === id);
  if (index === -1) throw new Error('List not found');

  listCache.splice(index, 1);
}
