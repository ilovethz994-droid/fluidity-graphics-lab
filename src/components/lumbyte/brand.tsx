import logoAsset from "@/assets/lumbyte-logo.png.asset.json";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img src={logoAsset.url} alt="Lumbyte 官方标志" className="h-9 w-9 shrink-0 object-contain" />
      {!compact && <div className="min-w-0"><div className="truncate text-[15px] font-bold">Lumbyte OS</div><div className="text-[11px] text-muted-foreground">灵蕴</div></div>}
    </div>
  );
}