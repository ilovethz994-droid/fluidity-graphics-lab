import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/lumbyte/marketing";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Lumbyte OS｜一个创业想法，先查证，再判断" },
    { name: "description", content: "Lumbyte OS 用真实证据、明确未知与可解释模型支持创业决策。" },
    { property: "og:title", content: "Lumbyte OS｜先查证，再判断" },
    { property: "og:description", content: "用真实证据与可解释模型支持更可靠的创业决策。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});
