'use client';

import { IconSettings } from '@/app/components/button';
import { ButtonDone } from '@/app/components/button';
import { CustomListModal } from '@/app/components/modal';
import { CircleIcon, SmileIcon } from '@houstonicons/pro';
import { type ChangeEvent, useState } from 'react';

export function CreateNewListInput() {
  const [listName, setListName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='w-full'>
      {isModalOpen && <CustomListModal />}
      <div className='p-3 flex items-center rounded-[20px] bg-[#282828] z-40 w-full overlay relative'>
        <div className='w-full flex items-center gap-4'>
          <IconSettings onClick={() => setIsModalOpen(!isModalOpen)}>
            <SmileIcon
              color='#F7F7F7'
              size={24}
              type={'rounded'}
              variant={'stroke'}
              strokeWidth={1.5}
            />
          </IconSettings>
          <input
            type='text'
            placeholder='Create a new list'
            value={listName}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setListName(e.target.value)
            }
            className='placeholder-[#F7F7F7]/25 placeholder:font-semibold bg-transparent focus:placeholder-[#F7F7F7]/70 flex-1 w-full outline-none border-none text-[#F7F7F7]'
          />
        </div>
        {listName && <ButtonDone onClick={() => setListName('')} />}
      </div>
    </div>
  );
}

export function CreateNewTaskInput() {
  const [taskName, setTaskName] = useState('');

  return (
    <div className='p-3 flex items-center rounded-[20px] bg-[#282828] z-40 w-full overlay relative'>
      <div className='w-full flex items-center gap-4'>
        <IconSettings>
          <CircleIcon
            color='#F7F7F740'
            size={24}
            type={'rounded'}
            variant={'stroke'}
            strokeWidth={2}
          />
        </IconSettings>
        <input
          type='text'
          placeholder='Task name...'
          value={taskName}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setTaskName(e.target.value)
          }
          className='placeholder-[#F7F7F7]/25 placeholder:font-semibold bg-transparent focus:placeholder-[#F7F7F7]/70 flex-1 w-full outline-none border-none text-[#F7F7F7]'
        />
      </div>
      {taskName && <ButtonDone onClick={() => setTaskName('')} />}
    </div>
  );
}
