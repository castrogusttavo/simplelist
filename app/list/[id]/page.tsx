'use client';

import {
  TasksActionsFooter,
  TasksActionsHeader,
} from '@/app/components/ui/app/tasksActions';
import { TasksListUser } from '@/app/components/ui/app/tasksListUser';
import { useGetListById } from '@/app/hooks/useList';
import { useDeleteAllTasks, useGetTasksForList } from '@/app/hooks/useTask';
import type { List } from '@/app/lib/listService';
import type { Task } from '@/app/lib/taskService';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface ListProps {
  listName: List[] | undefined;
}

export default function TasksBoard() {
  const params = useParams<{ id: string }>();
  const listId = params.id;

  const { data: tasks, isLoading, isError, error } = useGetTasksForList(listId);
  const { data: list } = useGetListById(listId);
  const { mutate: deleteAllTasks } = useDeleteAllTasks();

  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const filteredTasks = showCompleted
    ? tasks?.filter((task) => task.isCompleted)
    : tasks;

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const clearAllTasks = () => {
    deleteAllTasks(listId);
  };

  return (
    <>
      <TasksActionsHeader listName={list?.name} listId={listId} />
      <TasksListUser tasks={filteredTasks} />
      <TasksActionsFooter
        tasks={tasks}
        onClearAll={clearAllTasks}
        onShowCompleted={toggleShowCompleted}
      />
    </>
  );
}
