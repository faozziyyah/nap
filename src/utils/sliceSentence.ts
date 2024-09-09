export const sliceSentence = (sentence: string, wordCount = 3) => {
  const words = sentence.split(' ');
  const slicedWords = words.slice(0, wordCount);
  return slicedWords.join(' ') + (words.length > wordCount ? '...' : '');
};
