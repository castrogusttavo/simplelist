import {
  Copy01Icon,
  Delete02Icon,
  DragDropVerticalIcon,
} from '@houstonicons/pro';

interface DragAndDropProps {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
  className?: string;
}

export function DragAndDrop({
  showSettings,
  setShowSettings,
  className,
}: DragAndDropProps) {
  return (
    <div className={`flex gap-3 transition-all duration-500 ${className}`}>
      {showSettings && (
        <>
          <button className='opacity-0 transition-opacity duration-700 ease-in-out transition-discrete animate-fade-in'>
            <Copy01Icon
              color={'#A1A1A1'}
              size={24}
              type={'rounded'}
              variant={'stroke'}
              strokeWidth={1.5}
            />
          </button>
          <button
            className='opacity-0 transition-opacity duration-700 ease-in-out transition-discrete animate-fade-in'
            /*className='transition-transform duration-200 hover:scale-110'*/
          >
            <Delete02Icon
              color={'#A1A1A1'}
              size={24}
              type={'rounded'}
              variant={'stroke'}
              strokeWidth={1.5}
            />
          </button>
        </>
      )}
      <button
        onClick={(): void => setShowSettings(!showSettings)}
        className='opacity-50 group-hover:opacity-100 transition-all duration-500'
      >
        <DragDropVerticalIcon
          color={'#A1A1A1'}
          size={24}
          type={'rounded'}
          variant={'stroke'}
          strokeWidth={3}
        />
      </button>
    </div>
  );
}
