'use client';

import { ApplicationContainer } from '@/app/components/appContainer';
import { CreateNewListInput, CreateNewTaskInput } from '@/app/components/input';
import { ListContainer } from '@/app/components/listContainer';
import { Progress } from '@/app/components/progress';
import { ColorPicker } from '@/app/components/radioButton';
import { SearchBar } from '@/app/components/searchBar';
import { TaskContainer } from '@/app/components/taskContainer';
import { Title } from '@/app/components/title';

export default function Home() {
  return (
    <div className='flex flex-col gap-4'>
      <Title>Home</Title>
      <Progress totalTasks={3} completedTasks={0} />
      <Progress totalTasks={5} completedTasks={1} />
      <CreateNewListInput />
      <CreateNewTaskInput />

      <SearchBar />
      <ColorPicker
        values={['r1', 'r2', 'r3']}
        bgPicker={['#FFF', '#000', '#282828']}
      />
      <TaskContainer name={'Promote Bento Card'} id={'complete'} />
      <ListContainer
        name={'Upcoming'}
        iconName={'delete-02'}
        totalTasks={5}
        iconColor={'#FFF'}
      />
      <ApplicationContainer />
    </div>
  );
}
