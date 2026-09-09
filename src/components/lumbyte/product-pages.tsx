import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, ExternalLink, FileDown, RefreshCw, RotateCcw, Search, Sparkles, TrendingDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  evidenceFilters,
  previewDecision,
  previewEvidenceLedger,
  previewFinancialAssumptions,
  previewFinancialOutputs,
  previewFlip,
  previewNextSteps,
  previewReportMeta,
  type DecisionData,
} from "@/lib/fixtures";
import { DataValue, GlassCard, GlassPanel, PageHeading, StatusBadge } from "./primitives";

/** Preview-only workspace screens; production passes real payloads as props. */

const metricLabel: Record<string, string> = {
  viabilityScore: "可行性",
  evidenceConfidence: "证据置信度",
  decisionConfidence: "决策置信度",
};

function originTone(origin: string): "neutral" | "good" | "warn" {
  if (origin === "来源数据") return "good";
  if (origin === "尚未验证") return "warn";
  return "neutral";
}

export function WorkbenchView() {
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="工作台"
        title="用量计费 API 网关"
        description="为中国独立开发者提供用量计费与对账基础设施 · 状态：分析中"
        action={<div className="flex gap-2"><Button variant="outline"><RefreshCw />重新分析</Button><Button asChild><Link to="/settings">编辑项目</Link></Button></div>}
      />
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <GlassPanel className="border-warning/20 bg-warning/6 p-6 lg:p-8">
          <div className="flex items-center justify-between"><StatusBadge tone="warn">{previewDecision.recommendation}</StatusBadge><span className="text-xs text-muted-foreground">结论随证据更新</span></div>
          <h2 className="mt-7 max-w-2xl text-2xl font-semibold leading-snug lg:text-3xl">{previewDecision.rationale}</h2>
          <Button variant="outline" className="mt-8" asChild><Link to="/workspace/$section" params={{ section: "decision" }}>打开完整决策 <ArrowRight /></Link></Button>
        </GlassPanel>
        <div className="grid grid-cols-3 gap-3 xl:grid-cols-1">
          {(["viabilityScore", "evidenceConfidence", "decisionConfidence"] as const).map((key) => (
            <GlassCard key={key} className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <span className="text-xs text-muted-foreground">{metricLabel[key]}</span>
              <span className="text-base font-semibold"><DataValue value={previewDecision[key]} /></span>
            </GlassCard>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold">支持推进</h2>
          <div className="mt-4 space-y-3">{previewDecision.positiveEvidence.map((x) => <div key={x} className="rounded-2xl bg-success/8 p-4 text-sm leading-6">{x}</div>)}</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold">关键未知</h2>
          <div className="mt-4 space-y-3">{previewDecision.criticalUnknowns.map((x) => <div key={x} className="rounded-2xl border border-dashed border-glass-edge bg-glass p-4 text-sm leading-6">{x}</div>)}</div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold">下一步验证</h2>
          <ol className="mt-4 space-y-3">{previewNextSteps.slice(0, 3).map((x, i) => <li key={x} className="flex gap-3 text-sm leading-6"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-semibold">{i + 1}</span>{x}</li>)}</ol>
        </GlassPanel>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold">研究状态</h2>
          <div className="mt-5 space-y-4">
            {([["行业边界", true], ["客户结构", true], ["竞品与价格状态", true], ["付费意愿", false], ["财务输入", false]] as const).map(([label, ok]) => (
              <div key={label} className="flex items-center gap-3">
                <span className={ok ? "grid h-7 w-7 place-items-center rounded-full bg-success/10 text-success" : "grid h-7 w-7 place-items-center rounded-full bg-secondary text-muted-foreground"}>{ok ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}</span>
                <span className="text-sm">{label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{ok ? "已核验" : "尚未验证"}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">证据概览</h2><Button variant="ghost" size="sm" asChild><Link to="/workspace/$section" params={{ section: "evidence" }}>查看台账</Link></Button></div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {(["已验证事实", "市场信号", "尚未验证", "证据冲突"] as const).map((k) => (
              <div key={k} className="rounded-2xl bg-glass p-4">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="mt-2 text-xl font-semibold">{previewEvidenceLedger.filter((e) => e.classification === k).length}</div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

export function FinancialView() {
  const [scenario, setScenario] = useState<"保守" | "基准" | "乐观">("基准");
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="建模 / 财务" title="财务模型" description="关键财务结果来自明确输入和可复核计算。输入不足时不会给出数字。" action={<Button>补充关键数据</Button>} />
      <GlassPanel className="p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {previewFinancialOutputs.map((m) => (
            <GlassCard key={m.key}>
              <span className="text-xs text-muted-foreground">{m.key}</span>
              <div className="mt-6 text-2xl font-semibold"><DataValue value={m.value} /></div>
            </GlassCard>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">缺少输入的指标显示「尚未验证」，不会显示为 0。</p>
      </GlassPanel>
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">关键假设</h2><Button variant="ghost" size="sm"><RotateCcw />恢复系统值</Button></div>
          <div className="mt-4 divide-y divide-border">
            {previewFinancialAssumptions.map((a) => (
              <div key={a.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-4">
                <span className="text-sm">{a.label}</span>
                <span className="text-sm font-medium">{a.value}</span>
                <StatusBadge tone={originTone(a.origin)}>{a.origin}</StatusBadge>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold">情景</h2>
          <div className="mt-4 inline-flex rounded-full bg-secondary p-1">
            {(["保守", "基准", "乐观"] as const).map((s) => (
              <button key={s} onClick={() => setScenario(s)} className={s === scenario ? "rounded-full bg-background px-4 py-1.5 text-xs font-semibold shadow-sm" : "rounded-full px-4 py-1.5 text-xs text-muted-foreground"}>{s}</button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-glass-edge bg-glass p-5">
            <CircleAlert className="h-5 w-5 text-violet-soft" />
            <h3 className="mt-4 text-base font-semibold">{scenario}情景暂不可计算</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">ARPU、CAC、客户数量、转化率与流失率尚未验证，因此不会生成情景数值。补齐输入后三种情景会同时给出可复核结果。</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

export function EvidenceView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("全部");
  const [selected, setSelected] = useState<(typeof previewEvidenceLedger)[number] | null>(null);
  const visible = useMemo(
    () => previewEvidenceLedger.filter((e) => (filter === "全部" || e.classification === filter) && (e.claim.includes(query) || e.source.includes(query))),
    [filter, query],
  );
  const head = ["判断", "证据状态", "来源", "发布者", "地区", "周期", "最近核验", "所属模块"];
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="证据与决策 / 证据" title="证据台账" description="每条判断都保留证据状态、来源、发布者、地区、周期与最近核验时间。" />
      <GlassPanel className="p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索判断或来源" className="h-10 rounded-xl border-glass-edge bg-glass pl-9" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {evidenceFilters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={f === filter ? "rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-semibold text-primary-foreground" : "rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-medium text-secondary-foreground"}>{f}</button>
          ))}
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="text-xs text-muted-foreground"><tr>{head.map((h) => <th key={h} className="border-b border-border px-3 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.claim} onClick={() => setSelected(item)} className="cursor-pointer hover:bg-glass">
                  <td className="max-w-sm border-b border-border px-3 py-4 font-medium">{item.claim}</td>
                  <td className="border-b border-border px-3 py-4"><StatusBadge tone={item.classification === "尚未验证" ? "warn" : item.classification === "证据冲突" ? "bad" : item.classification === "已验证事实" ? "good" : "neutral"}>{item.classification}</StatusBadge></td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{item.source}</td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{item.publisher}</td>
                  <td className="border-b border-border px-3 py-4">{item.geography}</td>
                  <td className="border-b border-border px-3 py-4">{item.period}</td>
                  <td className="border-b border-border px-3 py-4 text-muted-foreground">{item.lastChecked}</td>
                  <td className="border-b border-border px-3 py-4">{item.module}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && <p className="px-3 py-10 text-center text-sm text-muted-foreground">该筛选下暂无记录。</p>}
        </div>
      </GlassPanel>
      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <aside className="glass-panel absolute inset-y-3 right-3 w-[min(520px,calc(100vw-24px))] overflow-y-auto rounded-[28px] p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <StatusBadge>{selected.classification}</StatusBadge>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)} aria-label="关闭来源抽屉"><X /></Button>
            </div>
            <h2 className="mt-7 text-xl font-semibold leading-snug">{selected.source}</h2>
            <dl className="mt-8 space-y-5 text-sm">
              {[["发布者", selected.publisher], ["URL", selected.url], ["发布时间", selected.published], ["数据周期", selected.period], ["地区", selected.geography], ["最近核验", selected.lastChecked], ["所属模块", selected.module]].map(([k, v]) => (
                <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 break-words">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-8 rounded-2xl bg-glass p-5">
              <div className="text-xs text-muted-foreground">支持的判断</div>
              <p className="mt-2 text-sm leading-6">{selected.claim}</p>
            </div>
            <Button variant="outline" className="mt-7">查看原始来源 <ExternalLink /></Button>
          </aside>
        </div>
      )}
    </div>
  );
}

export function DecisionView({ data = previewDecision }: { data?: DecisionData }) {
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="证据与决策 / 决策" title="决策" description="结论只依据当前证据，并会随着关键未知被验证而变化。" action={<Button><RefreshCw />重新分析</Button>} />
      <GlassPanel className="border-warning/25 bg-warning/8 p-6 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">当前建议</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">{data.recommendation}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink-soft">{data.rationale}</p>
          </div>
          <div className="grid gap-3">
            {(["viabilityScore", "evidenceConfidence", "decisionConfidence"] as const).map((key) => (
              <GlassCard key={key} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{metricLabel[key]}</span>
                <span className="text-base font-semibold"><DataValue value={data[key]} /></span>
              </GlassCard>
            ))}
          </div>
        </div>
      </GlassPanel>
      <h2 className="pt-2 text-xl font-semibold">核心判断</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassPanel className="border-success/20 bg-success/6 p-6">
          <h3 className="text-base font-semibold text-success">支持推进</h3>
          <div className="mt-4 space-y-3">{data.positiveEvidence.map((x) => <div key={x} className="rounded-2xl bg-background/50 p-4 text-sm leading-6">{x}</div>)}</div>
        </GlassPanel>
        <GlassPanel className="border-danger-soft/20 bg-danger-soft/6 p-6">
          <h3 className="text-base font-semibold text-danger-soft">不利因素</h3>
          <div className="mt-4 space-y-3">{data.negativeEvidence.map((x) => <div key={x} className="rounded-2xl bg-background/50 p-4 text-sm leading-6">{x}</div>)}</div>
        </GlassPanel>
        <GlassPanel className="border-dashed border-glass-edge p-6">
          <h3 className="text-base font-semibold">关键未知</h3>
          <p className="mt-1 text-xs text-muted-foreground">未知不是负面结论，只是尚未验证。</p>
          <div className="mt-4 space-y-3">{data.criticalUnknowns.map((x) => <div key={x} className="rounded-2xl border border-dashed border-glass-edge p-4 text-sm leading-6">{x}</div>)}</div>
        </GlassPanel>
      </div>
      <h2 className="pt-2 text-xl font-semibold">什么会改变结论？</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-success" /><span className="text-sm font-semibold">可能升级为「建议推进」</span></div>
          <ul className="mt-5 space-y-3">{previewFlip.up.map((x) => <li key={x} className="rounded-2xl bg-success/8 p-4 text-sm leading-6">{x}</li>)}</ul>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-danger-soft" /><span className="text-sm font-semibold">可能转向「当前不建议推进」</span></div>
          <ul className="mt-5 space-y-3">{previewFlip.down.map((x) => <li key={x} className="rounded-2xl bg-danger-soft/8 p-4 text-sm leading-6">{x}</li>)}</ul>
        </GlassPanel>
      </div>
      <GlassPanel className="p-6">
        <h2 className="text-xl font-semibold">下一步最值得验证</h2>
        <ol className="mt-5 divide-y divide-border">
          {previewNextSteps.map((x, i) => (
            <li key={x} className="flex items-center gap-4 py-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{i + 1}</span>
              <span className="text-sm leading-6">{x}</span>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </div>
  );
}

const reportSections: { no: string; title: string; body: string }[] = [
  { no: "01", title: "执行摘要", body: "当前证据支持继续验证这个方向：目标客户的计费与对账痛点已获得公开来源支持，但付费意愿与获客成本尚未验证，因此还不足以进入规模化投入。" },
  { no: "02", title: "当前决策", body: "有条件推进。在完成付费意愿验证与端到端对账验证之前，建议将投入限制在小规模实验范围内。" },
  { no: "03", title: "行业", body: "行业范围界定为面向独立开发者与小团队的用量计费基础设施；不包含支付清算与发票合规。行业规模尚未验证。" },
  { no: "04", title: "客户", body: "使用者为后端与全栈工程师，购买者与决策者在早期团队中通常与使用者重合；客户规模与购买意图尚未验证。" },
  { no: "05", title: "竞品", body: "存在直接竞品、间接竞品、开源替代方案与人工方案四类；部分产品价格未公开具体数值，仅记录价格状态。" },
  { no: "06", title: "定价", body: "同类产品普遍以用量事件作为计价单位；本项目自身的套餐价格仍是尚未验证项。" },
  { no: "07", title: "商业模式", body: "订阅加用量阶梯是当前假设；分发与获客路径属待验证实验。" },
  { no: "08", title: "财务", body: "MRR、ARR、毛利率、CAC、LTV、Burn、Runway 与盈亏平衡均因输入不足显示为尚未验证，未以 0 代替。" },
  { no: "09", title: "风险", body: "已确认风险为对账偏差引发的信任问题；跨境结算合规主体缺失被记为阻断条件。" },
  { no: "10", title: "关键假设", body: "ARPU、CAC、客户数量、转化率、流失率为尚未验证；毛利率为估算；固定成本为用户提供。" },
  { no: "11", title: "尚未验证", body: "付费意愿、可持续获客成本、客户规模、行业规模与项目自身价格区间。" },
  { no: "12", title: "决策翻转条件", body: "完成 10 个真实付费即可能升级为建议推进；获客成本长期高于首年客户贡献则可能转为当前不建议推进。" },
  { no: "13", title: "下一步验证", body: "按优先级完成付费意愿访谈、端到端对账验证、两条渠道的获客成本测算、支付集成边界确认与价格口径核验。" },
  { no: "14", title: "来源", body: "公开定价页面集合、公开开发者讨论样本、公开产品文档与变更说明；预览环境不附具体链接。" },
];

export function ReportView() {
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="证据与决策 / 最终报告" title="Lumbyte 决策报告" description="以研究备忘录形式组织的当前版本结论，可追溯到证据台账。" />
      <GlassPanel className="p-6">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {[["Project", previewReportMeta.project], ["Decision", previewReportMeta.decision], ["Evidence Confidence", null], ["Generated", previewReportMeta.generated], ["Status", previewReportMeta.status]].map(([k, v]) => (
            <div key={String(k)}><div className="text-xs text-muted-foreground">{k}</div><div className="mt-2 text-sm font-medium"><DataValue value={v as string | null} /></div></div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
          <Button><FileDown />导出 PDF</Button>
          {["HTML", "Markdown", "JSON"].map((f) => <Button key={f} variant="outline">{f}</Button>)}
        </div>
      </GlassPanel>
      <GlassPanel className="mx-auto max-w-4xl p-7 sm:p-12">
        <article className="space-y-10">
          {reportSections.map((s) => (
            <section key={s.no}>
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold text-muted-foreground">{s.no}</span>
                <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
              </div>
              <p className="mt-3 text-[15px] leading-8 text-ink-soft">{s.body}</p>
            </section>
          ))}
        </article>
      </GlassPanel>
      <p className="pb-2 text-center text-xs text-muted-foreground"><Sparkles className="mr-1 inline h-3 w-3" />报告内容为设计预览示例，不代表真实分析结果。</p>
    </div>
  );
}
