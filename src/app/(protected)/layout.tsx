import React from 'react';
import PageWrapper from './pageWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
