import { TaskCheckBox } from '@/app/components/checkbox';
import { DragAndDrop } from '@/app/components/dragAndDrop';
import { useCheckboxState } from '@/app/hooks/useCheckboxState';
import { useState } from 'react';

interface TaskProps {
  id: string;
  name: string;
}

export function TaskContainer({ id, name }: TaskProps) {
  // useCheckboxState is a custom hook that returns the state of the checkbox and a function to change it
  const { isChecked, handleCheckedChange } = useCheckboxState(id);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className={`flex justify-between items-center px-3 py-4 rounded-[20px] transition-all duration-500 group backdrop-blur-sm ${isChecked ? 'bg-[#F7F7F704] hover:bg-[#F7F7F7]/5' : 'bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10'}`}
    >
      <div className='flex gap-3 items-center'>
        <TaskCheckBox
          id={id}
          isChecked={isChecked}
          handleCheckedChange={handleCheckedChange}
        />
        <p className='text-[#F7F7F7]/50 group-hover:text-[#F7F7F7]/70 has-checked:hover:text-[#F7F7F7]/50 transition-all text-sm font-semibold'>
          {name}
        </p>
      </div>
      <DragAndDrop
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </div>
  );
}
