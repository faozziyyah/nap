'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const ForgotPassword = dynamic(
  () =>
    import('@/app/modules/auth/pages/forgotPassword').then(
      (mod) => mod.ForgotPassword as ComponentType<any>,
    ),
  { ssr: false },
);

export default function Recover() {
  return <ForgotPassword />;
}
