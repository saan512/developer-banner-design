"use client";

import {
  LiveOrderFeed,
  Reveal,
  RTLDemo,
  StreamingDemo,
  useCountUp,
} from "@/app/components/demos";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Theme system ───────────────────────────────────────────────────────── */
interface ThemeConfig {
  id: string;
  label: string;
  swatch: string;
  // Dark mode
  bg: string;
  card: string;
  elevated: string;
  border: string;
  borderDim: string;
  accent: string;
  accentFg: string;
  text: string;
  textSub: string;
  textMuted: string;
  textDim: string;
  textFaint: string;
  gridDot: string;
  heroGlow: string;
  navBg: string;
  code: string;
  green: string;
  // Light mode
  lightBg: string;
  lightCard: string;
  lightElevated: string;
  lightBorder: string;
  lightBorderDim: string;
  lightAccent: string;
  lightText: string;
  lightTextSub: string;
  lightTextMuted: string;
  lightTextDim: string;
  lightTextFaint: string;
  lightGridDot: string;
  lightHeroGlow: string;
  lightNavBg: string;
  lightCode: string;
  lightGreen: string;
  // Font (same both modes)
  displayFont: string;
  displayStyle: "normal" | "italic";
}

const THEMES: Record<string, ThemeConfig> = {
  amber: {
    id: "amber",
    label: "Amber",
    swatch: "#f59e0b",
    bg: "#080808",
    card: "#0c0c0c",
    elevated: "#111111",
    border: "#1e1e1e",
    borderDim: "#141414",
    accent: "#f59e0b",
    accentFg: "#000000",
    text: "#f0f0f0",
    textSub: "#c0c0c0",
    textMuted: "#555555",
    textDim: "#2a2a2a",
    textFaint: "#1a1a1a",
    gridDot: "#191919",
    heroGlow: "rgba(245,158,11,0.08)",
    navBg: "rgba(8,8,8,0.9)",
    code: "#22d3ee",
    green: "#4ade80",
    lightBg: "#faf8f3",
    lightCard: "#f2efe6",
    lightElevated: "#eae6da",
    lightBorder: "#d4cdb8",
    lightBorderDim: "#e0dac8",
    lightAccent: "#b45309",
    lightText: "#1c1810",
    lightTextSub: "#3d3020",
    lightTextMuted: "#8a7a60",
    lightTextDim: "#c4b898",
    lightTextFaint: "#ddd0b0",
    lightGridDot: "#d4c8a8",
    lightHeroGlow: "rgba(180,83,9,0.07)",
    lightNavBg: "rgba(250,248,243,0.92)",
    lightCode: "#0891b2",
    lightGreen: "#16a34a",
    displayFont: "var(--font-instrument)",
    displayStyle: "italic",
  },
  arctic: {
    id: "arctic",
    label: "Arctic",
    swatch: "#38bdf8",
    bg: "#030810",
    card: "#060e1a",
    elevated: "#0a1525",
    border: "#0f1e30",
    borderDim: "#081218",
    accent: "#38bdf8",
    accentFg: "#000000",
    text: "#d8eeff",
    textSub: "#8ab0cc",
    textMuted: "#3a5570",
    textDim: "#162230",
    textFaint: "#0d1820",
    gridDot: "#0a1520",
    heroGlow: "rgba(56,189,248,0.07)",
    navBg: "rgba(3,8,16,0.9)",
    code: "#818cf8",
    green: "#34d399",
    lightBg: "#f0f5fc",
    lightCard: "#ffffff",
    lightElevated: "#e4eef8",
    lightBorder: "#b8cfe4",
    lightBorderDim: "#d0e4f0",
    lightAccent: "#0369a1",
    lightText: "#0a1525",
    lightTextSub: "#1e3a55",
    lightTextMuted: "#5a80a0",
    lightTextDim: "#a0c0d8",
    lightTextFaint: "#c8daea",
    lightGridDot: "#b8d4e8",
    lightHeroGlow: "rgba(3,105,161,0.06)",
    lightNavBg: "rgba(240,245,252,0.92)",
    lightCode: "#6d28d9",
    lightGreen: "#059669",
    displayFont: "var(--font-syne)",
    displayStyle: "normal",
  },
  violet: {
    id: "violet",
    label: "Violet",
    swatch: "#a855f7",
    bg: "#06030d",
    card: "#0c0618",
    elevated: "#130a22",
    border: "#1e1030",
    borderDim: "#140a22",
    accent: "#a855f7",
    accentFg: "#ffffff",
    text: "#f0e8ff",
    textSub: "#c0a8e0",
    textMuted: "#5a3a7a",
    textDim: "#1e1030",
    textFaint: "#140a22",
    gridDot: "#100820",
    heroGlow: "rgba(168,85,247,0.08)",
    navBg: "rgba(6,3,13,0.9)",
    code: "#e879f9",
    green: "#4ade80",
    lightBg: "#f7f4ff",
    lightCard: "#ffffff",
    lightElevated: "#efe8ff",
    lightBorder: "#c8b0e4",
    lightBorderDim: "#ddd0f0",
    lightAccent: "#7c3aed",
    lightText: "#18082e",
    lightTextSub: "#3a1a60",
    lightTextMuted: "#7a50a0",
    lightTextDim: "#c0a0e0",
    lightTextFaint: "#ddc8f4",
    lightGridDot: "#c8b0e4",
    lightHeroGlow: "rgba(124,58,237,0.07)",
    lightNavBg: "rgba(247,244,255,0.92)",
    lightCode: "#0891b2",
    lightGreen: "#16a34a",
    displayFont: "var(--font-instrument)",
    displayStyle: "italic",
  },
  terminal: {
    id: "terminal",
    label: "Terminal",
    swatch: "#22c55e",
    bg: "#000000",
    card: "#030803",
    elevated: "#060c06",
    border: "#0d1a0d",
    borderDim: "#080f08",
    accent: "#22c55e",
    accentFg: "#000000",
    text: "#d0ffd0",
    textSub: "#90c890",
    textMuted: "#2a4a2a",
    textDim: "#152015",
    textFaint: "#0d160d",
    gridDot: "#0a140a",
    heroGlow: "rgba(34,197,94,0.06)",
    navBg: "rgba(0,0,0,0.92)",
    code: "#4ade80",
    green: "#86efac",
    lightBg: "#f2fff4",
    lightCard: "#ffffff",
    lightElevated: "#e2f8e6",
    lightBorder: "#a8d8b0",
    lightBorderDim: "#c4e8cc",
    lightAccent: "#15803d",
    lightText: "#081808",
    lightTextSub: "#1a3a1e",
    lightTextMuted: "#4a7850",
    lightTextDim: "#88b890",
    lightTextFaint: "#b0d8b8",
    lightGridDot: "#b4d8bc",
    lightHeroGlow: "rgba(21,128,61,0.07)",
    lightNavBg: "rgba(242,255,244,0.92)",
    lightCode: "#0891b2",
    lightGreen: "#15803d",
    displayFont: "var(--font-jetbrains)",
    displayStyle: "normal",
  },
};

type ThemeId = keyof typeof THEMES;
type DesignId = "editorial" | "kinetic";

