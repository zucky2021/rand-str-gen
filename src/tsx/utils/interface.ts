/**
 * ランダム文字列生成フォームのデータ型定義
 * ユーザーが設定する各種オプションとパラメータを含む
 */
export interface GenFormData {
  /** 生成する文字列の長さ */
  charLength: number;
  /** ひらがなを含むかどうか */
  hiragana: boolean;
  /** カタカナを含むかどうか */
  katakana: boolean;
  /** アルファベットを含むかどうか */
  alphabet: boolean;
  /** 数字を含むかどうか */
  numeric: boolean;
  /** HTMLタグを含むかどうか */
  htmlTags: boolean;
  /** 特殊文字を含むかどうか */
  specialChars: boolean;
  /** 絵文字を含むかどうか */
  pictographs: boolean;
  /** カスタム文字列 */
  customChar: string;
  /** 生成する文字列の数 */
  numOfStrings: number;
  /** カスタム文字を使用するかどうか（オプション） */
  useCustomChar?: boolean;
}
