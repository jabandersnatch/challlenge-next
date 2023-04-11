'use client';

import React from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const theme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        primary: '#00b0ff',
        secondary: '#ff4081',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
      },
    },
  });
  return <NextUIProvider theme={theme}>{children}</NextUIProvider>;
};

export default Providers;
