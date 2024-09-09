'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Dashboard = dynamic(
  () =>
    import('@/app/modules/dashboard/pages/dashboard').then(
      (mod) => mod.Dashboard as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Home() {
  return <Dashboard />;
}
