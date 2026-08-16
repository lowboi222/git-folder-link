import { useState } from "react";
import { ChevronDown, PlusCircle } from "lucide-react";

type Mode = "market" | "limit" | "ladder";

export function OrderForm() {
  const [mode, setMode] = useState<Mode>("limit");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [tpsl, setTpsl] = useState(false);
  const [levels, setLevels] = useState("10");

  const tab = (m: Mode, label: string) =>
    m === mode ? (
      <button
        key={m}
        onClick={() => setMode(m)}
        className="border-b-2 border-gold-strong py-[11px] font-semibold"
      >
        {label}
      </button>
    ) : (
      <button key={m} onClick={() => setMode(m)} className="py-[11px] text-muted-foreground">
        {label}
      </button>
    );

  return (
    <section className="no-scrollbar flex h-full w-[280px] shrink-0 flex-col overflow-y-auto bg-background">
      <div className="grid grid-cols-3 border-b border-border text-[15.5px]">
        {tab("market", "Market")}
        {tab("limit", "Limit")}
        {tab("ladder", "Ladder")}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 text-[14px]">
        <span className="text-muted-foreground">Avbl</span>
        <span className="tabular-nums tracking-tight">0.00 USDT</span>
        <PlusCircle className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-2 gap-2 px-4">
        <button
          onClick={() => setSide("buy")}
          className={`rounded-xl border py-2 text-[14.5px] font-semibold transition-colors ${
            side === "buy"
              ? "border-up bg-up/15 text-up"
              : "border-border bg-panel text-muted-foreground"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`rounded-xl border py-2 text-[14.5px] font-semibold transition-colors ${
            side === "sell"
              ? "border-down bg-down/15 text-down"
              : "border-border bg-panel text-muted-foreground"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="mt-2.5 px-4">
        {mode === "limit" && (
          <div className="flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
            <input
              defaultValue="61789.0"
              className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[15px] outline-none"
            />
            <span className="px-2.5 text-[13px] text-muted-foreground">USDT</span>
            <span className="h-5 w-px bg-border" />
            <span className="pl-2.5 text-[13px] font-medium">BBO</span>
          </div>
        )}

        {mode === "ladder" && (
          <div className="space-y-2">
            <div className="flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
              <input
                placeholder="Price Start"
                className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[14px] outline-none placeholder:text-muted-foreground"
              />
              <span className="pl-2.5 text-[13px] text-muted-foreground">USDT</span>
            </div>
            <div className="flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
              <input
                placeholder="Price End"
                className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[14px] outline-none placeholder:text-muted-foreground"
              />
              <span className="pl-2.5 text-[13px] text-muted-foreground">USDT</span>
            </div>
            <div className="flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
              <input
                type="number"
                min={1}
                max={50}
                value={levels}
                onChange={(e) => setLevels(e.target.value)}
                placeholder="Levels"
                className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[14px] outline-none placeholder:text-muted-foreground"
              />
              <span className="pl-2.5 text-[13px] text-muted-foreground">Levels 1-50</span>
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
          <input
            placeholder="Size"
            className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[14px] outline-none placeholder:text-muted-foreground"
          />
          <button className="flex items-center gap-1 text-[13px] text-muted-foreground">
            USDT <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative mt-5 mb-3 h-1 rounded-full bg-panel-2">
          <div className="absolute -top-[5px] left-0 h-[14px] w-[14px] rounded-full border-2 border-gold-strong bg-background" />
          {[25, 50, 75, 100].map((p) => (
            <span
              key={p}
              className="absolute -top-[2px] h-[6px] w-[6px] -translate-x-1/2 rotate-45 bg-panel-2"
              style={{ left: `${p}%` }}
            />
          ))}
        </div>

        <div className="space-y-3 py-1 text-[14px]">
          <button onClick={() => setTpsl((v) => !v)} className="flex items-center gap-2">
            <span
              className={`h-4 w-4 rounded-sm border ${
                tpsl ? "border-gold-strong bg-gold" : "border-border bg-panel"
              }`}
            />
            <span className="underline decoration-dotted underline-offset-4">TP/SL</span>
          </button>

          {tpsl && (
            <div className="space-y-2">
              <div className="flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
                <input
                  placeholder="TP Price Trigger"
                  className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[14px] outline-none placeholder:text-muted-foreground"
                />
                <span className="pl-2.5 text-[13px] text-muted-foreground">USDT</span>
              </div>
              <div className="flex items-center rounded-xl border border-border bg-panel px-3 py-2.5">
                <input
                  placeholder="SL Price Trigger"
                  className="min-w-0 flex-1 bg-transparent tabular-nums tracking-tight text-[14px] outline-none placeholder:text-muted-foreground"
                />
                <span className="pl-2.5 text-[13px] text-muted-foreground">USDT</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-sm border border-border bg-panel" />
              <span className="underline decoration-dotted underline-offset-4">Post Only</span>
            </label>
            <button className="flex items-center gap-1 text-muted-foreground">
              GTC <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <button className="mt-3 w-full rounded-2xl bg-gold [background-image:var(--gradient-gold)] py-3 text-[15px] font-semibold text-primary-foreground shadow-[var(--shadow-panel)]">
          Connect Wallet
        </button>

        <div className="mt-5 rounded-2xl border border-border bg-panel px-3 py-2.5">
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-muted-foreground">Order Value</span>
            <span className="tabular-nums tracking-tight font-medium">0.00 USDT</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Est. Fee</span>
            <span className="tabular-nums tracking-tight text-muted-foreground">0.00 USDT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
