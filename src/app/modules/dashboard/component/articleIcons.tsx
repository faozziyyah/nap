import React, { useEffect } from 'react';
import { Button, Tooltip, Avatar, Dropdown } from 'antd';
import {
  useLikeDislikeArticle,
  useSummarizeArticle,
  useTextToAudio,
  useTranslateArticle,
} from '@/app/api/settings';
import { usePathname } from 'next/navigation';
import { useAudio } from '@/contexts/audio-context';
interface ArticleData {
  articleData: any;
  position: string;
  type: string;
  selectedText?: string;
  isModalVisible?: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const ArticleIcons = ({
  articleData,
  position,
  type,
  setIsModalVisible,
}: ArticleData) => {
  const { mutateAsync: likeArticle, isLoading: isLoadingLike } =
    useLikeDislikeArticle();
  const { mutateAsync: summarizeArticle, isLoading: isLoadingSummarize } =
    useSummarizeArticle();
  const { mutateAsync: translateText, isLoading: isLoadingTranslate } =
    useTranslateArticle();
  const { mutateAsync: textToAudio, isLoading: isLoadingAudio } =
    useTextToAudio();
  const { audio, playAudio, isPlaying, setIsPlaying, pauseAudio } = useAudio();
  const pathname = usePathname();

  const handleLikeArticle = () => {
    likeArticle(articleData?.articleData?.id);
  };

  const handleDislikeArticle = () => {
    likeArticle(articleData?.articleData?.id);
  };

  const handleSummarizeArticle = () => {
    summarizeArticle(articleData?.articleData?.id);
  };

  const handleTextToAudio = async () => {
    try {
      let audioUrl = articleData?.articleData?.content?.text_audio_url;
      if (!audioUrl) {
        const response = await textToAudio(articleData?.articleData?.id);
        audioUrl = response?.data?.audio_url;
      }
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio(audioUrl);
      }
    } catch (error) {
      console.error('Error converting text to audio:', error);
    }
  };

  const handleIconClick = () => {
    setIsModalVisible(true);
  };

  const handleMenuClick = async ({ key }: { key: string }) => {
    if (articleData) {
      await translateText({
        article_id: articleData?.articleData?.id,
        language: key,
      });
    }
  };

  const items = [
    {
      label: <div className="p-3">Hausa</div>,
      key: 'ha',
    },
    {
      label: <div className="p-3">Igbo</div>,
      key: 'ig',
    },
    {
      label: <div className="p-3">Yoruba</div>,
      key: 'yo',
    },
  ];

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
    };
  }, [pathname]);

  return (
    <>
      <div className="flex flex-row justify-between mb-5 space-y-4 md:space-y-0">
        <div className="flex items-center md:space-x-2">
          {position === 'up' && (
            <div>
              <Avatar size={40} style={{ background: '#5E60CE' }} />
            </div>
          )}
          <div className="flex md:space-x-2">
            <Tooltip title="Like">
              <Button
                type="link"
                size="large"
                loading={isLoadingLike}
                onClick={handleLikeArticle}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      articleData?.articleData?.likes > 0 ? `#5E60CE` : `none`
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                }
              />
            </Tooltip>
            <Tooltip title="Dislike">
              <Button
                type="link"
                size="large"
                loading={isLoadingLike}
                onClick={handleDislikeArticle}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      articleData?.articleData?.likes === 0 ? `red` : `none`
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                }
              />
            </Tooltip>
            {type === 'main' && (
              <Tooltip title="Summary">
                <Button
                  type="link"
                  size="large"
                  loading={isLoadingSummarize}
                  onClick={handleSummarizeArticle}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                  }
                />
              </Tooltip>
            )}
            <Tooltip title="Report">
              <Button
                type="link"
                size="large"
                onClick={handleIconClick}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                    />
                  </svg>
                }
              />
            </Tooltip>
          </div>
        </div>
        <div>
          {' '}
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Tooltip title="Translate">
              <Button
                type="link"
                loading={isLoadingTranslate}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                    />
                  </svg>
                }
              />
            </Tooltip>
          </Dropdown>
          <Tooltip title="Listen">
            <Button
              type="link"
              size="large"
              loading={isLoadingAudio}
              onClick={handleTextToAudio}
              icon={
                isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-primary w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )
              }
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default ArticleIcons;
