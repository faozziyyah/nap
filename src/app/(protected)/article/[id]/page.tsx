'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const HistoryArticle = dynamic(
  () =>
    import('@/app/modules/dashboard/pages/history-article').then(
      (mod) => mod.HistoryArticleDisplay as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Home() {
  return <HistoryArticle />;
}
