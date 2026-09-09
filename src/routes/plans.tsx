import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/lumbyte/marketing";

export const Route = createFileRoute("/plans")({
  head: () => ({ meta: [
    { title: "方案｜Lumbyte OS" },
    { name: "description", content: "Lumbyte OS 的服务方案与适用范围说明。" },
    { property: "og:title", content: "方案｜Lumbyte OS" },
    { property: "og:description", content: "查看 Lumbyte OS 的服务方案与适用范围。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentPage type="pricing-plan" />,
});
