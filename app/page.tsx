import { CreateNewListInput, CreateNewTaskInput } from '@/app/components/input';
import { Progress } from '@/app/components/progress';
import { Title } from '@/app/components/title';

export default function Home() {
  return (
    <div className='flex flex-col gap-4'>
      <Title>Home</Title>
      <Progress totalTasks={3} completedTasks={0} />
      <Progress totalTasks={5} completedTasks={1} />
      <CreateNewListInput />
      <CreateNewTaskInput />
    </div>
  );
}