function applyThemeVars(t: ThemeConfig, isDark: boolean) {
  const r = document.documentElement;
  const s = (k: string, v: string) => r.style.setProperty(k, v);
  if (isDark) {
    s("--t-bg", t.bg);
    s("--t-card", t.card);
    s("--t-elevated", t.elevated);
    s("--t-border", t.border);
    s("--t-border-dim", t.borderDim);
    s("--t-accent", t.accent);
    s("--t-accent-fg", t.accentFg);
    s("--t-text", t.text);
    s("--t-text-sub", t.textSub);
    s("--t-text-muted", t.textMuted);
    s("--t-text-dim", t.textDim);
    s("--t-text-faint", t.textFaint);
    s("--t-grid-dot", t.gridDot);
    s("--t-hero-glow", t.heroGlow);
    s("--t-nav-bg", t.navBg);
    s("--t-code", t.code);
    s("--t-green", t.green);
  } else {
    s("--t-bg", t.lightBg);
    s("--t-card", t.lightCard);
    s("--t-elevated", t.lightElevated);
    s("--t-border", t.lightBorder);
    s("--t-border-dim", t.lightBorderDim);
    s("--t-accent", t.lightAccent);
    s("--t-accent-fg", "#ffffff");
    s("--t-text", t.lightText);
    s("--t-text-sub", t.lightTextSub);
    s("--t-text-muted", t.lightTextMuted);
    s("--t-text-dim", t.lightTextDim);
    s("--t-text-faint", t.lightTextFaint);
    s("--t-grid-dot", t.lightGridDot);
    s("--t-hero-glow", t.lightHeroGlow);
    s("--t-nav-bg", t.lightNavBg);
    s("--t-code", t.lightCode);
    s("--t-green", t.lightGreen);
  }
  s("--t-display-font", t.displayFont);
  s("--t-display-style", t.displayStyle);
}

/* ─── Shared layout props ────────────────────────────────────────────────── */
interface LayoutProps {
  activeTheme: ThemeId;
  isDark: boolean;
  switchTheme: (id: ThemeId) => void;
  toggleDark: () => void;
  onDesignSwitch: (e: React.MouseEvent) => void;
  activeDesign: DesignId;
}

/* ─── Rocker switch (dark / light) ──────────────────────────────────────── */
function RockerSwitch({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 30,
        height: 48,
        border: "1px solid var(--t-border)",
        borderRadius: 6,
        background: "var(--t-elevated)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        userSelect: "none",
        flexShrink: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      <button
        onClick={() => isDark && onToggle()}
        style={{
          flex: 1,
          border: "none",
          cursor: isDark ? "pointer" : "default",
          background: !isDark ? "var(--t-accent)" : "transparent",
          color: !isDark ? "var(--t-accent-fg)" : "var(--t-text-muted)",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: !isDark ? "inset 0 2px 5px rgba(0,0,0,0.35)" : "none",
          transform: !isDark ? "translateY(1px)" : "none",
          transition: "all 0.12s",
        }}
      >
        ☀
      </button>
      <div
        style={{ height: 1, background: "var(--t-border)", flexShrink: 0 }}
      />
      <button
        onClick={() => !isDark && onToggle()}
        style={{
          flex: 1,
          border: "none",
          cursor: !isDark ? "pointer" : "default",
          background: isDark ? "var(--t-accent)" : "transparent",
          color: isDark ? "var(--t-accent-fg)" : "var(--t-text-muted)",
          fontSize: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isDark ? "inset 0 2px 5px rgba(0,0,0,0.35)" : "none",
          transform: isDark ? "translateY(1px)" : "none",
          transition: "all 0.12s",
        }}
      >
        ☾
      </button>
    </div>
  );
}

/* ─── Design toggle pill ─────────────────────────────────────────────────── */
function DesignToggle({
  activeDesign,
  onClick,
}: {
  activeDesign: DesignId;
  onClick: (e: React.MouseEvent) => void;
}) {
  const isEd = activeDesign === "editorial";
  return (
    <button
      onClick={onClick}
      title={`Switch to ${isEd ? "Kinetic" : "Editorial"} layout`}
      style={{
        display: "flex",
        border: "1px solid var(--t-border)",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--t-elevated)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        padding: 0,
        height: 48,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          background: isEd ? "var(--t-accent)" : "transparent",
          color: isEd ? "var(--t-accent-fg)" : "var(--t-text-muted)",
          boxShadow: isEd ? "inset 0 2px 5px rgba(0,0,0,0.35)" : "none",
          transform: isEd ? "translateY(1px)" : "none",
          transition: "all 0.12s",
        }}
      >
        {/* editorial icon: horizontal lines */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 1.5,
              borderRadius: 1,
              background: "currentColor",
              opacity: i === 1 ? 0.5 : 1,
            }}
          />
        ))}
      </div>
      <div style={{ width: 1, background: "var(--t-border)", flexShrink: 0 }} />
      <div
        style={{
          width: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: !isEd ? "var(--t-accent)" : "transparent",
          color: !isEd ? "var(--t-accent-fg)" : "var(--t-text-muted)",
          boxShadow: !isEd ? "inset 0 2px 5px rgba(0,0,0,0.35)" : "none",
          transform: !isEd ? "translateY(1px)" : "none",
          transition: "all 0.12s",
        }}
      >
        {/* kinetic icon: 4 bars of varying height */}
        {[8, 13, 6, 11].map((h, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: h,
              borderRadius: 2,
              background: "currentColor",
            }}
          />
        ))}
      </div>
    </button>
  );
}

