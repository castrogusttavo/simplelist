import { Button } from '@/app/components/button';
import { Code } from '@/app/components/code';
import { CreateNewTaskInput } from '@/app/components/input';
import { EditTaskModal } from '@/app/components/modal';
import { Progress } from '@/app/components/progress';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@/app/components/tooltip';
import { useCreateTask } from '@/app/hooks/useTask';
import type { Task } from '@/app/lib/taskService';
import {
  Add01Icon,
  ArrowLeft02Icon,
  MoreHorizontalCircle01Icon,
} from '@houstonicons/pro';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ListProps {
  listName: string | undefined;
  listId: string;
}

interface TasksProps {
  tasks: Task[] | undefined;
  onShowCompleted: () => void;
  onClearAll: () => void;
}

export function TasksActionsHeader({ listName, listId }: ListProps) {
  const [createTask, setCreateTask] = useState(false);
  const [taskName, setTaskName] = useState('');
  const router = useRouter();

  const createTaskMutation = useCreateTask();
  const queryClient = useQueryClient();

  function createNewTask() {
    setCreateTask(!createTask);
  }

  useEffect((): (() => void) => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '/') {
        createNewTask();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleCreateTask(taskName: string, listId: string) {
    if (!taskName.trim()) return;

    createTaskMutation.mutate(
      {
        listId: listId,
        name: taskName,
        isCompleted: false,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
      },
    );
    setCreateTask(false);
    setTaskName('');
  }

  return (
    <div className='flex top-0 justify-between mb-3'>
      <div className='flex gap-3 items-center'>
        <Button onClick={() => router.push('/')}>
          <ArrowLeft02Icon
            type={'rounded'}
            variant={'stroke'}
            color={'#F7F7F7'}
            size={24}
          />
        </Button>
        <h2 className='text-xl font-medium text-[#f7f7f7f2]'>{listName}</h2>
      </div>
      <div className='z-50'>
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>
              <Button onClick={(): void => setCreateTask(!createTask)}>
                <div
                  className={`${createTask ? 'rotate-45' : ''} transition-transform duration-500`}
                >
                  <Add01Icon
                    type={'rounded'}
                    variant={'stroke'}
                    color={'#F7F7F7'}
                    size={24}
                  />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent side={'bottom'}>
                {createTask ? (
                  <>Cancel</>
                ) : (
                  <>
                    Add new item <Code>/</Code>
                  </>
                )}
                <TooltipArrow />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      </div>
      {createTask && (
        <div className='fixed inset-0 z-30 w-full h-full flex items-center justify-center bg-[#282828B2] backdrop-blur-md p-3'>
          <CreateNewTaskInput
            onCreateTask={() => handleCreateTask(taskName, listId)}
            taskName={taskName}
            setTaskName={setTaskName}
          />
        </div>
      )}
    </div>
  );
}

export function TasksActionsFooter({
  tasks,
  onShowCompleted,
  onClearAll,
}: TasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((task) => task.isCompleted).length || 0;

  return (
    <div className='relative'>
      {isModalOpen && (
        <div className='fixed bottom-14 right-0 z-20 w-full h-full flex items-end justify-end bg-[#282828B2] backdrop-blur-xl p-3'>
          <EditTaskModal
            onShowCompleted={() => {
              onShowCompleted();
              setIsModalOpen(false);
            }}
            onClearAll={() => {
              onClearAll();
              setIsModalOpen(false);
            }}
          />
        </div>
      )}
      <div className='flex bottom-0 justify-between'>
        <Progress totalTasks={totalTasks} completedTasks={completedTasks} />
        <div className='z-40'>
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>
            <MoreHorizontalCircle01Icon
              type={'rounded'}
              variant={'stroke'}
              color={'#F7F7F7'}
              size={24}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
