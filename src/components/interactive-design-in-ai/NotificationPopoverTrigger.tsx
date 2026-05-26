"use client"

import DemoBox from "@/components/DemoBox"
import { cn } from "@/lib/utils"
import { Bell, ChevronRight, MousePointer } from "lucide-react"
import React, { useState } from "react"

// ─── 单条消息 ─────────────────────────────────────────────────────────
export interface MessageItemProps {
  type: string
  text: string
  publishedAt: string
  link?: string
  buttonText?: string
  buttonLink?: string
  /** 是否已读 —— 影响左侧 type-badge 的配色 */
  read?: boolean
}

function MessageItem({
  type,
  text,
  publishedAt,
  link,
  buttonText,
  buttonLink,
  read = true,
}: MessageItemProps) {
  const clickable = !!link
  const withButton = !!buttonText

  const openLink = (url?: string) => {
    if (url) window.open(url, "_blank")
  }

  const handleRowClick = () => {
    // 整行可点：无 button 时整行触发 link；有 button 时只在文字区触发
    if (clickable && !withButton) openLink(link)
  }

  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (clickable) openLink(link)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openLink(buttonLink || link)
  }

  return (
    <div
      onClick={handleRowClick}
      className={cn(
        "flex h-12 min-w-0 items-center justify-between gap-3 px-4 transition-colors duration-125 hover:bg-neutral-100",
        clickable && !withButton && "group/row cursor-pointer",
      )}
    >
      {/* 左侧 type badge：未读用 primary 蓝带 6% 透明背景；已读用 neutral 灰 */}
      <div
        className={cn(
          "relative flex h-[22px] flex-none items-center rounded-full px-2 text-xs",
          read ? "text-neutral-900" : "text-blue-600",
        )}
      >
        <span className="relative z-10">{type}</span>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full",
            read ? "bg-neutral-200" : "bg-blue-500/6",
          )}
        />
      </div>

      {/*
        中间消息区：flex-row-reverse + button 在 DOM 前、文字在后，
        以便 .msg-button:hover + .msg-text 选中左侧文字（见 ODN controlled.scss）
      */}
      <div className="flex h-full min-w-0 flex-1 flex-row-reverse items-center gap-2">
        {withButton && (
          <div
            role="button"
            onClick={handleButtonClick}
            className="msg-button relative flex h-full flex-none cursor-pointer items-center text-sm text-blue-600 transition-all duration-125 hover:[&_.msg-button-text]:translate-x-[-22px] hover:[&_.msg-button-icon]:translate-x-0 hover:[&_.msg-button-icon]:opacity-100"
          >
            <span className="msg-button-text transition-all duration-125">
              {buttonText}
            </span>
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="msg-button-icon pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[22px] fill-blue-500 opacity-0 transition-all duration-125"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.49121 3.69712C9.68623 3.50102 10.0035 3.50071 10.1992 3.69615L15.1504 8.64244C15.2496 8.74155 15.2974 8.87186 15.2959 9.00181C15.2971 9.13144 15.2494 9.26134 15.1504 9.36021L10.1992 14.3065C10.0035 14.5019 9.68622 14.5016 9.49121 14.3055L9.1416 13.954C8.94735 13.7586 8.94794 13.4428 9.14258 13.2479L12.6396 9.74986H3.5C3.22386 9.74986 3 9.526 3 9.24986V8.74986C3.00019 8.47387 3.22397 8.24986 3.5 8.24986H12.6357L9.14258 4.75474C8.94793 4.55986 8.94739 4.24404 9.1416 4.04869L9.49121 3.69712Z"
              />
            </svg>
          </div>
        )}

        {/* 文字三层叠层：默认 / 文字 hover（蓝字+外链图标）/ 按钮 hover（蓝字缩宽 22px） */}
        <div
          onClick={handleTextClick}
          title={text}
          className={cn(
            "msg-text group/msg-text relative h-full min-w-0 flex-1 text-sm",
            clickable && "cursor-pointer hover:text-blue-600",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center transition-all duration-125",
              clickable && [
                "group-hover/msg-text:opacity-0",
                "group-hover/row:opacity-0",
                "[.msg-button:hover+.msg-text_&]:opacity-0",
              ],
            )}
          >
            <span className="truncate">{text}</span>
          </div>
          {clickable && (
            <div
              className={cn(
                "absolute inset-0 flex items-center opacity-0 transition-all duration-125",
                "group-hover/msg-text:opacity-100",
                !withButton && "group-hover/row:opacity-100",
                "[.msg-button:hover+.msg-text_&]:opacity-0",
              )}
            >
              <span className="truncate">{text}</span>
              <svg
                aria-hidden
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="ml-0.5 flex-none fill-blue-500"
              >
                <path d="M13.1387 4.50391C13.2786 4.50392 13.4044 4.56164 13.4951 4.6543C13.5876 4.74501 13.6455 4.871 13.6455 5.01074L13.6426 12.0098C13.6424 12.2861 13.4179 12.5103 13.1416 12.5098L12.6455 12.5078C12.37 12.507 12.1467 12.2833 12.1465 12.0078V7.06152L5.68362 13.5244C5.48836 13.7197 5.17185 13.7197 4.97659 13.5244L4.62307 13.1709C4.42805 12.9756 4.42789 12.659 4.62307 12.4639L11.083 6.00391L6.14163 6.00293C5.86619 6.00276 5.64243 5.77937 5.64163 5.50391L5.63967 5.00879C5.6389 4.73228 5.8632 4.50711 6.13967 4.50684L13.1387 4.50391Z" />
              </svg>
            </div>
          )}
          {withButton && (
            <div
              className={cn(
                "absolute inset-0 flex w-[calc(100%-22px)] items-center opacity-0 transition-all duration-125",
                clickable && [
                  "group-hover/msg-text:opacity-0",
                  "[.msg-button:hover+.msg-text_&]:opacity-100",
                ],
              )}
            >
              <span className="truncate">{text}</span>
            </div>
          )}
        </div>
      </div>

      {/* 右侧时间 */}
      <div className="flex-none text-xs text-neutral-500">{publishedAt}</div>
    </div>
  )
}

