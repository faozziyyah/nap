import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface News {
  id: string;
  article_url: string;
  image_url: string;
  title: string;
  content: string;
}

interface FavNewsCardProps {
  news: News;
  handleNewsClick: (url: string) => void;
  isExpanded: boolean;
}

const FavNewsCard: React.FC<FavNewsCardProps> = ({
  news,
  handleNewsClick,
  isExpanded,
}) => {
  const handleTouchEnd = (url: string) => {
    handleNewsClick(url);
  };

  return (
    <div
      key={news.id}
      className=" cursor-pointer bg-[#B3CCE880] flex flex-col mt-4 px-2 py-4 rounded-lg w-[40%] md:w-[90%] lg:w-[100%]"
      onClick={() => handleNewsClick(news?.article_url)}
      onTouchEnd={() => handleTouchEnd(news?.article_url)}
    >
      <Title level={4} className="font-semibold text-sm">
        {' '}
        {news?.title}{' '}
      </Title>

      <div
        className={`text-xs font-normal line-clamp-2 overflow-hidden text-ellipsis ${!isExpanded ? 'line-clamp-4' : ''}`}
      >
        {news?.content}
      </div>
    </div>
  );
};

export default FavNewsCard;
