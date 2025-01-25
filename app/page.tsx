import { ApplicationContainer } from '@/app/components/appContainer';

export default function Home() {
  return (
    <div>
      <ApplicationContainer className={'flex items-center justify-center'}>
        <img src={'./bg/loading.png'} alt={'loading animation'} />
      </ApplicationContainer>
    </div>
  );
}
