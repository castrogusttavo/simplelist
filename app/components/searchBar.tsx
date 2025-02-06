import { ButtonClear } from '@/app/components/button';
import { Search01Icon } from '@houstonicons/pro';
import { type ChangeEvent, type ComponentProps, useEffect } from 'react';

interface SearchBarProps extends ComponentProps<'input'> {
  findValue: string;
  onChangeValue: (value: string) => void;
}

export function SearchBar({
  findValue,
  onChangeValue,
  ...props
}: SearchBarProps) {
  useEffect((): (() => void) => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'k') {
        document.querySelector('input')?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='flex items-center gap-3 p-2.5 rounded-full bg-[#000]/25 flex-1 group'>
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChangeValue(e.target.value)
        }
        {...props}
        className='flex-1 placeholder-[#F7F7F7]/25 group-focus-within:placeholder-[#F7F7F7]/70 bg-transparent border-none outline-none text-[#F7F7F7]'
      />
      {findValue && <ButtonClear onClick={() => onChangeValue('')} />}
    </div>
  );
}
