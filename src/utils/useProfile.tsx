'use client';

import { useQuery } from 'react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import securedStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/modules/auth/hooks/useAuth';
import Loading from '@/appLayout/loading';

interface AudioUrls {
  ngfemale: string;
  ngmale: string;
  usfemale: string;
  usmale: string;
}

interface UserProfile {
  audio_urls: AudioUrls;
  created_at: string;
  email: string;
  full_name: string;
  fav_newstype: string;
  isAdmin: boolean;
  last_login: string;
  phone_number: string | null;
  premiumuser: boolean;
  selected_voice: string;
}

interface ProfileData {
  User_ID: string;
  user_profile: UserProfile;
}

interface ProfileContextValue {
  refetchProfile: () => void;
  profile: ProfileData | null;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { signOut, session, setSession } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = securedStorage.getItem('jwt_token');
    if (token) {
      if (!session?.data?.JWT_token) {
        setSession({ data: { JWT_token: token } });
      }
      setLoading(false);
    } else {
      setLoading(false);
      router.push('/sign-in');
    }
  }, [session?.data?.JWT_token, setSession, router]);

  const { data, isLoading, error, refetch } = useQuery<ProfileData, Error>(
    'profile',
    async () => {
      try {
        const response = await axiosPrivate({
          url: '/profile',
          method: 'GET',
        });
        return response.data;
      } catch (err) {
        console.error('Error fetching profile:', err);
        throw err;
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: !loading,
    },
  );

  useEffect(() => {
    if (!loading && error) {
      signOut();
      router.push('/sign-in');
    }
  }, [error, loading, signOut, router]);

  if (loading || isLoading) {
    return <Loading />;
  }

  const value: ProfileContextValue = {
    refetchProfile: refetch,
    profile: data || null,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

const useProfile = () => {
  const context = useContext(ProfileContext);

  if (context === null) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};

export { ProfileProvider, useProfile };
