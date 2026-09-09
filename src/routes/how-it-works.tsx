import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/lumbyte/marketing";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title: "工作方式｜Lumbyte OS" },
    { name: "description", content: "从创业想法到决策：Lumbyte 六个阶段的证据工作流。" },
    { property: "og:title", content: "工作方式｜Lumbyte OS" },
    { property: "og:description", content: "输入想法、拆解问题、寻找证据、分析市场、建模财务与风险、形成决策。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentPage type="method" />,
});
