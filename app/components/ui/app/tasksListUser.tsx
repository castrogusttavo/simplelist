import { TaskContainer } from '@/app/components/taskContainer';
import type { Task } from '@/app/lib/taskService';

interface TaskProps {
  tasks: Task[] | undefined;
}

export function TasksListUser({ tasks }: TaskProps) {
  return (
    <div className='flex flex-col gap-2 overflow-auto scrollbar-hide flex-1'>
      {tasks?.map((task) => (
        <TaskContainer
          key={task.id}
          taskId={task.id}
          name={task.name}
          completed={task.isCompleted}
        />
      ))}
    </div>
  );
}
