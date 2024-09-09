import React, { useState, useEffect } from 'react';
import { Typography, Avatar } from 'antd';
import TypingEffect from '@/utils/TypingEffect';
import { useUrlContext } from '@/contexts/url-context';
import { useArticleContext } from '@/contexts/article-context';
import { useProfile } from '@/utils/useProfile';
import ArticleImages from '../component/articleImages';
import ArticleIcons from '../component/articleIcons';
import { useSummaryContext } from '@/contexts/summary-context';
import { ArticleSummary } from '../component/articleSummary';
import { CaptureTextSelection } from '../component/capture-text';
import { HighlightModal } from '../component/highlight-modal';
import { ArticleTranslation } from '../component/articleTranslation';

const { Title } = Typography;

export function ArticleDisplay() {
  const { url } = useUrlContext();
  const { profile } = useProfile();
  const { articleData } = useArticleContext();
  const { summaryData } = useSummaryContext();
  const name = `${profile?.user_profile?.full_name}`;
  const matches = name.match(/\b(\w)/g);
  const acronym = matches ? matches[0] : '';
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { errorMessage, type, setType } = useArticleContext();

  useEffect(() => {
    if (type) {
      setType('display');
    }
  }, [type]);

  return (
    <section className="mt-16 text-black">
      <div className="pt-16 max-w-full lg:pl-40 lg:pr-32 text-black">
        <div className="messages space-y-4">
          <div className="flex flex-row justify-end space-x-3 lg:space-x-5 items-center">
            <div className="p-3 md:p-5 border-primary border-solid rounded-xl text-center md:text-left truncate">
              {url ? url : articleData?.url}
            </div>
            <Avatar size={50} style={{ background: '#5E60CE' }}>
              {acronym}
            </Avatar>
          </div>
          {errorMessage?.error && (
            <div className="flex items-center space-x-5">
              <div>
                <Avatar size={40} style={{ background: '#5E60CE' }} />
              </div>
              <div className="p-3 md:p-5 border-red-500 border-solid rounded-xl text-center md:text-left">
                {errorMessage?.error}
              </div>
            </div>
          )}
          {!errorMessage?.error && (
            <div className="space-y-5">
              <ArticleIcons
                articleData={{ articleData }}
                position="up"
                type="main"
                setIsModalVisible={setIsModalVisible}
              />
              <div>
                <>
                  <Title level={4}>
                    {articleData?.title ?? articleData?.content?.title}
                  </Title>
                  <CaptureTextSelection />
                  <HighlightModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                  />
                  <TypingEffect
                    text={articleData?.text ?? articleData?.content?.text}
                    speed={10}
                    lineHeight="2"
                  />
                  <>
                    <ArticleImages articleData={articleData} />
                    <ArticleIcons
                      articleData={{ articleData }}
                      position="down"
                      type="main"
                      setIsModalVisible={setIsModalVisible}
                    />
                  </>
                </>
              </div>
              {summaryData && (
                <div>
                  <ArticleSummary type={type} />
                </div>
              )}
              {articleData?.content?.translations && (
                <div>
                  <ArticleTranslation type="type" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
