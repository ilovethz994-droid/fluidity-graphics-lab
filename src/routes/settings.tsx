import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/lumbyte/project-pages";
export const Route = createFileRoute("/settings")({ head:()=>({meta:[{title:"项目设置｜Lumbyte OS"},{name:"description",content:"管理 Lumbyte 项目设置。"},{property:"og:title",content:"项目设置｜Lumbyte OS"},{property:"og:description",content:"管理项目基础信息。"}]}), component:SettingsPage });