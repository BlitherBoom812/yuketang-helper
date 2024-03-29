// ==UserScript==
// @name         Yuketang 提醒
// @namespace    http://tampermonkey.net/
// @version      2024-03-14
// @description  try to take over the world!
// @author       You
// @match        https://pro.yuketang.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yuketang.cn
// @grant        none
// ==/UserScript==


// 下一个目标：部署到服务器
(function () {
  ("use strict");
  const run_detect = (to_be_detected, detect_string_list) => {
    for (let i = 0; i < detect_string_list.length; i++) {
      if (to_be_detected.includes(detect_string_list[i])) {
        return true;
      }
    }
    return false;
  }
  const detect_string_list = ["Hi,你有新的课堂习题", '提交答案', '倒计时'];
  var post_url = ".env";
  function checkContentAndAdjustInterval(detect_string_list, initialDelay, newDelay) {
    // 定义一个函数，用于检查页面内容并根据条件调整定时器
    function checkAndSchedule() {
      var pageText = document.body.innerText;
      console.log('detecting string');
      if (run_detect(pageText, detect_string_list)) {
        console.log("found string");
        const data = new FormData();
        data.append("data", "yuketang");
        fetch(post_url, {
          method: "POST",
          body: data,
        })
          .then((res) => {
            console.log("got res");
            console.log("cooldown");
        })
        .catch((e) => {
            console.error(e);
        });
        setTimeout(checkAndSchedule, newDelay);
      } else {
        setTimeout(checkAndSchedule, initialDelay);
      }
    }
    // 启动循环检查
    setTimeout(checkAndSchedule, initialDelay);
  }

  // 使用示例：每隔10秒检查一次页面是否包含"特定字符串"，
  // 如果找到，则下次检查的时间间隔变为100秒
  checkContentAndAdjustInterval(detect_string_list, 2000, 10000);
})();
