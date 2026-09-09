import { Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Search, Settings2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AppShell, PreviewNotice } from "./app-shell";
import { DataValue, GlassCard, GlassPanel, PageHeading, StatusBadge } from "./primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { previewProjects } from "@/lib/fixtures";

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [showEmpty, setShowEmpty] = useState(false);
  const items = previewProjects.filter((p) => p.name.includes(query) || p.idea.includes(query));
  return (
    <AppShell>
      <PreviewNotice />
      <div className="space-y-6">
        <PageHeading
          eyebrow="项目"
          title="项目"
          description="打开已有项目，或从一个需要验证的创业想法开始。"
          action={<Button asChild><Link to="/projects/new"><Plus />新建项目</Link></Button>}
        />
        <GlassPanel className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索项目" className="h-10 rounded-xl border-glass-edge bg-glass pl-9" />
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowEmpty((v) => !v)}>{showEmpty ? "查看项目列表" : "查看空状态"}</Button>
        </GlassPanel>
        {showEmpty || items.length === 0 ? (
          <GlassPanel className="grid min-h-80 place-items-center p-10 text-center">
            <div className="max-w-md">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary"><Plus /></div>
              <h2 className="mt-6 text-2xl font-semibold">还没有项目</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">从一个创业想法开始，灵蕴会自动组织研究并形成决策分析。</p>
              <Button className="mt-7" asChild><Link to="/projects/new">新建项目</Link></Button>
            </div>
          </GlassPanel>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {items.map((p) => (
              <GlassPanel key={p.name} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-semibold">{p.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.idea}</p>
                  </div>
                  <StatusBadge tone={p.recommendation === "有条件推进" ? "warn" : "neutral"}>{p.recommendation}</StatusBadge>
                </div>
                <div className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-5 text-xs">
                  <div><div className="text-muted-foreground">上次分析</div><div className="mt-1 font-medium">{p.lastRun}</div></div>
                  <div><div className="text-muted-foreground">状态</div><div className="mt-1 font-medium">{p.status}</div></div>
                  <div><div className="text-muted-foreground">证据状态</div><div className="mt-1 font-medium">{p.evidence}</div></div>
                </div>
                <Button variant="outline" className="mt-6" asChild><Link to="/workspace/$section" params={{ section: "workbench" }}>打开项目 <ArrowRight /></Link></Button>
              </GlassPanel>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function CreateProjectPage() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeading eyebrow="项目 / 新建" title="创建创业项目" description="从一个创业想法开始，其余信息可选。" />
        <GlassPanel className="p-6 sm:p-9">
          <form onSubmit={submit} className="space-y-7">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">描述你的创业想法</span>
              <Textarea required placeholder="我想做一个面向中国独立开发者的用量计费 API 网关 SaaS。" className="min-h-44 rounded-2xl border-glass-edge bg-glass-strong p-5 text-base leading-7" />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              {[["目标地区", "中国大陆"], ["目标客户", "独立开发者与小团队"], ["项目阶段", "问题验证"]].map(([label, placeholder]) => (
                <label key={label}>
                  <span className="mb-2 block text-sm font-medium">{label}<span className="ml-1 text-xs text-muted-foreground">可选</span></span>
                  <Input placeholder={placeholder} className="h-12 rounded-xl border-glass-edge bg-glass-strong" />
                </label>
              ))}
            </div>
            {done && <div className="rounded-xl bg-warning/8 p-4 text-sm leading-6 text-warning">当前是隔离设计工作区：表单状态已在本地捕获，但不会创建项目、不会调用接口，也不会运行真实分析。</div>}
            <div className="flex justify-end gap-3">
              <Button variant="outline" asChild><Link to="/projects">取消</Link></Button>
              <Button type="submit">开始分析 <ArrowRight /></Button>
            </div>
          </form>
        </GlassPanel>
      </div>
    </AppShell>
  );
}

export function SettingsPage() {
  const [confirm, setConfirm] = useState(false);
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeading eyebrow="项目 / 设置" title="项目设置" description="管理项目基础信息。危险操作保持克制且需要确认。" />
        <GlassPanel className="p-6 sm:p-8">
          <div className="flex items-center gap-3"><Settings2 className="h-5 w-5 text-violet-soft" /><h2 className="text-lg font-semibold">基础信息</h2></div>
          <div className="mt-6 space-y-5">
            <label className="block"><span className="mb-2 block text-sm">项目名称</span><Input defaultValue="用量计费 API 网关" className="h-12 rounded-xl border-glass-edge bg-glass-strong" /></label>
            <label className="block"><span className="mb-2 block text-sm">项目描述</span><Textarea defaultValue="为中国独立开发者提供用量计费与对账基础设施" className="min-h-28 rounded-2xl border-glass-edge bg-glass-strong p-4 leading-7" /></label>
            <div className="grid gap-4 sm:grid-cols-3">
              {[["地区", "中国大陆"], ["目标客户", "独立开发者与小团队"], ["阶段", "问题验证"]].map(([label, value]) => (
                <label key={label}><span className="mb-2 block text-sm">{label}</span><Input defaultValue={value} className="h-12 rounded-xl border-glass-edge bg-glass-strong" /></label>
              ))}
            </div>
          </div>
          <Button className="mt-7">保存更改</Button>
          <p className="mt-3 text-xs text-muted-foreground">预览环境不会写入任何真实项目数据。</p>
        </GlassPanel>
        <GlassPanel className="border-danger-soft/20 p-6">
          <h2 className="text-base font-semibold text-danger-soft">删除项目</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">删除后项目的研究记录与证据台账将不可恢复。生产接入时必须沿用官方仓库的权限与确认逻辑。</p>
          <Button variant="outline" className="mt-5 border-danger-soft/30 text-danger-soft" onClick={() => setConfirm(true)}>删除项目</Button>
        </GlassPanel>
        <GlassCard className="text-xs text-muted-foreground">当前建议：<DataValue value="有条件推进" /></GlassCard>
      </div>
      {confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/15 p-4 backdrop-blur-sm" onClick={() => setConfirm(false)}>
          <GlassPanel className="w-full max-w-md p-7" >
            <div onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold">确认删除该项目？</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">请输入项目名称以确认。此操作在生产环境不可恢复。</p>
              <Input placeholder="用量计费 API 网关" className="mt-5 h-12 rounded-xl border-glass-edge bg-glass-strong" />
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setConfirm(false)}>取消</Button>
                <Button variant="destructive" onClick={() => setConfirm(false)}>确认删除</Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">设计预览：不会真正删除任何数据。</p>
            </div>
          </GlassPanel>
        </div>
      )}
    </AppShell>
  );
}
