import React, { useEffect, useState } from 'react';
import { Typography, Avatar } from 'antd';
import { useUrlContext } from '@/contexts/url-context';
import { useArticleContext } from '@/contexts/article-context';
import { useProfile } from '@/utils/useProfile';
import ArticleImages from '../component/articleImages';
import ArticleIcons from '../component/articleIcons';
import { useParams } from 'next/navigation';
import { useGetHistory } from '@/app/api/dashboard';
import { ArticleSummary } from '../component/articleSummary';
import { HighlightModal } from '../component/highlight-modal';
import { useHighlight } from '@/contexts/highlight-context';
import { ArticleTranslation } from '../component/articleTranslation';

const { Title } = Typography;

export function HistoryArticleDisplay() {
  const { url } = useUrlContext();
  const { profile } = useProfile();
  const { articleData, setArticleData, setType, type } = useArticleContext();
  const name = `${profile?.user_profile?.full_name}`;
  const matches = name.match(/\b(\w)/g);
  const acronym = matches ? matches[0] : '';
  const { data: history } = useGetHistory();
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { selectedText } = useHighlight();

  useEffect(() => {
    if (id) {
      const articleFromHistory = history?.find((item: any) => item.id === id);

      if (articleFromHistory) {
        setArticleData(articleFromHistory);
      }
    } else {
      setError('Error: couldn’t generate article from this URL');
    }
  }, [id, history]);

  useEffect(() => {
    if (type) {
      setType('history');
    }
  }, [type]);

  return (
    <section className="mt-16 text-black">
      <div className="pt-16 lg:pt-32 max-w-full lg:pl-40 lg:pr-32">
        <div className="messages space-y-4">
          <div className="flex flex-row justify-end space-x-3 lg:space-x-5 items-center">
            <div className="p-3 md:p-5 border-primary border-solid rounded-xl text-center md:text-left truncate">
              {url ? url : articleData?.url}
            </div>
            <Avatar size={50} style={{ background: '#5E60CE' }}>
              {acronym}
            </Avatar>
          </div>
          <div className="space-y-5">
            {error ? (
              <div className="p-3 md:p-5 border-primary border-solid rounded-xl text-center md:text-left">
                {url ? url : articleData?.url}
              </div>
            ) : (
              <>
                <ArticleIcons
                  articleData={{ articleData }}
                  position="up"
                  type="main"
                  setIsModalVisible={setIsModalVisible}
                  selectedText={selectedText}
                />
                <div>
                  <>
                    <Title level={4}>
                      {articleData?.title ?? articleData?.content?.title}
                    </Title>
                    <HighlightModal
                      visible={isModalVisible}
                      onClose={() => setIsModalVisible(false)}
                    />
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {articleData?.text ?? articleData?.content?.text}
                    </div>
                    <ArticleImages articleData={articleData} />
                    <ArticleIcons
                      articleData={{ articleData }}
                      position="down"
                      type="main"
                      setIsModalVisible={setIsModalVisible}
                      selectedText={selectedText}
                    />
                  </>
                </div>
                {articleData?.content?.summary && (
                  <div>
                    <ArticleSummary />
                  </div>
                )}

                {articleData?.content?.translations && (
                  <div>
                    <ArticleTranslation />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="options-container">
<Tooltip title="Like">
  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-primary">
<path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
</svg>
} />
</Tooltip>
<Tooltip title="Dislike">
  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-primary">
<path d="M10.325 3H12v5c-.663 0-1.219.466-1.557 1.037a4.02 4.02 0 0 1-1.357 1.377c-.478.292-.907.706-.989 1.26v.005a9.031 9.031 0 0 0 0 2.642c.028.194-.048.394-.224.479A2 2 0 0 1 5 13c0-.812.08-1.605.234-2.371a.521.521 0 0 0-.5-.629H3C1.896 10 .99 9.102 1.1 8.003A19.827 19.827 0 0 1 2.18 3.215C2.45 2.469 3.178 2 3.973 2h2.703a2 2 0 0 1 .632.103l2.384.794a2 2 0 0 0 .633.103ZM14 2a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1Z" />
</svg>
} />
</Tooltip>
<Tooltip title="Copy">
  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>
} />
</Tooltip>
<Tooltip title="Flag">
  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
<path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
</svg>
} />
</Tooltip>
<Tooltip title="Translate">
  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
<path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
</svg>
} onClick={handleTranslate} />
</Tooltip>
<Tooltip title="Audio">
  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
</svg>
} />
</Tooltip>
</div> */
}
