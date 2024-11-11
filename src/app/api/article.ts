import { useArticleContext } from '@/contexts/article-context';
import useAxiosPrivate from '@/utils/useAxiosPrivate';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import securedStorage from 'react-secure-storage';

export const useExtractArticle = (setArticleData: any) => {
  const axiosPrivate = useAxiosPrivate();
  const { setErrorMessage } = useArticleContext();
  const router = useRouter();

  return useMutation({
    mutationFn: async (article_url: string) => {
      try {
        const req = await axiosPrivate({
          url: '/extract',
          method: 'POST',
          data: { article_url },
        });
        return req;
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    },
    onSuccess: (response) => {
      const { data } = response;
      setArticleData(data);
      message.success(data.message, 3);
    },
    onError: (error: any) => {
      router.push('/article');
      setErrorMessage(error?.response?.data || 'An unexpected error occurred');
      message.error(error?.response?.data.error || 'An error occurred');
    },
  });
};

export const useTranscribeVideo = (setVideoData: (data: any) => void) => {
  //const axiosPrivate = useAxiosPrivate();
  const token = securedStorage.getItem('jwt_token');

  return useMutation({
    mutationFn: async (formData: FormData) => {

      const response = await fetch('https://news-accessibilty-platform-premium.onrender.com/transcribe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      return await response.json();
    },
    onSuccess: (data) => {
      setVideoData(data);
      message.success('File uploaded and transcribed successfully', 3);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useRenameArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      article_id,
      new_name,
    }: {
      article_id: string;
      new_name: string;
    }) => {
      const req = await axiosPrivate({
        url: '/history/rename',
        method: 'POST',
        data: { article_id, new_name },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'History entry renamed') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      queryClient.invalidateQueries(['history']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useDeleteArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article_id: string) => {
      const req = await axiosPrivate({
        url: '/history/delete',
        method: 'POST',
        data: { article_id },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'History entry deleted') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      queryClient.invalidateQueries(['history']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};
