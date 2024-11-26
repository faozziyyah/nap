import React from 'react';
import { Typography, Image } from 'antd';

const { Title } = Typography;

interface News {
  id: string;
  article_url: string;
  image_url: string;
  title: string;
  content: string;
}

interface NewsCardProps {
  news: News;
  handleNewsClick: (url: string) => void;
  isExpanded: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
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
      className="news-card cursor-pointer p-4 border rounded-md shadow-sm hover:shadow-md flex-shrink-0 w-[50%]"
      onClick={() => handleNewsClick(news?.article_url)}
      onTouchEnd={() => handleTouchEnd(news?.article_url)}
    >
      <div className="">
        <Image
          src={news?.image_url}
          preview={false}
          alt="Img 1"
          className="object-cover w-full h-48 rounded-md"
          loading="lazy"
        />
      </div>
      <Title
        level={4}
        className="text-[16px] xl:text-[20px] text-center lg:text-left mt-3"
      >
        {news?.title}
      </Title>
      <div
        className={`text-[12px] xl:text[14px] news-card-content text-black ${!isExpanded ? 'line-clamp-4' : ''}`}
      >
        {news?.content}
      </div>
    </div>
  );
};

export default NewsCard;
