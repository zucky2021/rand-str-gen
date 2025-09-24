import { RefObject, createRef } from "react";
import { GenFormData } from "../utils/interface";

/**
 * Reducerで使用するアクション型の定義
 * 各アクションは特定の状態更新処理を表す
 */
type Action =
  | { type: "UPDATE_FORM_DATA"; payload: Partial<GenFormData> }
  | { type: "TOGGLE_HTML_TAGS" }
  | { type: "UPDATE_SELECTED_HTML_TAGS"; payload: string[] }
  | { type: "TOGGLE_SP_CHARS" }
  | { type: "UPDATE_SELECTED_SP_CHARS"; payload: string[] }
  | { type: "TOGGLE_PICTOGRAPHS" }
  | { type: "UPDATE_SELECTED_PICTOGRAPHS"; payload: string[] }
  | { type: "SET_USE_CUSTOM_CHAR"; payload: boolean }
  | { type: "SET_IS_VALID_FORM_DATA"; payload: boolean }
  | { type: "UPDATE_EDITABLE_TEXTS"; payload: string[] }
  | { type: "UPDATE_EDITABLE_TEXT"; payload: { index: number; value: string } }
  | { type: "SET_IS_GEN_TEXT"; payload: boolean };

/**
 * アプリケーションの初期状態
 * フォームデータとUI状態、アコーディオンの高さ管理、生成されたテキストなどを含む
 */
const initialState: GenFormData & {
  showHtmlTags: boolean;
  selectedHtmlTags: string[];
  showSpChars: boolean;
  selectedSpChars: string[];
  showPictographs: boolean;
  selectedPictographs: string[];
  isValidFormData: boolean;
  htmlAccordionRef?: RefObject<HTMLDivElement | null>;
  htmlTagsAccordionHeight: number;
  spCharsAccordionRef?: RefObject<HTMLDivElement | null>;
  spCharsAccordionHeight: number;
  pictographsAccordionRef?: RefObject<HTMLDivElement | null>;
  pictographAccordionHeight: number;
  editableTexts: string[];
  isGenText: boolean;
} = {
  charLength: 10,
  hiragana: false,
  katakana: false,
  alphabet: true,
  numeric: false,
  htmlTags: false,
  specialChars: false,
  pictographs: false,
  customChar: "",
  numOfStrings: 1,
  showHtmlTags: false,
  selectedHtmlTags: [],
  showSpChars: false,
  selectedSpChars: [],
  showPictographs: false,
  selectedPictographs: [],
  useCustomChar: false,
  isValidFormData: false,
  htmlAccordionRef: createRef<HTMLDivElement>(),
  htmlTagsAccordionHeight: 0,
  spCharsAccordionRef: createRef<HTMLDivElement>(),
  spCharsAccordionHeight: 0,
  pictographsAccordionRef: createRef<HTMLDivElement>(),
  pictographAccordionHeight: 0,
  editableTexts: [],
  isGenText: false,
};

/**
 * Reducer関数 - 状態管理の中心となる関数
 * アクションタイプに応じて状態を更新する
 *
 * @param state - 現在の状態
 * @param action - 実行するアクション
 * @returns 更新された新しい状態
 */
const reducer = (
  state: typeof initialState,
  action: Action,
): typeof initialState => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return { ...state, ...action.payload };
    case "TOGGLE_HTML_TAGS": {
      const showHtmlTags = !state.showHtmlTags;
      const htmlTagsAccordionHeight = state.htmlAccordionRef?.current
        ?.clientHeight
        ? state.htmlAccordionRef.current.clientHeight + 15
        : 0;
      return { ...state, showHtmlTags, htmlTagsAccordionHeight };
    }
    case "UPDATE_SELECTED_HTML_TAGS":
      return { ...state, selectedHtmlTags: action.payload };
    case "TOGGLE_SP_CHARS": {
      const showSpChars = !state.showSpChars;
      const spCharsAccordionHeight = state.spCharsAccordionRef?.current
        ?.clientHeight
        ? state.spCharsAccordionRef.current.clientHeight + 15
        : 0;
      return { ...state, showSpChars, spCharsAccordionHeight };
    }
    case "UPDATE_SELECTED_SP_CHARS":
      return { ...state, selectedSpChars: action.payload };
    case "TOGGLE_PICTOGRAPHS": {
      const showPictographs = !state.showPictographs;
      const pictographAccordionHeight = state.pictographsAccordionRef?.current
        ?.clientHeight
        ? state.pictographsAccordionRef?.current.clientHeight + 15
        : 0;
      return { ...state, showPictographs, pictographAccordionHeight };
    }
    case "UPDATE_SELECTED_PICTOGRAPHS":
      return { ...state, selectedPictographs: action.payload };
    case "SET_USE_CUSTOM_CHAR":
      return { ...state, useCustomChar: action.payload };
    case "SET_IS_VALID_FORM_DATA":
      return { ...state, isValidFormData: action.payload };
    case "UPDATE_EDITABLE_TEXTS":
      return { ...state, editableTexts: action.payload };
    case "UPDATE_EDITABLE_TEXT":
      return {
        ...state,
        editableTexts: state.editableTexts.map((text, index) =>
          index === action.payload.index ? action.payload.value : text,
        ),
      };
    case "SET_IS_GEN_TEXT":
      return { ...state, isGenText: action.payload };
    default:
      return state;
  }
};

export type { Action };
export { reducer, initialState };
