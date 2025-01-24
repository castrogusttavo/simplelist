import {
  CheckmarkCircle02Icon,
  MultiplicationSignCircleIcon,
} from '@houstonicons/pro';
import type { ComponentProps, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  hover?: boolean;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className='w-11 h-11 flex p-2.5 justify-center items-center rounded-full bg-[#282828]/70 hover:bg-[#282828]/100 backdrop-blur-[25px] shadow-[2px_4px_16px_0px_rgba(247,247,247,0.07)_inset] button-overlay transition-all border-t border-[#FFF]/10'
      {...props}
    >
      {children}
    </button>
  );
}

export function IconSettings({ children, hover, ...props }: ButtonProps) {
  return (
    <button
      className={`w-11 h-11 flex p-2.5 justify-center items-center rounded-full transition-all ${hover === true ? 'bg-[#F7F7F7]/5 hover:bg-[#F7F7F7]/10' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonDone() {
  return (
    <button>
      <CheckmarkCircle02Icon type={'rounded'} variant={'solid'} />
    </button>
  );
}

export function ButtonClear() {
  return (
    <button>
      <MultiplicationSignCircleIcon type={'rounded'} variant={'stroke'} />
    </button>
  );
}
