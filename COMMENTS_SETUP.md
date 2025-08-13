# GitHub 评论功能设置指南

## 概述

本项目使用 [utteranc.es](https://utteranc.es/) 实现基于 GitHub Issues 的评论系统。每篇文章都会自动创建一个对应的 GitHub Issue 来收集评论。

## 设置步骤

### 1. 安装 utteranc.es GitHub App

1. 访问 [utteranc.es](https://utteranc.es/)
2. 点击 "Install app" 按钮
3. 选择你的 GitHub 仓库（例如：`wxad/abc`）
4. 点击 "Install" 完成安装

### 2. 配置仓库信息

编辑 `src/lib/config.ts` 文件，确保以下配置正确：

```typescript
export const siteConfig = {
  github: {
    repo: "wxad/abc", // 替换为你的 GitHub 用户名和仓库名
    branch: "main", // 你的主分支名称
  },
  comments: {
    enabled: true, // 启用评论功能
    theme: "github-light", // 主题：'github-light' 或 'github-dark'
    issueTerm: "pathname", // Issue 标题策略
  },
}
```

### 3. 配置说明

- **repo**: 你的 GitHub 仓库地址，格式为 `用户名/仓库名`
- **theme**: 评论区域的主题
  - `github-light`: GitHub 浅色主题
  - `github-dark`: GitHub 深色主题
- **issueTerm**: 如何为每篇文章创建 Issue 标题
  - `pathname`: 使用页面路径（推荐）
  - `url`: 使用完整 URL
  - `title`: 使用文章标题
  - `og:title`: 使用 Open Graph 标题

## 工作原理

1. 当用户访问文章页面时，Comments 组件会自动加载
2. utteranc.es 脚本会根据当前页面的 `issueTerm` 查找或创建对应的 GitHub Issue
3. 用户可以通过 GitHub 账户登录并发表评论
4. 所有评论都会显示在对应的 GitHub Issue 中

## 注意事项

- 确保你的 GitHub 仓库是公开的，这样评论才能正常显示
- 评论功能需要用户有 GitHub 账户
- 首次访问文章时，utteranc.es 会自动创建对应的 Issue
- 评论数据存储在 GitHub Issues 中，不占用你的服务器资源

## 自定义样式

如果需要自定义评论区域的样式，可以修改 `src/components/Comments.tsx` 文件中的 CSS 类名。

## 故障排除

如果评论不显示，请检查：

1. GitHub App 是否正确安装
2. 仓库配置是否正确
3. 浏览器控制台是否有错误信息
4. 网络连接是否正常
