'use client';

import { ListsActions } from '@/app/components/ui/app/listActions';
import { UserLists } from '@/app/components/ui/app/userLists';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, SetSearchTerm] = useState('');

  return (
    <>
      <ListsActions findValue={searchTerm} onChangeValue={SetSearchTerm} />
      <UserLists searchTerm={searchTerm} />
    </>
  );
}