/* ─── Theme swatches (shared) ────────────────────────────────────────────── */
function ThemeSwatches({
  activeTheme,
  switchTheme,
}: {
  activeTheme: ThemeId;
  switchTheme: (id: ThemeId) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
      {Object.values(THEMES).map((t) => (
        <button
          key={t.id}
          title={t.label}
          onClick={() => switchTheme(t.id as ThemeId)}
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: t.swatch,
            padding: 0,
            cursor: "pointer",
            border:
              activeTheme === t.id
                ? "2px solid rgba(128,128,128,0.7)"
                : "2px solid transparent",
            transform: activeTheme === t.id ? "scale(1.25)" : "scale(1)",
            transition: "transform 0.2s, border-color 0.2s",
            outline: "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── TiltCard ───────────────────────────────────────────────────────────── */
function TiltCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
    el.style.boxShadow = `${-x * 18}px ${y * 18}px 40px color-mix(in srgb, var(--t-accent) 10%, transparent)`;
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateY(0) rotateX(0) translateZ(0)";
    el.style.boxShadow = "none";
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL LAYOUT — narrative scroll
═══════════════════════════════════════════════════════════════════════════ */
function EditorialLayout({
  activeTheme,
  isDark,
  switchTheme,
  toggleDark,
  onDesignSwitch,
  activeDesign,
}: LayoutProps) {
  const c1 = useCountUp(4);
  const c2 = useCountUp(69);
  const c3 = useCountUp(40);
  const c4 = useCountUp(27);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsReady = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsReady.current) {
          statsReady.current = true;
          c1.start();
          c2.start();
          c3.start();
          c4.start();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [c1, c2, c3, c4]);

  return (
    <main
      style={{
        background: "var(--t-bg)",
        color: "var(--t-text)",
        minHeight: "100vh",
      }}
    >
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "10px 28px",
          borderBottom: "1px solid var(--t-border-dim)",
          background: "var(--t-nav-bg)",
          backdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          className="display"
          style={{
            fontSize: 19,
            color: "var(--t-text)",
            letterSpacing: "-0.01em",
          }}
        >
          Syed Aqeel
        </span>

        <div
          className="hide-mobile"
          style={{ display: "flex", gap: 28, alignItems: "center" }}
        >
          {["Work", "Experience", "Skills", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <ThemeSwatches activeTheme={activeTheme} switchTheme={switchTheme} />
          <RockerSwitch isDark={isDark} onToggle={toggleDark} />
          <DesignToggle activeDesign={activeDesign} onClick={onDesignSwitch} />
          <a
            href="mailto:aqeeshah273@gmail.com"
            style={{
              padding: "8px 16px",
              background: "var(--t-accent)",
              color: "var(--t-accent-fg)",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Hire me
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "130px 32px 80px",
          textAlign: "center",
          position: "relative",
          background: `radial-gradient(ellipse 65% 45% at 50% -5%, var(--t-hero-glow) 0%, transparent 70%), var(--t-bg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.6,
            backgroundImage:
              "radial-gradient(circle, var(--t-grid-dot) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div style={{ position: "relative", maxWidth: 780, width: "100%" }}>
          <div className="hero-eyebrow" style={{ marginBottom: 18 }}>
            <span className="eyebrow">Full-Stack Developer · Open to work</span>
          </div>

          <h1
            className="display hero-name"
            style={{
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 400,
              lineHeight: 1.06,
              color: "var(--t-text)",
              marginBottom: 22,
              letterSpacing: "-0.02em",
            }}
          >
            Syed Aqeel
            <br />
            Abbas Naqvi
          </h1>

          <div
            className="hero-pills"
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            {[
              "Next.js 15",
              "React 19",
              "TypeScript",
              "TailwindCSS",
              "Node.js",
              "Electron",
            ].map((t) => (
              <span
                key={t}
                style={{
                  padding: "5px 13px",
                  background: "var(--t-card)",
                  border: "1px solid var(--t-border)",
                  borderRadius: 20,
                  fontSize: 12,
                  color: "var(--t-text-muted)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <p
            className="hero-bio"
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              color: "var(--t-text-muted)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto 34px",
            }}
          >
            I build production systems end to end — frontend architecture,
            real-time backends, offline-first desktop apps, and the CI/CD that
            ships them.
          </p>

          <div
            className="hero-ctas"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 52,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#work"
              style={{
                padding: "12px 28px",
                background: "var(--t-accent)",
                color: "var(--t-accent-fg)",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              See my work <ArrowRight size={14} />
            </a>
            <a
              href="https://linkedin.com/in/syed-aqeel-abbas-naqvi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                background: "transparent",
                color: "var(--t-text-muted)",
                border: "1px solid var(--t-border)",
                borderRadius: 8,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href="https://github.com/saan512"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                background: "transparent",
                color: "var(--t-text-muted)",
                border: "1px solid var(--t-border)",
                borderRadius: 8,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Github size={14} /> GitHub
            </a>
          </div>

          <div
            ref={statsRef}
            className="hero-stats stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 1,
              background: "var(--t-border)",
              border: "1px solid var(--t-border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {[
              { v: c1.count, s: "+", l: "Years experience" },
              { v: c2.count, s: "", l: "React components" },
              { v: c3.count, s: "+", l: "App Router pages" },
              { v: c4.count, s: "", l: "i18n namespaces" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 12px",
                  background: "var(--t-bg)",
                  textAlign: "center",
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: 38,
                    color: "var(--t-accent)",
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                  {s.s}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--t-text-faint)",
                    marginTop: 6,
                    fontFamily: "var(--font-jetbrains)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMOS ───────────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <div style={{ marginBottom: 52 }}>
            <span className="eyebrow">Interactive proof of work</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(30px, 5vw, 50px)",
                fontWeight: 400,
                marginTop: 10,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--t-text)",
              }}
            >
              Skills you can verify —<br />
              not just read
            </h2>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontSize: 14,
                maxWidth: 480,
                marginTop: 14,
                lineHeight: 1.75,
              }}
            >
              Each demo is a working miniature of a feature I built in
              production. Try them — they behave exactly like the real thing.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {[
            {
              label: "01 · SSE streaming",
              sub: "AI analytics chat · Server-Sent Events · real-time rendering",
              Demo: StreamingDemo,
              credit: "TheOctopus AI admin panel",
            },
            {
              label: "02 · Trilingual RTL",
              sub: "i18n · Arabic RTL · dynamic dir/font switch at runtime",
              Demo: RTLDemo,
              credit: "TheOctopus AI · EN, AR, UR · 27 namespaces",
            },
            {
              label: "03 · Real-time feed",
              sub: "Socket.IO · kitchen display · live order state management",
              Demo: LiveOrderFeed,
              credit: "TheOctopus AI kitchen display",
            },
          ].map(({ label, sub, Demo, credit }, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <div style={{ marginBottom: 12 }}>
                  <span className="eyebrow" style={{ fontSize: 10 }}>
                    {label}
                  </span>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--t-text-dim)",
                      marginTop: 4,
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {sub}
                  </p>
                </div>
                <Demo />
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--t-text-faint)",
                    marginTop: 8,
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  Built for: {credit}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECT ────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--t-border-dim)",
          padding: "100px 32px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <span className="eyebrow">Flagship · Jan 2024 – Present</span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              marginTop: 10,
              marginBottom: 36,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            TheOctopus AI
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="featured-grid"
            style={{
              background: "var(--t-card)",
              border: "1px solid var(--t-border)",
              borderRadius: 16,
              padding: "36px 36px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--t-text-muted)",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                Multi-tenant SaaS for the Saudi restaurant market — a
                dual-surface Next.js 15 (App Router, React 19, Turbopack) app
                serving multiple branches from a single codebase. A 16-feature
                staff admin panel and a public customer QR self-ordering flow,
                in production today.
              </p>
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--t-text-dim)",
                    fontFamily: "var(--font-jetbrains)",
                    letterSpacing: "0.08em",
                    marginBottom: 10,
                  }}
                >
                  TECH STACK
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {[
                    "Next.js 15",
                    "React 19",
                    "TypeScript",
                    "TailwindCSS",
                    "Shadcn UI",
                    "Socket.IO",
                    "Supabase",
                    "Express.js",
                    "Electron",
                    "Vite",
                    "Sentry",
                    "PostHog",
                  ].map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "4px 10px",
                        background: "var(--t-elevated)",
                        border: "1px solid var(--t-border)",
                        borderRadius: 4,
                        fontSize: 11,
                        color: "var(--t-text-muted)",
                        fontFamily: "var(--font-jetbrains)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="https://github.com/saan512"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  color: "var(--t-text-muted)",
                  border: "1px solid var(--t-border)",
                  borderRadius: 6,
                  fontSize: 13,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Github size={13} /> Code
              </a>
            </div>
            <div>
              {[
                [
                  "40+ App Router pages",
                  "Dynamic routes, nested layouts, parallel routes, intercepting routes.",
                ],
                [
                  "69 reusable components",
                  "TailwindCSS design system on Shadcn UI with 21 custom hooks.",
                ],
                [
                  "3 languages at runtime",
                  "EN · AR RTL · UR RTL — custom use-rtl hook, dynamic dir/font switching.",
                ],
                [
                  "Real-time dashboards",
                  "Socket.IO kitchen display, live order alerts, audio notifications.",
                ],
                [
                  "AI chat interface",
                  "SSE streaming for natural-language analytics queries.",
                ],
                [
                  "Offline-first POS",
                  "Electron + Vite, typed IPC bridge (11 namespaces), SQLite sync queue, ARM64/Pi builds.",
                ],
                [
                  "End-to-end CI/CD",
                  "Bitbucket Pipelines → GitHub → Vercel/Railway across 4 production repos.",
                ],
              ].map(([label, desc]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: 14,
                    paddingBottom: 14,
                    borderBottom: "1px solid var(--t-border-dim)",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      flexShrink: 0,
                      background: "var(--t-accent)",
                      borderRadius: 2,
                      marginTop: 3,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--t-text-sub)",
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--t-text-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── MORE PROJECTS ────────────────────────────────────────────────── */}
      <section
        style={{ padding: "0 32px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <h3
            className="display"
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "var(--t-text-muted)",
              marginBottom: 24,
            }}
          >
            More work
          </h3>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {[
            {
              title: "Multi-Restaurant Marketing Site",
              stack: "Next.js 14 · TypeScript · Zod",
              desc: "16-route site with per-page JSON-LD, Next.js metadata API, bilingual EN/AR content switching, and Resend contact form with react-hook-form + Zod.",
            },
            {
              title: "OFAC & UN Sanctions Screener",
              stack: "Python · Flask · RapidFuzz",
              desc: "Compliance tool screening names against OFAC SDN and UN consolidated lists — multilingual fuzzy matching, Arabic normalisation, alias-group expansion.",
            },
            {
              title: "African Fintech Platform",
              stack: "Laravel · PHP · Payment APIs",
              desc: "Payment gateway integrations and production Laravel maintenance for Alfajri.so — a fintech serving the Somali market under high-availability constraints.",
            },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                style={{
                  background: "var(--t-card)",
                  border: "1px solid var(--t-border-dim)",
                  borderRadius: 12,
                  padding: 24,
                  height: "100%",
                  cursor: "default",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--t-border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--t-border-dim)")
                }
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--t-accent)",
                    fontFamily: "var(--font-jetbrains)",
                    marginBottom: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  {p.stack}
                </div>
                <h4
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--t-text-sub)",
                    marginBottom: 10,
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--t-text-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section
        id="experience"
        style={{
          borderTop: "1px solid var(--t-border-dim)",
          padding: "100px 32px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <span className="eyebrow">Experience</span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              marginTop: 10,
              marginBottom: 52,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            Where I&apos;ve worked
          </h2>
        </Reveal>

        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--t-border-dim)",
            }}
          />

          {[
            {
              role: "Full Stack Developer (React / Next.js)",
              company: "Quantylisis Consulting",
              location: "Islamabad, Pakistan",
              period: "Jan 2024 – Present",
              points: [
                "Sole developer on a 4-person startup team — full technical ownership with no senior engineering support or dedicated staging environment.",
                "Made every architectural decision independently: design system structure, real-time strategy, database schema, deployment topology.",
                "Established engineering culture from scratch: Sentry observability across client/server/edge runtimes, PostHog analytics, Jira issue tracking, Confluence documentation.",
                "Maintained zero-downtime deployments to live-traffic production throughout continuous feature development.",
                "Balanced speed with structural integrity — patterns I put in place (CI/CD, component library, error monitoring) scale as the team grows.",
              ],
            },
            {
              role: "Software Developer",
              company: "Alfajri.so",
              location: "Remote, Somalia",
              period: "Dec 2023 – Jun 2024",
              points: [
                "Operated under strict live-traffic constraints: no staging environment, all changes shipped directly to paying customers.",
                "Delivered rapid payment-gateway integrations and feature enhancements while maintaining uptime for an African fintech.",
              ],
            },
            {
              role: "Freelance Web Developer",
              company: "Fiverr",
              location: "Remote",
              period: "Sep 2021 – Dec 2023",
              points: [
                "Delivered 25+ web applications across e-commerce, data collection, and process automation using Laravel/PHP and Python.",
                "Built automated data-scraping pipelines (Scrapy, Selenium) under tight deadlines for clients globally.",
              ],
            },
          ].map((exp, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ position: "relative", paddingBottom: 52 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -32,
                    top: 5,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--t-accent)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--t-text-sub)",
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--t-accent)",
                        marginTop: 3,
                      }}
                    >
                      {exp.company} · {exp.location}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--t-text-dim)",
                      fontFamily: "var(--font-jetbrains)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {exp.points.map((p, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 13,
                        color: "var(--t-text-muted)",
                        lineHeight: 1.65,
                        listStyle: "none",
                      }}
                    >
                      <span
                        style={{ color: "var(--t-text-dim)", flexShrink: 0 }}
                      >
                        —
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section
        id="skills"
        style={{
          borderTop: "1px solid var(--t-border-dim)",
          padding: "100px 32px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <span className="eyebrow">Technical Skills</span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              marginTop: 10,
              marginBottom: 40,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            What I work with
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 14,
          }}
        >
          {[
            {
              cat: "Frontend",
              items: [
                "React 19",
                "Next.js (App Router)",
                "TypeScript",
                "TailwindCSS",
                "Shadcn UI",
                "HTML5 · CSS3",
              ],
            },
            {
              cat: "State & Real-time",
              items: [
                "React Context",
                "TanStack Table",
                "Socket.IO",
                "Server-Sent Events",
                "Axios",
              ],
            },
            {
              cat: "Backend",
              items: [
                "Node.js",
                "Express.js",
                "Laravel / PHP",
                "Python",
                "Supabase (PostgreSQL)",
              ],
            },
            {
              cat: "Desktop",
              items: [
                "Electron",
                "Vite",
                "SQLite (sync queue)",
                "Typed IPC bridge",
                "ARM64 / Pi builds",
              ],
            },
            {
              cat: "Tooling & CI/CD",
              items: [
                "Git · Bitbucket",
                "Vercel · Railway",
                "Jira · Confluence",
                "Sentry · PostHog",
                "Bitbucket Pipelines",
              ],
            },
            {
              cat: "Other",
              items: [
                "Scrapy · Selenium",
                "i18n · RTL",
                "SEO optimisation",
                "REST APIs",
                "Python scripting",
              ],
            },
          ].map((g, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                style={{
                  background: "var(--t-card)",
                  border: "1px solid var(--t-border-dim)",
                  borderRadius: 10,
                  padding: "20px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--t-accent)",
                    fontFamily: "var(--font-jetbrains)",
                    letterSpacing: "0.1em",
                    marginBottom: 14,
                  }}
                >
                  {g.cat.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {g.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "4px 10px",
                        background: "var(--t-elevated)",
                        border: "1px solid var(--t-border-dim)",
                        borderRadius: 4,
                        fontSize: 12,
                        color: "var(--t-text-muted)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                title: "Certified Ethical Hacker (CEH)",
                issuer: "EC-Council · 2024",
              },
              { title: "CCNA — Networking Basics", issuer: "Cisco · 2024" },
              // { title: "IELTS Band 7 (C1)",               issuer: "English proficiency" },
            ].map((cert) => (
              <div
                key={cert.title}
                style={{
                  padding: "12px 18px",
                  background: "var(--t-card)",
                  border: "1px solid var(--t-border-dim)",
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--t-text-sub)",
                  }}
                >
                  {cert.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--t-text-dim)",
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          borderTop: "1px solid var(--t-border-dim)",
          padding: "100px 32px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <span className="eyebrow">Get in touch</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                marginTop: 14,
                marginBottom: 16,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--t-text)",
              }}
            >
              Let&apos;s build
              <br />
              something together
            </h2>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              Open to full-stack roles, contract work, and interesting problems.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:aqeeshah273@gmail.com"
                style={{
                  padding: "13px 28px",
                  background: "var(--t-accent)",
                  color: "var(--t-accent-fg)",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Mail size={15} /> aqeeshah273@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/syed-aqeel-abbas-naqvi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "13px 22px",
                  background: "transparent",
                  color: "var(--t-text-muted)",
                  border: "1px solid var(--t-border)",
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://github.com/saan512"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "13px 22px",
                  background: "transparent",
                  color: "var(--t-text-muted)",
                  border: "1px solid var(--t-border)",
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--t-border-dim)",
          padding: "28px 32px",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "var(--t-text-faint)",
            fontFamily: "var(--font-jetbrains)",
          }}
        >
          © 2025 Syed Aqeel Abbas Naqvi
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Email", href: "mailto:aqeeshah273@gmail.com" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/syed-aqeel-abbas-naqvi",
            },
            { label: "GitHub", href: "https://github.com/saan512" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="nav-link"
              style={{ fontSize: 12, color: "var(--t-text-faint)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   KINETIC LAYOUT — animated glassmorphism
═══════════════════════════════════════════════════════════════════════════ */
function KineticLayout({
  activeTheme,
  isDark,
  switchTheme,
  toggleDark,
  onDesignSwitch,
  activeDesign,
}: LayoutProps) {
  const c1 = useCountUp(4);
  const c2 = useCountUp(69);
  const c3 = useCountUp(40);
  const c4 = useCountUp(27);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsReady = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsReady.current) {
          statsReady.current = true;
          c1.start();
          c2.start();
          c3.start();
          c4.start();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [c1, c2, c3, c4]);

  const SKILL_ROW_1 = [
    "React 19",
    "Next.js 15",
    "TypeScript",
    "TailwindCSS",
    "Shadcn UI",
    "Node.js",
    "Express.js",
    "Electron",
    "Vite",
    "Socket.IO",
    "React 19",
    "Next.js 15",
    "TypeScript",
    "TailwindCSS",
    "Shadcn UI",
    "Node.js",
    "Express.js",
    "Electron",
    "Vite",
    "Socket.IO",
  ];
  const SKILL_ROW_2 = [
    "Server-Sent Events",
    "Supabase",
    "i18n / RTL",
    "Bitbucket Pipelines",
    "Sentry",
    "PostHog",
    "Python",
    "Laravel",
    "Scrapy",
    "REST APIs",
    "Server-Sent Events",
    "Supabase",
    "i18n / RTL",
    "Bitbucket Pipelines",
    "Sentry",
    "PostHog",
    "Python",
    "Laravel",
    "Scrapy",
    "REST APIs",
  ];

  return (
    <main
      style={{
        background: "var(--t-bg)",
        color: "var(--t-text)",
        minHeight: "100vh",
      }}
    >
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "10px 28px",
          background: "color-mix(in srgb, var(--t-nav-bg) 85%, transparent)",
          backdropFilter: "blur(20px) saturate(1.5)",
          borderBottom:
            "1px solid color-mix(in srgb, var(--t-border) 50%, transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          className="display"
          style={{
            fontSize: 19,
            color: "var(--t-text)",
            letterSpacing: "-0.01em",
          }}
        >
          Syed Aqeel
        </span>
        <div
          className="hide-mobile"
          style={{ display: "flex", gap: 28, alignItems: "center" }}
        >
          {["Work", "Experience", "Skills", "Contact"].map((l) => (
            <a key={l} href={`#k-${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <ThemeSwatches activeTheme={activeTheme} switchTheme={switchTheme} />
          <RockerSwitch isDark={isDark} onToggle={toggleDark} />
          <DesignToggle activeDesign={activeDesign} onClick={onDesignSwitch} />
          <a
            href="mailto:aqeeshah273@gmail.com"
            style={{
              padding: "8px 16px",
              background: "var(--t-accent)",
              color: "var(--t-accent-fg)",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Hire me
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "130px 32px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div
          style={{
            position: "relative",
            maxWidth: 780,
            width: "100%",
            zIndex: 1,
          }}
        >
          <div className="hero-eyebrow" style={{ marginBottom: 18 }}>
            <span className="eyebrow">Full-Stack Developer · Open to work</span>
          </div>

          <h1
            className="display hero-name"
            style={{
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 400,
              lineHeight: 1.06,
              color: "var(--t-text)",
              marginBottom: 22,
              letterSpacing: "-0.02em",
            }}
          >
            Syed Aqeel
            <br />
            Abbas Naqvi
          </h1>

          <div
            className="hero-pills"
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            {[
              "Next.js 15",
              "React 19",
              "TypeScript",
              "TailwindCSS",
              "Node.js",
              "Electron",
            ].map((t) => (
              <span
                key={t}
                style={{
                  padding: "5px 13px",
                  background:
                    "color-mix(in srgb, var(--t-card) 80%, transparent)",
                  backdropFilter: "blur(8px)",
                  border:
                    "1px solid color-mix(in srgb, var(--t-border) 80%, transparent)",
                  borderRadius: 20,
                  fontSize: 12,
                  color: "var(--t-text-muted)",
                  fontFamily: "var(--font-jetbrains)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <p
            className="hero-bio"
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "var(--t-text-muted)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto 34px",
            }}
          >
            I build production systems end to end — frontend architecture,
            real-time backends, offline-first desktop apps, and the CI/CD that
            ships them.
          </p>

          <div
            className="hero-ctas"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 52,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#k-work"
              style={{
                padding: "12px 28px",
                background: "var(--t-accent)",
                color: "var(--t-accent-fg)",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow:
                  "0 0 28px color-mix(in srgb, var(--t-accent) 30%, transparent)",
              }}
            >
              See my work <ArrowRight size={14} />
            </a>
            <a
              href="https://linkedin.com/in/syed-aqeel-abbas-naqvi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                background:
                  "color-mix(in srgb, var(--t-card) 80%, transparent)",
                backdropFilter: "blur(8px)",
                color: "var(--t-text-muted)",
                border:
                  "1px solid color-mix(in srgb, var(--t-border) 70%, transparent)",
                borderRadius: 8,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href="https://github.com/saan512"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                background:
                  "color-mix(in srgb, var(--t-card) 80%, transparent)",
                backdropFilter: "blur(8px)",
                color: "var(--t-text-muted)",
                border:
                  "1px solid color-mix(in srgb, var(--t-border) 70%, transparent)",
                borderRadius: 8,
                fontSize: 14,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Github size={14} /> GitHub
            </a>
          </div>

          {/* Stats — glassmorphism cards */}
          <div
            ref={statsRef}
            className="hero-stats stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 10,
            }}
          >
            {[
              { v: c1.count, s: "+", l: "Years experience" },
              { v: c2.count, s: "", l: "React components" },
              { v: c3.count, s: "+", l: "App Router pages" },
              { v: c4.count, s: "", l: "i18n namespaces" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 12px",
                  textAlign: "center",
                  background:
                    "color-mix(in srgb, var(--t-card) 75%, transparent)",
                  backdropFilter: "blur(12px)",
                  border:
                    "1px solid color-mix(in srgb, var(--t-border) 60%, transparent)",
                  borderRadius: 14,
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: 38,
                    color: "var(--t-accent)",
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                  {s.s}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--t-text-muted)",
                    marginTop: 6,
                    fontFamily: "var(--font-jetbrains)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMOS ─── levitating cards ──────────────────────────────────── */}
      <section
        id="k-work"
        style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <div style={{ marginBottom: 52 }}>
            <span className="eyebrow">Interactive proof of work</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(30px, 5vw, 50px)",
                fontWeight: 400,
                marginTop: 10,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--t-text)",
              }}
            >
              Skills you can verify —<br />
              not just read
            </h2>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontSize: 14,
                maxWidth: 480,
                marginTop: 14,
                lineHeight: 1.75,
              }}
            >
              Each demo is a working miniature of a feature I built in
              production.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {(
            [
              {
                label: "01 · SSE streaming",
                sub: "AI analytics chat · Server-Sent Events · real-time rendering",
                Demo: StreamingDemo,
                credit: "TheOctopus AI admin panel",
                lv: "1",
              },
              {
                label: "02 · Trilingual RTL",
                sub: "i18n · Arabic RTL · dynamic dir/font switch at runtime",
                Demo: RTLDemo,
                credit: "TheOctopus AI · EN, AR, UR · 27 namespaces",
                lv: "2",
              },
              {
                label: "03 · Real-time feed",
                sub: "Socket.IO · kitchen display · live order state management",
                Demo: LiveOrderFeed,
                credit: "TheOctopus AI kitchen display",
                lv: "3",
              },
            ] as const
          ).map(({ label, sub, Demo, credit, lv }, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`levitate levitate-${lv}`}>
                <div style={{ marginBottom: 12 }}>
                  <span className="eyebrow" style={{ fontSize: 10 }}>
                    {label}
                  </span>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--t-text-muted)",
                      marginTop: 4,
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {sub}
                  </p>
                </div>
                <Demo />
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--t-text-faint)",
                    marginTop: 8,
                    fontFamily: "var(--font-jetbrains)",
                  }}
                >
                  Built for: {credit}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECT ─── rotating gradient border ───────────────── */}
      <section
        style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <span className="eyebrow">Flagship · Jan 2024 – Present</span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              marginTop: 10,
              marginBottom: 36,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            TheOctopus AI
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="rotating-border-outer">
            <div className="rotating-border-inner">
              <div
                className="featured-grid"
                style={{
                  padding: "36px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 40,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--t-text-muted)",
                      lineHeight: 1.8,
                      marginBottom: 28,
                    }}
                  >
                    Multi-tenant SaaS for the Saudi restaurant market — a
                    dual-surface Next.js 15 (App Router, React 19, Turbopack)
                    app serving multiple branches from a single codebase. A
                    16-feature staff admin panel and a public customer QR
                    self-ordering flow, in production today.
                  </p>
                  <div style={{ marginBottom: 28 }}>
                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--t-text-dim)",
                        fontFamily: "var(--font-jetbrains)",
                        letterSpacing: "0.08em",
                        marginBottom: 10,
                      }}
                    >
                      TECH STACK
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {[
                        "Next.js 15",
                        "React 19",
                        "TypeScript",
                        "TailwindCSS",
                        "Shadcn UI",
                        "Socket.IO",
                        "Supabase",
                        "Express.js",
                        "Electron",
                        "Vite",
                        "Sentry",
                        "PostHog",
                      ].map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: "4px 10px",
                            background: "var(--t-elevated)",
                            border: "1px solid var(--t-border)",
                            borderRadius: 4,
                            fontSize: 11,
                            color: "var(--t-text-muted)",
                            fontFamily: "var(--font-jetbrains)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="https://github.com/saan512"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 16px",
                      background: "transparent",
                      color: "var(--t-text-muted)",
                      border: "1px solid var(--t-border)",
                      borderRadius: 6,
                      fontSize: 13,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Github size={13} /> Code
                  </a>
                </div>
                <div>
                  {[
                    [
                      "40+ App Router pages",
                      "Dynamic routes, nested layouts, parallel routes, intercepting routes.",
                    ],
                    [
                      "69 reusable components",
                      "TailwindCSS design system on Shadcn UI with 21 custom hooks.",
                    ],
                    [
                      "3 languages at runtime",
                      "EN · AR RTL · UR RTL — custom use-rtl hook, dynamic dir/font switching.",
                    ],
                    [
                      "Real-time dashboards",
                      "Socket.IO kitchen display, live order alerts, audio notifications.",
                    ],
                    [
                      "AI chat interface",
                      "SSE streaming for natural-language analytics queries.",
                    ],
                    [
                      "Offline-first POS",
                      "Electron + Vite, typed IPC bridge (11 namespaces), SQLite sync queue, ARM64/Pi builds.",
                    ],
                    [
                      "End-to-end CI/CD",
                      "Bitbucket Pipelines → GitHub → Vercel/Railway across 4 production repos.",
                    ],
                  ].map(([label, desc]) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        gap: 14,
                        paddingBottom: 14,
                        borderBottom: "1px solid var(--t-border-dim)",
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 3,
                          flexShrink: 0,
                          background: "var(--t-accent)",
                          borderRadius: 2,
                          marginTop: 3,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--t-text-sub)",
                            marginBottom: 3,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--t-text-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── MORE PROJECTS ─── 3D tilt ───────────────────────────────────── */}
      <section
        style={{ padding: "0 32px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <h3
            className="display"
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "var(--t-text-muted)",
              marginBottom: 24,
            }}
          >
            More work
          </h3>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {[
            {
              title: "Multi-Restaurant Marketing Site",
              stack: "Next.js 14 · TypeScript · Zod",
              desc: "16-route site with per-page JSON-LD, Next.js metadata API, bilingual EN/AR content switching, and Resend contact form with react-hook-form + Zod.",
            },
            {
              title: "OFAC & UN Sanctions Screener",
              stack: "Python · Flask · RapidFuzz",
              desc: "Compliance tool screening names against OFAC SDN and UN consolidated lists — multilingual fuzzy matching, Arabic normalisation, alias-group expansion.",
            },
            {
              title: "African Fintech Platform",
              stack: "Laravel · PHP · Payment APIs",
              desc: "Payment gateway integrations and production Laravel maintenance for Alfajri.so — a fintech serving the Somali market under high-availability constraints.",
            },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <TiltCard style={{ height: "100%" }}>
                <div
                  style={{
                    background:
                      "color-mix(in srgb, var(--t-card) 85%, transparent)",
                    backdropFilter: "blur(14px)",
                    border:
                      "1px solid color-mix(in srgb, var(--t-border) 70%, transparent)",
                    borderRadius: 14,
                    padding: 24,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--t-accent)",
                      fontFamily: "var(--font-jetbrains)",
                      marginBottom: 10,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.stack}
                  </div>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--t-text-sub)",
                      marginBottom: 10,
                    }}
                  >
                    {p.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--t-text-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section
        id="k-experience"
        style={{
          borderTop:
            "1px solid color-mix(in srgb, var(--t-border) 40%, transparent)",
          padding: "100px 32px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <span className="eyebrow">Experience</span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              marginTop: 10,
              marginBottom: 52,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            Where I&apos;ve worked
          </h2>
        </Reveal>

        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom, var(--t-accent), var(--t-code), var(--t-green))`,
            }}
          />

          {[
            {
              role: "Full Stack Developer (React / Next.js)",
              company: "Quantylisis Consulting",
              location: "Islamabad, Pakistan",
              period: "Jan 2024 – Present",
              points: [
                "Sole developer on a 4-person startup team — full technical ownership with no senior engineering support or dedicated staging environment.",
                "Made every architectural decision independently: design system structure, real-time strategy, database schema, deployment topology.",
                "Established engineering culture from scratch: Sentry observability across client/server/edge runtimes, PostHog analytics, Jira issue tracking, Confluence documentation.",
                "Maintained zero-downtime deployments to live-traffic production throughout continuous feature development.",
                "Balanced speed with structural integrity — patterns I put in place (CI/CD, component library, error monitoring) scale as the team grows.",
              ],
            },
            {
              role: "Software Developer",
              company: "Alfajri.so",
              location: "Remote, Somalia",
              period: "Dec 2023 – Jun 2024",
              points: [
                "Operated under strict live-traffic constraints: no staging environment, all changes shipped directly to paying customers.",
                "Delivered rapid payment-gateway integrations and feature enhancements while maintaining uptime for an African fintech.",
              ],
            },
            {
              role: "Freelance Web Developer",
              company: "Fiverr",
              location: "Remote",
              period: "Sep 2021 – Dec 2023",
              points: [
                "Delivered 25+ web applications across e-commerce, data collection, and process automation using Laravel/PHP and Python.",
                "Built automated data-scraping pipelines (Scrapy, Selenium) under tight deadlines for clients globally.",
              ],
            },
          ].map((exp, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ position: "relative", paddingBottom: 52 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -32,
                    top: 5,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--t-accent)",
                    boxShadow: "0 0 10px var(--t-accent)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--t-text-sub)",
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--t-accent)",
                        marginTop: 3,
                      }}
                    >
                      {exp.company} · {exp.location}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--t-text-dim)",
                      fontFamily: "var(--font-jetbrains)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {exp.points.map((p, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 13,
                        color: "var(--t-text-muted)",
                        lineHeight: 1.65,
                        listStyle: "none",
                      }}
                    >
                      <span
                        style={{ color: "var(--t-text-dim)", flexShrink: 0 }}
                      >
                        —
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SKILLS ─── infinite marquee ─────────────────────────────────── */}
      <section
        id="k-skills"
        style={{
          borderTop:
            "1px solid color-mix(in srgb, var(--t-border) 40%, transparent)",
          padding: "100px 0",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <span className="eyebrow">Technical Skills</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                marginTop: 10,
                marginBottom: 40,
                letterSpacing: "-0.02em",
                color: "var(--t-text)",
              }}
            >
              What I work with
            </h2>
          </Reveal>
        </div>

        <div style={{ overflow: "hidden", marginBottom: 10 }}>
          <div
            className="marquee-left"
            style={{
              display: "flex",
              gap: 10,
              width: "max-content",
              padding: "4px 0",
            }}
          >
            {SKILL_ROW_1.map((s, i) => (
              <span key={i} className="marquee-pill">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", marginBottom: 40 }}>
          <div
            className="marquee-right"
            style={{
              display: "flex",
              gap: 10,
              width: "max-content",
              padding: "4px 0",
            }}
          >
            {SKILL_ROW_2.map((s, i) => (
              <span key={i} className="marquee-pill">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal delay={100}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                {
                  title: "Certified Ethical Hacker (CEH)",
                  issuer: "EC-Council · 2024",
                },
                { title: "CCNA — Networking Basics", issuer: "Cisco · 2024" },
                // { title: "IELTS Band 7 (C1)", issuer: "English proficiency" },
              ].map((cert) => (
                <div
                  key={cert.title}
                  style={{
                    padding: "12px 18px",
                    background:
                      "color-mix(in srgb, var(--t-card) 80%, transparent)",
                    backdropFilter: "blur(10px)",
                    border:
                      "1px solid color-mix(in srgb, var(--t-border) 60%, transparent)",
                    borderRadius: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--t-text-sub)",
                    }}
                  >
                    {cert.title}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--t-text-dim)",
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {cert.issuer}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ─── glow pulse ──────────────────────────────────────── */}
      <section
        id="k-contact"
        style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Reveal>
          <div
            className="contact-glow"
            style={{
              textAlign: "center",
              maxWidth: 520,
              margin: "0 auto",
              padding: 40,
            }}
          >
            <span className="eyebrow">Get in touch</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                marginTop: 14,
                marginBottom: 16,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--t-text)",
              }}
            >
              Let&apos;s build
              <br />
              something together
            </h2>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              Open to full-stack roles, contract work, and interesting problems.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:aqeeshah273@gmail.com"
                style={{
                  padding: "13px 28px",
                  background: "var(--t-accent)",
                  color: "var(--t-accent-fg)",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow:
                    "0 0 24px color-mix(in srgb, var(--t-accent) 30%, transparent)",
                }}
              >
                <Mail size={15} /> aqeeshah273@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/syed-aqeel-abbas-naqvi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "13px 22px",
                  background:
                    "color-mix(in srgb, var(--t-card) 80%, transparent)",
                  backdropFilter: "blur(8px)",
                  color: "var(--t-text-muted)",
                  border:
                    "1px solid color-mix(in srgb, var(--t-border) 70%, transparent)",
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://github.com/saan512"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "13px 22px",
                  background:
                    "color-mix(in srgb, var(--t-card) 80%, transparent)",
                  backdropFilter: "blur(8px)",
                  color: "var(--t-text-muted)",
                  border:
                    "1px solid color-mix(in srgb, var(--t-border) 70%, transparent)",
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop:
            "1px solid color-mix(in srgb, var(--t-border) 40%, transparent)",
          padding: "28px 32px",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "var(--t-text-faint)",
            fontFamily: "var(--font-jetbrains)",
          }}
        >
          © 2025 Syed Aqeel Abbas Naqvi
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Email", href: "mailto:aqeeshah273@gmail.com" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/syed-aqeel-abbas-naqvi",
            },
            { label: "GitHub", href: "https://github.com/saan512" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="nav-link"
              style={{ fontSize: 12, color: "var(--t-text-faint)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME — orchestrator
═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("amber");
  const [isDark, setIsDark] = useState(true);
  const [activeDesign, setActiveDesign] = useState<DesignId>("editorial");

  const [transitionKey, setTransitionKey] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const [revealPhase, setRevealPhase] = useState<
    "idle" | "start" | "expanding" | "fading"
  >("idle");
  const [revealOrigin, setRevealOrigin] = useState({ x: 0, y: 0 });

  const switchTheme = useCallback(
    (id: ThemeId) => {
      if (id === activeTheme || isSwitching) return;
      setIsSwitching(true);
      setTransitionKey((k) => k + 1);
      setTimeout(() => {
        applyThemeVars(THEMES[id], isDark);
        setActiveTheme(id);
        setTimeout(() => setIsSwitching(false), 450);
      }, 280);
    },
    [activeTheme, isSwitching, isDark],
  );

  const toggleDark = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    applyThemeVars(THEMES[activeTheme], next);
  }, [isDark, activeTheme]);

  const handleDesignSwitch = useCallback(
    (e: React.MouseEvent) => {
      if (revealPhase !== "idle") return;
      const rect = e.currentTarget.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      setRevealOrigin(origin);
      setRevealPhase("start");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setRevealPhase("expanding"));
      });
      setTimeout(() => {
        setActiveDesign((d) => (d === "editorial" ? "kinetic" : "editorial"));
        setRevealPhase("fading");
        setTimeout(() => setRevealPhase("idle"), 380);
      }, 440);
    },
    [revealPhase],
  );

  const layoutProps: LayoutProps = {
    activeTheme,
    isDark,
    switchTheme,
    toggleDark,
    onDesignSwitch: handleDesignSwitch,
    activeDesign,
  };

  return (
    <>
      {/* ── Global styles ─────────────────────────────────────────────── */}
      <style>{`
        .display { font-family: var(--t-display-font); font-style: var(--t-display-style); }
        .eyebrow { display: inline-block; font-family: var(--font-jetbrains); font-size: 11px; color: var(--t-accent); letter-spacing: 0.12em; text-transform: uppercase; }
        .nav-link { font-size: 13px; color: var(--t-text-muted); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--t-text); }

        /* Demo windows */
        .demo-window   { background: var(--t-card); border: 1px solid var(--t-border); border-radius: 12px; overflow: hidden; }
        .demo-titlebar { padding: 9px 14px; border-bottom: 1px solid var(--t-border); display: flex; align-items: center; gap: 6px; background: var(--t-card); user-select: none; }
        .dot           { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .demo-label    { font-family: var(--font-jetbrains); font-size: 11px; color: var(--t-text-dim); margin-left: 8px; flex: 1; }
        .demo-body     { padding: 16px; font-family: var(--font-jetbrains); font-size: 12px; }
        .demo-hint     { color: var(--t-text-faint); font-size: 11px; margin-top: 6px; }
        .chat-row      { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: nowrap; }
        .chat-actor    { font-weight: 600; font-size: 11px; min-width: 26px; flex-shrink: 0; }
        .chat-actor.you { color: var(--t-accent); }
        .chat-actor.ai  { color: var(--t-code); }
        .chat-text     { color: var(--t-text-muted); font-size: 12px; }
        .stream-input  { flex: 1; background: var(--t-elevated); border: 1px solid var(--t-border); border-radius: 6px; padding: 6px 10px; color: var(--t-text); font-size: 12px; font-family: var(--font-jetbrains); outline: none; min-width: 0; }
        .stream-input:focus { border-color: color-mix(in srgb, var(--t-accent) 40%, transparent); }
        .stream-btn    { padding: 6px 14px; background: var(--t-accent); color: var(--t-accent-fg); border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 700; font-family: var(--font-jetbrains); white-space: nowrap; flex-shrink: 0; }
        .stream-response { white-space: pre-wrap; color: var(--t-text-sub); margin: 0; font-family: var(--font-jetbrains); font-size: 12px; line-height: 1.65; flex: 1; }
        .cursor-blink  { color: var(--t-accent); animation: blink 0.75s step-end infinite; }
        .reset-btn     { margin-top: 12px; padding: 4px 10px; background: transparent; border: 1px solid var(--t-border); color: var(--t-text-muted); border-radius: 4px; cursor: pointer; font-size: 11px; font-family: var(--font-jetbrains); }
        .lang-switcher { display: flex; gap: 3px; margin-left: auto; }
        .lang-btn      { padding: 2px 8px; border-radius: 3px; font-size: 10px; cursor: pointer; font-family: var(--font-jetbrains); background: transparent; color: var(--t-text-dim); border: 1px solid var(--t-border); transition: all 0.15s; }
        .lang-btn.active { background: var(--t-accent); color: var(--t-accent-fg); border-color: var(--t-accent); }
        .rtl-card  { background: var(--t-elevated); border: 1px solid var(--t-border); border-radius: 10px; padding: 16px; transition: all 0.3s ease; }
        .rtl-name  { font-size: 18px; font-weight: 700; color: var(--t-text); }
        .rtl-status { font-size: 11px; color: var(--t-green); margin-top: 3px; }
        .rtl-menu  { border-top: 1px solid var(--t-border); padding-top: 10px; margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
        .rtl-item  { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--t-text-sub); }
        .rtl-price { color: var(--t-accent); font-weight: 600; }
        .rtl-cta   { margin-top: 14px; width: 100%; padding: 9px 0; background: var(--t-accent); color: var(--t-accent-fg); border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 13px; }
        .orders-body { display: flex; flex-direction: column; gap: 6px; min-height: 175px; padding: 12px 14px; }
        .order-row   { display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--t-elevated); border-radius: 6px; border: 1px solid var(--t-border-dim); animation: slide-in 0.3s ease-out both; }
        .order-table { width: 28px; height: 28px; border-radius: 5px; background: var(--t-card); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: var(--t-accent); flex-shrink: 0; }
        .order-items { flex: 1; font-size: 12px; color: var(--t-text-sub); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .order-status { font-size: 10px; font-weight: 700; min-width: 42px; text-align: right; letter-spacing: 0.04em; }
        .live-badge  { margin-left: auto; font-size: 10px; font-family: var(--font-jetbrains); color: var(--t-green); display: flex; align-items: center; gap: 4px; }

        /* Kinetic — blobs */
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .blob-1 { width: 500px; height: 500px; background: color-mix(in srgb, var(--t-accent) 18%, transparent); top: -150px; left: -100px; animation: blob-drift-1 9s ease-in-out infinite alternate; }
        .blob-2 { width: 420px; height: 420px; background: color-mix(in srgb, var(--t-code) 14%, transparent); top: 80px; right: -120px; animation: blob-drift-2 11s ease-in-out infinite alternate; }
        .blob-3 { width: 380px; height: 380px; background: color-mix(in srgb, var(--t-green) 12%, transparent); bottom: -80px; left: 35%; animation: blob-drift-3 13s ease-in-out infinite alternate; }
        @keyframes blob-drift-1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(70px,50px) scale(1.12); } }
        @keyframes blob-drift-2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-50px,40px) scale(1.08); } }
        @keyframes blob-drift-3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(30px,-50px) scale(1.1); } }

        /* Kinetic — levitate */
        .levitate   { animation: levitate 4s ease-in-out infinite; }
        .levitate-1 { animation-delay: 0s; }
        .levitate-2 { animation-delay: 1.4s; }
        .levitate-3 { animation-delay: 0.7s; }
        @keyframes levitate { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        /* Kinetic — rotating gradient border */
        .rotating-border-outer { position: relative; padding: 2px; border-radius: 18px; overflow: hidden; }
        .rotating-border-outer::before { content: ''; position: absolute; inset: -50%; background: conic-gradient(from 0deg, var(--t-accent), var(--t-code), var(--t-green), var(--t-accent)); animation: border-spin 4s linear infinite; }
        @keyframes border-spin { to { transform: rotate(360deg); } }
        .rotating-border-inner { position: relative; background: var(--t-card); border-radius: 16px; z-index: 1; }

        /* Kinetic — marquee */
        .marquee-left  { animation: marquee-left 28s linear infinite; }
        .marquee-right { animation: marquee-right 34s linear infinite; }
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-pill { padding: 8px 18px; background: color-mix(in srgb, var(--t-card) 85%, transparent); border: 1px solid color-mix(in srgb, var(--t-border) 70%, transparent); border-radius: 20px; font-size: 13px; color: var(--t-text-sub); white-space: nowrap; font-family: var(--font-jetbrains); backdrop-filter: blur(8px); }

        /* Kinetic — contact glow */
        @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 0 0 transparent; } 50% { box-shadow: 0 0 60px 10px color-mix(in srgb, var(--t-accent) 15%, transparent); } }
        .contact-glow { animation: glow-pulse 3s ease-in-out infinite; border-radius: 20px; }

        /* Animations */
        @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes slide-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fade-up  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

        /* Theme flash */
        @keyframes theme-flash { 0% { opacity:0; } 40% { opacity:1; } 100% { opacity:0; } }
        .theme-overlay { animation: theme-flash 0.7s ease-in-out forwards; pointer-events: none; }

        /* Hero entrance */
        .hero-eyebrow { animation: fade-up 0.55s 0.05s ease-out both; }
        .hero-name    { animation: fade-up 0.6s  0.15s ease-out both; }
        .hero-pills   { animation: fade-up 0.6s  0.25s ease-out both; }
        .hero-bio     { animation: fade-up 0.6s  0.32s ease-out both; }
        .hero-ctas    { animation: fade-up 0.6s  0.38s ease-out both; }
        .hero-stats   { animation: fade-up 0.6s  0.44s ease-out both; }

        /* Mobile */
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Active layout ─────────────────────────────────────────────── */}
      {activeDesign === "editorial" ? (
        <EditorialLayout {...layoutProps} />
      ) : (
        <KineticLayout {...layoutProps} />
      )}

      {/* ── Theme flash overlay ───────────────────────────────────────── */}
      {transitionKey > 0 && (
        <div
          key={transitionKey}
          className="theme-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Design switch radial reveal ───────────────────────────────── */}
      {revealPhase !== "idle" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            pointerEvents: "none",
            background: "var(--t-accent)",
            clipPath:
              revealPhase === "start"
                ? `circle(0px at ${revealOrigin.x}px ${revealOrigin.y}px)`
                : `circle(200vmax at ${revealOrigin.x}px ${revealOrigin.y}px)`,
            opacity: revealPhase === "fading" ? 0 : 1,
            transition:
              revealPhase === "expanding"
                ? "clip-path 0.44s cubic-bezier(0.4,0,0.2,1)"
                : revealPhase === "fading"
                  ? "opacity 0.38s ease-out"
                  : "none",
          }}
        />
      )}
    </>
  );
}
