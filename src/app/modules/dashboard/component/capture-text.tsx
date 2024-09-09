import { useHighlight } from '@/contexts/highlight-context';
import { useEffect } from 'react';

export const CaptureTextSelection: React.FC = () => {
  const { setSelectedText } = useHighlight();

  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText) {
        setSelectedText(selectedText);
        document.removeEventListener('mouseup', handleSelection);
        document.removeEventListener('touchend', handleSelection);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, [setSelectedText]);

  return null;
};
