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

const LOCAL_STORAGE_KEY = 'lists';

function getListsFromStorage(): List[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveListsToStorage(lists: List[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
}

export async function getLists(): Promise<List[]> {
  return getListsFromStorage();
}

export async function getListById(id: string): Promise<List | null> {
  const lists = getListsFromStorage();
  return lists.find((list: List): boolean => list.id === id) || null;
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

  const lists = getListsFromStorage();
  lists.push(newList);
  saveListsToStorage(lists);

  return newList;
}

export async function updateList(
  id: string,
  updates: Partial<Omit<List, 'id'>>,
): Promise<List | null> {
  const lists = getListsFromStorage();
  const listIndex = lists.findIndex((l) => l.id === id);

  if (listIndex === -1) throw new Error('List not found');

  const updatedList = { ...lists[listIndex], ...updates };

  partialListSchema.parse(updatedList);

  lists[listIndex] = updatedList;
  saveListsToStorage(lists);

  return updatedList;
}

export async function deleteList(id: string): Promise<void> {
  const lists = getListsFromStorage();
  const index = lists.findIndex((list: List): boolean => list.id === id);

  if (index === -1) throw new Error('List not found');

  lists.splice(index, 1);
  saveListsToStorage(lists);
}
