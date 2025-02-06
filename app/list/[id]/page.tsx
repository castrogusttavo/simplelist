'use client';

import { Spinner } from '@/app/components/spinner';
import {
  TasksActionsFooter,
  TasksActionsHeader,
} from '@/app/components/ui/app/tasksActions';
import { TasksListUser } from '@/app/components/ui/app/tasksListUser';
import { useGetListById } from '@/app/hooks/useList';
import { useDeleteAllTasks, useGetTasksForList } from '@/app/hooks/useTask';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function TasksBoard() {
  const params = useParams<{ id: string }>();
  const listId = params.id;

  const { data: tasks, isLoading, isError, error } = useGetTasksForList(listId);
  const { data: list } = useGetListById(listId);
  const { mutate: deleteAllTasks } = useDeleteAllTasks();

  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading)
    return (
      <div className='w-full min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className='w-full min-h-full flex items-center justify-center'>
        Error: {error?.message}
      </div>
    );

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
      {tasks?.length === 0 ? (
        <>
          <img
            src='/bg/all-completed.png'
            alt='Not found tasks'
            className='w-[336px] m-auto mt-0'
          />
          <span className='text-sm font-medium text-center text-[#f7f7f766]'>
            This list is lonely. Add some items.
          </span>
        </>
      ) : (
        <>
          {showCompleted &&
          tasks?.length &&
          tasks.length > 0 &&
          tasks?.every((task) => task.isCompleted) ? (
            <img
              src='/bg/all-completed.png'
              alt='All tasks completed'
              className='w-[336px]'
            />
          ) : (
            <TasksListUser tasks={filteredTasks} />
          )}
          <TasksActionsFooter
            tasks={tasks}
            onClearAll={clearAllTasks}
            onShowCompleted={toggleShowCompleted}
          />
        </>
      )}
    </>
  );
}
