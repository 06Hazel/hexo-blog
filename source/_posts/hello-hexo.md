---
title: 开张：用 Hexo + GitHub Actions 搭一个不用服务器的博客
date: 2026-11-19 21:40:00
updated: 2026-11-19 21:40:00
tags:
  - Hexo
  - GitHub Pages
categories:
  - 折腾记录
description: 从零搭起这个博客的完整路径：Hexo 生成静态页面，GitHub Action 自动部署，一分钱服务器都不用买。
---

欢迎来到这个新开的小站。第一篇文章，就把「这个博客是怎么来的」写清楚，省得以后自己都忘了。

<!-- more -->

## 为什么是 Hexo

想写点东西的时候，最怕的是被工具链拦住。Hexo 的好处很朴素：写 Markdown，跑一条命令，得到一个纯静态的网站。
没有数据库，没有后台，没有需要打补丁的服务器——只要有一个能放静态文件的地方，它就能活。

## 整条链路

1. **本地写文章**：`npx hexo new "标题"`，然后在 `source/_posts` 里改 Markdown。
2. **推送源码**：`git push` 到源码仓库（下称仓库 1）。
3. **CI 生成 + 部署**：GitHub Actions 检出仓库 1，`npm ci && hexo generate`，再把 `public/` 整包推送到 Pages 仓库（下称仓库 2，`用户名.github.io`）。
4. **访问**：`https://用户名.github.io`。

关键在于第 3 步用了一对 SSH 密钥：私钥放在仓库 1 的 Secrets 里，公钥作为仓库 2 的 Deploy Key（勾选允许写入）。
这样 Action 就有权限往仓库 2 写文件，而你的账号密码从头到尾没有出现在任何地方。

## 日常怎么写

```bash
npx hexo new "今天的想法"
npx hexo server        # 本地预览 http://localhost:4000
git add . && git commit -m "post: 今天的想法"
git push               # 剩下的交给 CI
```

`hexo server` 带热重载，改完存盘刷新页面就行。

## 一点提醒

- **`url` 一定要写对**：`_config.yml` 里的 `url` 必须和最终访问地址一致，否则站内链接、RSS、sitemap 全都会歪。子路径部署时还要额外设 `root`。
- **别把 `public/` 提交进仓库**：它是生成产物，交给 CI。源码仓库只存 `source/`、`_config*.yml`、`package.json`。
- **文章用「未来时间」会被隐藏**：`future: true` 时不会，但如果你改成了 `false`，记得把日期写对。

下一篇聊聊 Front-matter 和一些写作时的小技巧。
