export interface GenFormData {
  charLength: number;
  hiragana: boolean;
  katakana: boolean;
  alphabet: boolean;
  numeric: boolean;
  htmlTags: boolean;
  specialChars: boolean;
  pictographs: boolean;
  customChar: string;
  numOfStrings: number;
  useCustomChar?: boolean;
}
