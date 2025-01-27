'use client';

import { ListContainer } from '@/app/components/listContainer';

interface TaskListContainerProps {
  searchTerm: string;
}

export function UserLists({ searchTerm }: TaskListContainerProps) {
  /*const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );*/

  return (
    <div className='flex flex-col gap-2 overflow-auto scrollbar-hide'>
      <ListContainer
        name={'Design Tasks'}
        iconColor={'#F7F7F7'}
        iconName={'sd-card'}
        totalTasks={3}
      />
      <ListContainer
        name={'Design Tasks'}
        iconColor={'#F7F7F7'}
        iconName={'sd-card'}
        totalTasks={3}
      />
    </div>
  );
}
