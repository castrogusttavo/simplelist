import { TaskContainer } from '@/app/components/taskContainer';
import { useUpdateTasksOrder } from '@/app/hooks/useTask';
import type { Task } from '@/app/services/taskService';
import { DragDropContext, type DropResult, Droppable } from '@hello-pangea/dnd';

interface TaskProps {
  tasks: Task[] | undefined;
}

export function TasksListUser({ tasks }: TaskProps) {
  const { mutate: updateListsOrder } = useUpdateTasksOrder();

  function reorderTask(tasks: Task[], startIndex: number, endIndex: number) {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    if (!tasks) return;

    const reorderedTasks = reorderTask(
      tasks,
      result.source.index,
      result.destination.index,
    );

    updateListsOrder(reorderedTasks);
  }

  return (
    <div className='flex-1 transition-transform duration-500'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'droppable'} type='task' direction={'vertical'}>
          {(provided, snapshot) => (
            <div
              className='flex flex-col gap-2 overflow-auto scrollbar-hide transition-all duration-500'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks?.map((task, index) => (
                <TaskContainer
                  key={task.id}
                  taskId={task.id}
                  name={task.name}
                  completed={task.isCompleted}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
