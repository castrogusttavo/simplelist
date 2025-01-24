'use client';

import { Search01Icon } from '@houstonicons/pro';
import type { ComponentProps } from 'react';

interface SearchBarProps extends ComponentProps<'input'> {}

export function SearchBar({ ...props }: SearchBarProps) {
  return (
    <div className='flex items-center gap-3 p-2.5 rounded-full bg-[#282828]/70 group'>
      <div className='group-focus-within:opacity-70 opacity-50 transition-all'>
        <Search01Icon
          color='#F7F7F7'
          size={24}
          type={'rounded-sm'}
          variant={'stroke'}
          strokeWidth={1.5}
        />
      </div>
      <input
        placeholder='Search list...'
        {...props}
        className='flex-1 placeholder-[#F7F7F7]/25 group-focus-within:placeholder-[#F7F7F7]/70 bg-transparent border-none outline-hidden text-[#F7F7F7] transition-all duration-500'
      />
    </div>
  );
}
