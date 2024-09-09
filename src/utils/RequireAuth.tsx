'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/modules/auth/hooks/useAuth';
import securedStorage from 'react-secure-storage';

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, setSession } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      session?.data?.JWT_token ?? securedStorage.getItem('jwt_token');

    if (token) {
      if (!session?.data?.JWT_token) {
        setSession({ data: { JWT_token: token } });
      }
      setLoading(false);
    } else {
      router.push('/sign-in');
    }
  }, [session?.data?.JWT_token, router, setSession]);

  if (loading) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
