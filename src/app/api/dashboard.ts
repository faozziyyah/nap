import useAxiosPrivate from '@/utils/useAxiosPrivate';
import { useQuery } from 'react-query';

export const useGetTrendingNews = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(['trending-news'], ({ signal }) =>
    axiosPrivate({
      url: `/trending-news`,
      method: 'GET',
      signal,
    }).then((response) => response?.data),
  );
};

export const useGetNotifications = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(['notifications'], ({ signal }) =>
    axiosPrivate({
      url: `/notifications`,
      method: 'GET',
      signal,
    }).then((response) => response?.data),
  );
};

export const useGetHistory = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(['history'], ({ signal }) =>
    axiosPrivate({
      url: `/history`,
      method: 'GET',
      signal,
    }).then((response) => response?.data),
  );
};

export const useGetHighlights = (user_id: any) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(['highlights'], ({ signal }) =>
    axiosPrivate({
      url: `/highlight/user?user_id=${user_id}`,
      method: 'GET',
      signal,
    }).then((response) => response?.data),
  );
};

export const useGetAnalytics = (user_id: any) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery(['analytics'], ({ signal }) =>
    axiosPrivate({
      url: `/analytics/user/${user_id}`,
      method: 'GET',
      signal,
    }).then((response) => response?.data),
  );
};
