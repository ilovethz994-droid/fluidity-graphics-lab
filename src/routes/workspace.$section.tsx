import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PreviewNotice } from "@/components/lumbyte/app-shell";
import { DecisionView, EvidenceView, FinancialView, ReportView, WorkbenchView } from "@/components/lumbyte/product-pages";
import { BusinessModelView, CompetitorView, CustomerView, IndustryView, PricingView, RiskView } from "@/components/lumbyte/module-pages";

const titles: Record<string, string> = {
  workbench: "工作台", industry: "行业", customer: "客户", competitor: "竞品", pricing: "定价",
  "business-model": "商业模式", financial: "财务", risk: "风险", evidence: "证据", decision: "决策", report: "最终报告",
};

export const Route = createFileRoute("/workspace/$section")({
  head: ({ params }) => {
    const title = `${titles[params.section] ?? "工作区"}｜Lumbyte OS`;
    return { meta: [
      { title },
      { name: "description", content: "Lumbyte OS 决策工作区设计预览：证据、财务、风险与决策模块。" },
      { property: "og:title", content: title },
      { property: "og:description", content: "证据驱动的创业决策工作区设计预览。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: Workspace,
});

function Workspace() {
  const { section } = Route.useParams();
  const views: Record<string, React.ReactNode> = {
    workbench: <WorkbenchView />,
    industry: <IndustryView />,
    customer: <CustomerView />,
    competitor: <CompetitorView />,
    pricing: <PricingView />,
    "business-model": <BusinessModelView />,
    financial: <FinancialView />,
    risk: <RiskView />,
    evidence: <EvidenceView />,
    decision: <DecisionView />,
    report: <ReportView />,
  };
  return <AppShell><PreviewNotice />{views[section] ?? <WorkbenchView />}</AppShell>;
}
