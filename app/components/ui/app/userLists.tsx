'use client';

import { ListContainer } from '@/app/components/listContainer';
import { useGetLists } from '@/app/hooks/useList';

interface TaskListContainerProps {
  searchTerm: string;
}

export function UserLists({ searchTerm }: TaskListContainerProps) {
  const { data: lists, isLoading, isError, error } = useGetLists();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

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
        />
      ))}
    </div>
  );
}

//    <ErrorBoundary FallbackComponent={ErrorFallback}>
//       <Suspense fallback={<p>Loading lists...</p>}>
//         <ListsContent />
//       </Suspense>
//     </ErrorBoundary>
