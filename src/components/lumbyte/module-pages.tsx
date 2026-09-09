import { Building2, CircleDollarSign, Layers3, RefreshCw, Search, ShieldAlert, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  previewBusinessModel,
  previewCompetitors,
  previewCustomer,
  previewIndustry,
  previewPricingAssumptions,
  previewPricingRows,
  previewRisks,
} from "@/lib/fixtures";
import { DataValue, GlassCard, GlassPanel, PageHeading, StatusBadge } from "./primitives";

/** Preview-only module screens. All data arrives via props in production. */

function tone(status: string): "neutral" | "good" | "warn" | "bad" {
  if (status === "已验证事实" || status === "有证据支持" || status === "公开价格" || status === "来源数据") return "good";
  if (status === "尚未验证" || status === "尚未验证风险" || status === "待验证实验" || status === "未公开具体价格") return "warn";
  if (status === "阻断条件") return "bad";
  return "neutral";
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GlassPanel className="p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </GlassPanel>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-ink-soft">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-soft" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function IndustryView() {
  const d = previewIndustry;
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="研究 / 行业"
        title="行业情报"
        description="先把行业边界写清楚，再判断趋势、政策与约束条件。"
        action={<Button variant="outline"><RefreshCw />重新核验</Button>}
      />
      <GlassPanel className="p-6 lg:p-8">
        <div className="flex items-center gap-2"><Building2 className="h-5 w-5 text-violet-soft" /><span className="text-xs font-semibold text-muted-foreground">行业定义</span></div>
        <p className="mt-4 max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl">{d.definition}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {d.market.map((m) => (
            <GlassCard key={m.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className="text-base font-semibold"><DataValue value={m.value} /></span>
            </GlassCard>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">市场规模未经来源验证时不会给出数字，也不会用估算冒充事实。</p>
      </GlassPanel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="行业边界"><Bullets items={d.boundary} /></Section>
        <Section title="主要细分">
          <div className="divide-y divide-border">
            {d.segments.map((s) => (
              <div key={s.name} className="grid grid-cols-[1fr_auto] items-center gap-3 py-4">
                <div><div className="text-sm font-medium">{s.name}</div><div className="mt-1 text-xs text-muted-foreground">{s.note}</div></div>
                <StatusBadge tone={tone(s.status)}>{s.status}</StatusBadge>
              </div>
            ))}
          </div>
        </Section>
        <Section title="趋势"><Bullets items={d.trends} /></Section>
        <Section title="政策监管"><Bullets items={d.policy} /></Section>
        <Section title="关键驱动因素"><Bullets items={d.drivers} /></Section>
        <Section title="关键约束"><Bullets items={d.constraints} /></Section>
      </div>
      <GlassPanel className="border-warning/20 bg-warning/6 p-6">
        <h2 className="text-lg font-semibold">尚未验证</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">行业规模、细分渗透率与政策适用范围仍缺少可引用来源，接入真实数据后会替换为带来源的结论。</p>
      </GlassPanel>
    </div>
  );
}

export function CustomerView() {
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="研究 / 客户" title="客户情报" description="谁使用、谁付钱、谁决定——三者不一致时决策会完全不同。" action={<Button variant="outline"><RefreshCw />重新核验</Button>} />
      <div className="grid gap-4 lg:grid-cols-3">
        {[["谁使用", previewCustomer.rows[1]?.value], ["谁付钱", previewCustomer.rows[2]?.value], ["谁决定", previewCustomer.rows[3]?.value]].map(([k, v]) => (
          <GlassPanel key={String(k)} className="p-6">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-violet-soft" /><span className="text-xs font-semibold text-muted-foreground">{k}</span></div>
            <p className="mt-5 text-base font-medium leading-6">{v ?? "尚未验证"}</p>
          </GlassPanel>
        ))}
      </div>
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold">客户结构</h2>
        <div className="mt-4 divide-y divide-border">
          {previewCustomer.rows.map((row) => (
            <div key={row.label} className="grid gap-2 py-4 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
              <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
              <span className="text-sm leading-6"><DataValue value={row.value} /></span>
              <StatusBadge tone={tone(row.status)}>{row.status}</StatusBadge>
            </div>
          ))}
        </div>
      </GlassPanel>
      <Section title="证据来源"><Bullets items={previewCustomer.sources} /></Section>
    </div>
  );
}

export function CompetitorView() {
  const head = ["竞品", "类型", "定位", "目标客户", "价格状态", "核心能力", "最近核验"];
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="研究 / 竞品" title="竞品情报" description="包含直接竞品、间接竞品、替代方案与人工方案；价格未知时记录状态而不是填 0。" action={<Button variant="outline"><Search />补充竞品</Button>} />
      <GlassPanel className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>{head.map((h) => <th key={h} className="border-b border-border px-3 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {previewCompetitors.map((c) => (
                <tr key={c.name} className="hover:bg-glass">
                  <td className="border-b border-border px-3 py-4 font-medium">{c.name}</td>
                  <td className="border-b border-border px-3 py-4"><StatusBadge>{c.type}</StatusBadge></td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{c.position}</td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{c.audience}</td>
                  <td className="border-b border-border px-3 py-4"><StatusBadge tone={tone(c.price)}>{c.price}</StatusBadge></td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{c.capability}</td>
                  <td className="border-b border-border px-3 py-4 text-muted-foreground">{c.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
      <div className="grid gap-4 lg:grid-cols-3">
        {(["直接竞品", "替代方案", "人工方案"] as const).map((t) => (
          <GlassCard key={t}>
            <StatusBadge>{t}</StatusBadge>
            <div className="mt-5 text-sm leading-6 text-ink-soft">
              {previewCompetitors.filter((c) => c.type === t).map((c) => c.name).join("、") || "尚未验证"}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export function PricingView() {
  const head = ["产品", "套餐", "价格状态", "币种", "周期", "计价方式", "免费计划", "试用", "最近核验"];
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="研究 / 定价" title="定价情报" description="市场价格状态与项目自身定价假设分开记录，互不混用。" action={<Button variant="outline"><CircleDollarSign />补充定价</Button>} />
      <GlassPanel className="p-4 sm:p-6">
        <h2 className="px-1 pb-3 text-lg font-semibold">市场定价核验</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="text-xs text-muted-foreground"><tr>{head.map((h) => <th key={h} className="border-b border-border px-3 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {previewPricingRows.map((r) => (
                <tr key={r.product + r.plan} className="hover:bg-glass">
                  <td className="border-b border-border px-3 py-4 font-medium">{r.product}</td>
                  <td className="border-b border-border px-3 py-4">{r.plan}</td>
                  <td className="border-b border-border px-3 py-4"><StatusBadge tone={tone(r.state)}>{r.state}</StatusBadge></td>
                  <td className="border-b border-border px-3 py-4">{r.currency}</td>
                  <td className="border-b border-border px-3 py-4">{r.cycle}</td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{r.model}</td>
                  <td className="border-b border-border px-3 py-4">{r.free}</td>
                  <td className="border-b border-border px-3 py-4">{r.trial}</td>
                  <td className="border-b border-border px-3 py-4 text-muted-foreground">{r.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold">项目自身定价假设</h2>
        <div className="mt-4 divide-y divide-border">
          {previewPricingAssumptions.map((a) => (
            <div key={a.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-4">
              <span className="text-sm">{a.label}</span>
              <span className="text-sm font-medium">{a.value}</span>
              <StatusBadge tone={tone(a.origin)}>{a.origin}</StatusBadge>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

export function BusinessModelView() {
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="研究 / 商业模式" title="商业模式" description="每一条都标注它现在是证据、假设，还是待验证实验。" action={<Button variant="outline"><Layers3 />重新整理</Button>} />
      <div className="grid gap-4 lg:grid-cols-2">
        {previewBusinessModel.map((row) => (
          <GlassPanel key={row.label} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
              <StatusBadge tone={tone(row.status)}>{row.status}</StatusBadge>
            </div>
            <p className="mt-5 text-base leading-7">{row.value}</p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

export function RiskView() {
  const head = ["风险", "类别", "可能性", "影响", "证据置信度", "原因", "缓释建议", "决策影响"];
  return (
    <div className="space-y-6">
      <PageHeading eyebrow="建模 / 风险" title="风险清单" description="区分已确认风险、潜在风险、尚未验证风险与阻断条件。" action={<Button variant="outline"><ShieldAlert />重新评估</Button>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {(["已确认风险", "潜在风险", "尚未验证风险", "阻断条件"] as const).map((t) => (
          <GlassCard key={t} className="flex items-center justify-between">
            <StatusBadge tone={tone(t)}>{t}</StatusBadge>
            <span className="text-lg font-semibold">{previewRisks.filter((r) => r.type === t).length}</span>
          </GlassCard>
        ))}
      </div>
      <GlassPanel className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="text-xs text-muted-foreground"><tr>{head.map((h) => <th key={h} className="border-b border-border px-3 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {previewRisks.map((r) => (
                <tr key={r.name} className="hover:bg-glass">
                  <td className="border-b border-border px-3 py-4"><div className="font-medium">{r.name}</div><div className="mt-1"><StatusBadge tone={tone(r.type)}>{r.type}</StatusBadge></div></td>
                  <td className="border-b border-border px-3 py-4">{r.category}</td>
                  <td className="border-b border-border px-3 py-4"><DataValue value={r.likelihood ?? null} /></td>
                  <td className="border-b border-border px-3 py-4">{r.impact}</td>
                  <td className="border-b border-border px-3 py-4">{r.confidence}</td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{r.cause}</td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{r.mitigation}</td>
                  <td className="border-b border-border px-3 py-4 text-ink-soft">{r.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
}
