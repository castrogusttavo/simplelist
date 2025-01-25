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
    <div className='relative w-[512px] h-[528px]'>
      <OverlayBlur />
      <OverlayShadow />
    </div>
  );
}

export function Container() {
  return (
    <div className='relative inset-0 w-[480px] h-[496px] rounded-[32px] border-2 border-[#FFFFFF0C] shrink-0 backdrop-blur-xl bg-[#282828B2]' />
  );
}

export function ApplicationContainer() {
  return (
    <div className='relative w-full h-screen flex justify-center items-center'>
      <div className='relative'>
        <Overlay />
        <div className='absolute inset-0 flex justify-center items-center'>
          <Container />
        </div>
      </div>
    </div>
  );
}
