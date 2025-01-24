import type { ReactNode } from 'react';

interface CodeProps {
  children: ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <span className='h-5 w-auto min-w-5 text-center bg-[#f7f7f712] rounded'>
      {children}
    </span>
  );
}
