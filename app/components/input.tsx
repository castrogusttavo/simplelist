'use client';

import { IconSettings } from '@/app/components/button';
import { CircleIcon, SmileIcon } from '@houstonicons/pro';

export function CreateNewListInput() {
  return (
    <div className='p-3 flex items-center rounded-[20px] bg-[#F7F7F7]/2 z-40 w-full bg-[#FFFFFF]/5 overlay relative'>
      <div className='w-full flex items-center gap-4'>
        <IconSettings hover>
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
          className='placeholder-[#F7F7F7]/25 placeholder:font-semibold bg-transparent focus:placeholder-[#F7F7F7]/70 flex-1 w-full outline-none border-none transition-all duration-500 text-[#F7F7F7]'
        />
      </div>
    </div>
  );
}

export function CreateNewTaskInput() {
  return (
    <div className='p-3 flex items-center rounded-[20px] bg-[#F7F7F7]/2 z-40 w-full bg-[#FFFFFF]/5 overlay relative'>
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
          placeholder='Create a new list'
          className='placeholder-[#F7F7F7]/25 placeholder:font-semibold bg-transparent focus:placeholder-[#F7F7F7]/70 flex-1 w-full outline-none border-none transition-all duration-500 text-[#F7F7F7]'
        />
      </div>
    </div>
  );
}
