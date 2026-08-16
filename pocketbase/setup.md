# PocketBase 本地启动

## 1. 下载与启动

从 [PocketBase Releases](https://github.com/pocketbase/pocketbase/releases) 下载 Windows x64 二进制，解压为 `pocketbase/` 目录下的 `pocketbase.exe`，再执行：

```powershell
cd pocketbase
.\pocketbase.exe serve
```

首次启动后访问 <http://127.0.0.1:8090/_/>，创建一个 PocketBase 超级管理员。
推荐用命令行创建管理员，避免在 HTTP 明文下暴露密码：

```powershell
.\pocketbase.exe superuser create your@email.com 'YourStrongPassword'
```

如需使用 Admin UI 创建，也可在启动后访问 <http://127.0.0.1:8090/_/>。

## 2. 导入集合

若已携带 `pb_migrations/` 目录，PocketBase 启动时会自动执行迁移建表，**无需再从 Admin UI 导入 `pb_schema.json`**。`pb_schema.json` 仅作为参照文档保留。

若未携带 migrations，则在 Admin UI 的 **Settings → Import collections** 导入 `pb_schema.json`。导入时不要勾选删除缺失集合。二选一，不要重复操作。

`users.createRule` 默认为 `null`（禁止任何人注册）。

## 3. 配置账号

1. 在 Admin UI 的 users 集合中点击 **New record** 直接创建账号（超级管理员创建记录不受 createRule 限制）
2. 填写 email、password、familyId（任意唯一字符串）、familyRole=管理员、accountType=2
3. 完成。全程无需修改任何 API rule

## 附：将来新增第二个账号

1. 在 Admin UI 的 users 集合中点击 **New record** 创建账号 B
2. 把 B 的 familyId 填为 A 的 familyId 值（从 A 的记录中复制）

全程无需修改任何 API rule。

> 注意：生产环境的 Admin UI 改动会生成新的迁移文件，导致服务器与仓库分叉。后续修改表结构时，请在本地改动并把迁移文件提交到仓库，再同步到服务器。

## 4. 启动前端

```powershell
pnpm install
pnpm dev
```

## 5. 生产部署：同域反代

生产构建的 `.env` 已将 `VITE_SERVICE_URL` 设为空字符串，因此前端请求使用相对路径 `/api`。将 H5 构建产物部署至 `/var/www/liji`，并让 Caddy 与 PocketBase 使用同一个域名：

```caddyfile
your.domain {
    handle /api/* {
        reverse_proxy 127.0.0.1:8090
    }

    handle /_/* {
        reverse_proxy 127.0.0.1:8090
    }

    handle {
        root * /var/www/liji
        try_files {path} /index.html
        file_server
    }
}
```

`try_files {path} /index.html` 是 H5 单页应用的路由回退；没有它时，在详情页刷新会返回 404。Caddy 会在域名已正确解析到 VPS 的前提下自动申请 HTTPS 证书。

本地开发继续使用 `.env.development` 中的 `http://127.0.0.1:8090`。若前端和 PocketBase 使用不同主机或端口，应通过 Vite 开发代理解决，不修改 PocketBase 的 CORS 配置。

在 `unh` 的交互菜单中选择 H5。开发服务默认使用 `http://127.0.0.1:8090` 的 PocketBase。
`unh.config.ts` 中 `platform.default` 已设为 `h5`，直接运行不会弹出交互菜单。

## 当前阶段限制

阶段 1 的账号共享成员由 Admin UI 手动配置。应用中的邀请与移除成员按钮会给出提示，但不会修改数据；后续若确有需要，再单独设计邀请流程。
