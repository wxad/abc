"use client"

import DemoBox from "@/components/DemoBox"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"
import {
  ExternalLink,
  MoreHorizontal,
  MousePointerClick,
  Plus,
} from "lucide-react"
import { useCallback, useLayoutEffect, useRef, useState } from "react"

// ─── 模拟数据 ─────────────────────────────────────────────────────────
interface Project {
  id: number
  icon: string
  name: string
  status: "in-progress" | "planning" | "draft"
  description: string
  members: string[]
  date: string
}

interface Space {
  id: number
  name: string
  projects: Project[]
}

const SPACES: Space[] = [
  {
    id: 1,
    name: "流量侧商业化",
    projects: [
      {
        id: 1,
        icon: "🦞",
        name: "如翼营销官与AI工作流尝试",
        status: "in-progress",
        description:
          "探索如翼营销官产品与 AI 工作流的结合，打通从营销洞察策略生成→投放执行效果复盘的全链路AI辅助决策能力",
        members: ["L", "W", "Z", "Q"],
        date: "2026/05/01",
      },
      {
        id: 2,
        icon: "📊",
        name: "广告归因系统重构",
        status: "planning",
        description: "广告归因链路从批处理迁移至实时流",
        members: ["L", "W", "Z", "Q"],
        date: "2026/05/01",
      },
      {
        id: 3,
        icon: "💎",
        name: "增值服务 VIP 体系",
        status: "draft",
        description: "VIP 等级与权益体系设计",
        members: ["L", "W", "Z", "Q"],
        date: "2026/05/01",
      },
      {
        id: 4,
        icon: "📈",
        name: "投放效果分析平台",
        status: "in-progress",
        description: "多渠道投放 ROI 实时追踪与归因分析",
        members: ["L", "W", "Z", "Q"],
        date: "2026/05/01",
      },
    ],
  },
  {
    id: 2,
    name: "体验优化专项",
    projects: [
      {
        id: 6,
        icon: "🎨",
        name: "设计系统 3.0 升级",
        status: "in-progress",
        description: "统一组件库升级至 Design Token 架构",
        members: ["A", "B", "C"],
        date: "2026/04/20",
      },
      {
        id: 7,
        icon: "⚡",
        name: "首屏性能优化",
        status: "in-progress",
        description: "首屏 LCP 从 2.4s 压至 1.2s 以内",
        members: ["D", "E", "F"],
        date: "2026/04/15",
      },
      {
        id: 8,
        icon: "♿",
        name: "无障碍适配",
        status: "planning",
        description: "WCAG 2.1 AA 级适配与辅助技术支持",
        members: ["A", "D"],
        date: "2026/04/10",
      },
    ],
  },
  {
    id: 3,
    name: "基础架构",
    projects: [
      {
        id: 9,
        icon: "🏗️",
        name: "微服务网关迁移",
        status: "in-progress",
        description: "从 Nginx 迁移至 Envoy + gRPC 网关",
        members: ["X", "Y", "Z"],
        date: "2026/03/28",
      },
      {
        id: 10,
        icon: "🔄",
        name: "CI/CD 流水线重构",
        status: "planning",
        description: "构建耗时从 12min 压至 3min，支持增量部署",
        members: ["X", "W"],
        date: "2026/03/20",
      },
      {
        id: 11,
        icon: "📦",
        name: "对象存储统一接入层",
        status: "draft",
        description: "抽象存储协议层，支持 COS/S3/MinIO 无缝切换",
        members: ["Y", "Z", "W"],
        date: "2026/03/15",
      },
    ],
  },
  {
    id: 4,
    name: "数据智能",
    projects: [
      {
        id: 12,
        icon: "🤖",
        name: "智能推荐引擎 v2",
        status: "in-progress",
        description: "基于实时特征的多目标排序模型上线",
        members: ["M", "N"],
        date: "2026/04/01",
      },
      {
        id: 13,
        icon: "📉",
        name: "异常检测平台",
        status: "planning",
        description: "多维指标异常实时归因与告警",
        members: ["M", "O"],
        date: "2026/03/25",
      },
    ],
  },
  {
    id: 5,
    name: "安全合规",
    projects: [
      {
        id: 14,
        icon: "🔒",
        name: "零信任接入改造",
        status: "in-progress",
        description: "全链路身份校验与动态授权策略",
        members: ["S", "T"],
        date: "2026/04/05",
      },
      {
        id: 15,
        icon: "📋",
        name: "数据合规审计",
        status: "draft",
        description: "GDPR / 个保法合规自查与整改闭环",
        members: ["S", "U"],
        date: "2026/03/30",
      },
    ],
  },
]

