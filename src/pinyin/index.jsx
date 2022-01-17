import { useState, useEffect, useMemo } from "react";
import pinyin from "pinyin";
import RadioGroup from "./radio-group";
import {
  PinyinOuputOptions,
  SeporatorOptions,
  SeporatorConfig,
  BlankOptions,
  trimAllBlank,
} from "./util";
import "./index.css";

const Example = () => {
  const [input, setInput] = useState("这里可以输入中文");
  const [styleOption, setStyleOption] = useState("STYLE_NORMAL");
  const [seporator, setSeporator] = useState("BLANK");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("");
  const [keepBlank, setKeepBlank] = useState("1");
  const [copyed, setCopyed] = useState(false);

  useEffect(() => {
    const search = location.search;
    if (search.includes("url")) {
      setMode("url");
      handleUrlStyle();
    }
  }, []);

  useEffect(() => {
    let seporatorCont = SeporatorConfig[seporator];
    let inputText =
      keepBlank === "1" ? trimAllBlank(input, seporatorCont) : input;
    if (inputText === "") {
      setResult("");
      return;
    }

    const strArr = pinyin(inputText, {
      style: pinyin[styleOption],
    });
    console.log(strArr);
    let str = strArr.reduce((acc, cur, curIndex) => {
      return acc.concat((curIndex !== 0 ? seporatorCont : "") + cur[0]);
    }, "");
    setResult(str);
  }, [input, styleOption, seporator, keepBlank]);

  const toggleMode = () => {
    setMode((s) => (s === "" ? "url" : ""));
    if (mode === "") {
      location.search = "?url";
      handleUrlStyle();
    } else {
      location.search = "";
    }
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <h4>输出</h4>
        <RadioGroup
          data={PinyinOuputOptions}
          value={styleOption}
          onChange={setStyleOption}
        />
      </div>
      <div>
        <h4>分割符号</h4>
        <RadioGroup
          data={SeporatorOptions}
          value={seporator}
          onChange={setSeporator}
        />
      </div>
      <div>
        <h4>处理输入空格</h4>
        <RadioGroup
          disabled={mode === "url"}
          data={BlankOptions}
          value={keepBlank}
          onChange={setKeepBlank}
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
          {mode === "" ? "默认" : "拼音链接"}
        </a>
      </div>
    </div>
  );
};

export default Example;
