import clsx from 'clsx';
import type { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';

const RootLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='ru'>
      <body className={clsx('antialiased')}>{children}</body>
    </html>
  );
};

export default RootLayout;