const STATUS_CONFIG: Record<string, { label: string; dotColor: string }> = {
  "in-progress": { label: "进行中", dotColor: "bg-blue-500" },
  planning: { label: "规划中", dotColor: "bg-amber-400" },
  draft: { label: "草稿", dotColor: "bg-neutral-400" },
}

// ─── Tab 指示条状态机 ─────────────────────────────────────────────────
type IndicatorRect = { left: number; width: number }
type IndicatorState =
  | { kind: "attached"; spaceId: number }
  | {
      kind: "transitioning"
      toSpaceId: number
      from: IndicatorRect
      to: IndicatorRect
      phase: "start" | "moving"
    }

// ─── 组件 ─────────────────────────────────────────────────────────────
export default function TabSwitchDemo() {
  const [spaces, setSpaces] = useState(SPACES)
  const [activeSpaceId, setActiveSpaceId] = useState(spaces[0].id)
  const tabsRef = useRef<HTMLDivElement>(null)

  // ── dnd-kit ──
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  )
  const [activeDragId, setActiveDragId] = useState<number | null>(null)
  const activeDragSpace = activeDragId
    ? (spaces.find((s) => s.id === activeDragId) ?? null)
    : null

  const handleDndStart = (event: DragStartEvent) => {
    setActiveDragId(Number(event.active.id))
  }

  const handleDndEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSpaces((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === Number(active.id))
        const newIndex = prev.findIndex((s) => s.id === Number(over.id))
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  const handleDndCancel = () => {
    setActiveDragId(null)
  }

  // ── indicator 状态机 ──
  const [indicatorState, setIndicatorState] = useState<IndicatorState>({
    kind: "attached",
    spaceId: activeSpaceId,
  })

  const prevActiveRef = useRef(activeSpaceId)
  useLayoutEffect(() => {
    const prevId = prevActiveRef.current
    prevActiveRef.current = activeSpaceId

    if (prevId === activeSpaceId) {
      setIndicatorState({ kind: "attached", spaceId: activeSpaceId })
      return
    }

    const measure = (id: number): IndicatorRect | null => {
      if (!tabsRef.current) return null
      const el = tabsRef.current.querySelector<HTMLElement>(
        `[data-tab-id="${id}"]`,
      )
      if (!el) return null
      const cr = tabsRef.current.getBoundingClientRect()
      const br = el.getBoundingClientRect()
      if (br.width === 0) return null
      return { left: br.left - cr.left, width: br.width }
    }

    const from = measure(prevId)
    const toRaw = measure(activeSpaceId)
    if (!from || !toRaw) {
      setIndicatorState({ kind: "attached", spaceId: activeSpaceId })
      return
    }

    // 测量时菜单按钮 width 变化的 CSS transition(150ms) 还没跑完：
    //   prev 菜单仍占 24px、cur 菜单还是 0
    // 若 cur 在 prev 之后，cur 的最终位置会左移 24px → 测量值需要补偿
    const spaceIds = spaces.map((s) => s.id)
    const prevIdx = spaceIds.indexOf(prevId)
    const curIdx = spaceIds.indexOf(activeSpaceId)
    const to: IndicatorRect =
      prevIdx !== -1 && curIdx !== -1 && prevIdx < curIdx
        ? { left: toRaw.left - 24, width: toRaw.width }
        : toRaw

    setIndicatorState({
      kind: "transitioning",
      toSpaceId: activeSpaceId,
      from,
      to,
      phase: "start",
    })

    const raf = requestAnimationFrame(() => {
      setIndicatorState((prev) =>
        prev.kind === "transitioning" && prev.toSpaceId === activeSpaceId
          ? { ...prev, phase: "moving" }
          : prev,
      )
    })
    return () => cancelAnimationFrame(raf)
  }, [activeSpaceId, spaces])

  const handleIndicatorTransitionEnd = useCallback(() => {
    setIndicatorState((prev) =>
      prev.kind === "transitioning"
        ? { kind: "attached", spaceId: prev.toSpaceId }
        : prev,
    )
  }, [])

  // ── 面板切换动画 ──
  const [fadingOutId, setFadingOutId] = useState<number | null>(null)
  const [slideDir, setSlideDir] = useState<"left" | "right">("right")
  const prevDisplayedRef = useRef(activeSpaceId)

  if (activeSpaceId !== prevDisplayedRef.current) {
    const oldIdx = spaces.findIndex((s) => s.id === prevDisplayedRef.current)
    const newIdx = spaces.findIndex((s) => s.id === activeSpaceId)
    setSlideDir(newIdx > oldIdx ? "right" : "left")
    setFadingOutId(prevDisplayedRef.current)
    prevDisplayedRef.current = activeSpaceId
  }

  const handleFadeOutEnd = useCallback(() => {
    setFadingOutId(null)
  }, [])

  const handleSwitch = useCallback((id: number) => {
    setActiveSpaceId(id)
  }, [])

  return (
    <DemoBox className="overflow-hidden pt-12">
      <div className="flex absolute top-6 left-1/2 -translate-x-1/2 items-center gap-1 text-xs text-neutral-400">
        <MousePointerClick className="size-4" />
        点击或拖拽 Tab 体验
      </div>
      <div className="bg-[#f5f5f7] px-6 pt-8 pb-6 sm:px-10">
        {/* 标题 */}
        <h2 className="mb-5 flex items-baseline gap-3">
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            全部项目
          </span>
          <span className="text-sm font-medium text-neutral-300">
            All Projects
          </span>
        </h2>

        {/* Tab 栏 — 支持拖拽排序 */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragStart={handleDndStart}
          onDragEnd={handleDndEnd}
          onDragCancel={handleDndCancel}
        >
          <div className="mb-5 flex items-center border-b border-neutral-200/60">
            <SortableContext
              items={spaces.map((s) => s.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div
                ref={tabsRef}
                className="relative -ml-2.5 flex min-w-0 flex-1 items-center gap-0.5"
              >
                {spaces.map((s) => (
                  <SortableTab
                    key={s.id}
                    space={s}
                    isActive={s.id === activeSpaceId}
                    showIndicator={
                      indicatorState.kind === "attached" &&
                      indicatorState.spaceId === s.id
                    }
                    onSwitch={() => handleSwitch(s.id)}
                  />
                ))}
                {/* transitioning 状态下的 floating indicator */}
                {indicatorState.kind === "transitioning" && (
                  <div
                    className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-neutral-900 transition-[left,width] duration-150 ease-in-out"
                    style={
                      indicatorState.phase === "moving"
                        ? {
                            left: indicatorState.to.left + 10,
                            width: indicatorState.to.width - 20,
                          }
                        : {
                            left: indicatorState.from.left + 10,
                            width: indicatorState.from.width - 20,
                          }
                    }
                    onTransitionEnd={handleIndicatorTransitionEnd}
                  />
                )}
              </div>
            </SortableContext>
            {/* 新建项目按钮 */}
            <button
              type="button"
              className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              <Plus className="size-3.5" strokeWidth={2.5} />
              新建项目
            </button>
          </div>
          <DragOverlay
            dropAnimation={{
              duration: 220,
              easing: "cubic-bezier(0.2, 0, 0, 1)",
            }}
          >
            {activeDragSpace ? (
              <TabBody
                space={activeDragSpace}
                isActive={activeDragSpace.id === activeSpaceId}
                showIndicator={
                  activeDragSpace.id === activeSpaceId &&
                  indicatorState.kind === "attached"
                }
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* 面板内容 */}
        <div className="relative min-h-[320px] overflow-hidden rounded-xl">
          {/* 旧面板 fade out */}
          {fadingOutId && (
            <div
              key={`out-${fadingOutId}`}
              className={`absolute inset-0 pointer-events-none ${
                slideDir === "right"
                  ? "animate-[slide-fade-out-left_0.2s_ease-in_both]"
                  : "animate-[slide-fade-out-right_0.2s_ease-in_both]"
              }`}
              onAnimationEnd={handleFadeOutEnd}
            >
              <ProjectList
                projects={
                  spaces.find((s) => s.id === fadingOutId)?.projects || []
                }
              />
            </div>
          )}
          {/* 新面板 fade in */}
          <div
            key={`in-${activeSpaceId}`}
            className={
              fadingOutId
                ? slideDir === "right"
                  ? "animate-[slide-fade-in-right_0.2s_ease-out_both]"
                  : "animate-[slide-fade-in-left_0.2s_ease-out_both]"
                : ""
            }
          >
            <ProjectList
              projects={
                spaces.find((s) => s.id === activeSpaceId)?.projects || []
              }
            />
          </div>
        </div>
      </div>
    </DemoBox>
  )
}

// ─── SortableTab：useSortable 套壳 ──────────────────────────────────
function SortableTab({
  space,
  isActive,
  showIndicator,
  onSwitch,
}: {
  space: Space
  isActive: boolean
  showIndicator: boolean
  onSwitch: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: space.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <TabBody
        space={space}
        isActive={isActive}
        showIndicator={showIndicator}
        onSwitch={onSwitch}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  )
}

// ─── TabBody：Tab 的视觉部分（SortableTab 和 DragOverlay 复用） ────
function TabBody({
  space,
  isActive,
  showIndicator,
  onSwitch,
  dragAttributes,
  dragListeners,
  isOverlay,
}: {
  space: Space
  isActive: boolean
  showIndicator: boolean
  onSwitch?: () => void
  dragAttributes?: React.HTMLAttributes<HTMLButtonElement>
  dragListeners?: Record<string, Function>
  isOverlay?: boolean
}) {
  return (
    <div data-tab-id={space.id} className="relative flex items-center">
      <div
        className="absolute top-0 left-0 right-0 bottom-1"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #f5f5f7 10%, #f5f5f7 95%, transparent 100%)",
        }}
      />
      <button
        onClick={onSwitch}
        className={`relative z-1 shrink-0 py-2 px-2.5 text-sm font-medium transition-colors duration-150 select-none ${
          isOverlay ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing"
        } ${
          isActive
            ? "text-neutral-900"
            : isOverlay
              ? "text-neutral-400"
              : "text-neutral-400 hover:text-neutral-600"
        }`}
        {...dragAttributes}
        {...dragListeners}
      >
        <span className="flex items-center gap-1.5">
          <span>{space.name}</span>
          <span
            className={`text-xs transition-colors duration-150 ${
              isActive ? "text-neutral-500" : "text-neutral-300"
            }`}
          >
            {space.projects.length}
          </span>
        </span>
        {/* attached indicator */}
        {showIndicator && (
          <span
            className="pointer-events-none absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-neutral-900"
            aria-hidden
          />
        )}
      </button>
      {/* "..." 菜单按钮：仅 active tab 展开宽度 */}
      <div
        className={`relative z-1 overflow-hidden transition-all duration-150 ease-in-out ${
          isActive ? "w-6 opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          className="mr-1 flex size-5 items-center justify-center rounded text-neutral-300 transition-colors duration-150 ease-in-out hover:bg-black/5 hover:text-neutral-600"
        >
          <MoreHorizontal className="size-3.5 text-neutral-700" />
        </button>
      </div>
    </div>
  )
}

// ─── ProjectList ──────────────────────────────────────────────────────
function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white">
      {projects.map((p) => (
        <ProjectListItem key={p.id} project={p} />
      ))}
    </div>
  )
}

function ProjectListItem({ project }: { project: Project }) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.planning
  return (
    <div className="group flex items-center gap-4 pl-6 pr-4 py-4 transition-colors hover:bg-neutral-50/80">
      <span className="text-xl shrink-0">{project.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[15px] font-semibold text-neutral-900">
            {project.name}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-neutral-400">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
            {status.label}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-neutral-400">
          {project.description}
        </p>
      </div>

      {/* 成员头像 */}
      <div className="hidden sm:flex items-center shrink-0">
        <div className="flex -space-x-1.5">
          {project.members.slice(0, 4).map((m, i) => (
            <div
              key={i}
              className="flex size-6 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-medium text-neutral-600 ring-2 ring-white"
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* 日期 + 外链 */}
      <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs text-neutral-400">
        <span>{project.date}</span>
        <ExternalLink className="size-3.5" />
      </div>
    </div>
  )
}
