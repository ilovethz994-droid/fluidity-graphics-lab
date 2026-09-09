import { Link } from "@tanstack/react-router";
import {
  ArrowRight, BookOpenCheck, CheckCircle2, CircleHelp, Database, FileSearch, GitCompareArrows,
  Layers, Menu, Scale, ShieldCheck, Sparkles, Target, Users, Wallet, X,
} from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { GlassCard, GlassPanel, StatusBadge } from "./primitives";

type LucideIcon = typeof FileSearch;

const nav = [["产品", "/product"], ["工作方式", "/method"], ["真实数据", "/data"], ["证据体系", "/evidence-system"], ["决策系统", "/decision-system"], ["方案", "/pricing-plan"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-24px)] max-w-[1280px] rounded-[22px] glass-panel">
      <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center px-4 lg:grid-cols-[auto_1fr_auto] lg:px-5">
        <Link to="/"><Brand /></Link>
        <nav className="hidden justify-center gap-1 lg:flex">
          {nav.map(([x, to]) => <Link key={x} to={to} className="rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-glass-strong hover:text-foreground">{x}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" asChild><Link to="/login">登录</Link></Button>
          <Button asChild><Link to="/register">开始分析</Link></Button>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="菜单">{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <div className="border-t border-border p-3 lg:hidden">
          {nav.map(([x, to]) => <Link key={x} to={to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm">{x}</Link>)}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button variant="outline" asChild><Link to="/login">登录</Link></Button>
            <Button asChild><Link to="/register">开始分析</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`px-5 py-[88px] lg:py-[104px] ${className}`}><div className="mx-auto max-w-[1280px]">{children}</div></section>;
}

function Eye2({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold tracking-wide text-muted-foreground">{children}</span>;
}

/* ---------- 03 Product preview ---------- */
const previewNav = ["工作台", "行业", "客户", "竞品", "商业模式", "定价", "财务", "风险", "证据", "决策", "最终报告"];

function ProductPreview() {
  return (
    <GlassPanel className="mx-auto mt-12 max-w-[1280px] overflow-hidden p-2.5 shadow-2xl sm:p-3">
      <div className="grid gap-0 md:grid-cols-[168px_1fr]">
        <aside className="hidden border-r border-glass-edge p-4 md:block">
          <Brand compact />
          <div className="mt-6 space-y-1">
            {previewNav.map((x, i) => (
              <div key={x} className={`rounded-xl px-3 py-1.5 text-[12px] ${i === 9 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{x}</div>
            ))}
          </div>
        </aside>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <div className="text-[11px] text-muted-foreground">当前项目</div>
              <div className="mt-1 truncate font-semibold">面向小型团队的创业决策工作区</div>
            </div>
            <StatusBadge tone="warn">设计预览</StatusBadge>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.15fr_1fr]">
            <GlassCard className="p-5">
              <div className="text-[11px] text-muted-foreground">当前建议</div>
              <div className="mt-2 text-2xl font-semibold">有条件推进</div>
              <p className="mt-3 text-[13px] leading-6 text-muted-foreground">当前证据支持继续验证，但仍有关键商业假设需要确认。</p>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div><div className="text-[10px] text-muted-foreground">证据状态</div><div className="mt-1 text-[13px] font-semibold">部分确认</div></div>
                <div><div className="text-[10px] text-muted-foreground">决策置信度</div><div className="mt-1 text-[13px] font-semibold">中等</div></div>
              </div>
            </GlassCard>
            <div className="grid gap-3">
              <GlassCard className="p-4">
                <div className="text-[11px] font-semibold">支持推进</div>
                <ul className="mt-2.5 space-y-1.5 text-[12px] leading-5 text-muted-foreground">
                  <li>已观察到明确问题信号</li>
                  <li>已识别现有替代方案</li>
                  <li>目标客户范围可以进一步验证</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="text-[11px] font-semibold">关键未知</div>
                <ul className="mt-2.5 space-y-1.5 text-[12px] leading-5 text-muted-foreground">
                  <li>真实付费意愿</li>
                  <li>获客成本</li>
                  <li>初始客户规模</li>
                </ul>
              </GlassCard>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[["01", "确认目标客户是否愿意付费"], ["02", "测试真实获客成本"], ["03", "确认关键约束条件"]].map(([n, t]) => (
              <GlassCard key={n} className="p-4">
                <div className="text-[11px] text-muted-foreground">{n}</div>
                <div className="mt-2 text-[13px] font-medium leading-5">{t}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

/* ---------- 04 Data scale ---------- */
const dataScale = [["17,202+", "合格真实观测数据"], ["30+", "国家与地区"], ["65+", "标准化指标"], ["1,003+", "真实来源"]] as const;

/* ---------- 07 Capabilities ---------- */
const primaryCaps: Array<[LucideIcon, string, string, string]> = [
  [ShieldCheck, "证据", "每个重要结论都能回到具体来源、地区与核验时间。", "使用场景：当你需要向合伙人或投资人解释“这个判断依据什么”，可以直接打开证据台账，看到该结论属于已验证事实、市场信号还是尚未验证。"],
  [Scale, "决策", "给出当前建议，并说明什么条件会改变结论。", "使用场景：当你在“继续投入”和“先验证一件事”之间犹豫时，决策页会告诉你当前建议、支持因素、不利因素，以及哪一个未知一旦确认就会改变结论。"],
];
const supportCaps: Array<[LucideIcon, string, string, string]> = [
  [Layers, "行业", "边界、细分、趋势与约束", "先确认你进入的是哪个市场，再判断机会是否存在。"],
  [Users, "客户", "用户、购买者与决策者", "分清谁在用、谁付钱、谁最终拍板，避免对错误的人做验证。"],
  [GitCompareArrows, "竞品", "直接、间接与替代方案", "包含客户当前的手工做法，而不只是同类公司清单。"],
  [Target, "定价", "公开价格与价格状态", "价格未公开时保留状态，用于判断你的定价空间。"],
  [BookOpenCheck, "商业模式", "价值主张与收入结构", "把交付方式、收入来源与成本结构写成可以被检验的结构。"],
  [CircleHelp, "风险", "关键假设与失败条件", "提前写出“什么情况下这个项目不成立”，而不是事后解释。"],
];

const stages: Array<[string, string, string, string]> = [
  ["01", "输入创业想法", "用户只需要描述产品、客户与目标方向。", "例如：为小型创业团队提供基于证据的早期决策工作区，目标市场中国大陆。"],
  ["02", "拆解研究问题", "灵蕴将模糊问题拆解为行业、客户、竞品、定价、财务和风险研究。", "系统会先列出需要回答的问题清单，你可以增删研究范围。"],
  ["03", "寻找真实证据", "优先复用已经验证的数据，并在需要时补充公开来源。", "每条证据会记录来源、地区、数据周期与最近核验时间。"],
  ["04", "分析市场与客户", "把已验证事实、市场信号、估算、推断和未知分开处理。", "客户页会区分实际用户、购买者与决策者，痛点按证据强度排序。"],
  ["05", "构建财务与风险模型", "将关键商业假设进入财务和风险判断。", "假设可以逐项编辑，结果随输入重新计算，缺少输入时保持“尚未验证”。"],
  ["06", "形成决策与验证计划", "给出建议推进、有条件推进或当前不建议推进。", "同时生成排序后的验证清单，以及会改变结论的条件。"],
];

const evidenceRows = [
  ["目标流程普遍依赖多个分散工具", "已验证事实", "公开产品文档集合", "中国大陆", "最近 12 个月", "今天"],
  ["用户正在主动寻找更轻量的替代方式", "市场信号", "公开讨论与评价样本", "中国大陆", "最近 6 个月", "今天"],
  ["目标客户愿意为自动化决策流程付费", "尚未验证", "暂无可靠公开证据", "目标市场", "—", "待核验"],
  ["同类工具的平均替换周期", "估算", "公开定价与合约条款", "中国大陆", "最近 12 个月", "今天"],
  ["采购决策由业务负责人主导", "推断", "公开职责描述", "中国大陆", "最近 12 个月", "今天"],
  ["市场规模口径存在差异", "证据冲突", "两份公开报告口径不一致", "中国大陆", "最近 24 个月", "今天"],
] as const;

const competitorRows = [
  ["综合协作套件", "间接竞品", "通用协作与文档", "中大型团队", "公开价格：按席位年付", "今天"],
  ["市场研究服务", "替代方案", "人工研究交付", "融资阶段团队", "联系销售：按项目报价", "今天"],
  ["通用问答助手", "替代方案", "即时回答", "个人用户", "公开价格：个人订阅制", "今天"],
  ["行业数据库", "间接竞品", "数据订阅", "投资与咨询机构", "未公开具体价格", "待核验"],
  ["电子表格 + 人工整理", "客户当前做法", "自行搜集与汇总", "早期创业团队", "无直接费用，成本为时间", "今天"],
] as const;

const financeMetrics: Array<[string, string, string]> = [
  ["MRR", "尚未验证", "缺少真实成交"],
  ["ARR", "尚未验证", "依赖 MRR"],
  ["毛利率", "72%", "按估算成本计算"],
  ["CAC", "尚未验证", "缺少获客数据"],
  ["LTV", "尚未验证", "依赖流失率"],
  ["Burn", "¥46,000 / 月", "用户提供成本项"],
  ["Runway", "9 个月", "按用户提供余额计算"],
  ["盈亏平衡", "尚未验证", "依赖 CAC 与 ARPU"],
];
const assumptions: Array<[string, string, string]> = [
  ["ARPU", "待补充", "尚未验证"],
  ["CAC", "待补充", "尚未验证"],
  ["客户数量", "首批 12 家目标客户", "用户提供"],
  ["流失率", "月度 4%", "估算"],
  ["毛利率", "72%", "估算"],
  ["固定成本", "¥46,000 / 月", "用户提供"],
];

const reportSections = ["执行摘要", "当前决策", "行业", "客户", "竞品", "定价", "商业模式", "财务", "风险", "关键假设", "尚未验证", "决策翻转条件", "下一步验证", "来源"];
const reportExcerpt: Array<[string, string]> = [
  ["执行摘要", "目标客户在早期决策阶段确实缺少可追溯的研究流程，问题信号明确；但付费意愿与获客成本尚未验证，建议以有条件推进方式继续。"],
  ["当前判断", "有条件推进。证据置信度为部分确认，决策置信度为中等。"],
  ["关键未知", "首批客户真实付费意愿、可持续获客成本、决策者与实际使用者是否为同一人。"],
  ["下一步验证", "先完成 12 家目标客户的付费意愿访谈，再测试一条可重复的获客路径。"],
];
const audiences = ["早期创业者", "独立开发者", "学生创业团队", "创业项目负责人", "企业创新团队", "创业教育与研究场景"];

export function HomePage() {
  return (
    <main>
      <SiteHeader />

      {/* 02 Hero + 03 Preview */}
      <section className="px-5 pb-[72px] pt-32 sm:pt-36">
        <div className="mx-auto max-w-[1280px] text-center">
          <StatusBadge>创业决策智能系统</StatusBadge>
          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,4.6vw,4.25rem)] font-semibold leading-[1.12]">
            一个创业想法，<br />先查证，再判断。
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
            灵蕴自动研究行业、客户、竞品、定价、商业模式、财务与风险，基于真实、可追溯的公开证据，帮助创业者判断一个项目是否值得继续推进。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild><Link to="/register">开始分析 <ArrowRight /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/method">了解工作方式</Link></Button>
          </div>
        </div>
        <ProductPreview />
      </section>

      {/* 04 Real data scale */}
      <section className="border-y border-glass-edge bg-glass/30 px-5 py-[88px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <h2 className="text-[clamp(1.75rem,2.4vw,2.5rem)] font-semibold leading-tight">真实数据，先于模型回答。</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              灵蕴优先复用已经验证的数据，当项目需要的信息缺失或需要重新核验时，再从公开可信来源补充研究。
            </p>
          </div>
          <div className="mt-10 grid divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {dataScale.map(([n, d]) => (
              <div key={n} className="px-0 py-6 lg:px-7 lg:first:pl-0">
                <div className="text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none">{n}</div>
                <div className="mt-3 text-[13px] text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Why Lumbyte */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[42fr_58fr] lg:gap-14">
          <div>
            <Eye2>为什么是灵蕴</Eye2>
            <h2 className="mt-4 text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-[1.2]">
              不是更快地产生答案，<br />而是更清楚地知道答案从哪里来。
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              每个重要判断都有明确状态，而不是把所有内容包装成同一种“答案”。当公开信息不足时，灵蕴会保留未知状态。
            </p>
          </div>
          <GlassPanel className="p-6 sm:p-8">
            <div className="text-[11px] font-semibold text-muted-foreground">通常的 AI 输出</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["事实", "推断", "假设", "估算"].map((x) => (
                <span key={x} className="rounded-xl bg-muted px-3 py-2 text-[13px] text-ink-soft">{x}</span>
              ))}
              <span className="rounded-xl px-3 py-2 text-[13px] text-muted-foreground">经常混在一起呈现</span>
            </div>
            <div className="my-6 flex items-center gap-3 text-muted-foreground"><div className="h-px flex-1 bg-border" /><span className="text-xs">灵蕴</span><div className="h-px flex-1 bg-border" /></div>
            <div className="grid gap-2 sm:grid-cols-2">
              {[[CheckCircle2, "已验证事实"], [Sparkles, "市场信号"], [Database, "估算"], [BookOpenCheck, "推断"], [CircleHelp, "尚未验证"], [ShieldCheck, "证据冲突"]].map(([Icon, x]) => {
                const I = Icon as LucideIcon;
                return (
                  <GlassCard key={x as string} className="flex items-center gap-3 p-3.5">
                    <I className="h-4 w-4 shrink-0 text-violet-soft" />
                    <span className="text-[13px] font-medium">{x as string}</span>
                  </GlassCard>
                );
              })}
            </div>
          </GlassPanel>
        </div>
      </Section>

      {/* 06 How it works */}
      <Section className="border-y border-glass-edge bg-glass/30">
        <Eye2>工作方式</Eye2>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-[1.2]">
          从一个想法，<br />到一个可以行动的判断。
        </h2>
        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map(([n, t, d]) => (
            <div key={n} className="relative border-t border-border pt-5">
              <div className="absolute -top-[7px] left-0 h-3.5 w-3.5 rounded-full border border-border bg-background" />
              <span className="text-xs font-semibold text-violet-soft">{n}</span>
              <h3 className="mt-2.5 text-[15px] font-semibold">{t}</h3>
              <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 Capability system */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eye2>产品能力</Eye2>
            <h2 className="mt-4 text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-tight">一套完整的创业决策工作台</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">从市场研究到最终决策，所有信息围绕同一个创业项目持续积累。</p>
        </div>
        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          {primaryCaps.map(([Icon, t, d]) => (
            <GlassPanel key={t} className="p-7">
              <Icon className="h-5 w-5 text-violet-soft" />
              <h3 className="mt-8 text-2xl font-semibold">{t}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{d}</p>
            </GlassPanel>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supportCaps.map(([Icon, t, d]) => (
            <GlassCard key={t} className="p-5">
              <Icon className="h-4 w-4 text-violet-soft" />
              <h3 className="mt-5 text-[15px] font-semibold">{t}</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{d}</p>
            </GlassCard>
          ))}
        </div>
        <GlassPanel className="mt-3 p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <Wallet className="h-5 w-5 text-violet-soft" />
              <h3 className="mt-6 text-2xl font-semibold">财务</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">关键财务结果来自明确输入和确定性计算，不由模型猜测。</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {financeMetrics.map((m) => (
                <div key={m} className="rounded-xl border border-border px-3 py-3">
                  <div className="text-[11px] text-muted-foreground">{m}</div>
                  <div className="mt-1.5 text-[12px] font-semibold">尚未验证</div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </Section>

      {/* 08 Industry + Customer */}
      <Section className="border-y border-glass-edge bg-glass/30">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Eye2>行业与市场</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">先确定边界，再讨论机会。</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">灵蕴帮助用户明确行业边界、主要细分、市场趋势、政策与监管、关键驱动因素与关键约束。</p>
            <GlassPanel className="mt-7 p-5">
              {[["行业边界", "已定义"], ["主要细分", "3 个方向待确认"], ["市场趋势", "市场信号"], ["政策与监管", "尚未验证"], ["关键约束", "已识别"]].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-3 last:border-0">
                  <span className="truncate text-[13px]">{k}</span>
                  <span className="shrink-0 text-[12px] text-muted-foreground">{v}</span>
                </div>
              ))}
            </GlassPanel>
          </div>
          <div>
            <Eye2>客户</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">
              “有人需要”不够，<br />重要的是谁需要、谁付钱、谁决定。
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">灵蕴区分实际用户、购买者与决策者，并整理核心任务、痛点、替代方案、购买意图与付费意愿。</p>
            <GlassPanel className="mt-7 p-5">
              <div className="grid gap-2 sm:grid-cols-3">
                {[["实际用户", "已识别"], ["购买者", "待确认"], ["决策者", "尚未验证"]].map(([k, v]) => (
                  <GlassCard key={k} className="p-3.5">
                    <div className="text-[10px] text-muted-foreground">{k}</div>
                    <div className="mt-2 text-[12px] font-semibold">{v}</div>
                  </GlassCard>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-[11px] font-semibold text-muted-foreground">痛点聚类与需求信号</div>
                <ul className="mt-3 space-y-2 text-[13px] leading-5 text-muted-foreground">
                  <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><span>研究流程分散在多个工具</span><span className="shrink-0 text-[11px]">市场信号</span></li>
                  <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><span>结论难以回溯到来源</span><span className="shrink-0 text-[11px]">已验证事实</span></li>
                  <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><span>愿意为自动化研究付费</span><span className="shrink-0 text-[11px]">尚未验证</span></li>
                </ul>
              </div>
            </GlassPanel>
          </div>
        </div>
      </Section>

      {/* 09 Competitor + Pricing */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div>
            <Eye2>竞品与定价</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">竞争，不只是列出几家公司。</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">灵蕴同时识别直接竞品、间接竞品、替代方案和客户当前正在使用的方法。价格未公开时保留价格状态，不会写成 0。</p>
          </div>
          <GlassPanel className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead className="text-[11px] text-muted-foreground">
                  <tr className="border-b border-border">{["竞品", "类型", "定位", "目标客户", "价格状态", "最近核验"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {competitorRows.map((r) => (
                    <tr key={r[0]} className="border-b border-border last:border-0">
                      {r.map((c, i) => <td key={i} className={`px-4 py-3.5 ${i === 0 ? "font-medium" : "text-muted-foreground"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </div>
      </Section>

      {/* 10 Evidence */}
      <Section className="border-y border-glass-edge bg-glass/30">
        <div className="grid gap-10 lg:grid-cols-[38fr_62fr] lg:gap-12">
          <div>
            <Eye2>证据体系</Eye2>
            <h2 className="mt-4 text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-[1.2]">
              重要的不是 AI 怎么说，<br />而是证据支持什么。
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              当公开信息不足时，灵蕴会保留未知状态，而不是为了让报告完整而自动补出数字。
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              每一条结论都记录证据类型、来源、地区、周期与最近核验时间，冲突证据会被单独标记而不是被平均掉。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["已验证事实", "市场信号", "估算", "推断", "尚未验证", "证据冲突"].map((x) => (
                <span key={x} className="rounded-full border border-border px-3 py-1.5 text-[12px]">{x}</span>
              ))}
            </div>
          </div>
          <GlassPanel className="overflow-hidden p-0">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-4 py-3.5">
              <span className="truncate text-[13px] font-semibold">证据台账</span>
              <StatusBadge tone="warn">设计预览</StatusBadge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-[13px]">
                <thead className="text-[11px] text-muted-foreground">
                  <tr className="border-b border-border">{["结论", "证据类型", "来源", "地区", "周期", "最近核验"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {evidenceRows.map((r) => (
                    <tr key={r[0]} className="border-b border-border last:border-0">
                      {r.map((c, i) => <td key={i} className={`px-4 py-3.5 ${i === 0 ? "font-medium" : "text-muted-foreground"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </div>
      </Section>

      {/* 11 Financial */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-12">
          <GlassPanel className="p-6 sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <span className="truncate text-[13px] font-semibold">财务工作区</span>
              <StatusBadge tone="warn">设计预览</StatusBadge>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {financeMetrics.map((m) => (
                <GlassCard key={m} className="p-3.5">
                  <div className="text-[10px] text-muted-foreground">{m}</div>
                  <div className="mt-2 text-[12px] font-semibold">尚未验证</div>
                </GlassCard>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <div className="text-[11px] font-semibold text-muted-foreground">关键假设</div>
              <div className="mt-3 divide-y divide-border">
                {assumptions.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5">
                    <span className="truncate text-[13px]">{k}</span>
                    <span className="shrink-0 text-[12px] text-muted-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
          <div>
            <Eye2>财务</Eye2>
            <h2 className="mt-4 text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-tight">财务不是让 AI 猜。</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              关键财务结果来自明确输入和确定性计算，每个关键假设都能追溯到来源、用户输入或明确标记的估算。
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              缺少输入时，结果保持“尚未验证”，不会以 0 或虚构数字代替。
            </p>
          </div>
        </div>
      </Section>

      {/* 12 Decision + 13 Flip */}
      <Section className="border-y border-glass-edge bg-glass/30">
        <Eye2>决策系统</Eye2>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-[1.2]">
          最后不是生成一份报告，<br />而是形成一个可以解释的判断。
        </h2>
        <GlassPanel className="mt-10 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="text-[11px] text-muted-foreground">当前建议</div>
              <div className="mt-2 text-3xl font-semibold">有条件推进</div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">核心判断：问题真实存在，但购买路径尚未被验证。</p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div><div className="text-[10px] text-muted-foreground">证据置信度</div><div className="mt-1.5 text-[13px] font-semibold">部分确认</div></div>
                <div><div className="text-[10px] text-muted-foreground">决策置信度</div><div className="mt-1.5 text-[13px] font-semibold">中等</div></div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[["支持推进", ["问题信号明确", "替代方案存在断点"]], ["不利因素", ["采购周期可能偏长", "转换成本较高"]], ["关键未知", ["真实付费意愿", "获客成本", "初始客户规模"]]].map(([t, items]) => (
                <GlassCard key={t as string} className="p-4">
                  <div className="text-[11px] font-semibold">{t as string}</div>
                  <ul className="mt-2.5 space-y-1.5 text-[12px] leading-5 text-muted-foreground">
                    {(items as string[]).map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>
          <div className="mt-7 border-t border-border pt-6">
            <h3 className="text-[15px] font-semibold">什么会改变结论？</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <GlassCard className="p-5">
                <StatusBadge tone="good">可能升级为</StatusBadge>
                <div className="mt-4 text-lg font-semibold">建议推进</div>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">若目标客户的付费意愿获得真实验证，且获客路径可重复。</p>
              </GlassCard>
              <GlassCard className="p-5">
                <StatusBadge tone="bad">可能转向</StatusBadge>
                <div className="mt-4 text-lg font-semibold">当前不建议推进</div>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">若获客成本显著高于可承受范围，或决策者始终无法触达。</p>
              </GlassCard>
            </div>
          </div>
        </GlassPanel>
      </Section>

      {/* 14 Validation priorities */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <Eye2>下一步验证</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">
              得到判断之后，<br />下一步最值得验证什么？
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">灵蕴不会停在报告，而是把最重要的不确定性转换成一份可以执行的验证清单。</p>
          </div>
          <div>
            {[["01", "验证目标客户需求", "确认问题在真实工作流中的出现频率"], ["02", "验证付费意愿", "确认目标客户是否愿意为结果付费"], ["03", "确认真实获客方式", "找出可重复、可衡量的获客路径"], ["04", "确认关键政策与监管条件", "核实是否存在限制经营的规定"]].map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 border-b border-border py-5 last:border-0">
                <span className="text-sm font-semibold text-violet-soft">{n}</span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold">{t}</h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 15 Freshness */}
      <Section className="border-y border-glass-edge bg-glass/30">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <div>
            <Eye2>数据新鲜度</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">
              数据不仅需要来源，<br />还要知道什么时候被核验过。
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              官方数据的发布时间，和灵蕴最后一次确认该来源仍为最新版本，是两个不同概念。
            </p>
          </div>
          <GlassPanel className="p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {[["官方最新发布", "2025"], ["最近核验", "今天"], ["数据状态", "当前有效"]].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px] text-muted-foreground">{k}</div>
                  <div className="mt-2 text-xl font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </Section>

      {/* 16 Final report */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div>
            <Eye2>最终报告</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">最终交付不是一段聊天记录。</h2>
            <p className="mt-4 text-base leading-7">而是一份可以继续使用的创业决策报告。</p>
            <p className="mt-4 text-[13px] text-muted-foreground">支持 PDF、HTML、Markdown、JSON。</p>
          </div>
          <GlassPanel className="p-6 sm:p-7">
            <div className="grid gap-2 sm:grid-cols-2">
              {reportSections.map((x, i) => (
                <div key={x} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border px-3.5 py-2.5">
                  <span className="text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="truncate text-[13px]">{x}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </Section>

      {/* 17 Who it is for */}
      <Section className="border-y border-glass-edge bg-glass/30">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <Eye2>适用人群</Eye2>
            <h2 className="mt-4 text-[clamp(1.6rem,2.2vw,2.25rem)] font-semibold leading-tight">适合正在做真实选择的人。</h2>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {audiences.map((x) => (
              <div key={x} className="border-b border-border py-4 text-[15px]">{x}</div>
            ))}
          </div>
        </div>
      </Section>

      {/* 18 Philosophy */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-[1.25]">
            灵蕴不替你决定，<br />但会让你知道自己依据什么做决定。
          </h2>
          <div className="mt-7 space-y-5 text-[15px] leading-8 text-muted-foreground">
            <p>创业中的很多问题没有立即确定的答案。真正危险的，不是暂时不知道，而是把未经验证的推测当成事实。</p>
            <p>灵蕴把证据、假设、风险和关键未知放进同一个决策工作区，帮助创业者判断下一步应该继续投入，还是先验证一个真正重要的问题。</p>
          </div>
        </div>
      </Section>

      {/* 19 Final CTA */}
      <section className="px-5 pb-[88px]">
        <GlassPanel className="mx-auto max-w-[1280px] p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-[clamp(1.75rem,2.5vw,2.6rem)] font-semibold leading-tight">
                有一个创业想法？<br />先查证，再决定下一步。
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">从行业、客户和竞品开始，逐步形成一份可追溯的项目判断。</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild><Link to="/register">开始分析 <ArrowRight /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/login">登录</Link></Button>
            </div>
          </div>
        </GlassPanel>
      </section>

      <Footer />
    </main>
  );
}

export function ContentPage({ type }: { type: string }) {
  const content: Record<string, [string, string, string[]]> = {
    product: ["产品", "把散落的研究，组织成一个可以持续更新的决策系统。", ["行业与客户研究", "竞品与定价证据", "财务与风险建模", "决策与最终报告"]],
    method: ["工作方式", "从提出问题到形成决策，每一步都保留证据边界。", ["定义", "查证", "分类", "建模", "判断", "更新"]],
    data: ["真实数据", "数据必须能说明来源、地域、期间与最近核验时间。", ["来源可追溯", "时效可识别", "地域不混用", "未知不写成零"]],
    "evidence-system": ["证据体系", "不同的确定程度，不应被包装成同一种答案。", ["已验证事实", "市场信号", "估算", "推断", "尚未验证", "证据冲突"]],
    "decision-system": ["决策系统", "当前建议不是终点，而是当前证据下最诚实的判断。", ["支持推进", "不利因素", "关键未知", "升级条件", "降级条件"]],
    "pricing-plan": ["方案", "商业方案将在真实服务准备完成后公布。", ["不展示虚构价格", "不制造虚假稀缺", "按真实能力开放"]],
    about: ["关于 Lumbyte", "我们相信好的创业判断，始于对证据边界的尊重。", ["真实优先", "可解释优先", "行动优先"]],
    terms: ["用户协议", "本页面为前端设计预览，正式条款将在生产版本提供。", ["服务范围", "账户责任", "知识产权"]],
    privacy: ["隐私政策", "本设计预览不收集或存储账户与项目数据。", ["数据处理", "信息安全", "用户权利"]],
    "ai-data": ["AI 与数据声明", "AI 参与整理与推理，但不会把推断冒充成事实。", ["来源透明", "分类明确", "人工可复核", "结论可更新"]],
  };
  const fallback = content["product"];
  if (!fallback) return null;
  const [title, desc, items] = content[type] ?? fallback;
  return (
    <main>
      <SiteHeader />
      <section className="px-5 pb-[88px] pt-36">
        <div className="mx-auto max-w-[1280px]">
          <Eye2>Lumbyte OS</Eye2>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-tight">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{desc}</p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((x, i) => (
              <GlassCard key={x} className="p-5">
                <span className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-8 text-lg font-semibold">{x}</h2>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Footer() {
  const cols = [
    ["产品", [["产品能力", "/product"], ["工作方式", "/method"], ["真实数据", "/data"], ["证据体系", "/evidence-system"], ["决策系统", "/decision-system"]]],
    ["公司", [["关于", "/about"]]],
    ["法律", [["用户协议", "/terms"], ["隐私政策", "/privacy"], ["AI 与数据声明", "/ai-data"]]],
    ["账户", [["登录", "/login"], ["开始分析", "/register"]]],
  ] as const;
  return (
    <footer className="border-t border-glass-edge px-5 py-14">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.2fr_2.4fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-[13px] leading-6 text-muted-foreground">创业决策智能系统：先查证，再判断。</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-4">
          {cols.map(([title, links]) => (
            <div key={title}>
              <div className="text-[13px] font-semibold">{title}</div>
              <ul className="mt-3.5 space-y-2.5">
                {links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-[13px] text-muted-foreground hover:text-foreground">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] border-t border-border pt-6 text-[11px] text-muted-foreground">
        Lumbyte OS · 灵蕴
      </div>
    </footer>
  );
}
