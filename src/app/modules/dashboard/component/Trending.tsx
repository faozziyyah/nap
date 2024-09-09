import { CarouselProvider, Slider, Slide } from 'react-spring-carousel';
import React, { useState } from 'react';
import { Typography, Image } from 'antd';

const { Title } = Typography;

export const TrendingNewsComponent: React.FC<{ trending_news: any[] }> = ({
  trending_news,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="w-full p-4">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={trending_news?.length}
        interval={3000}
        isIntrinsicHeight
      >
        <Slider>
          {trending_news?.length > 0 ? (
            trending_news?.slice(0, 3).map((news: any, index: number) => (
              <Slide index={index} key={index}>
                <div className="flex flex-col items-center bg-white p-4 rounded-2xl lg:bg-transparent lg:p-0 lg:rounded-none">
                  <div className="w-full h-48 lg:w-full lg:h-48 mb-2 overflow-hidden rounded">
                    <Image
                      src={news?.image_url}
                      alt="Img 1"
                      width={300}
                      preview={false}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <Title level={4} className="text-center lg:text-left">
                    {news?.title}
                  </Title>
                  <div
                    className={`text-center lg:text-left truncate-overflow ${!isExpanded ? 'line-clamp-4' : ''}`}
                  >
                    {news?.content}
                  </div>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                </div>
              </Slide>
            ))
          ) : (
            <p>No trending news available.</p>
          )}
        </Slider>
      </CarouselProvider>
    </div>
  );
};
