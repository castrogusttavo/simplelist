import { TaskContainer } from '@/app/components/taskContainer';

export function TasksListUser() {
  return (
    <div className='flex flex-col gap-2 overflow-auto scrollbar-hide flex-1'>
      <TaskContainer id={'1'} name={'New task'} />
      <TaskContainer id={'2'} name={'New task'} />
      <TaskContainer id={'3'} name={'New task'} />
      <TaskContainer id={'4'} name={'New task'} />
      <TaskContainer id={'5'} name={'New task'} />
    </div>
  );
}
