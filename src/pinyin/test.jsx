import React, { useEffect } from "react";

/**
 * 获取 iframe 的父页面的 location
 * @returns url
 */
function getParentUrl() {
  var url = null;
  if (parent !== window) {
    try {
      url = parent.location.href;
    } catch (e) {
      url = document.referrer;
    }
  }
  return url;
}

// 判断页面是否是 iframe 标签加载的
const isInIframe = () => {
  return self.frameElement?.tagName === "IFRAME";
};

const Test = () => {
  useEffect(() => {
    const loc = window.location;
    console.log("loc", loc);
  }, []);

  useEffect(() => {
    const isIframe = isInIframe();
    console.log("isIframe", isIframe);
  }, []);

  return <div>test</div>;
};

export default Test;
