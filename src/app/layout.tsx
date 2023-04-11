import React from 'react';
import HeaderNav from '@/components/HeaderNav';
import Providers from './providers';

import './globals.css';

export const metadata = {
  title: 'Front-end challenge',
  description: 'This is the landing page',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={metadata.description} />
        <meta name='theme-color' content='#000000' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <title>metadata.title</title>
      </head>
      <body>
        <HeaderNav />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
