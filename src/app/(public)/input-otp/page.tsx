'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const OTP = dynamic(
  () =>
    import('@/app/modules/auth/pages/otp').then(
      (mod) => mod.OTPInput as ComponentType<any>,
    ),
  { ssr: false },
);

export default function OTPInput() {
  return <OTP />;
}
