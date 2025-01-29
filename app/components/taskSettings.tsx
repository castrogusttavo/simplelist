import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@/app/components/tooltip';
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
          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger>
                <button className='opacity-0 transition-opacity duration-700 ease-in-out transition-discrete animate-fade-in'>
                  <Copy01Icon
                    color={'#A1A1A1'}
                    size={24}
                    type={'rounded'}
                    variant={'stroke'}
                    strokeWidth={1.5}
                  />
                </button>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent side={'top'}>
                  Duplicate
                  <TooltipArrow />
                </TooltipContent>
              </TooltipPortal>
            </TooltipRoot>
          </TooltipProvider>

          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger>
                <button className='opacity-0 transition-opacity duration-700 ease-in-out transition-discrete animate-fade-in'>
                  <Delete02Icon
                    color={'#A1A1A1'}
                    size={24}
                    type={'rounded'}
                    variant={'stroke'}
                    strokeWidth={1.5}
                  />
                </button>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent side={'top'}>
                  Delete
                  <TooltipArrow />
                </TooltipContent>
              </TooltipPortal>
            </TooltipRoot>
          </TooltipProvider>
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
