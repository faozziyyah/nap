'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Register = dynamic(
  () =>
    import('@/app/modules/auth/pages/register').then(
      (mod) => mod.Register as ComponentType<any>,
    ),
  { ssr: false },
);

export default function SignIn() {
  return <Register />;
}
