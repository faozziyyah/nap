import { useSummaryContext } from '@/contexts/summary-context';
import { useTranslate } from '@/contexts/translate-context';
import useAxiosPrivate from '@/utils/useAxiosPrivate';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteUserAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  return useMutation({
    mutationFn: async (user_id: string) => {
      const req = await axiosPrivate({
        url: '/delete_account',
        method: 'POST',
        params: { user_id },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.status !== 'success') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      router.push('/sign-in');
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useChooseVoiceType = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (voicetype: string) => {
      const req = await axiosPrivate({
        url: '/voicetype',
        method: 'PUT',
        data: { voicetype },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Voice type updated') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({
      full_name,
      phone_no,
    }: {
      full_name: string;
      phone_no: string;
    }) => {
      const req = await axiosPrivate({
        url: '/edit_profile',
        method: 'POST',
        data: { full_name, phone_no },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Profile updated successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
    },
    onError: () => {
      message.error('Failed to update profile.');
    },
  });
};

export const useUpdatePassword = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({
      confirm_new_password,
      new_password,
      email,
      user_password,
    }: {
      new_password: string;
      confirm_new_password: string;
      email: string;
      user_password: string;
    }) => {
      const req = await axiosPrivate({
        url: '/change_password',
        method: 'POST',
        data: { new_password, confirm_new_password, email, user_password },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Password updated successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
    },
    onError: (data: any) => {
      message.error(data?.response?.data?.message);
    },
  });
};

export const useUpdateFavourite = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({ fav_newstype }: { fav_newstype: string }) => {
      const req = await axiosPrivate({
        url: '/update/trending_dashboard',
        method: 'POST',
        data: { fav_newstype },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'favourite news updated successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
    },
    onError: (data: any) => {
      message.error(data?.response?.data?.message);
    },
  });
};

export const useClearHistory = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const req = await axiosPrivate({
        url: '/history/clear',
        method: 'POST',
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'History cleared') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      queryClient.invalidateQueries(['history']);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useFeedback = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async ({
      email,
      message,
    }: {
      email: string;
      message: string;
    }) => {
      const req = await axiosPrivate({
        url: '/feedback',
        method: 'POST',
        data: { email, message },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Feedback submitted successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useUpgradeUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      amount,
      user_id,
      user_email,
      user_fullname,
      payment_ref_id,
    }: {
      amount: any;
      user_id: any;
      user_email: any;
      user_fullname: any;
      payment_ref_id: any;
    }) => {
      const req = await axiosPrivate({
        url: '/upgrade_user',
        method: 'POST',
        data: { amount, user_id, user_email, user_fullname, payment_ref_id },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'User upgraded to premium successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useDowngradeUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  return useMutation({
    mutationFn: async (user_id: any) => {
      const req = await axiosPrivate({
        url: '/downgrade_user',
        method: 'POST',
        data: {
          user_id,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'User downgraded from premium successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useLikeDislikeArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article_id: any) => {
      const req = await axiosPrivate({
        url: '/like-dislike',
        method: 'POST',
        data: {
          article_id,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Action processed successfully') {
        message.error(data.message);
        return;
      }

      message.success(data.message, 3);
      queryClient.invalidateQueries(['article']);
      queryClient.invalidateQueries(['history']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useSummarizeArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setSummaryData } = useSummaryContext();

  return useMutation({
    mutationFn: async (article_id: any) => {
      const req = await axiosPrivate({
        url: '/summarize',
        method: 'POST',
        data: {
          article_id,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      setSummaryData(data);
      message.success(data.message, 3);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useTranslateArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setTranslatedText } = useTranslate();

  return useMutation({
    mutationFn: async ({
      article_id,
      language,
    }: {
      article_id: string;
      language: string;
    }) => {
      const req = await axiosPrivate({
        url: '/translate',
        method: 'POST',
        data: {
          article_id,
          language,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      setTranslatedText(data);
      if (data.message !== 'Action processed successfully') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useTextToAudio = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (article_id: any) => {
      const req = await axiosPrivate({
        url: '/texttoaudio',
        method: 'POST',
        data: {
          article_id,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      message.success(data.message, 3);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useHighlightText = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      article_id,
      highlighted_text,
      article_url,
      tags,
    }: {
      article_id: string;
      highlighted_text: string;
      article_url: string;
      tags: [];
    }) => {
      const req = await axiosPrivate({
        url: '/highlight',
        method: 'POST',
        data: {
          article_id,
          highlighted_text,
          article_url,
          tags,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Highlight saved') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      queryClient.invalidateQueries(['history']);
      queryClient.invalidateQueries(['highlights']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useRemoveHighlight = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ article_url }: { article_url: string }) => {
      const req = await axiosPrivate({
        url: '/highlight/remove',
        method: 'POST',
        data: {
          article_url,
        },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'Highlight removed') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      queryClient.invalidateQueries(['highlights']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useDeleteNotifications = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notification_id: string) => {
      const req = await axiosPrivate({
        url: `/notifications/delete/${notification_id}`,
        method: 'DELETE',
        data: { notification_id },
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      message.success(data.message, 3);
      queryClient.invalidateQueries(['notifications']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};

export const useClearNotifications = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const req = await axiosPrivate({
        url: `/notifications/clear`,
        method: 'POST',
      });
      return req;
    },
    onSuccess: (response) => {
      const { data } = response;
      if (data.message !== 'All notifications cleared') {
        message.error(data.message);
        return;
      }
      message.success(data.message, 3);
      queryClient.invalidateQueries(['notifications']);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });
};
