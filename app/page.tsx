'use client';

import { ListsActions } from '@/app/components/ui/app/listActions';
import { UserLists } from '@/app/components/ui/app/userLists';
import { useGetLists } from '@/app/hooks/useList';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, SetSearchTerm] = useState('');

  const { data: lists, isLoading, isError, error } = useGetLists();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      <ListsActions findValue={searchTerm} onChangeValue={SetSearchTerm} />
      <UserLists searchTerm={searchTerm} lists={lists} />
    </>
  );
}
