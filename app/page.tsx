'use client';

import { ListsActions } from '@/app/components/ui/app/listActions';
import { UserLists } from '@/app/components/ui/app/userLists';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, SetSearchTerm] = useState('');
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ListsActions findValue={searchTerm} onChangeValue={SetSearchTerm} />
      <UserLists searchTerm={searchTerm} />
    </QueryClientProvider>
  );
}
