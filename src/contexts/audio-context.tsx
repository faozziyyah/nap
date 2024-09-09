import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { message } from 'antd';
import { usePathname } from 'next/navigation';

interface AudioContextType {
  playAudio: (audioUrl: string) => void;
  pauseAudio: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audio: HTMLAudioElement | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const pathname = usePathname();

  const playAudio = (audioUrl: string): void => {
    if (audio) {
      if (audio.src !== audioUrl) {
        audio.pause();
        setIsPlaying(false);
        const newAudio = new Audio(audioUrl);
        setAudio(newAudio);
        newAudio.onended = () => setIsPlaying(false);
        newAudio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error('Error playing audio:', error);
            message.error('Failed to play audio');
            setIsPlaying(false);
          });
      } else {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error('Error playing audio:', error);
            message.error('Failed to play audio');
            setIsPlaying(false);
          });
      }
    } else {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.onended = () => setIsPlaying(false);
      newAudio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error('Error playing audio:', error);
          message.error('Failed to play audio');
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = (): void => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  return (
    <AudioContext.Provider
      value={{ playAudio, pauseAudio, isPlaying, setIsPlaying, audio }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
