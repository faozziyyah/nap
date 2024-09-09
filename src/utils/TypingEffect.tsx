import React, { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  speed: number;
  lineHeight?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed,
  lineHeight,
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text?.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <div
      style={{ lineHeight }}
      dangerouslySetInnerHTML={{ __html: displayedText }}
    />
  );
};

export default TypingEffect;
