import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
} from 'react';

interface VideoContextType {
  videoData: any;
  setVideoData: (videoData: File) => void;
}

export const VideoContext = createContext<VideoContextType | undefined>(
  undefined,
);

interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider: FC<VideoProviderProps> = ({ children }) => {
  const [videoData, setVideoData] = useState<File | null>(null);

  return (
    <VideoContext.Provider value={{ videoData, setVideoData }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};
