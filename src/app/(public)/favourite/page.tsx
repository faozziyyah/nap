'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';
//import FavouriteNews from '@/app/modules/auth/pages/FavouriteNews';

const Favorite = dynamic(
  () =>
    import('@/app/modules/auth/pages/favorite').then(
      (mod) => mod.Favorite as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Favorites() {
  return <Favorite />;
}
