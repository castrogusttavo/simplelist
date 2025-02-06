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
import { useCreateList } from '@/app/hooks/useList';
import type { List } from '@/app/services/listService';
import { Add01Icon } from '@houstonicons/pro';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  findValue: string;
  onChangeValue: (value: string) => void;
  lists: List[] | undefined;
}

export function ListsActions({
  findValue,
  onChangeValue,
  lists,
}: SearchBarProps) {
  const [createList, setCreateList] = useState(false);
  const [listName, setListName] = useState('');
  const [icon, setIcon] = useState('smile');
  const [color, setColor] = useState('#CBCBCB');
  const [isFocus, setIsFocus] = useState(false);

  const createListMutation = useCreateList();
  const queryClient = useQueryClient();

  function createNewList() {
    setCreateList((prev) => !prev);
    setIsFocus((prev) => !prev);
    if (listName === '/') {
      setListName('');
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '/') {
        event.preventDefault();
        setListName('');
        createNewList();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleCreateList(listName: string, icon: string, color: string) {
    if (!listName.trim()) return;

    createListMutation.mutate(
      {
        name: listName,
        iconName: icon,
        iconColor: color,
        totalTasks: 0,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
      },
    );
    setCreateList(false);
    setListName('');
  }

  return (
    <div
      className={`flex gap-2 w-full mb-5 ${lists?.length === 0 ? 'justify-end' : 'justify-between'}`}
    >
      {!lists ||
        (lists.length > 0 && (
          <SearchBar onChangeValue={onChangeValue} findValue={findValue} />
        ))}
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
          <CreateNewListInput
            onCreateList={handleCreateList}
            listName={listName}
            setListName={setListName}
            icon={icon}
            setIcon={setIcon}
            color={color}
            setColor={setColor}
            autoFocus={isFocus}
          />
        </div>
      )}
    </div>
  );
}
