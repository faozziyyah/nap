'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Video = dynamic(
  () =>
    import('@/app/modules/dashboard/pages/video-display').then(
      (mod) => mod.VideoDisplay as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Home() {
  return <Video />;
}
