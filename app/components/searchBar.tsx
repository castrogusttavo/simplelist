'use client';

import { ButtonClear } from '@/app/components/button';
import { Search01Icon } from '@houstonicons/pro';
import { type ChangeEvent, type ComponentProps, useState } from 'react';

interface SearchBarProps extends ComponentProps<'input'> {}

export function SearchBar({ ...props }: SearchBarProps) {
  const [findValue, setFindValue] = useState('');

  return (
    <div className='flex items-center gap-3 p-2.5 rounded-full bg-[#282828]/70 group'>
      <div className='group-focus-within:opacity-70 opacity-50 transition-all'>
        <Search01Icon
          color='#F7F7F7'
          size={24}
          type={'rounded'}
          variant={'stroke'}
          strokeWidth={1.5}
        />
      </div>
      <input
        placeholder='Search list...'
        value={findValue}
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setFindValue(e.target.value)
        }
        {...props}
        className='flex-1 placeholder-[#F7F7F7]/25 group-focus-within:placeholder-[#F7F7F7]/70 bg-transparent border-none outline-none text-[#F7F7F7]'
      />
      {findValue && <ButtonClear onClick={() => setFindValue('')} />}
    </div>
  );
}
