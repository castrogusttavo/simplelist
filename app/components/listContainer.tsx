import { IconSettings } from '@/app/components/button';
import { DragAndDrop } from '@/app/components/listSettings';
import { CustomListModal } from '@/app/components/modal';
import { Draggable } from '@hello-pangea/dnd';
import { Icon } from '@houstonicons/pro';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useRef, useState } from 'react';
import { useUpdateList } from '../hooks/useList';

interface ListProps {
  name: string;
  iconColor: string;
  iconName: string;
  totalTasks: number;
  listId: string;
  index: number;
}

interface ListContainerProps extends ListProps {
  openModalId: string | null;
  setOpenModalId: (id: string | null) => void;
}

export function ListContainer({
  name,
  iconColor,
  iconName,
  totalTasks,
  listId,
  openModalId,
  setOpenModalId,
  index,
}: ListContainerProps) {
  const [showSettings, setShowSettings] = useState(false);
  const isModalOpen = openModalId === listId;

  const [currentIcon, setCurrentIcon] = useState(iconName);
  const [currentColor, setCurrentColor] = useState(iconColor);
  const [listName, setListName] = useState(name);

  const { mutate: updateList } = useUpdateList();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      inputRef.current === document.activeElement ||
      isModalOpen ||
      showSettings
    ) {
      e.preventDefault();
      return;
    }
    if (window.innerWidth < 768) {
      router.push(`/list/${listId}`);
      return;
    }
    router.push(`/list/${listId}`);
  };

  const handleSettingsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (window.innerWidth < 768) {
      return;
    }

    setShowSettings(!showSettings);
  };

  const handleModalToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (window.innerWidth < 768) {
      return;
    }

    setOpenModalId(isModalOpen ? null : listId);
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='relative cursor-pointer'
          onClick={handleContainerClick}
        >
          <div className='flex justify-between items-center p-3 rounded-[20px] bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10 group transition-all duration-500'>
            <div className='flex gap-4 items-center'>
              <IconSettings onClick={handleModalToggle}>
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
                ref={inputRef}
                value={listName}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                size={listName.length}
                readOnly={window.innerWidth < 768}
                className='text-[#F7F7F7]/70 text-sm font-semibold bg-transparent border-none outline-none cursor-pointer'
              />
            </div>
            {!showSettings && (
              <span className='text-[#F7F7F7]/70 text-sm font-medium md:group-hover:hidden h-6 w-6 text-center'>
                {totalTasks}
              </span>
            )}
            <div
              onClick={handleSettingsClick}
              className={`${showSettings ? 'block' : 'hidden md:group-hover:block'}`}
            >
              <DragAndDrop
                listId={listId}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
              />
            </div>
          </div>
          {isModalOpen && (
            <div className='fixed z-10' onClick={(e) => e.stopPropagation()}>
              <CustomListModal
                icon={currentIcon}
                color={currentColor}
                setIcon={(icon) => handleUpdate({ iconName: icon })}
                setColor={(color) => handleUpdate({ iconColor: color })}
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
