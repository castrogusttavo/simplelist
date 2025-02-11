import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ApplicationContainer } from '@/app/components/appContainer';
import { Header } from '@/app/components/ui/header';
import { QueryProvider } from '@/app/providers/queryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SimpleList - Your tasks, simplified',
  description: 'Create, manage, and conquer your to-do lists with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} antialiased bg-[#1E1E1E] text-zinc-50 w-full h-screen flex flex-col justify-between md:px-10 md:py-4`}
      >
        <QueryProvider>
          <Header />
          <ApplicationContainer className={'flex flex-col p-3 overflow-hidden'}>
            {children}
          </ApplicationContainer>
        </QueryProvider>
      </body>
    </html>
  );
}
