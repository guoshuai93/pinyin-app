export let count = 100000000;

export const uniqueStr = () => (++count).toString(36);

export const PinyinOuputOptions = [
  {
    label: "普通风格",
    value: "STYLE_NORMAL",
  },
  {
    label: "声调风格",
    value: "STYLE_TONE",
  },
  {
    label: "音标风格",
    value: "STYLE_TONE2",
  },
  {
    label: "声母风格",
    value: "STYLE_INITIALS",
  },
  {
    label: "首字母风格",
    value: "STYLE_FIRST_LETTER",
  },
];

export const SeporatorOptions = [
  {
    label: "空格",
    value: "BLANK",
  },
  {
    label: "中划线",
    value: "DASH",
  },
  {
    label: "下划线",
    value: "UNDERLINE",
  },
  {
    label: "点号",
    value: "DOT",
  },
  //   {
  //     label: "自定义",
  //     value: "CUSTOM",
  //   },
];

export const SeporatorConfig = {
  BLANK: " ",
  DASH: "-",
  UNDERLINE: "_",
  DOT: ".",
};

export const BlankOptions = [
  {
    label: "替换空格",
    value: "1",
  },
  {
    label: "保留空格",
    value: "0",
  },
];

export const trimAllBlank = (str, replacement) => {
  return str.replace(/\s+/g, replacement);
};
