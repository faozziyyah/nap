import React, { useState } from 'react';
import { Typography } from 'antd';
import TypingEffect from '@/utils/TypingEffect';
import { useArticleContext } from '@/contexts/article-context';
import ArticleIcons from '../component/articleIcons';
import { useHighlight } from '@/contexts/highlight-context';
import { useProfile } from '@/utils/useProfile';
import { useGetHighlights } from '@/app/api/dashboard';
import { CaptureTextSelection } from './capture-text';
import { HighlightModal } from './highlight-modal';

const { Title } = Typography;

export function ArticleTranslation({ type }: any) {
  const { profile } = useProfile();
  const { articleData } = useArticleContext();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { selectedText } = useHighlight();
  const { data: highlights } = useGetHighlights(profile?.User_ID);

  const getTitle = (value: string) => {
    let title;
    if (value === 'ha') {
      title = 'Hausa';
    } else if (value === 'ig') {
      title = 'Igbo';
    } else {
      title = 'Yoruba';
    }
    return title;
  };

  const highlightText = (text: string, highlights: any[]) => {
    if (typeof text !== 'string') return text;

    let highlightedContent = text;

    highlights.forEach((highlight) => {
      if (
        highlight.article_id === articleData?.id &&
        highlight.highlighted_text
      ) {
        const regex = new RegExp(`(${highlight.highlighted_text})`, 'gi');
        highlightedContent = highlightedContent.replace(
          regex,
          '<span class="highlight">$1</span>',
        );
      }
    });

    return highlightedContent;
  };

  const translations = articleData?.content?.translations
    ? Object.entries(articleData.content.translations).map(
        ([key, translation]) => ({
          key,
          translation,
        }),
      )
    : [];

  return (
    <div className="pt-16 md:pt-20 max-w-full lg:pr-32">
      <Title level={4}>Translations</Title>
      {translations.map(({ translation, key }: any, index: number) => (
        <div key={index} className="messages space-y-4">
          <div className="space-y-5">
            <div>
              <>
                <Title level={5}>{getTitle(key)}</Title>
                <CaptureTextSelection />
                <HighlightModal
                  visible={isModalVisible}
                  onClose={() => setIsModalVisible(false)}
                />

                {type === 'display' ? (
                  <TypingEffect
                    text={highlightText(translation, highlights ?? [])}
                    speed={20}
                    lineHeight="2"
                  />
                ) : (
                  <div
                    style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{
                      __html: highlightText(translation, highlights ?? []),
                    }}
                  ></div>
                )}
                <>
                  <ArticleIcons
                    articleData={{ articleData }}
                    position="down"
                    type="translation"
                    setIsModalVisible={setIsModalVisible}
                    selectedText={selectedText}
                  />
                </>
              </>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
