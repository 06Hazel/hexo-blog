---
title: Hexo 写作速查：Front-matter、标签、分类和图片
date: 2026-11-19 21:45:00
tags:
  - Hexo
  - Markdown
categories:
  - 折腾记录
description: 一页纸写完 Hexo 里最常用的写作语法：前置元数据怎么写、摘要怎么切、图片放哪里。
---

写多了就会发现，真正需要记的东西其实只有几个。

<!-- more -->

## Front-matter

每篇 Markdown 顶上那段用 `---` 包起来的，就是前置元数据：

```yaml
---
title: 文章标题
date: 2026-11-19 21:45:00
updated: 2026-11-19 21:45:00
tags:
  - Hexo
  - Markdown
categories:
  - 折腾记录
description: 一句话摘要，会出现在列表页和 SEO 元信息里
---
```

几个容易踩的点：

- `date` 决定文章排序和永久链接，写错会跑到奇怪的位置。
- `tags` 是数组，一篇可以有多个；`categories` 是层级结构，写 `- 技术/前端` 会自动生成两级分类页。
- 想置顶就用 `sticky: 1`（数字越大越靠前）。

## 摘要与目录

在正文里插入一行 `<!-- more -->`，它之前的内容就是列表页显示的摘要。不写的话，Hexo 会截取前面一段。

标题会自动进目录。用 `##`、`###` 保持层级，别跳级，目录生成出来才好看。

## 代码块

````markdown
```bash
npx hexo generate
```
````

主题配了复制按钮，鼠标移到代码块右上角就有。行号可以在 `_config.yml` 的 `highlight.line_number` 里关掉。

## 图片

最省事的做法是放进 `source/images/`，然后在文章里写：

```markdown
![描述](/images/2026/demo.png)
```

如果你想每篇文章一个资源文件夹，把 `_config.yml` 里的 `post_asset_folder` 改成 `true`，
之后 `hexo new` 会同时建一个同名文件夹，图片丢进去直接用相对路径引用即可。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `hexo new "标题"` | 新建文章 |
| `hexo new page "about"` | 新建独立页面 |
| `hexo generate` | 生成静态文件到 `public/` |
| `hexo server` | 本地预览，默认 4000 端口 |
| `hexo clean` | 清掉缓存和 `public/` |

写东西这件事，工具越透明越好。剩下就是把想法写下来。
