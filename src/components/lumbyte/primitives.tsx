import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("glass-panel rounded-[28px]", className)}>{children}</section>;
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return <article className={cn("glass-card rounded-[20px] p-5", className)}>{children}</article>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-semibold text-muted-foreground">{children}</div>;
}

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" }) {
  const tones = { neutral: "bg-secondary text-secondary-foreground", good: "bg-success/10 text-success", warn: "bg-warning/12 text-warning", bad: "bg-danger-soft/10 text-danger-soft" };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold", tones[tone])}>{children}</span>;
}

export function DataValue({ value, suffix }: { value: string | number | null; suffix?: string }) {
  if (value === null || value === "") return <span className="text-base font-medium text-muted-foreground">尚未验证</span>;
  return <span>{value}{suffix}</span>;
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><Eyebrow>{eyebrow}</Eyebrow><h1 className="truncate text-3xl font-semibold sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>{action && <div className="shrink-0">{action}</div>}</header>;
}