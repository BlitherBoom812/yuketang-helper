const express = require("express");
const cors = require("cors");

const app = express();

// 应用 CORS 策略：允许所有域名的跨域请求
app.use(cors());

// 设置一个简单的路由
app.post("/", (req, res) => {
  //   console.log(req);
  console.log("get reqs");
  res.json({ message: "Hello, World!" });
});

// 选择一个端口监听请求
const PORT = 11111;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
