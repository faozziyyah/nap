'use client';

import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './modules/auth/hooks/useAuth';
import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#5E60CE',
              fontFamily: "'Poppins', sans-serif",
            },

            components: {
              Button: {
                borderRadius: 8,
              },

              Checkbox: {
                fontSizeLG: 40,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
