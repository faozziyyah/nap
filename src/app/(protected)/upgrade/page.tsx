'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Upgrade = dynamic(
  () =>
    import('@/appLayout/upgradeAccount').then(
      (mod) => mod.UpgradeAccount as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Home() {
  return <Upgrade />;
}
