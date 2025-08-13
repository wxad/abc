"use client"

import React, { useEffect, useRef } from "react"

interface CommentsProps {
  repo: string
  theme?: "github-light" | "github-dark"
  issueTerm?: string
}

export const Comments: React.FC<CommentsProps> = ({
  repo,
  theme = "github-light",
  issueTerm = "pathname",
}) => {
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 检查是否已经加载过脚本
    if (document.querySelector('script[src="https://utteranc.es/client.js"]')) {
      return
    }

    // 创建 utteranc.es 脚本
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", repo)
    script.setAttribute("issue-term", issueTerm)
    script.setAttribute("theme", theme)
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    // 将脚本添加到评论容器中
    if (commentsRef.current) {
      commentsRef.current.appendChild(script)
    }

    // 清理函数
    return () => {
      if (commentsRef.current) {
        const existingScript = commentsRef.current.querySelector(
          'script[src="https://utteranc.es/client.js"]'
        )
        if (existingScript) {
          existingScript.remove()
        }
      }
    }
  }, [repo, theme, issueTerm])

  return (
    <div className="">
      <div className="my-24 border-t border-dashed border-neutral-300" />
      <h2 className="relative mb-8 mt-24 text-xl md:text-2xl font-medium before:absolute before:-top-4 before:left-0 before:h-[3px] before:w-6 before:bg-current">
        欢迎与我交流：
      </h2>
      <div ref={commentsRef} className="min-h-[200px]" />
    </div>
  )
}
