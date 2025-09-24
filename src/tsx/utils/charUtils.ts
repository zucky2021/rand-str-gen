/**
 * ひらがな文字の配列を生成する
 * Unicode範囲: U+3041 から U+3096 (96文字)
 * @returns ひらがな文字の配列
 */
export const getHiraganaChars = () => {
  return [...Array(96)].map((_, i) => String.fromCharCode(i + 0x3041));
};

/**
 * カタカナ文字の配列を生成する
 * Unicode範囲: U+30A1 から U+30F6 (96文字)
 * @returns カタカナ文字の配列
 */
export const getKatakanaChars = () => {
  return [...Array(96)].map((_, i) => String.fromCharCode(i + 0x30a1));
};

/**
 * アルファベット文字の配列を生成する
 * 小文字(a-z)と大文字(A-Z)の両方を含む
 * @returns アルファベット文字の配列（52文字）
 */
export const getAlphabetChars = () => {
  const lowercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 0x61));
  const uppercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 0x41));
  return [...lowercase, ...uppercase];
};

/**
 * 数字文字の配列を生成する
 * Unicode範囲: U+0030 から U+0039 (0-9)
 * @returns 数字文字の配列（10文字）
 */
export const getNumericChars = () => {
  return [...Array(10)].map((_, i) => String.fromCharCode(i + 0x30));
};

/**
 * 選択されたHTMLタグの配列を返す
 * @param selectedTags - 選択されたHTMLタグの配列
 * @returns 選択されたHTMLタグの配列
 */
export const getHtmlTags = (selectedTags: string[]) => {
  return selectedTags;
};

/**
 * 選択された特殊文字の配列を返す
 * @param selectedChars - 選択された特殊文字の配列
 * @returns 選択された特殊文字の配列
 */
export const getSpChars = (selectedChars: string[]) => {
  return selectedChars;
};

/**
 * 選択された絵文字の配列を返す
 * @param selectedPictographs - 選択された絵文字の配列
 * @returns 選択された絵文字の配列
 */
export const getPictographs = (selectedPictographs: string[]) => {
  return selectedPictographs;
};