// ─── 轻量 Button：替代 odn 的 light Button ─────────────────────────────
function LightButton({
  children,
  rightIcon,
  onClick,
}: {
  children: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 items-center gap-0.5 rounded-md px-2 text-sm text-neutral-700 transition-colors duration-125 hover:bg-neutral-100"
    >
      <span>{children}</span>
      {rightIcon}
    </button>
  )
}

function NotificationPopoverTrigger() {
  const [tabIndex, setTabIndex] = useState(0)

  const tabs = [{ label: "重要通知 (3)" }, { label: "系统消息 (10)" }] as const

  return (
    <div className="relative">
      {/* 触发器：铃铛 + 圆背景 + 红点 */}
      <div
        role="button"
        tabIndex={0}
        className="relative flex size-9 cursor-pointer items-center justify-center rounded-md"
      >
        <Bell className="relative z-10 size-5 transition-colors duration-125 text-blue-600" />
        <div
          aria-hidden
          className="absolute inset-0 rounded-md bg-blue-500 transition-opacity duration-125 opacity-[0.08]"
        />
        {/* 未读数徽章 */}
        <div className="absolute bottom-6 left-6 flex size-4 items-center justify-center rounded-full bg-blue-500">
          <span
            className="text-xs text-white"
            style={{ transform: "scale(0.83)" }}
          >
            3
          </span>
        </div>
      </div>

      {/* 面板：absolute 定位在触发器下方 */}
      <div className="absolute left-0 top-full mt-2 w-[540px] rounded-lg border border-neutral-200 bg-white shadow-lg">
        {/* 标签头 */}
        <div className="flex h-13 items-center border-b border-neutral-200 px-6">
          <div className="flex h-full items-center gap-4 text-sm font-semibold">
            {tabs.map((tab, i) => (
              <div
                key={tab.label}
                onClick={() => setTabIndex(i)}
                className={`flex h-full cursor-pointer items-center transition-colors duration-125 ${
                  tabIndex === i
                    ? "text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* 双 panel：用 absolute + opacity + translate 做左右滑动切换 */}
        <div className="relative h-75 overflow-hidden">
          {[0, 1].map((idx) => {
            const isActive = tabIndex === idx
            const offsetClass = isActive
              ? "translate-x-0 opacity-100 visible"
              : idx === 0
                ? "-translate-x-8 opacity-0 invisible"
                : "translate-x-8 opacity-0 invisible"
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-200 ${offsetClass}`}
              >
                <div className="scrollbar-thin h-64 overflow-y-auto py-2 [scrollbar-color:rgb(0_0_0/0.15)_transparent]">
                  {idx === 0 ? <ImportantMessages /> : <SystemMessages />}
                </div>
                <div className="flex h-11 items-center justify-between border-t border-neutral-200 px-2">
                  <LightButton
                    rightIcon={<ChevronRight className="size-3.5" />}
                  >
                    查看全部
                  </LightButton>
                  <LightButton>一键已读</LightButton>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── 消息数据 ─────────────────────────────────────────────────────────
function ImportantMessages() {
  return (
    <>
      <MessageItem
        read={false}
        type="系统公告"
        text="本系统将于今晚 22:00 至次日 02:00 进行例行维护升级，期间服务可能短暂中断，请提前做好准备"
        publishedAt="14:00"
      />
      <MessageItem
        read
        type="账号安全"
        text="您的账号在 16:30 从新的设备登录，如非本人操作，请立即修改密码"
        publishedAt="14:00"
        link="https://ruyi.qq.com/"
      />
      <MessageItem
        read={false}
        type="功能更新"
        text="新增批量操作功能已上线，支持同时处理多个任务，大幅提升工作效率，快来体验吧"
        publishedAt="14:00"
        link="https://ruyi.qq.com/"
      />
      <MessageItem
        read={false}
        type="数据报告"
        text="2024 年第一季度数据分析报告已生成，包含详细的趋势分析和业务洞察"
        publishedAt="14:00"
        link="https://dmp.woa.com/"
        buttonText="查看详情"
        buttonLink="https://ruyi.qq.com/"
      />
      <MessageItem
        read={false}
        type="权限通知"
        text="您已被添加为项目管理权限，可以管理项目成员和查看所有项目数据，详情请查看"
        publishedAt="14:00"
        link="https://dmp.woa.com/"
        buttonText="查看详情"
        buttonLink="https://ruyi.qq.com/"
      />
    </>
  )
}

function SystemMessages() {
  return (
    <>
      <MessageItem
        read={false}
        type="任务提醒"
        text="您有 3 个待处理的任务即将到期，请及时查看并完成"
        publishedAt="13:45"
      />
      <MessageItem
        read
        type="协作通知"
        text='张三 邀请您参与"新产品规划"项目讨论'
        publishedAt="13:30"
      />
      <MessageItem
        read
        type="审批通知"
        text="您的请假申请已通过审批，请安排好工作交接"
        publishedAt="13:00"
      />
      <MessageItem
        read
        type="评论回复"
        text='李四 回复了您的评论："感谢反馈，我们会认真考虑您的建议"'
        publishedAt="12:15"
      />
      <MessageItem
        read
        type="工作动态"
        text="本季度业绩达标率 105%，超出预期目标，感谢团队的辛勤付出"
        publishedAt="11:30"
      />
      <MessageItem
        read
        type="会员福利"
        text="恭喜您获得本月会员特权，可享受更多专属功能和优先支持"
        publishedAt="10:00"
      />
      <MessageItem
        read
        type="版本更新"
        text="v2.3.0 版本已发布，新增数据导出和自定义报表功能"
        publishedAt="09:30"
      />
      <MessageItem
        read
        type="培训通知"
        text="本周五下午 14:00 将举办产品使用培训，欢迎大家参与"
        publishedAt="昨天"
      />
      <MessageItem
        read
        type="到期提醒"
        text="您的会员权益将于本月末到期，续费可享受 8 折优惠"
        publishedAt="昨天"
      />
      <MessageItem
        read
        type="社区动态"
        text="产品反馈板块新增热门话题，快来参与讨论吧"
        publishedAt="2天前"
      />
    </>
  )
}

// ─── Demo 包装：用 DemoBox 包一层 ─────────────────────────────────────
export default function NotificationPopoverDemo() {
  return (
    <DemoBox className="h-[480px]">
      <div className="flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <MousePointer className="size-4" />
        移动到消息列表体验
      </div>
      <div className="flex h-full items-start justify-center p-10">
        <div className="w-[540px] max-w-full">
          <NotificationPopoverTrigger />
        </div>
      </div>
    </DemoBox>
  )
}
