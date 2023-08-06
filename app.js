//  app.js

const express = require("express");
const config = require("./config/config.js");
const dbConnect = require("./0DB/dbSequelize.js");
const Option = require("./0DB/models/option");

const NodeCache = require("node-cache");

const router = require("./0routes/index");

class App {
  constructor() {
    // 서버 생성
    this.app = express();
    this.http = require("http").createServer(this.app);
    this.app.use(express.json());
    this.dbConnect = dbConnect;

    // 라우터 연결
    this.app.use("/api", router);

    // 캐시 객체 생성 (1시간 유지)
    this.optionCache = new NodeCache({ stdTTL: 3600000 });

    // 서버 시작시 캐싱
    this.cacheOptions();
    // 1 시간 마다 캐싱
    setInterval(this.cacheOptions.bind(this), 3600000);
  }

  async cacheOptions() {
    try {
      console.log("캐싱시작");
      // 옵션 데이터 조회
      const options = await Option.findAll();

      this.optionCache.set("options", options);

      console.log("캐싱성공");
    } catch (error) {
      return res.status(400).json({ message: err.message });
    }
  }
  getOptionCache() {
    return this.optionCache;
  }

  getApp() {
    return this.app;
  }

  getHttpServer() {
    return this.http;
  }

  listen(port) {
    this.getHttpServer().listen(port, () => {
      console.log(port, "포트로 서버가 열렸어요!");
    });
  }
}

const port = 3000;
const app = new App();
app.listen(port);
