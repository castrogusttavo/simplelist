import { TaskCheckBox } from '@/app/components/checkbox';
import { DragAndDrop } from '@/app/components/taskSettings';
import { useUpdateTask } from '@/app/hooks/useTask';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

interface TaskProps {
  taskId: string;
  name: string;
  completed: boolean;
  index: number;
}

export function TaskContainer({ taskId, completed, name, index }: TaskProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isChecked, setIsChecked] = useState(completed);
  const { mutate: updateTask } = useUpdateTask();
  const [taskName, setTaskName] = useState(name);

  function handleCheckedChange() {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    updateTask({
      id: taskId,
      updates: { isCompleted: newCheckedState },
    });
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
  }

  const handleNameBlur = () => {
    updateTask({
      id: taskId,
      updates: { name: taskName },
    });
  };

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          className={`flex justify-between items-center px-3 py-4 rounded-[20px] transition-all duration-500 group backdrop-blur-sm cursor-pointer ${
            isChecked
              ? 'bg-[#F7F7F704] hover:bg-[#F7F7F7]/5'
              : 'bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10'
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='flex gap-3 items-center'>
            <TaskCheckBox
              id={taskId}
              isChecked={isChecked}
              handleCheckedChange={handleCheckedChange}
            />
            <input
              value={taskName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              size={taskName.length}
              readOnly={window.innerWidth < 768}
              className='text-[#F7F7F7]/50 group-hover:text-[#F7F7F7]/70 text-sm font-semibold bg-transparent border-none outline-none cursor-pointer'
            />
          </div>
          <div className='hidden md:block'>
            <DragAndDrop
              taskId={taskId}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
