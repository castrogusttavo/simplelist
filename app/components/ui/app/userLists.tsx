'use client';

import { ListContainer } from '@/app/components/listContainer';
import type { List } from '@/app/lib/listService';
import { useState } from 'react';

interface TaskListContainerProps {
  searchTerm: string;
  lists: List[] | undefined;
}

export function UserLists({ searchTerm, lists }: TaskListContainerProps) {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const filteredLists = lists?.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='flex flex-col gap-2 overflow-auto scrollbar-hide'>
      {filteredLists?.map((list) => (
        <ListContainer
          key={list.id}
          listId={list.id}
          name={list.name}
          iconColor={list.iconColor}
          iconName={list.iconName}
          totalTasks={list.totalTasks}
          openModalId={openModalId}
          setOpenModalId={setOpenModalId}
        />
      ))}
    </div>
  );
}

//    <ErrorBoundary FallbackComponent={ErrorFallback}>
//       <Suspense fallback={<p>Teste2 lists...</p>}>
//         <ListsContent />
//       </Suspense>
//     </ErrorBoundary>
