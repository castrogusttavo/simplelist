'use client';

import { Spinner } from '@/app/components/spinner';
import { ListsActions } from '@/app/components/ui/app/listActions';
import { UserLists } from '@/app/components/ui/app/userLists';
import { useGetLists } from '@/app/hooks/useList';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, SetSearchTerm] = useState('');

  const { data: lists, isLoading, isError, error } = useGetLists();

  if (isLoading)
    return (
      <div className='w-full min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className='w-full min-h-full flex items-center justify-center'>
        Error: {error?.message}
      </div>
    );

  return (
    <>
      <ListsActions
        findValue={searchTerm}
        onChangeValue={SetSearchTerm}
        lists={lists}
      />

      {!lists || lists.length === 0 ? (
        <>
          <img
            src='/bg/not-found-list.png'
            alt='Not found lists'
            className='w-[336px] m-auto mt-0'
          />
          <span className='text-sm font-medium text-center text-[#f7f7f766]'>
            No list yet. Create one to start.
          </span>
        </>
      ) : lists.filter((list) => list.name.includes(searchTerm)).length ===
        0 ? (
        <>
          <img
            src='/bg/search-not-found.png'
            alt='Not found lists'
            className='w-[336px] m-auto mt-0'
          />
          <span className='text-sm font-medium text-center text-[#f7f7f766]'>
            No result for "{searchTerm}", try again.
          </span>
        </>
      ) : (
        <UserLists searchTerm={searchTerm} lists={lists} />
      )}
    </>
  );
}
