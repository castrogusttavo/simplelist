import { TaskCheckBox } from '@/app/components/checkbox';
import { DragAndDrop } from '@/app/components/taskSettings';
import { useUpdateTask } from '@/app/hooks/useTask';
import { useState } from 'react';
//
interface TaskProps {
  taskId: string;
  name: string;
  completed: boolean;
}

export function TaskContainer({ taskId, completed, name }: TaskProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isChecked, setIsChecked] = useState(completed);
  const { mutate: updateTask } = useUpdateTask();

  function handleCheckedChange() {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    updateTask({
      id: taskId,
      updates: { isCompleted: newCheckedState },
    });
  }

  return (
    <div
      className={`flex justify-between items-center px-3 py-4 rounded-[20px] transition-all duration-500 group backdrop-blur-sm ${
        isChecked
          ? 'bg-[#F7F7F704] hover:bg-[#F7F7F7]/5'
          : 'bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10'
      }`}
    >
      <div className='flex gap-3 items-center'>
        <TaskCheckBox
          id={taskId}
          isChecked={isChecked}
          handleCheckedChange={handleCheckedChange}
        />
        <p className='text-[#F7F7F7]/50 group-hover:text-[#F7F7F7]/70 has-checked:hover:text-[#F7F7F7]/50 transition-all text-sm font-semibold'>
          {name}
        </p>
      </div>
      <DragAndDrop
        taskId={taskId}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </div>
  );
}
