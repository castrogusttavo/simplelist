import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { ApplicationContainer } from '@/app/components/appContainer';
import { Footer } from '@/app/components/ui/footer';
import { Header } from '@/app/components/ui/header';

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
        className={`${geistSans.variable} antialiased bg-[#1E1E1E] text-zinc-50 w-full h-screen flex flex-col justify-between px-10 py-4`}
      >
        <Header />
        <ApplicationContainer className={'flex flex-col p-3 overflow-hidden'}>
          {children}
        </ApplicationContainer>
        <Footer />
      </body>
    </html>
  );
}
