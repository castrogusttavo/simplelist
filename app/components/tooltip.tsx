import { Tooltip } from 'radix-ui';
import type { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
}

interface TooltipContentProps extends TooltipProps {
  side: 'top' | 'bottom';
}

export function TooltipProvider({ children }: TooltipProps) {
  return <Tooltip.Provider>{children}</Tooltip.Provider>;
}

export function TooltipRoot({ children }: TooltipProps) {
  return <Tooltip.Root delayDuration={50}>{children}</Tooltip.Root>;
}

export function TooltipTrigger({ children }: TooltipProps) {
  return <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>;
}

export function TooltipPortal({ children }: TooltipProps) {
  return <Tooltip.Portal>{children}</Tooltip.Portal>;
}

export function TooltipContent({ children, side }: TooltipContentProps) {
  return (
    <Tooltip.Content
      side={side}
      className='bg-[#28282899] rounded-lg text-xs px-2 py-1 overlay-tooltip flex items-center justify-center gap-2 border-none outline-none transition-all duration-200 z-[500] backdrop-blur-[50px]'
    >
      {children}
    </Tooltip.Content>
  );
}

export function TooltipArrow() {
  return <Tooltip.Arrow className='fill-none' />;
}
