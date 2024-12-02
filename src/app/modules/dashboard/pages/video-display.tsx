import React from 'react';
import { Typography, Avatar } from 'antd';
import { useUrlContext } from '@/contexts/url-context';
import { useArticleContext } from '@/contexts/article-context';
import { useProfile } from '@/utils/useProfile';
import ArticleImages from '../component/articleImages';

const { Title } = Typography;

export function VideoDisplay() {
  const { url } = useUrlContext();
  const { profile } = useProfile();
  const { articleData } = useArticleContext();
  const name = `${profile?.user_profile?.full_name}`;
  const matches: string[] | null = name.match(/\b(\w)/g);
  const acronym = matches?.join('');

  return (
    <div className="pt-16 md:pt-32 max-w-full lg:pl-40 lg:pr-32">
      <div className="messages space-y-4">
        <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-5 items-center">
          <div className="p-3 md:p-5 border-primary flex items-center space-x-2 border-solid rounded-xl text-center md:text-left">
            <span>
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-g h-6 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
                  clipRule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>
            </span>

            <span> {url ? url : articleData?.url}</span>
          </div>

          <Avatar size={50} style={{ background: '#5E60CE' }}>
            {acronym}
          </Avatar>
        </div>

        <div className="space-x-5 flex">
          <div>
            <Avatar size={40} style={{ background: '#5E60CE' }} />
          </div>
          <div className="p-3 md:p-5 border-primary flex items-center space-x-2 border-solid rounded-xl text-center md:text-left">
            <span>
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-g h-6 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
                  clipRule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>
            </span>

            <span> {url ? url : articleData?.url}</span>
          </div>

          <div>
            <>
              <Title level={4}>
                {articleData?.title ?? articleData?.content?.title}
              </Title>
              <>
                <ArticleImages articleData={articleData} />
              </>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
