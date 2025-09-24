import React, { useEffect, useReducer } from "react";
import {
  getHiraganaChars,
  getKatakanaChars,
  getAlphabetChars,
  getNumericChars,
  getHtmlTags,
  getSpChars,
  getPictographs,
} from "../utils/charUtils.ts";
import { htmlTags, spChars, pictographs } from "../utils/constants.ts";
import FormResult from "./FormResult.tsx";
import "../../scss/RandomTextGenerator.scss";
import { initialState, reducer } from "../utils/reducer.ts";
import { delay } from "../utils/func.ts";

/**
 * ランダム文字列生成のメインコンポーネント
 * @returns React.FC
 */
const RandomTextGenerator: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * フォーム入力の変更を処理する関数
   * @param e - 入力イベント
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "customChar":
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { customChar: value, useCustomChar: value.trim() !== "" },
        });
        break;
      case "charLength":
      case "numOfStrings":
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { [name]: parseInt(value, 10) },
        });
        break;
      default:
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { [name]: checked },
        });
        break;
    }
  };

  const toggleHtmlTags = () => {
    dispatch({ type: "TOGGLE_HTML_TAGS" });
  };

  const handleHtmlTagCheckboxChange = (tag: string, checked: boolean) => {
    const newSelectedTags = checked
      ? [...state.selectedHtmlTags, tag]
      : state.selectedHtmlTags.filter((t) => t !== tag);
    dispatch({
      type: "UPDATE_SELECTED_HTML_TAGS",
      payload: newSelectedTags,
    });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { htmlTags: newSelectedTags.length > 0 },
    });
  };

  const handleCheckAllHtmlTags = (checked: boolean) => {
    dispatch({
      type: "UPDATE_SELECTED_HTML_TAGS",
      payload: checked ? htmlTags : [],
    });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { htmlTags: checked },
    });
  };

  const toggleSpChars = () => {
    dispatch({ type: "TOGGLE_SP_CHARS" });
  };

  const handleSpCharsCheckboxChange = (char: string, checked: boolean) => {
    const newSelectedSpChars = checked
      ? [...state.selectedSpChars, char]
      : state.selectedSpChars.filter((c) => c !== char);
    dispatch({
      type: "UPDATE_SELECTED_SP_CHARS",
      payload: newSelectedSpChars,
    });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { specialChars: newSelectedSpChars.length > 0 },
    });
  };

  const handleCheckAllSpChars = (checked: boolean) => {
    dispatch({
      type: "UPDATE_SELECTED_SP_CHARS",
      payload: checked ? spChars : [],
    });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { specialChars: checked },
    });
  };

  const togglePictographs = () => {
    dispatch({ type: "TOGGLE_PICTOGRAPHS" });
  };

  const handlePictographsCheckboxChange = (char: string, checked: boolean) => {
    const newSelectedPictographs = checked
      ? [...state.selectedPictographs, char]
      : state.selectedPictographs.filter((c) => c !== char);
    dispatch({
      type: "UPDATE_SELECTED_PICTOGRAPHS",
      payload: newSelectedPictographs,
    });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { pictographs: newSelectedPictographs.length > 0 },
    });
  };

  const handleCheckAllPictographs = (checked: boolean) => {
    dispatch({
      type: "UPDATE_SELECTED_PICTOGRAPHS",
      payload: checked ? pictographs : [],
    });
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { pictographs: checked },
    });
  };

  useEffect(() => {
    const isValid =
      state.charLength > 0 &&
      state.numOfStrings > 0 &&
      (state.hiragana ||
        state.katakana ||
        state.alphabet ||
        state.numeric ||
        state.htmlTags ||
        state.specialChars ||
        state.pictographs ||
        state.customChar !== "");
    dispatch({ type: "SET_IS_VALID_FORM_DATA", payload: isValid });
  }, [
    state.charLength,
    state.hiragana,
    state.katakana,
    state.alphabet,
    state.numeric,
    state.htmlTags,
    state.specialChars,
    state.pictographs,
    state.customChar,
    state.numOfStrings,
  ]);

  /**
   * ランダム文字列を生成
   * @async
   */
  const generateRandomTexts = async () => {
    const {
      charLength,
      hiragana,
      katakana,
      alphabet,
      numeric,
      htmlTags,
      specialChars,
      pictographs,
      customChar,
      numOfStrings,
    } = state;
    const charSet = [];
    const newTexts = [];

    if (hiragana) charSet.push(...getHiraganaChars());
    if (katakana) charSet.push(...getKatakanaChars());
    if (alphabet) charSet.push(...getAlphabetChars());
    if (numeric) charSet.push(...getNumericChars());
    if (htmlTags) charSet.push(...getHtmlTags(state.selectedHtmlTags));
    if (specialChars) charSet.push(...getSpChars(state.selectedSpChars));
    if (pictographs) charSet.push(...getPictographs(state.selectedPictographs));
    if (customChar) charSet.push(customChar);

    for (let i = 0; i < numOfStrings; i++) {
      let randomText = "";
      while (randomText.length < charLength) {
        randomText += charSet[Math.floor(Math.random() * charSet.length)];
      }
      if (randomText.length > charLength) {
        randomText = randomText.slice(0, charLength);
      }

      newTexts.push(randomText);
    }

    dispatch({
      type: "UPDATE_EDITABLE_TEXTS",
      payload: newTexts,
    });
    dispatch({
      type: "SET_IS_GEN_TEXT",
      payload: true,
    });

    await delay(1000);
    dispatch({
      type: "SET_IS_GEN_TEXT",
      payload: false,
    });

    handleScroll();
  };

  const handleScroll = () => {
    const target = document.querySelector(".gen-result");
    target?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleEditableTextChange = (index: number, value: string) => {
    dispatch({
      type: "UPDATE_EDITABLE_TEXT",
      payload: { index, value },
    });
  };

  return (
    <section className="rand-str-gen">
      <h1>
        {import.meta.env.VITE_ENV !== "production" && (
          <span>{import.meta.env.VITE_ENV}</span>
        )}
        ランダム文字列生成
      </h1>
      <form className="rand-str-gen__form">
        <label className="rand-str-gen__form-label rand-str-gen__form-label-number">
          <div>
            文字数：
            <input
              type="number"
              name="charLength"
              value={state.charLength}
              onChange={handleChange}
              min={1}
              max={2000}
            />
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="hiragana"
              checked={state.hiragana}
              onChange={handleChange}
            />
            ひらがな
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="katakana"
              checked={state.katakana}
              onChange={handleChange}
            />
            カタカナ
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="alphabet"
              checked={state.alphabet}
              onChange={handleChange}
            />
            アルファベット
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="numeric"
              checked={state.numeric}
              onChange={handleChange}
            />
            数字
          </div>
        </label>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="htmlTags"
              checked={state.htmlTags}
              onChange={toggleHtmlTags}
            />
            HTMLタグ
          </div>
          <p
            className={`rand-str-gen__accordion-icon ${state.showHtmlTags ? "open" : ""}`}
          ></p>
        </label>
        <div
          style={{
            height: state.showHtmlTags
              ? `${state.htmlTagsAccordionHeight}px`
              : "0px",
            opacity: state.showHtmlTags ? 1 : 0,
          }}
          className="rand-str-gen__accordion-wrap"
        >
          <div
            ref={state.htmlAccordionRef}
            className="rand-str-gen__accordion-cont"
          >
            <label>
              <input
                type="checkbox"
                checked={state.selectedHtmlTags.length === htmlTags.length}
                onChange={(e) => handleCheckAllHtmlTags(e.target.checked)}
              />
              {state.selectedHtmlTags.length === htmlTags.length
                ? "全てのチェックを外す"
                : "全てチェックする"}
            </label>
            <div className="checkBoxInput">
              {htmlTags.map((tag, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={state.selectedHtmlTags.includes(tag)}
                    onChange={(e) =>
                      handleHtmlTagCheckboxChange(tag, e.target.checked)
                    }
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="specialChars"
              checked={state.specialChars}
              onChange={toggleSpChars}
            />
            特殊文字
          </div>
          <span
            className={`rand-str-gen__accordion-icon ${state.showSpChars ? "open" : ""}`}
          />
        </label>
        <div
          style={{
            height: state.showSpChars
              ? `${state.spCharsAccordionHeight}px`
              : "0px",
            opacity: state.showSpChars ? 1 : 0,
          }}
          className="rand-str-gen__accordion-wrap"
        >
          <div
            ref={state.spCharsAccordionRef}
            className="rand-str-gen__accordion-cont"
          >
            <label>
              <input
                type="checkbox"
                checked={state.selectedSpChars.length === spChars.length}
                onChange={(e) => handleCheckAllSpChars(e.target.checked)}
              />
              {state.selectedSpChars.length === spChars.length
                ? "全てのチェックを外す"
                : "全てチェックする"}
            </label>
            <div className="checkBoxInput">
              {spChars.map((char, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={state.selectedSpChars.includes(char)}
                    onChange={(e) =>
                      handleSpCharsCheckboxChange(char, e.target.checked)
                    }
                  />
                  {char}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="rand-str-gen__form-label">
          <div>
            <input
              type="checkbox"
              name="pictographs"
              checked={state.pictographs}
              onChange={togglePictographs}
            />
            絵文字
          </div>
          <span
            className={`rand-str-gen__accordion-icon ${state.showPictographs ? "open" : ""}`}
          />
        </label>
        <div
          style={{
            height: state.showPictographs
              ? `${state.pictographAccordionHeight}px`
              : "0px",
            opacity: state.showPictographs ? 1 : 0,
          }}
          className="rand-str-gen__accordion-wrap"
        >
          <div
            ref={state.pictographsAccordionRef}
            className="rand-str-gen__accordion-cont"
          >
            <label>
              <input
                type="checkbox"
                checked={
                  state.selectedPictographs.length === pictographs.length
                }
                onChange={(e) => handleCheckAllPictographs(e.target.checked)}
              />
              {state.selectedPictographs.length === pictographs.length
                ? "全てのチェックを外す"
                : "全てチェックする"}
            </label>
            <div className="checkBoxInput">
              {pictographs.map((char, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={state.selectedPictographs.includes(char)}
                    onChange={(e) =>
                      handlePictographsCheckboxChange(char, e.target.checked)
                    }
                  />
                  {char}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="rand-str-gen__form-label">
          <input
            type="checkbox"
            checked={state.useCustomChar}
            onChange={handleChange}
          />
          カスタム：
          <input
            type="text"
            name="customChar"
            value={state.customChar}
            onChange={handleChange}
          />
        </label>

        <label className="rand-str-gen__form-label rand-str-gen__form-label-number">
          生成文字列数：
          <input
            type="number"
            name="numOfStrings"
            value={state.numOfStrings}
            onChange={handleChange}
            min={1}
            max={30}
          />
        </label>
      </form>

      <button
        onClick={generateRandomTexts}
        className={`rand-str-gen__gen-btn ${state.isGenText ? "clicked" : ""} ${!state.isValidFormData ? "disabled" : ""}`}
      >
        {state.isGenText ? "生成中です" : "生成する"}
      </button>

      <FormResult
        editableTexts={state.editableTexts}
        onEditableTextChange={handleEditableTextChange}
      />
    </section>
  );
};

export default RandomTextGenerator;
