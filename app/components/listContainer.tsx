import { IconSettings } from '@/app/components/button';
import { DragAndDropList } from '@/app/components/dragAndDrop';
import { CustomListModal } from '@/app/components/modal';
import { Icon } from '@houstonicons/pro';
import { type ChangeEvent, useState } from 'react';
import { useUpdateList } from '../hooks/useList';

interface ListProps {
  name: string;
  iconColor: string;
  iconName: string;
  totalTasks: number;
  listId: string;
}

export function ListContainer({
  name,
  iconColor,
  iconName,
  totalTasks,
  listId,
}: ListProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentIcon, setCurrentIcon] = useState(iconName);
  const [currentColor, setCurrentColor] = useState(iconColor);
  const [listName, setListName] = useState(name);

  const { mutate: updateList } = useUpdateList();

  const handleUpdate = (updates: Partial<Omit<ListProps, 'listId'>>) => {
    if (updates.iconName) setCurrentIcon(updates.iconName);
    if (updates.iconColor) setCurrentColor(updates.iconColor);

    console.log('Updates:', updates);
    updateList({ id: listId, updates });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const handleNameBlur = () => {
    updateList({
      id: listId,
      updates: { name: listName },
    });
  };

  return (
    <div className='relative'>
      <div className='flex justify-between items-center p-3 rounded-[20px] bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10 group transition-all duration-500'>
        <div className='flex gap-4 items-center'>
          <IconSettings onClick={() => setIsModalOpen(!isModalOpen)}>
            <Icon
              color={iconColor}
              iconName={iconName}
              size={24}
              type={'rounded'}
              variant={'stroke'}
              strokeWidth={1.5}
            />
          </IconSettings>
          <input
            value={listName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            className='text-[#F7F7F7]/70 text-sm font-semibold bg-transparent border-none outline-none'
          />
        </div>
        {!showSettings && (
          <span className='text-[#F7F7F7]/70 text-sm font-medium group-hover:hidden h-6 w-6 text-center'>
            {totalTasks}
          </span>
        )}
        <div
          className={`${showSettings ? 'block' : 'hidden group-hover:block'}`}
        >
          <DragAndDropList
            listId={listId}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className='fixed z-10'>
          <CustomListModal
            icon={currentIcon}
            color={currentColor}
            setIcon={(icon) => handleUpdate({ iconName: icon })}
            setColor={(color) => handleUpdate({ iconColor: color })}
          />
        </div>
      )}
    </div>
  );
}
