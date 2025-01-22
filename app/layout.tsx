import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

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
        className={`${geistSans.variable} antialiased bg-zinc-800 text-zinc-50 w-full min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
