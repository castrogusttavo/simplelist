import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@/app/components/tooltip';
import { Cancel01Icon, CheckmarkCircle02Icon } from '@houstonicons/pro';
import { type ComponentProps, type ReactNode, useState } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children?: ReactNode;
}

interface TooltipProps extends ButtonProps {
  trigger: ReactNode;
  description: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className='min-w-11 min-h-11 flex p-2.5 justify-center items-center rounded-full bg-[#282828]/70 hover:bg-[#F7F7F7]/15 backdrop-blur-[25px] shadow-[2px_4px_16px_0px_rgba(247,247,247,0.07)_inset] button-overlay transition-all border-t border-[#FFF]/10'
      {...props}
    >
      {children}
    </button>
  );
}

export function IconSettings({ children, ...props }: ButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <button
      className={`min-w-11 min-h-11 flex p-2.5 justify-center items-center rounded-full transition-all ${clicked ? 'bg-[#282828]/50' : 'bg-[#F7F7F7]/5'}`}
      onClick={handleClick}
      {...props}
    >
      <div
        className={`transition-transform ${clicked ? 'scale-90' : 'scale-100'}`}
      >
        {children}
      </div>
    </button>
  );
}

export function ButtonDone({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className='opacity-25 hover:opacity-50 my-2.5 transition-all duration-200'
    >
      <CheckmarkCircle02Icon
        type={'rounded'}
        variant={'solid'}
        size={24}
        color={'#F8F8F8'}
      />
    </button>
  );
}

export function ButtonClear({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className='opacity-100 hover:bg-[#f7f7f7]/20 transition-all p-1 duration-200 rounded-full bg-[#f7f7f71a]'
    >
      <Cancel01Icon
        type={'rounded'}
        variant={'stroke'}
        size={12}
        color={'#F8F8F8'}
      />
    </button>
  );
}

export function ButtonTooltip({
  trigger,
  description,
  ...props
}: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger>
          <Button {...props}>{trigger}</Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            {description}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}
