import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Brand } from "./brand";
import { EvidenceConstellation } from "./evidence-constellation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel } from "./primitives";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = mode === "login";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    // No credential flow is wired in this environment: the request is not sent
    // anywhere and no session is ever created.
    window.setTimeout(() => {
      setLoading(false);
      setError("暂时无法完成登录，请稍后再试。");
    }, 700);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* one shared visual environment across the whole screen */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,oklch(0.93_0.04_232/60%),transparent_46%),radial-gradient(circle_at_78%_78%,oklch(0.94_0.035_305/50%),transparent_44%)]" />
      </div>

      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] text-ink-soft hover:bg-glass lg:hidden"
      >
        <ArrowLeft className="h-4 w-4" />返回官网
      </Link>

      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 items-stretch lg:grid-cols-[48fr_52fr] xl:grid-cols-[56fr_44fr]">
        {/* LEFT — immersive Lumbyte visual environment (desktop / tablet) */}
        <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-12">
          <EvidenceConstellation className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,black_62%,transparent_98%)]" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex"><Brand /></Link>
            <p className="mt-4 text-[11px] font-semibold tracking-wide text-muted-foreground">创业决策智能系统</p>
          </div>

          <h1 className="relative z-10 max-w-[16ch] text-[clamp(2rem,2.7vw,3rem)] font-semibold leading-[1.24]">
            让复杂的信息，<br />逐渐形成清晰的判断。
          </h1>

          <p className="relative z-10 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
            BETTER EVIDENCE. BETTER DECISIONS.
          </p>
        </section>

        {/* RIGHT — liquid glass authentication panel */}
        <div className="flex items-center justify-center px-5 py-14 sm:px-8 lg:px-10">
          <GlassPanel className="w-full max-w-[460px] rounded-[34px] p-7 sm:p-9">
            <Brand />
            <h2 className="mt-9 text-[27px] font-semibold leading-tight">
              {login ? "欢迎回来" : "创建 Lumbyte 账号"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {login ? "继续你的创业决策项目。" : "从一个创业想法开始。"}
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium">邮箱</span>
                <Input required type="email" autoComplete="email" placeholder="name@company.com" className="h-[52px] rounded-2xl border-glass-edge bg-glass-strong px-4" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium">密码</span>
                <div className="relative">
                  <Input
                    required
                    minLength={8}
                    autoComplete={login ? "current-password" : "new-password"}
                    type={showPassword ? "text" : "password"}
                    placeholder="至少 8 位"
                    className="h-[52px] rounded-2xl border-glass-edge bg-glass-strong px-4 pr-12"
                  />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-[6px] h-10 w-10" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "隐藏密码" : "显示密码"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </label>
              {error && <div role="alert" className="rounded-xl bg-danger-soft/8 px-4 py-3 text-[13px] leading-5 text-danger-soft">{error}</div>}
              <Button className="h-[52px] w-full rounded-2xl text-[15px]" disabled={loading}>
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
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
