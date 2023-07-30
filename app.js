//  app.js

const express = require("express");
const config = require("./config/config.js");
const dbConnect = require("./0DB/dbSequelize.js");

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
