import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/lumbyte/project-pages";
export const Route = createFileRoute("/projects/")({ head:()=>({meta:[{title:"项目列表｜Lumbyte OS"},{name:"description",content:"管理 Lumbyte 项目。"},{property:"og:title",content:"项目列表｜Lumbyte OS"},{property:"og:description",content:"管理你的创业决策项目。"}]}), component:ProjectsPage });