import { useEffect, useRef } from "react";
import { Search, Star } from "lucide-react";

const tabs = ["Favorites", "Futures", "Spot", "Prediction"];
const categories = [
  "All markets", "Top", "New", "Meme", "AI", "Pre-launch",
  "Stocks", "Commodities", "ETF", "Semiconductor", "AOS-2",
];

const rows = [
  { sym: "ASTERUSDT", lev: "200x", price: "0.6008", chg: "-0.10%", up: false, fr: "0.0043%", vol: "$5,303,797", oi: "$219,042,412", color: "oklch(0.72 0.13 72)" },
  { sym: "BTCUSDT", lev: "200x", price: "63,076.6", chg: "+0.31%", up: true, fr: "0.0034%", vol: "$120,231,436", oi: "$796,323,703", color: "oklch(0.75 0.15 60)" },
  { sym: "ETHUSDT", lev: "200x", price: "1,882.39", chg: "+0.16%", up: true, fr: "0.0029%", vol: "$68,633,071", oi: "$352,924,303", color: "oklch(0.6 0.12 265)" },
  { sym: "BNBUSDT", lev: "200x", price: "610.76", chg: "+0.58%", up: true, fr: "0.0000%", vol: "$7,292,196", oi: "$10,113,806", color: "oklch(0.8 0.13 90)" },
  { sym: "SOLUSDT", lev: "100x", price: "75.48", chg: "+0.52%", up: true, fr: "-0.0033%", vol: "$14,884,137", oi: "$231,807,155", color: "oklch(0.65 0.1 200)" },
  { sym: "XRPUSDT", lev: "100x", price: "1.0033", chg: "+0.52%", up: true, fr: "0.0036%", vol: "$6,712,590", oi: "$54,227,199", color: "oklch(0.5 0.02 260)" },
];

export function MarketSelector({ onClose }: { onClose: () => void }) {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    listRef.current?.focus();
  }, []);
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed left-[10px] top-[128px] z-50 w-[calc(100vw_-_580px)] max-w-[calc(100vw_-_20px)] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_18px_50px_oklch(0.4_0.04_60/0.18)]">
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-xl bg-panel px-4 py-3">
            <Search className="h-[18px] w-[18px] text-muted-foreground" />
            <input
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-7 border-b border-border px-5 text-[15px]">
          {tabs.map((t) => (
            <button
              key={t}
              className={
                t === "Futures"
                  ? "flex items-center gap-1.5 border-b-2 border-gold-strong pb-2.5 font-semibold"
                  : "flex items-center gap-1.5 pb-2.5 text-muted-foreground"
              }
            >
              {t}
              {t === "Prediction" && <span className="h-1.5 w-1.5 rounded-full bg-down" />}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 text-[13.5px]">
          {categories.map((c) => (
            <button
              key={c}
              className={`rounded-lg px-3 py-1.5 ${
                c === "All markets" ? "bg-panel-2 font-medium" : "text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))] px-5 pb-1 text-[13px] text-muted-foreground">
          <span>Symbols</span>
          <span className="text-right">Last price</span>
          <span className="text-right">24h change</span>
          <span className="text-right">Funding Rate</span>
          <span className="text-right">Volume</span>
          <span className="text-right">Open interest</span>
        </div>

        <div
          ref={listRef}
          tabIndex={0}
          className="no-scrollbar max-h-[340px] overflow-y-auto pb-2 outline-none"
          onKeyDown={(e) => {
            const el = e.currentTarget;
            if (e.key === "ArrowDown") { e.preventDefault(); el.scrollTop += 48; }
            if (e.key === "ArrowUp") { e.preventDefault(); el.scrollTop -= 48; }
            if (e.key === "PageDown") { e.preventDefault(); el.scrollTop += el.clientHeight; }
            if (e.key === "PageUp") { e.preventDefault(); el.scrollTop -= el.clientHeight; }
          }}
        >
          {rows.map((r) => (
            <div
              key={r.sym}
              className="grid grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))] items-center px-5 py-2.5 tabular-nums tracking-tight text-[14.5px] hover:bg-panel"
            >
              <div className="flex items-center gap-3">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="h-6 w-6 shrink-0 rounded-full" style={{ background: r.color }} />
                <div className="min-w-0">
                  <div className="font-medium">{r.sym}</div>
                  <div className="mt-0.5 inline-block rounded bg-panel-2 px-1.5 text-[11px] text-muted-foreground">
                    {r.lev}
                  </div>
                </div>
              </div>
              <span className="text-right">{r.price}</span>
              <span className={`text-right ${r.up ? "text-up" : "text-down"}`}>{r.chg}</span>
              <span className="text-right">{r.fr}</span>
              <span className="text-right">{r.vol}</span>
              <span className="text-right">{r.oi}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
