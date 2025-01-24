import { TaskCheckBox } from '@/app/components/checkbox';
import { useCheckboxState } from '@/app/hooks/useCheckboxState';
import {
  Copy01Icon,
  Delete02Icon,
  DragDropVerticalIcon,
} from '@houstonicons/pro';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useState } from 'react';

interface TaskProps {
  id: string;
  name: string;
}

export function Testea({ id, name }: TaskProps) {
  const { isChecked, handleCheckedChange } = useCheckboxState(id);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className={`flex justify-between items-center px-3 py-4 rounded-[20px] transition-all duration-500 group backdrop-blur-sm ${isChecked ? 'bg-[#F7F7F704] hover:bg-[#F7F7F7]/5' : 'bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10'}`}
    >
      <div className='flex gap-3 items-center'>
        <Checkbox.Root
          id={id}
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
          className='size-6 bg-transparent border-[3px] border-[#F7F7F7]/25 hover:border-[#F7F7F7]/75 aria-checked:hover:border-[#F7F7F7]/30 rounded-full transition-all duration-500'
        >
          <Checkbox.Indicator className='relative flex size-full items-center justify-center after:block after:size-[11px] after:rounded-full after:bg-gradient-to-b after:from-[#F7F7F7]/90 after:to-[#F7F7F7]/30' />
        </Checkbox.Root>
        <p className='text-[#F7F7F7]/50 group-hover:text-[#F7F7F7]/70 has-checked:hover:text-[#F7F7F7]/50 transition-all text-lg font-semibold'>
          {name}
        </p>
      </div>
      <div className='flex gap-3 transition-all duration-500'>
        {showSettings && (
          <div
            className={`flex gap-2 transition-all duration-300 ease-in-out ${
              showSettings
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2'
            }`}
          >
            <button className='transition-transform duration-200 hover:scale-110'>
              <Copy01Icon
                color={'#A1A1A1'}
                size={24}
                type={'rounded'}
                variant={'stroke'}
                strokeWidth={1.5}
              />
            </button>
            <button className='transition-transform duration-200 hover:scale-110'>
              <Delete02Icon
                color={'#A1A1A1'}
                size={24}
                type={'rounded'}
                variant={'stroke'}
                strokeWidth={1.5}
              />
            </button>
          </div>
        )}
        <button onClick={(): void => setShowSettings(!showSettings)}>
          <DragDropVerticalIcon
            color={'#A1A1A1'}
            size={24}
            type={'rounded'}
            variant={'stroke'}
            strokeWidth={3}
          />
        </button>
      </div>
    </div>
  );
}
