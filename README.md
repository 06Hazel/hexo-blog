# 莹莹垂看假梦真

一个用 [Hexo](https://hexo.io/zh-cn/) + [NexT](https://theme-next.js.org/) 搭建的静态博客，
通过 GitHub Actions 自动构建并部署到 GitHub Pages，不需要服务器。

## 效果

- 站点：<https://06Hazel.github.io>
- 主题：NexT（Gemini 方案），浅色、本地搜索、代码高亮 + 复制按钮、文章目录
- 部署：push 到 `main` 分支即自动发布，约 30 秒后生效

## 目录结构

```
.
├── _config.yml              # 站点主配置（标题、作者、url、主题）
├── _config.next.yml         # NexT 主题个性化配置
├── package.json             # 依赖与脚本
├── source/
│   ├── _posts/              # 文章（Markdown）
│   ├── about/               # 关于页
│   ├── tags/                # 标签页
│   ├── categories/          # 分类页
│   └── images/              # 静态图片
└── .github/workflows/
    └── deploy.yml           # 自动部署工作流
```

## 本地开发

```bash
npm install          # 首次
npx hexo server      # 预览 http://localhost:4000
```

## 写文章

```bash
npx hexo new "文章标题"
# 编辑 source/_posts/文章标题.md
```

Front-matter 示例：

```yaml
---
title: 文章标题
date: 2026-11-19 21:45:00
tags:
  - 标签一
categories:
  - 分类名
---
```

提交并发布：

```bash
git add . && git commit -m "post: 文章标题" && git push
```

## 部署原理

采用「两个仓库」的方案：

| 角色 | 仓库 | 作用 |
| --- | --- | --- |
| 仓库 1 | 本仓库（如 `hexo-blog`） | 存放源码，push 触发构建 |
| 仓库 2 | `06Hazel.github.io` | 存放生成的静态文件，对外提供访问 |

`deploy.yml` 用一对 SSH 密钥把构建产物推到仓库 2：

- 私钥 → 仓库 1 的 `Settings → Secrets and variables → Actions`，名称 `HEXO_DEPLOY_KEY`
- 公钥 → 仓库 2 的 `Settings → Deploy keys`，勾选 **Allow write access**

生成密钥对：

```bash
ssh-keygen -t rsa -b 4096 -C "hexo deploy" -f hexo-deploy-key -N ""
```

仓库 2 还需要在 `Settings → Pages` 里把 Source 设为 `Deploy from a branch` → `main` → `/ (root)`。

## 自定义

| 想改什么 | 改哪里 |
| --- | --- |
| 站点标题 / 副标题 / 作者 | `_config.yml` 的 `title` / `subtitle` / `author` |
| 域名 | `_config.yml` 的 `url` |
| 菜单、头像、社交链接 | `_config.next.yml` |
| 主题风格 | `_config.next.yml` 的 `scheme`：Muse / Mist / Pisces / Gemini |

改完 `url` 记得重新部署，否则站内链接和 sitemap 会指向旧地址。

## 备用部署：Netlify

仓库根目录带了 `netlify.toml`，在 Netlify 用 GitHub 登录、导入本仓库即可自动构建，
无需额外配置；也可以用来给同一个站点配自定义域名和 CDN。
