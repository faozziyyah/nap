/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetHighlights } from '@/app/api/dashboard';
import { useRemoveHighlight } from '@/app/api/settings';
import { useProfile } from '@/utils/useProfile';
import { Button } from 'antd';
import React, { useState } from 'react';

const ReportedArticles = () => {
  const { profile } = useProfile();
  const { data: reports } = useGetHighlights(profile?.User_ID);
  const { mutateAsync: deleteReports, isLoading } = useRemoveHighlight();
  const [loadingArticle, setLoadingArticle] = useState<string | null>(null);

  const handleDelete = async (articleUrl: string) => {
    setLoadingArticle(articleUrl);
    try {
      await deleteReports({ article_url: articleUrl });
    } catch (error) {
      console.error('Failed to delete report:', error);
    } finally {
      setLoadingArticle(null);
    }
  };
  return (
    <div style={{ padding: '10px', backgroundColor: '#fff', color: '#000' }}>
      <h2 style={{ marginBottom: '10px' }} className="text-lg">
        Reports
      </h2>
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          maxHeight: '500px',
          overflowY: 'auto',
        }}
        className="mt-10"
      >
        {reports &&
          reports?.map((article: any) => (
            <li
              key={article.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
              className="space-x-5 lg:space-x-3"
            >
              <div className="lg:mr-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 lg:w-6 lg:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
              </div>
              <div style={{ flexGrow: 1 }}>
                <h3 className="text-xs lg:text-md">{article.article_title}</h3>
              </div>
              <Button
                onClick={() => handleDelete(article.article_url)}
                loading={loadingArticle === article.article_url}
                className="cursor-pointer"
                type="link"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 lg:w-6 lg:h-6 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                }
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ReportedArticles;
