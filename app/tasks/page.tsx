'use client';

import {
  TasksActionsFooter,
  TasksActionsHeader,
} from '@/app/components/ui/app/tasksActions';
import { TasksListUser } from '@/app/components/ui/app/tasksListUser';

export default function TasksBoard() {
  return (
    <>
      <TasksActionsHeader listName={'Tasks'} />
      <TasksListUser />
      <TasksActionsFooter totalTasks={5} completedTasks={2} />
    </>
  );
}
