// 项目配置文件
export const siteConfig = {
  // GitHub 仓库配置
  github: {
    repo: 'wxad/abc', // 你的 GitHub 仓库地址
    branch: 'main', // 主分支名称
  },

  // 评论系统配置
  comments: {
    enabled: true,
    theme: 'dark-blue' as 'github-light' | 'dark-blue',
    issueTerm: 'pathname' as 'pathname' | 'url' | 'title' | 'og:title',
  },

  // 站点信息
  site: {
    name: '设计垂点',
    description: '过设计点 A，作业务目标 BC 的思考辅助垂线。它们的交点即设计垂点。',
    url: 'https://wxad.design/abc/', // 你的域名
  }
}
