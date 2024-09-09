import { useEffect } from 'react';
import axiosPrivate from './axios';
import securedStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/modules/auth/hooks/useAuth';

const isTokenExpired = (): boolean => {
  const expTime = securedStorage.getItem('token_expiration');
  if (!expTime || typeof expTime !== 'string') return true;
  return Date.now() >= parseInt(expTime, 10);
};

export const useAxiosPrivate = () => {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        let token = session?.data?.JWT_token;

        if (!token) {
          token = securedStorage.getItem('jwt_token');
        }

        if (typeof token === 'string') {
          if (isTokenExpired()) {
            securedStorage.removeItem('jwt_token');
            securedStorage.removeItem('token_expiration');
            router.push('/sign-in');
            return Promise.reject('Token expired');
          }
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          console.error('Token is not a string or missing');
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          router.push('/sign-in');
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [router, session]);

  return axiosPrivate;
};

export default useAxiosPrivate;
