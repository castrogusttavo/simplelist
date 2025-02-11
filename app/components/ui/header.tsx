'use client';

import { Button } from '@/app/components/button';
import { CodeSquareIcon } from '@houstonicons/pro';

export function Header() {
  return (
    <header className='hidden w-full md:flex justify-between items-center'>
      <a href={'/'}>
        <img src='/logo.svg' alt={'Simple List logo'} />
      </a>
      <Button
        onClick={() =>
          (window.location.href =
            'https://github.com/castrogusttavo/simpleList')
        }
      >
        <CodeSquareIcon
          size={24}
          color={'#F7F7F7'}
          variant={'stroke'}
          type={'rounded'}
        />
      </Button>
    </header>
  );
}
