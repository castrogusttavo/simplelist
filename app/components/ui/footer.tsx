'use client';

import { Button } from '@/app/components/button';
import { Download04Icon } from '@houstonicons/pro';

export function Footer() {
  return (
    <footer className='hidden w-full md:flex justify-between items-center'>
      <div className='flex gap-2'>
        <button className='min-w-11 min-h-11 flex p-2.5 justify-center items-center rounded-full transition-all' />
        <button className='min-w-11 min-h-11 flex p-2.5 justify-center items-center rounded-full transition-all' />
      </div>
      <Button>
        <Download04Icon
          size={24}
          color={'#F7F7F7'}
          variant={'stroke'}
          type={'rounded'}
        />
      </Button>
    </footer>
  );
}
