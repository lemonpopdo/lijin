# PocketBase 本地启动

## 1. 下载与启动

从 [PocketBase Releases](https://github.com/pocketbase/pocketbase/releases) 下载 Windows x64 二进制，解压为 `pocketbase/` 目录下的 `pocketbase.exe`，再执行：

```powershell
cd pocketbase
.\pocketbase.exe serve
```

首次启动后访问 <http://127.0.0.1:8090/_/>，创建一个 PocketBase 超级管理员。

## 2. 导入集合

在 Admin UI 的 **Settings → Import collections** 导入 `pb_schema.json`。导入时不要勾选删除缺失集合。

该 schema 的 `users.createRule` 默认为 `null`（禁止任何人注册）。注册前需临时开启。

## 3. 配置账号

1. 在 Admin UI 的 users → API rules 中，临时把 Create rule 设为空字符串（允许注册）
2. 在 H5 登录页注册唯一账号（注册时自动生成随机 familyId，无需手工修改）
3. 在 Admin UI 中把该账号的 familyRole 设为「管理员」、accountType 设为 2
4. 立即把 Create rule 改回 locked（禁止注册）

## 附：将来新增第二个账号

1. 临时开启 users 的 Create rule
2. 注册账号 B
3. 在 Admin UI 中把 B 的 familyId 改为 A 的 familyId 值（从 A 的记录中复制）
4. 关闭 Create rule

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

## 当前阶段限制

阶段 1 的账号共享成员由 Admin UI 手动配置。应用中的邀请与移除成员按钮会给出提示，但不会修改数据；后续若确有需要，再单独设计邀请流程。
