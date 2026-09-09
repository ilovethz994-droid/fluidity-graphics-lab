import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LoaderCircle, ScanSearch, ShieldCheck, Workflow } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, GlassPanel, StatusBadge } from "./primitives";

const valuePoints = [
  { n: "01", icon: ScanSearch, title: "真实数据", body: "从公开可信来源建立项目研究基础" },
  { n: "02", icon: ShieldCheck, title: "证据可追溯", body: "重要判断可以回到对应来源" },
  { n: "03", icon: Workflow, title: "决策可解释", body: "不仅告诉你结果，还告诉你什么会改变结论" },
] as const;

const chain = [
  ["真实数据", "DATA"],
  ["证据", "EVIDENCE"],
  ["分析", "ANALYSIS"],
  ["模型", "MODEL"],
  ["决策", "DECISION"],
] as const;

function MethodPanel() {
  return (
    <GlassPanel className="mt-10 p-6 xl:p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold">从证据到决策</h2>
        <span className="text-[11px] text-muted-foreground">方法说明</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {chain.map(([zh, en], i) => (
          <div key={zh} className="glass-card rounded-2xl px-3 py-3">
            <div className="text-[13px] font-semibold">{zh}</div>
            <div className="mt-1 text-[10px] tracking-widest text-muted-foreground">{en}</div>
            {i < chain.length - 1 && <div className="mt-2 h-px w-full bg-border" />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        {["行业", "客户", "竞品", "财务", "风险"].map((x) => (
          <span key={x} className="rounded-full border border-border px-2.5 py-1">{x}</span>
        ))}
        <ArrowRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground">最终判断</span>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {[["当前建议", "有条件推进"], ["关键未知", "尚待验证"], ["证据状态", "部分确认"]].map(([k, v]) => (
          <GlassCard key={k} className="p-3.5">
            <div className="text-[10px] text-muted-foreground">{k}</div>
            <div className="mt-2 text-[13px] font-semibold">{v}</div>
          </GlassCard>
        ))}
      </div>
    </GlassPanel>
  );
}

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = mode === "login";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setError("设计预览未连接 Neon Auth，请在官方仓库接入现有认证流程。");
    }, 700);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-6 lg:px-10 lg:py-8">
      <Link to="/" className="inline-flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] text-ink-soft hover:bg-glass">
        <ArrowLeft className="h-4 w-4" />返回官网
      </Link>

      <div className="mx-auto mt-4 grid w-full max-w-[1360px] items-center gap-10 lg:mt-2 lg:min-h-[calc(100vh-96px)] lg:grid-cols-[48fr_52fr] xl:grid-cols-[57fr_43fr] xl:gap-14">
        {/* LEFT — product story (hidden on mobile) */}
        <section className="hidden lg:block">
          <Brand />
          <p className="mt-6 text-xs font-semibold tracking-wide text-muted-foreground">创业决策智能系统</p>
          <h1 className="mt-3 max-w-[16ch] text-[clamp(2.25rem,3vw,3.25rem)] font-semibold leading-[1.16]">
            从一个创业想法开始，<br />建立可追溯的决策链路。
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            灵蕴将行业、客户、竞品、定价、财务、风险与真实证据放进同一套决策工作流，帮助创业者看清已经知道的、仍然未知的，以及下一步最值得验证的事情。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {valuePoints.map(({ n, icon: Icon, title, body }) => (
              <div key={n} className="min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-violet-soft" />
                  <span className="text-[11px] text-muted-foreground">{n}</span>
                </div>
                <div className="mt-2 text-sm font-semibold">{title}</div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="hidden xl:block"><MethodPanel /></div>

          <p className="mt-8 max-w-xl text-xs leading-6 text-muted-foreground">
            灵蕴把事实、假设和未知分开呈现，让每一次判断都有清晰依据。
          </p>
        </section>

        {/* RIGHT — auth panel */}
        <div className="flex justify-center lg:justify-end">
          <GlassPanel className="w-full max-w-[480px] rounded-[30px] p-7 sm:p-9 lg:p-10">
            <Brand />
            <div className="mt-8">
              <StatusBadge>{login ? "登录" : "注册"}</StatusBadge>
              <h2 className="mt-4 text-[28px] font-semibold leading-tight">{login ? "欢迎回来" : "创建 Lumbyte 账号"}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{login ? "继续你的创业决策项目。" : "从一个创业想法开始。"}</p>
            </div>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium">邮箱</span>
                <Input required type="email" placeholder="name@company.com" className="h-[54px] rounded-2xl border-glass-edge bg-glass-strong px-4" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium">密码</span>
                <div className="relative">
                  <Input required minLength={8} type={showPassword ? "text" : "password"} placeholder="至少 8 位" className="h-[54px] rounded-2xl border-glass-edge bg-glass-strong px-4 pr-12" />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-[7px] h-10 w-10" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "隐藏密码" : "显示密码"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </label>
              {error && <div role="alert" className="rounded-xl bg-danger-soft/8 px-4 py-3 text-[13px] leading-5 text-danger-soft">{error}</div>}
              <Button className="h-[54px] w-full rounded-2xl text-[15px]" disabled={loading}>
                {loading ? <LoaderCircle className="animate-spin" /> : null}
                {loading ? "请稍候…" : login ? "登录" : "创建账号"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {login ? "还没有账号？" : "已有账号？"}{" "}
              <Link to={login ? "/register" : "/login"} className="font-semibold text-foreground underline-offset-4 hover:underline">
                {login ? "创建账号" : "登录"}
              </Link>
            </p>
            <p className="mt-7 border-t border-border pt-5 text-center text-[11px] leading-5 text-muted-foreground">
              当前为设计预览，不会创建账户或模拟登录成功。
            </p>
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
