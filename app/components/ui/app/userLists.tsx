'use client';

import { ListContainer } from '@/app/components/listContainer';
import { useUpdateListsOrder } from '@/app/hooks/useList';
import type { List } from '@/app/services/listService';
import { DragDropContext, type DropResult, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';

interface TaskListContainerProps {
  searchTerm: string;
  lists: List[] | undefined;
}

export function UserLists({ searchTerm, lists }: TaskListContainerProps) {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const { mutate: updateListsOrder } = useUpdateListsOrder();

  const filteredLists = lists?.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function reorderList(lists: List[], startIndex: number, endIndex: number) {
    const result = Array.from(lists);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    if (!filteredLists) return;

    const reorderedLists = reorderList(
      filteredLists,
      result.source.index,
      result.destination.index,
    );

    updateListsOrder(reorderedLists);
  }

  return (
    <div className='transition-transform duration-500'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'droppable'} type='list' direction={'vertical'}>
          {(provided, snapshot) => (
            <div
              className='flex flex-col gap-2 overflow-hidden scrollbar-hide transition-all duration-500 flex-1'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredLists?.map((list, index) => (
                <ListContainer
                  key={list.id}
                  listId={list.id}
                  name={list.name}
                  iconColor={list.iconColor}
                  iconName={list.iconName}
                  totalTasks={list.totalTasks}
                  openModalId={openModalId}
                  setOpenModalId={setOpenModalId}
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
