<p align="center">
  <a href="https://github.com/lemonpopdo/lijin">
    <img src="doc/img/logo.webp" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">礼记 · 自部署版</h3>
  <p align="center">
    每一份人情都值得礼记
    <br />
    <a href="https://github.com/lemonpopdo/lijin">仓库</a>
    ·
    <a href="https://github.com/lemonpopdo/lijin/issues/new?template=feature_request.md">提出新特性</a>
  </p>
</p>

  礼尚往来，是中华民族的传统美德，老一辈人一般会在举行宴席的时候用手写人情簿的方式来记录每一个亲友的送礼。这种方式存在很多弊端，比如人情簿丢失、无法携带在身边、很难搜索到某个人的送礼记录、由于手写原因无法辨认清楚内容等等。

  「礼记」专注于记录和管理人情往来中的随礼、收礼、份子钱、礼金、心意、礼物、红包等，多维度查询和统计亲友间的往来记录，家人共享记账，你贴心的人情往来数字记账伙伴。

  本项目基于 [Chadwuo/li-ji-weapp](https://github.com/Chadwuo/li-ji-weapp) 二次开发，将原作者的微信小程序改造为 **可自部署的 H5 网页应用**。后端使用 [PocketBase](https://pocketbase.io/)，通过 Caddy 同域反向代理，前端与后端共用同一个域名，部署在你自己的服务器上。

  与原项目的区别：

  - 原项目为微信小程序，依赖云服务；本项目为 H5 网页，部署在自己的 VPS 上
  - 后端从原有云服务迁移至 PocketBase（SQLite + 内置 API + Admin UI）
  - 前端 API 请求走相对路径 `/api`，由 Caddy 反代到 PocketBase
  - 数据完全自主，不依赖任何第三方云服务

---

## 部署概述

1. 服务器安装 Caddy + Node.js 22 + PocketBase
2. 用 CLI 创建 PocketBase 超级管理员，通过 systemd 常驻（绑定 127.0.0.1:8090）
3. 本地 `pnpm build` 生成 H5 产物，上传到服务器 `/var/www/liji`
4. 配置 Caddy 同域反代：`/api/*` 和 `/_/*` 转发到 PocketBase，其余走 SPA 静态文件
5. 通过 `https://域名/_/` 登录 Admin UI，导入 schema 或依赖 migrations 自动建表，创建业务账号

详细步骤见 [pocketbase/setup.md](pocketbase/setup.md)。

部署完验证三件事：详情页 F5 不 404、刷新后登录态还在、新增记录后 Admin 里能看到。

## ✨ 特性

- 🎁 **随礼记录** - 轻启笔触，每一份人情都值得礼记。
- 💰 **收礼管理** - 悉心梳理，将每一份祝福妥帖安放，为感恩答谢备好序章。
- 👨‍👩‍👧‍👦 **家庭共享** - 家人同绘人情长卷，携手共书往来情谊，记账时光亦添温馨。
- 📊 **图表统计** - 图表勾勒往来脉络，数据诉说人情故事，人情冷暖一目了然。
- 🔍 **快速搜索** - 轻触指尖，穿越时光长河，精准寻回亲友馈赠的点滴温情。
- 📱 **便捷查看** - 掌间轻展人情簿，无论天涯海角，往昔情谊随时可触，无忧遗失。
- 🎨 **界面美观** - 简约雅韵入画来，每一次交互皆如邂逅一场艺术之约，悦目更赏心。
- 🌐 **跨平台支持** - 跨越设备的界限，H5与小程序携手相伴，人情记账自在随心。
- 🌈 ... ...

## 🚀 贡献

感谢原作者 [Chadwuo](https://github.com/Chadwuo) 的开源贡献。欢迎提交 Issue 和 PR。

## 🌟 Star History
[![Star History Chart](https://api.star-history.com/svg?repos=lemonpopdo/lijin&type=Date)](https://star-history.com/#lemonpopdo/lijin&Date)

## 📜 许可证

礼记 使用 GPL-3.0 开源许可协议，在此之前请您务必了解该协议的许可说明以及遵守该协议的法律条件，详情请参阅 [LICENSE](LICENSE)。

Copyright © Chadwuo Design. All Rights Reserved
二次开发：lemonpopdo
