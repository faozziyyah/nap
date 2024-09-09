'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const Login = dynamic(
  () =>
    import('@/app/modules/auth/pages/login').then(
      (mod) => mod.Login as ComponentType<any>,
    ),
  { ssr: false },
);

export default function SignIn() {
  return <Login />;
}
