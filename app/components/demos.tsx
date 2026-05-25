"use client";

import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";
import { Activity } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export type OrderStatus = "NEW" | "PREPARING" | "READY";
export interface Order {
  id: string;
  table: number;
  items: string[];
  status: OrderStatus;
}

/* ─── useCountUp ─────────────────────────────────────────────────────────── */
export function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return { count, start };
}

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ${delay}ms ease, transform 0.65s ${delay}ms ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SSE Streaming Demo ─────────────────────────────────────────────────── */
const STREAM_TEXT = `Analyzing across 3 branches (last 7 days)...

Branch breakdown:
  Downtown Branch    $12,450   ↑ +8.2%
  Marina Branch       $9,830   ↑ +3.1%
  Airport Branch      $7,200   ↓ -1.4%

Total revenue:      $29,480
Orders processed:     1,204
Avg order value:      $24.50

Top item: Grilled Chicken (243 orders)`;

export function StreamingDemo() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [phase, setPhase] = useState<"idle" | "streaming" | "done">("idle");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const doStream = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("streaming");
    let i = 0;
    timer.current = setInterval(() => {
      i++;
      setResponse(STREAM_TEXT.slice(0, i));
      if (i >= STREAM_TEXT.length) {
        clearInterval(timer.current!);
        setPhase("done");
      }
    }, 12);
  }, [phase]);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  const reset = () => { setQuery(""); setResponse(""); setPhase("idle"); };

  return (
    <div className="demo-window">
      <div className="demo-titlebar">
        <span className="dot" style={{ background: "#ff5f57" }} />
        <span className="dot" style={{ background: "#febc2e" }} />
        <span className="dot" style={{ background: "#28c840" }} />
        <span className="demo-label">AI Analytics · SSE Streaming</span>
      </div>
      <div className="demo-body" style={{ minHeight: 210 }}>
        {phase === "idle" && (
          <>
            <div className="chat-row">
              <span className="chat-actor you">you</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") doStream(); }}
                placeholder="Show revenue by branch (7 days)…"
                className="stream-input"
              />
              <button
                className="stream-btn"
                onClick={() => {
                  if (!query.trim()) setQuery("Show revenue by branch (7 days)");
                  doStream();
                }}
              >
                Ask ↵
              </button>
            </div>
            <p className="demo-hint">← type a query or click Ask to see SSE streaming</p>
          </>
        )}
        {(phase === "streaming" || phase === "done") && (
          <div>
            <div className="chat-row" style={{ marginBottom: 12 }}>
              <span className="chat-actor you">you</span>
              <span className="chat-text">{query || "Show revenue by branch (7 days)"}</span>
            </div>
            <div className="chat-row" style={{ alignItems: "flex-start" }}>
              <span className="chat-actor ai">ai</span>
              <pre className="stream-response">
                {response}
                {phase === "streaming" && <span className="cursor-blink">▋</span>}
              </pre>
            </div>
            {phase === "done" && (
              <button onClick={reset} className="reset-btn">↺ reset</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── RTL Toggle Demo ────────────────────────────────────────────────────── */
export function RTLDemo() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const isAr = lang === "ar";
  const data = {
    en: { name: "The Octopus", item1: "Grilled Chicken", p1: "$12.99", item2: "Caesar Salad", p2: "$8.50", status: "Open Now", cta: "Order Now" },
    ar: { name: "الأخطبوط", item1: "دجاج مشوي", p1: "١٢.٩٩$", item2: "سلطة سيزر", p2: "٨.٥٠$", status: "مفتوح الآن", cta: "اطلب الآن" },
  };
  const d = data[lang];

  return (
    <div className="demo-window">
      <div className="demo-titlebar">
        <span className="dot" style={{ background: "#ff5f57" }} />
        <span className="dot" style={{ background: "#febc2e" }} />
        <span className="dot" style={{ background: "#28c840" }} />
        <span className="demo-label">Trilingual UI · 27 i18n namespaces</span>
        <div className="lang-switcher">
          {(["en", "ar"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`lang-btn${lang === l ? " active" : ""}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="demo-body" style={{ padding: 16 }}>
        <div
          dir={isAr ? "rtl" : "ltr"}
          className="rtl-card"
          style={{ fontFamily: isAr ? "'Noto Sans Arabic','Segoe UI',sans-serif" : "var(--font-syne)" }}
        >
          <div style={{ marginBottom: 12 }}>
            <div className="rtl-name">{d.name}</div>
            <div className="rtl-status">● {d.status}</div>
          </div>
          <div className="rtl-menu">
            {[{ name: d.item1, price: d.p1 }, { name: d.item2, price: d.p2 }].map((item, i) => (
              <div key={i} className="rtl-item">
                <span>{item.name}</span>
                <span className="rtl-price">{item.price}</span>
              </div>
            ))}
          </div>
          <button className="rtl-cta">{d.cta}</button>
        </div>
        <p className="demo-hint" style={{ marginTop: 10 }}>
          ← toggle to see direction &amp; font switch at runtime
        </p>
      </div>
    </div>
  );
}

/* ─── Live Order Feed Demo ───────────────────────────────────────────────── */
const FOOD = ["Grilled Chicken","Pasta","Fries","Burger","Salad","Soup","Shawarma","Lemonade","Steak","Tacos"];
const randItems = () =>
  Array.from(
    { length: Math.ceil(Math.random() * 2) },
    () => FOOD[Math.floor(Math.random() * FOOD.length)]
  );

export function LiveOrderFeed() {
  const [orders, setOrders] = useState<Order[]>([
    { id: "a1", table: 3, items: ["Burger", "Fries"], status: "PREPARING" },
    { id: "a2", table: 7, items: ["Caesar Salad"], status: "READY" },
    { id: "a3", table: 11, items: ["Pasta", "Lemonade"], status: "NEW" },
  ]);

  useEffect(() => {
    const iv = setInterval(() => {
      setOrders((prev) => {
        if (Math.random() < 0.4) {
          const n: Order = {
            id: Date.now().toString(),
            table: Math.ceil(Math.random() * 15),
            items: randItems(),
            status: "NEW",
          };
          return [n, ...prev].slice(0, 4);
        }
        return prev.map((o) => {
          if (o.status === "NEW" && Math.random() > 0.5)
            return { ...o, status: "PREPARING" as OrderStatus };
          if (o.status === "PREPARING" && Math.random() > 0.55)
            return { ...o, status: "READY" as OrderStatus };
          return o;
        });
      });
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  const STATUS: Record<OrderStatus, { color: string; label: string }> = {
    NEW:       { color: "var(--t-accent)", label: "NEW"  },
    PREPARING: { color: "var(--t-code)",   label: "PREP" },
    READY:     { color: "var(--t-green)",  label: "READY"},
  };

  return (
    <div className="demo-window">
      <div className="demo-titlebar">
        <span className="dot" style={{ background: "#ff5f57" }} />
        <span className="dot" style={{ background: "#febc2e" }} />
        <span className="dot" style={{ background: "#28c840" }} />
        <span className="demo-label">Kitchen Display · Socket.IO real-time</span>
        <span className="live-badge">
          <Activity size={10} />
          LIVE
        </span>
      </div>
      <div className="demo-body orders-body">
        {orders.map((o) => (
          <div key={o.id} className="order-row">
            <span className="order-table">T{o.table}</span>
            <span className="order-items">{o.items.join(", ")}</span>
            <span className="order-status" style={{ color: STATUS[o.status].color }}>
              {STATUS[o.status].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
