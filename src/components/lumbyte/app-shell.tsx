import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, BookOpen, BriefcaseBusiness, Building2, ChevronDown, CircleDollarSign, FileText, Gauge, HelpCircle, Layers3, Menu, PanelLeftClose, Search, Settings, ShieldAlert, Sparkles, Target, Users, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const groups = [
  { label: "概览", items: [{ key: "workbench", label: "工作台", icon: Gauge }] },
  { label: "研究", items: [{ key: "industry", label: "行业", icon: Building2 }, { key: "customer", label: "客户", icon: Users }, { key: "competitor", label: "竞品", icon: Search }, { key: "pricing", label: "定价", icon: CircleDollarSign }, { key: "business-model", label: "商业模式", icon: Layers3 }] },
  { label: "建模", items: [{ key: "financial", label: "财务", icon: BarChart3 }, { key: "risk", label: "风险", icon: ShieldAlert }] },
  { label: "证据与决策", items: [{ key: "evidence", label: "证据", icon: BookOpen }, { key: "decision", label: "决策", icon: Target }, { key: "report", label: "最终报告", icon: FileText }] },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  return <main className="min-h-screen p-3 sm:p-5 lg:p-6">
    <div className="glass-panel mx-auto flex min-h-[calc(100vh-48px)] max-w-[1800px] overflow-hidden rounded-[34px]">
      <aside className={cn("fixed inset-y-3 left-3 z-40 w-[250px] border-r border-glass-edge bg-glass-strong p-4 backdrop-blur-3xl transition-transform lg:static lg:translate-x-0 lg:bg-transparent lg:backdrop-blur-none", open ? "translate-x-0" : "-translate-x-[110%]") }>
        <div className="flex items-center justify-between"><Link to="/"><Brand /></Link><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="关闭导航"><X /></Button></div>
        <button className="mt-7 flex w-full items-center justify-between rounded-2xl border border-glass-edge bg-glass px-3 py-3 text-left"><span><span className="block text-xs text-muted-foreground">当前项目</span><span className="block max-w-36 truncate text-sm font-semibold">新项目</span></span><ChevronDown className="h-4 w-4" /></button>
        <nav className="mt-6 space-y-5">
          {groups.map((group) => <div key={group.label}><div className="mb-2 px-3 text-[11px] font-semibold text-muted-foreground">{group.label}</div><div className="space-y-1">{group.items.map(({ key, label, icon: Icon }) => {
            const active = path === `/workspace/${key}`;
            return <Link key={key} to="/workspace/$section" params={{ section: key }} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors", active ? "bg-primary text-primary-foreground shadow-sm" : "text-ink-soft hover:bg-glass-strong hover:text-foreground")}><Icon className="h-4 w-4" />{label}</Link>;
          })}</div></div>)}
        </nav>
        <div className="mt-6 border-t border-border pt-4"><Link to="/projects" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:bg-glass-strong"><BriefcaseBusiness className="h-4 w-4" />项目列表</Link><Link to="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:bg-glass-strong"><Settings className="h-4 w-4" />项目设置</Link></div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="grid h-[72px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-glass-edge px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="打开导航"><Menu /></Button>
          <div className="min-w-0"><div className="truncate text-sm font-semibold">Lumbyte OS · 新项目</div><div className="text-[11px] text-muted-foreground">仅设计预览 · 未连接真实项目数据</div></div>
          <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success sm:inline-flex">今日数据已核验</span><Button variant="ghost" size="icon" aria-label="帮助"><HelpCircle /></Button><div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">L</div></div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
    {open && <button className="fixed inset-0 z-30 bg-foreground/10 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} aria-label="关闭导航遮罩" />}
  </main>;
}

export function PreviewNotice() {
  return <div className="mb-5 flex items-center gap-2 rounded-xl border border-violet-soft/20 bg-violet-soft/8 px-4 py-2.5 text-xs text-ink-soft"><Sparkles className="h-4 w-4 text-violet-soft" />当前页面仅展示可替换的数据输入状态，不代表真实 Lumbyte 分析结果。</div>;
}