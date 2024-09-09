import React, { useState } from 'react';
import { Typography } from 'antd';
import TypingEffect from '@/utils/TypingEffect';
import { useArticleContext } from '@/contexts/article-context';
import ArticleIcons from '../component/articleIcons';
import { useSummaryContext } from '@/contexts/summary-context';
import { CaptureTextSelection } from './capture-text';
import { HighlightModal } from './highlight-modal';

const { Title } = Typography;

export function ArticleSummary({ type }: any) {
  const { summaryData } = useSummaryContext();
  const { articleData } = useArticleContext();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <div className="pt-16 md:pt-20 max-w-full  lg:pr-32">
      <div className="messages space-y-4">
        <div className="space-y-5">
          <div>
            <>
              <Title level={4}>Summary</Title>
              <CaptureTextSelection />
              <HighlightModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
              />
              {type === 'display' ? (
                <TypingEffect
                  text={summaryData?.summary ?? articleData?.content?.summary}
                  speed={20}
                  lineHeight="2"
                />
              ) : (
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {summaryData?.summary ?? articleData?.content?.summary}
                </div>
              )}

              <>
                <ArticleIcons
                  articleData={{ articleData }}
                  position="down"
                  type="summary"
                  setIsModalVisible={setIsModalVisible}
                />
              </>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
