import type { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export function OverlayShadow() {
  return (
    <div className='absolute inset-0 rounded-[48px] shrink-0 border border-[#FFFFFF0C] backdrop-blur-xl overlay-shadow' />
  );
}

export function OverlayBlur() {
  return (
    <div className='absolute inset-0 rounded-[48px] shrink-0 border-[12px] border-[#F7F7F77F] opacity-40 blur-md overlay-blur' />
  );
}

export function Overlay() {
  return (
    <div className='hidden md:block md:relative w-[512px] h-[528px]'>
      <OverlayBlur />
      <OverlayShadow />
    </div>
  );
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`hidden md:flex md:relative inset-0 w-[480px] h-[496px] rounded-[32px] border border-[#FFFFFF0C]/20 shrink-0 backdrop-blur-xl bg-[#282828B2] md:text-center ${className}`}
    >
      {children}
    </div>
  );
}

export function ApplicationContainer({ children, className }: ContainerProps) {
  return (
    <div className='relative w-full h-auto md:flex justify-center items-center'>
      <div className='relative'>
        <Overlay />
        <div className='absolute inset-0 flex justify-center items-center min-h-min md:min-h-0'>
          <Container className={className}>{children}</Container>
          <div className='block md:hidden w-full bg-[#282828B2] p-2.5 min-h-screen text-center'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
