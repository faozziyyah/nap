import { useGetHistory } from '@/app/api/dashboard';
import {
  CloseCircleOutlined,
  HistoryOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Modal, List, Typography, Button } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useArticleContext } from '@/contexts/article-context';
import dayjs from '@/types/dayjsConfig';
import { useDeleteArticle } from '@/app/api/article';

const { Text } = Typography;

interface PreviousHistoryProps {
  previous: boolean;
  setPrevious: (previous: boolean) => void;
}

interface HistoryItem {
  type: string;
  id: string;
  title: string;
  timestamp: string;
}

const categorizeHistory = (history: HistoryItem[]) => {
  const currentDate = dayjs();

  const recentHistory = history?.filter((item) =>
    dayjs(item.timestamp).isAfter(currentDate.subtract(7, 'day')),
  );

  const previous30DaysHistory = history
    ?.filter((item) =>
      dayjs(item.timestamp).isBetween(
        currentDate.subtract(30, 'day'),
        currentDate.subtract(7, 'day'),
      ),
    )
    .slice(0, 5);

  return { recentHistory, previous30DaysHistory };
};

export function PreviousHistory({
  previous,
  setPrevious,
}: PreviousHistoryProps) {
  const router = useRouter();
  const { setArticleData } = useArticleContext();
  const { data: history = [] } = useGetHistory();
  const { mutateAsync: deleteHistory } = useDeleteArticle();

  const { recentHistory, previous30DaysHistory } = categorizeHistory(history);

  const handleClick = (article: any) => {
    setArticleData(article);
    setPrevious(false);
    router.push(`/article/${article?.id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteHistory(id);
  };

  const renderHistory = (
    history: HistoryItem[],
    icon: React.ReactNode,
    text: string,
  ) => {
    if (history.length === 0) {
      return <Text>{text}</Text>;
    }

    return (
      <List
        dataSource={history}
        renderItem={(article) => (
          <List.Item
            key={article.id}
            onClick={() => handleClick(article)}
            style={{ cursor: 'pointer' }}
            actions={[
              <Button
                type="text"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(article.id);
                }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                article?.type === 'article' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                )
              }
              title={article.title}
            />
          </List.Item>
        )}
        className="!p-0"
        itemLayout="horizontal"
      />
    );
  };

  return (
    <>
      <Modal
        open={previous}
        footer={null}
        onCancel={() => setPrevious(false)}
        closeIcon={<CloseCircleOutlined />}
        width="100%"
        className="h-full max-w-screen-md mx-auto custom-modal mt-20 lg:-mt-0"
        bodyStyle={{ padding: 0 }}
        style={{ top: 0 }}
      >
        <div className="flex flex-col space-y-4 p-4">
          <h2 className="text-lg font-semibold">Previous 7 Days</h2>
          {renderHistory(
            recentHistory,
            <HistoryOutlined className="text-green-500" />,
            'No recent history available',
          )}
          <h2 className="text-lg font-semibold">Previous 30 Days</h2>
          {renderHistory(
            previous30DaysHistory,
            <CalendarOutlined className="text-blue-500" />,
            'No history for the previous 30 days',
          )}
        </div>
      </Modal>
    </>
  );
}
