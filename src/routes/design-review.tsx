import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/lumbyte/brand";
import { GlassPanel, StatusBadge } from "@/components/lumbyte/primitives";

export const Route = createFileRoute("/design-review")({
  head: () => ({ meta: [
    { title: "设计评审索引｜Lumbyte OS" },
    { name: "description", content: "Lumbyte OS 设计实现的内部评审索引，用于逐屏检查视觉稿。" },
    { name: "robots", content: "noindex" },
    { property: "og:title", content: "设计评审索引｜Lumbyte OS" },
    { property: "og:description", content: "内部设计评审索引，不属于生产客户体验。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DesignReview,
});

type Item = { label: string; path: string; section?: string; done?: boolean };

const publicPages: Item[] = [
  { label: "Homepage 首页", path: "/" },
  { label: "Product 产品能力", path: "/product" },
  { label: "How It Works 工作方式", path: "/how-it-works" },
  { label: "Real Data 真实数据", path: "/data" },
  { label: "Evidence System 证据体系", path: "/evidence-system" },
  { label: "Decision System 决策系统", path: "/decision-system" },
  { label: "Plans 方案", path: "/plans" },
  { label: "About 关于", path: "/about" },
  { label: "Terms 用户协议", path: "/terms" },
  { label: "Privacy 隐私政策", path: "/privacy" },
  { label: "AI & Data 声明", path: "/ai-data" },
];

const authPages: Item[] = [
  { label: "Login 登录", path: "/login" },
  { label: "Register 注册", path: "/register" },
];

const productPages: Item[] = [
  { label: "Projects 项目列表", path: "/projects" },
  { label: "Create Project 创建项目", path: "/projects/new" },
  { label: "Workbench 工作台", path: "/workspace/$section", section: "workbench" },
  { label: "Industry 行业", path: "/workspace/$section", section: "industry" },
  { label: "Customer 客户", path: "/workspace/$section", section: "customer" },
  { label: "Competitor 竞品", path: "/workspace/$section", section: "competitor" },
  { label: "Pricing 定价", path: "/workspace/$section", section: "pricing" },
  { label: "Business Model 商业模式", path: "/workspace/$section", section: "business-model" },
  { label: "Financial 财务", path: "/workspace/$section", section: "financial" },
  { label: "Risk 风险", path: "/workspace/$section", section: "risk" },
  { label: "Evidence 证据", path: "/workspace/$section", section: "evidence" },
  { label: "Decision 决策", path: "/workspace/$section", section: "decision" },
  { label: "Final Report 最终报告", path: "/workspace/$section", section: "report" },
  { label: "Project Settings 项目设置", path: "/settings" },
];

function Card({ item }: { item: Item }) {
  const content = (
    <>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{item.label}</div>
        <div className="mt-1 truncate text-[11px] text-muted-foreground">{item.section ? item.path.replace("$section", item.section) : item.path}</div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <StatusBadge tone="good">完成</StatusBadge>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </>
  );
  const cls = "glass-card flex items-center justify-between gap-4 rounded-[20px] p-5 transition-colors hover:bg-glass-strong";
  if (item.section) {
    return <Link to="/workspace/$section" params={{ section: item.section }} className={cls}>{content}</Link>;
  }
  return <Link to={item.path as "/"} className={cls}>{content}</Link>;
}

function Group({ title, count, items }: { title: string; count: string; items: Item[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <span className="text-sm font-semibold text-muted-foreground">{count}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <Card key={item.label} item={item} />)}</div>
    </section>
  );
}

function DesignReview() {
  const total = publicPages.length + authPages.length + productPages.length;
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 lg:py-16">
      <GlassPanel className="p-7 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4"><Brand /><StatusBadge>内部设计评审</StatusBadge></div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">TOTAL SCREENS COMPLETED</div>
            <div className="text-3xl font-semibold">{total}/{total}</div>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">设计评审索引</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          这个页面只用于在隔离设计工作区中逐屏检查视觉实现，不属于未来 Lumbyte 客户体验，也没有出现在产品导航里。所有数据都是可替换的预览示例，未连接任何真实服务。
        </p>
      </GlassPanel>
      <div className="mt-10 space-y-12">
        <Group title="PUBLIC WEBSITE" count={`${publicPages.length}/${publicPages.length}`} items={publicPages} />
        <Group title="AUTH" count={`${authPages.length}/${authPages.length}`} items={authPages} />
        <Group title="PRODUCT" count={`${productPages.length}/${productPages.length}`} items={productPages} />
      </div>
    </main>
  );
}
