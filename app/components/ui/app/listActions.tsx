import { Button } from '@/app/components/button';
import { Code } from '@/app/components/code';
import { CreateNewListInput } from '@/app/components/input';
import { SearchBar } from '@/app/components/searchBar';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@/app/components/tooltip';
import { Add01Icon } from '@houstonicons/pro';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  findValue: string;
  onChangeValue: (value: string) => void;
}

export function ListsActions({ findValue, onChangeValue }: SearchBarProps) {
  const [createList, setCreateList] = useState(false);

  function handleCreateTask() {
    setCreateList(!createList);
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
    <div className='flex justify-between gap-2 w-full mb-5'>
      <SearchBar onChangeValue={onChangeValue} findValue={findValue} />
      <div className='z-50'>
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>
              <Button onClick={(): void => setCreateList(!createList)}>
                <div
                  className={`${createList ? 'rotate-45' : ''} transition-transform duration-500`}
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
                {createList ? (
                  <>Cancel</>
                ) : (
                  <>
                    Add new list <Code>/</Code>
                  </>
                )}
                <TooltipArrow />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      </div>
      {createList && (
        <div className='fixed inset-0 z-30 w-full h-full flex items-end justify-center bg-[#282828B2] backdrop-blur-2xl p-3'>
          <CreateNewListInput />
        </div>
      )}
    </div>
  );
}
