import { useQuery } from 'react-query';
import { axiosPrivate } from './axios';

export const useIPAddress = () => {
  const { data, isLoading } = useQuery(
    'iplocation',
    () => axiosPrivate({ url: 'https://ipapi.co/json/', method: 'GET' }),
    {
      refetchOnMount: false,
    },
  );

  return { data: data?.data, isLoading };
};
