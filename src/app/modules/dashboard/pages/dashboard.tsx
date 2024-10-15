import React, { useState } from 'react';
import { Typography, Input, Button, Upload, message } from 'antd';
import { useGetTrendingNews } from '@/app/api/dashboard';
import { useProfile } from '@/utils/useProfile';
import '@/styles/globals.css';
import { useExtractArticle, useTranscribeVideo } from '@/app/api/article';
import { useUrlContext } from '@/contexts/url-context';
import { useArticleContext } from '@/contexts/article-context';
import { useRouter } from 'next/navigation';
import { useVideoContext } from '@/contexts/video-context';
import NewsCard from '../component/NewsCard';
import ArticleLoading from '@/app/resusables/ArticleLoading';

const { Title } = Typography;

export function Dashboard() {
  const { data: trending_news } = useGetTrendingNews();
  const { profile } = useProfile();
  const router = useRouter();
  const [isExpanded] = useState(false);
  const { url, setUrl } = useUrlContext();
  const { setArticleData } = useArticleContext();
  const { setVideoData } = useVideoContext();
  const { mutateAsync: extractArticle, isLoading: isLoadingArticle } =
    useExtractArticle(setArticleData);
  const { mutateAsync: transcribeVideo } = useTranscribeVideo(setVideoData);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);

  const handleNewsClick = (newsUrl: string) => {
    setUrl(newsUrl);
  };

  const handleGenerate = async () => {
    if (videoFile) {
      const formData = new FormData();
      formData.append('file', videoFile);

      await transcribeVideo(formData);
      router.push('/video');
    } else {
      const article = await extractArticle(url);
      if (article?.data?.id) {
        router.push(`/article`);
      }
    }
  };

  const handleFileChange = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      message.error('You can only upload video files!');
      return false;
    }

    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = () => {
      if (video.duration > 60) {
        message.error('Video must be 1 minute or less!');
      } else {
        setVideoFile(file);
        setVideoName(file.name);
        message.success('Video uploaded successfully');
      }
    };

    return false;
  };

  return (
    <section className="mt-36 lg:mt-16 overflow-hidden flex justify-between w-full">
      {isLoadingArticle ? (
        <ArticleLoading />
      ) : (
        <div className="flex justify-between">
          <section className="flex flex-col w-[70%]">
            <div className="text-center lg:text-left text-lg lg:text-2xl lg:mb-1 h-full">
              <h1 className="gradient-text text-[32px] leading-10">
                Hi {profile?.user_profile?.full_name}!
              </h1>
            </div>

            <div className="text-center lg:text-left text-lg lg:text-2xl mb-4 text-gray-500 opacity-75 text-[36px] leading-10">
              NAP just got you updated.
            </div>

            <div className="mt-2 lg:mt-2">
              <Title className="text-[24px] text-center lg:text-left">
                Trending News Today
              </Title>
            </div>

            <div className="w-full lg:overflow-x-auto trending-card mt-10">
              <div className="flex gap-4">
                {trending_news
                  ?.slice(0, 3)
                  .map((news: any) => (
                    <NewsCard
                      key={news.id}
                      news={news}
                      handleNewsClick={handleNewsClick}
                      isExpanded={isExpanded}
                    />
                  ))}
              </div>
            </div>

            <div className="mt-6 md:mt-20 flex flex-row items-center bottom-0 space-x-2 md:space-x-0 generate mb-20">
              <Input
                placeholder="Paste URL here"
                className="sm:mr-4 flex-grow lg:h-[65px] bg-transparent border-2 border-primary w-[244px] text-[12px] lg:[16px]"
                size="large"
                value={url || videoName || ''}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  borderRadius: '12px',
                  padding: '10px 15px 10px 15px',
                }}
                prefix={
                  <Upload
                    beforeUpload={handleFileChange}
                    showUploadList={false}
                    accept="video/*"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                      />
                    </svg>
                  </Upload>
                }
              />
              <Button
                type="primary"
                size="large"
                className="!rounded-2xl h-[50px] lg:w-auto lg:h-[65px]"
                style={{
                  fontSize: '16px',
                  borderRadius: '12px',
                  padding: '10px 15px !important',
                }}
                onClick={handleGenerate}
              >
                Generate
              </Button>
            </div>
          </section>

          <section className="w-[30%] border border-[#E9E9E9] bg-[#FBFBFB] p-4">
            <h1 className="capitalize text-[#5E60CE] font-bold text-[24px]">
              latest from {profile?.user_profile?.fav_newstype}
            </h1>
          </section>
        </div>
      )}
    </section>
  );
}
