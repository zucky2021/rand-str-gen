export const getHiraganaChars = () => {
  return [...Array(96)].map((_, i) => String.fromCharCode(i + 0x3041));
};

export const getKatakanaChars = () => {
  return [...Array(96)].map((_, i) => String.fromCharCode(i + 0x30a1));
};

export const getAlphabetChars = () => {
  const lowercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 0x61));
  const uppercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 0x41));
  return [...lowercase, ...uppercase];
};

export const getNumericChars = () => {
  return [...Array(10)].map((_, i) => String.fromCharCode(i + 0x30));
};

export const getHtmlTags = (selectedTags: string[]) => {
  return selectedTags;
};

export const getSpChars = (selectedChars: string[]) => {
  return selectedChars;
};

export const getPictographs = (selectedPictographs: string[]) => {
  return selectedPictographs;
};
