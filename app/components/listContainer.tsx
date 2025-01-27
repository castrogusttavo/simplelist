import { IconSettings } from '@/app/components/button';
import { DragAndDrop } from '@/app/components/dragAndDrop';
import { CustomListModal } from '@/app/components/modal';
import { Icon } from '@houstonicons/pro';
import { useState } from 'react';

interface ListProps {
  name: string;
  iconColor: string;
  iconName: string;
  totalTasks: number;
}

export function ListContainer({
  name,
  iconColor,
  iconName,
  totalTasks,
}: ListProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <span className='text-[#F7F7F7]/70 text-sm font-semibold'>
            {name}
          </span>
        </div>
        {!showSettings && (
          <span className='text-[#F7F7F7]/70 text-sm font-medium group-hover:hidden h-6 w-6 text-center'>
            {totalTasks}
          </span>
        )}
        <div
          className={`${showSettings ? 'block' : 'hidden group-hover:block'}`}
        >
          <DragAndDrop
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className='fixed z-10'>
          <CustomListModal />
        </div>
      )}
    </div>
  );
}
