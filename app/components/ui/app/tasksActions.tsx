import { Button } from '@/app/components/button';
import { Code } from '@/app/components/code';
import { CreateNewTaskInput } from '@/app/components/input';
import { EditListModal } from '@/app/components/modal';
import { Progress } from '@/app/components/progress';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@/app/components/tooltip';
import {
  Add01Icon,
  ArrowLeft02Icon,
  MoreHorizontalCircle01Icon,
} from '@houstonicons/pro';
import { useEffect, useState } from 'react';

interface ListProps {
  listName: string;
}

interface TasksProps {
  totalTasks: number;
  completedTasks: number;
}

export function TasksActionsHeader({ listName }: ListProps) {
  const [createTask, setCreateTask] = useState(false);

  function handleCreateTask() {
    setCreateTask(!createTask);
  }

  useEffect((): (() => void) => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '/') {
        handleCreateTask();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='flex top-0 justify-between mb-3'>
      <div className='flex gap-3 items-center'>
        <Button onClick={() => (window.location.href = '/')}>
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
          <CreateNewTaskInput />
        </div>
      )}
    </div>
  );
}

export function TasksActionsFooter({ totalTasks, completedTasks }: TasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='relative'>
      {isModalOpen && (
        <div className='fixed bottom-14 right-0 z-20 w-full h-full flex items-end justify-end bg-[#282828B2] backdrop-blur-xl p-3'>
          <EditListModal />
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
