---
title: GitHub Actions 自动部署拆解：Deploy Key 与 Secrets 到底在干什么
date: 2026-11-18 22:10:00
tags:
  - GitHub Actions
  - CI/CD
categories:
  - 折腾记录
description: 把「私钥进 Secrets、公钥进 Deploy Key」这套流程讲透，顺便解释为什么不能只用 GITHUB_TOKEN。
---

第一次配这套东西的时候，我照着教程抄了命令，但不知道为什么要两把钥匙。后来弄明白了，其实是个很朴素的授权问题。

<!-- more -->

## 问题是什么

你的源码在仓库 1，但网站要从仓库 2 读文件。Action 跑在仓库 1 的上下文里，
它默认拿到的 `GITHUB_TOKEN` 只对仓库 1 有效——推仓库 2，会被拒绝。

所以需要给 Action 一把「只能写仓库 2」的钥匙。这就是 Deploy Key。

## 一对密钥，两个地方

```bash
ssh-keygen -t rsa -b 4096 -C "hexo deploy" -f hexo-deploy-key -N ""
```

得到两个文件：

- `hexo-deploy-key`：私钥，**完整内容**贴进仓库 1 的 `Settings → Secrets and variables → Actions`，命名 `HEXO_DEPLOY_KEY`。
- `hexo-deploy-key.pub`：公钥，贴进仓库 2 的 `Settings → Deploy keys`，**务必勾选 Allow write access**。

私钥负责「证明我是谁」，公钥负责「说明谁被允许」。仓库里存的是公钥，所以即使仓库 2 的配置被人看到，也拿不到写权限。

## Workflow 里怎么用

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v4
  with:
    deploy_key: ${{ secrets.HEXO_DEPLOY_KEY }}
    external_repository: 用户名/用户名.github.io
    publish_branch: main
    publish_dir: ./public
```

`external_repository` 一出现，这个 Action 就不再往当前仓库推，而是切到目标仓库。
`publish_dir` 指 `./public`，也就是 `hexo generate` 的产物。

## 最后一步：开启 Pages

仓库 2 的 `Settings → Pages`，Source 选 `Deploy from a branch`，分支 `main`，目录 `/ (root)`。
第一次 Action 跑完、`main` 有内容之后，这个选项才会真正生效。

访问 `https://用户名.github.io`，如果看到的是 404，先去看 Actions 的日志，
再看 Pages 页面顶部有没有「Your site is live at ...」的提示。缓存和生效时间偶尔要等一两分钟。

## 为什么还要留 netlify

同一份仓库，接一个 Netlify 也有好处：预览构建、CDN 加速、自定义域名配 HTTPS 更省事。
两边都挂上，等于给自己留了个备胎——哪个先坏都不至于抓瞎。
