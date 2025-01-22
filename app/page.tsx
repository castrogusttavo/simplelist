import { Progress } from '@/app/components/progress';
import { Title } from '@/app/components/title';

export default function Home() {
  return (
    <div>
      <Title>Home</Title>
      <Progress totalTasks={5} completedTasks={1} />
    </div>
  );
}
