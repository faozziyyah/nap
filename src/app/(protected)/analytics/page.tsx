'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () =>
    import('@/app/modules/dashboard/pages/analytics').then(
      (mod) => mod.Analytics as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Home() {
  return <Analytics />;
}
