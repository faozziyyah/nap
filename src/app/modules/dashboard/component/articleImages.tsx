import React, { useState } from 'react';
import { Typography, Button, Image } from 'antd';

const { Paragraph } = Typography;

interface ArticleData {
  content?: {
    images: Array<{
      url: string;
      description: string;
      audio_url: string;
    }>;
  };
  images?: Array<{
    url: string;
    description: string;
    audio_url: string;
  }>;
}

const ArticleImages: React.FC<{ articleData: ArticleData }> = ({
  articleData,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showDescription, setShowDescription] = useState<string | null>(null);
  const images = articleData?.content?.images ?? articleData?.images;

  const handleAudioClick = (audioUrl: string) => {
    if (audio) {
      audio.pause();
      audio.src = audioUrl;
      audio.play();
    } else {
      const newAudio = new Audio(audioUrl);
      newAudio.play();
      setAudio(newAudio);
    }
  };

  const handleDescriptionClick = (description: string) => {
    setShowDescription(description);
  };

  return (
    <div className="flex justify-center md:justify-start w-full">
      <div className="images-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 gap-x-10 gap-y-20 mb-20">
        {images?.map((image: any, index: number) => (
          <div
            key={index}
            className="relative border rounded-lg"
            style={{ width: '100%', height: '250px' }}
          >
            <Image
              src={image.url}
              alt={image.description}
              loading="lazy"
              className="rounded-lg w-[250px] h-[250px] object-cover"
              style={{ borderRadius: '8px' }}
            />
            <div className="absolute bottom-2 left-2 flex space-x-4">
              <Button
                className="bg-primary border-none text-white text-lg p-1 rounded-full"
                onClick={() => handleDescriptionClick(image.description)}
              >
                ALT
              </Button>
              <Button
                className="bg-transparent border-none p-1 rounded-full"
                onClick={() => handleAudioClick(image.audio_url)}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            </div>
            {showDescription === image.description && (
              <div
                className="bg-[#001514B2] !text-white rounded-lg px-4 py-3"
                style={{
                  borderRadius: '8px 0 0 0',
                  opacity: '1',
                  position: 'absolute',
                  bottom: '-75px',
                  left: '0',
                  margin: 'auto',
                  transition: 'opacity 0.3s ease',
                  color: 'white',
                }}
              >
                <Paragraph
                  style={{ margin: 0, fontSize: '14px', color: 'white' }}
                >
                  {image.description}
                </Paragraph>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleImages;
