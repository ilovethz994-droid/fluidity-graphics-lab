import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel } from "./primitives";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setLoading(true);
    window.setTimeout(() => { setLoading(false); setError("设计预览未连接 Neon Auth，请在官方仓库接入现有认证流程。"); }, 700);
  };
  const login = mode === "login";
  return <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
    <Link to="/" className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-glass"><ArrowLeft className="h-4 w-4"/>返回官网</Link>
    <GlassPanel className="relative w-full max-w-[480px] p-7 sm:p-11">
      <Brand /><div className="mt-10"><p className="text-sm text-muted-foreground">让每一个创业决策，都有据可依。</p><h1 className="mt-3 text-3xl font-semibold">{login ? "欢迎回来" : "创建 Lumbyte 账号"}</h1></div>
      <form onSubmit={submit} className="mt-9 space-y-5">
        <label className="block"><span className="mb-2 block text-sm font-medium">邮箱</span><Input required type="email" placeholder="name@company.com" className="h-14 rounded-2xl border-glass-edge bg-glass-strong px-4" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">密码</span><div className="relative"><Input required minLength={8} type={showPassword?"text":"password"} placeholder="至少 8 位" className="h-14 rounded-2xl border-glass-edge bg-glass-strong px-4 pr-12"/><Button type="button" variant="ghost" size="icon" className="absolute right-2 top-2" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?"隐藏密码":"显示密码"}>{showPassword?<EyeOff/>:<Eye/>}</Button></div></label>
        {error&&<div role="alert" className="rounded-xl bg-danger-soft/8 px-4 py-3 text-sm text-danger-soft">{error}</div>}
        <Button className="h-14 w-full rounded-2xl" disabled={loading}>{loading?<LoaderCircle className="animate-spin"/>:null}{loading?"请稍候…":login?"登录":"创建账号"}</Button>
      </form>
      <p className="mt-7 text-center text-sm text-muted-foreground">{login?"还没有账号？":"已有账号？"} <Link to={login?"/register":"/login"} className="font-semibold text-foreground">{login?"创建账号":"登录"}</Link></p>
      <p className="mt-8 border-t border-border pt-5 text-center text-[11px] leading-5 text-muted-foreground">当前为设计预览，不会创建账户或模拟登录成功。</p>
    </GlassPanel>
  </main>;
}