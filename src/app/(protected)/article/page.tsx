'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Article = dynamic(
  () =>
    import('@/app/modules/dashboard/pages/article-display').then(
      (mod) => mod.ArticleDisplay as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Home() {
  return <Article />;
}
