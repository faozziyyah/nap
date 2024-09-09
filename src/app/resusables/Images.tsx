import React, { useRef, useEffect, useState } from 'react';
import { Image as AntDImage } from 'antd';
import 'antd/dist/reset.css';
import '../../styles/globals.css';

interface LazyImageProps {
  src: string;
  alt: string;
  fallback?: string;
  width?: number;
  height?: number;
  style?: any;
  className?: any;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback,
  width,
  height,
  style,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [imageRef]);

  return (
    <AntDImage
      src={isLoaded ? src : fallback || 'https://via.placeholder.com/150'}
      alt={alt}
      className={`responsive-img ${className}`}
      width={width}
      height={height}
      preview={false}
      style={style}
    />
  );
};

export default LazyImage;
