import { useState, useEffect, useMemo } from "react";
import pinyin from "pinyin";
import RadioGroup from "./radio-group";
import {
  PinyinOuputOptions,
  SeporatorOptions,
  SeporatorConfig,
  storageKey,
  setItem,
  getItem,
  timeHashShortString,
} from "./util";
import Test from './test'
import "./index.css";

const Example = () => {
  const [input, setInput] = useState("这里可以输入中文");
  const [styleOption, setStyleOption] = useState("STYLE_NORMAL");
  const [seporator, setSeporator] = useState("BLANK");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("normal");
  const [copyed, setCopyed] = useState(false);

  useEffect(() => {
    const mode = getItem(storageKey);
    if (mode && ["normal", "url"].includes(mode)) {
      setMode(mode);
    } else {
      setItem(storageKey, "mormal");
    }
    if (mode === "url") handleUrlStyle();
  }, []);

  useEffect(() => {
    let seporatorCont = SeporatorConfig[seporator];
    let inputText = input;
    if (inputText === "") {
      setResult("");
      return;
    }

    const strArr = pinyin(inputText, {
      style: pinyin[styleOption],
    });
    let str = strArr.reduce((acc, cur, curIndex) => {
      return acc.concat((curIndex !== 0 ? seporatorCont : "") + cur[0]);
    }, "");
    if (mode === "url") str += seporatorCont + timeHashShortString();
    setResult(str);
  }, [input, styleOption, seporator, mode]);

  const toggleMode = () => {
    let newMode = mode === "normal" ? "url" : "normal";
    setMode(newMode);
    setItem(storageKey, newMode);
    if (newMode === "url") handleUrlStyle();
  };

  const handleUrlStyle = () => {
    setStyleOption("STYLE_NORMAL");
    setSeporator("DASH");
  };

  const copy = (copyText) => {
    const el = document.createElement("input");
    el.setAttribute("value", copyText);
    document.body.appendChild(el);
    el.select();
    const flag = document.execCommand("copy");
    document.body.removeChild(el);
    if (flag) {
      setCopyed(true);
      setTimeout(() => {
        setCopyed(false);
      }, 2000);
    }
  };

  return (
    <div className="pinyin-app">
      <textarea
        className="input"
        placeholder="请输入内容"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <h4>输出</h4>
        <RadioGroup
          disabled={mode === "url"}
          data={PinyinOuputOptions}
          value={styleOption}
          onChange={setStyleOption}
        />
      </div>
      <div>
        <h4>分割符号</h4>
        <RadioGroup
          disabled={mode === "url"}
          data={SeporatorOptions}
          value={seporator}
          onChange={setSeporator}
        />
      </div>
      <div className="preview">
        <pre>{result}</pre>
        <button className="copy-result" onClick={() => copy(result)}>
          {copyed ? "copied" : "copy"}
        </button>
      </div>
      <div className="mode-config">
        切换模式：
        <a className="mode-config-link" onClick={toggleMode}>
          {mode === "normal" ? "默认" : "拼音链接"}
        </a>
      </div>
      <Test />
    </div>
  );
};

export default Example;
