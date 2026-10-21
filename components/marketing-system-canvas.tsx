"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { startTransition, useRef, useState, type CSSProperties, type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STATE_FEATHER = 0.024;
const LOGO_SRC = "/brand/folloze-logo.svg";

const BRAND = {
  primary1: "#00CCFF",
  primary2: "#00A0FF",
  primary3: "#0077FF",
  primary4: "#004BDE",
  pink: "#FF469E",
  violet: "#7F45FF",
  violetDeep: "#4414AD",
  green: "#11D175",
  orange: "#F98A1B",
  yellow: "#FFC800",
  neutral0: "#F3F9FD",
  neutral1: "#FFFFFF",
  neutral2: "#D8ECFA",
  neutral3: "#2C3D59",
  neutral4: "#1C293F",
  neutral1000: "#071428",
} as const;

const GRID_STYLE: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(44, 61, 89, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(44, 61, 89, 0.07) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

const COLORS = {
  indigo: BRAND.primary3,
  sky: BRAND.primary2,
  lilac: BRAND.violet,
} as const;

const TOP_INTENT = {
  goal: "Manufacturing pipeline around pricing change",
  audience: "VP Pricing · RevOps · Strategy",
};

const SIGNALS = [
  { title: "CRM", tag: "Accounts", variant: "graph", accent: COLORS.indigo },
  { title: "Automation", tag: "Journeys", variant: "flow", accent: COLORS.sky },
  { title: "Intent", tag: "Surges", variant: "network", accent: COLORS.lilac },
  { title: "Engagement", tag: "Visits", variant: "cards", accent: COLORS.indigo },
  { title: "Reporting", tag: "Benchmarks", variant: "report", accent: COLORS.sky },
  { title: "LLMs", tag: "Agents", variant: "chat", accent: COLORS.indigo },
] as const;

const SIGNAL_FLOW_PATHS = [
  { d: "M 16 34 C 27 34 36 36 44 42", stroke: COLORS.indigo },
  { d: "M 16 42 C 28 42 36 44 44 47", stroke: COLORS.sky },
  { d: "M 16 50 C 29 50 36 50 44 50", stroke: COLORS.lilac },
  { d: "M 16 58 C 29 58 36 56 44 54", stroke: COLORS.indigo },
  { d: "M 16 66 C 28 64 36 60 44 58", stroke: COLORS.sky },
  { d: "M 16 74 C 28 69 36 63 44 61", stroke: COLORS.indigo },
] as const;

const HUB_ANNOTATIONS = ["Identity", "Segments", "Next action", "Execute"] as const;

const BUILD_TILES = [
  { title: "Segments", tag: "Audience", variant: "cards", accent: COLORS.indigo, x: -286, y: -93 },
  { title: "Landing", tag: "Structure", variant: "landing", accent: COLORS.sky, x: 0, y: -300 },
  { title: "Content mix", tag: "Proof", variant: "board", accent: COLORS.lilac, x: 286, y: -93 },
  { title: "Messaging", tag: "Frames", variant: "feed", accent: COLORS.indigo, x: 176, y: 243 },
  { title: "Channels", tag: "Activation", variant: "flow", accent: COLORS.sky, x: -176, y: 243 },
] as const;

const BUILD_FLOW_PATHS = [
  "M 46 48 C 41 46 37 44 33 42",
  "M 49 43 C 48 39 48 35 49 29",
  "M 54 48 C 59 46 63 44 67 42",
  "M 53 53 C 56 58 60 62 65 66",
  "M 47 53 C 44 58 40 62 36 67",
] as const;

const ACTIVATE_CHANNELS = [
  { title: "Email", tag: "Nurture", system: "Folloze", variant: "chat", accent: COLORS.indigo },
  { title: "LinkedIn Ads", tag: "Paid", system: "Folloze", variant: "feed", accent: COLORS.sky },
  { title: "Website", tag: "Experiences", system: "Folloze", variant: "landing", accent: COLORS.lilac },
] as const;

const ACTIVATE_INTEGRATIONS = [
  { title: "Ad platforms", detail: "LinkedIn · Google", accent: COLORS.sky },
  { title: "MAP", detail: "HubSpot · Marketo", accent: COLORS.indigo },
  { title: "Sales tools", detail: "Outreach · Salesloft", accent: COLORS.indigo },
  { title: "Web + data", detail: "CMS · analytics", accent: COLORS.lilac },
] as const;

const ACTIVATE_FLOW_PATHS = [
  { d: "M 57 45 C 64 42 69 39 74.4 36", width: 1.28 },
  { d: "M 57 50 C 64 50 69 50 74.4 50", width: 1.48 },
  { d: "M 57 56 C 64 59 69 62 74.4 66", width: 1.32 },
] as const;

const PERSONAS = [
  { title: "Pricing Ops", tag: "Workflow", variant: "board", accent: COLORS.indigo },
  { title: "CFO", tag: "Impact", variant: "report", accent: COLORS.sky },
  { title: "RevOps", tag: "Systems", variant: "network", accent: COLORS.lilac },
  { title: "Strategic", tag: "Accounts", variant: "cards", accent: COLORS.indigo },
] as const;

const PERSONALIZE_ACTIONS = [
  { title: "Audience selection", accent: COLORS.sky },
  { title: "Edit campaign", accent: COLORS.indigo },
  { title: "Approve and launch", accent: COLORS.lilac },
] as const;

const ANALYTICS = [
  { title: "Engagement", tag: "Signals", variant: "graph", accent: COLORS.indigo },
  { title: "Visitors", tag: "Identity", variant: "network", accent: COLORS.sky },
  { title: "Pipeline", tag: "Impact", variant: "report", accent: COLORS.indigo },
  { title: "Conversion", tag: "Trends", variant: "graph", accent: COLORS.lilac },
  { title: "Revenue", tag: "Feedback", variant: "flow", accent: COLORS.sky },
] as const;

const FINAL_ANCHORS = [
  { title: "Design", tag: "01" },
  { title: "Build", tag: "02" },
  { title: "Activate", tag: "03" },
  { title: "Optimize", tag: "04" },
] as const;

const PHASES = [
  { label: "Arrival", start: 0 },
  { label: "Engine", start: 0.1 },
  { label: "Signals", start: 0.18 },
  { label: "Dual control", start: 0.3 },
  { label: "Build", start: 0.44 },
  { label: "Personalize", start: 0.56 },
  { label: "Activate", start: 0.76 },
  { label: "Measure + optimize", start: 0.86 },
  { label: "Steady", start: 0.93 },
] as const;

type VisualVariant =
  | "graph"
  | "flow"
  | "network"
  | "cards"
  | "report"
  | "chat"
  | "board"
  | "landing"
  | "feed"
  | "control"
  | "persona";

type VisualCardData = {
  title: string;
  tag: string;
  variant: VisualVariant;
  accent: string;
  image?: string;
};

type SceneState = {
  arrival: number;
  inputs: number;
  engine: number;
  dual: number;
  build: number;
  personalize: number;
  activate: number;
  analytics: number;
  steady: number;
  hub: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function alphaColor(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const r = Number.parseInt(fullHex.slice(0, 2), 16);
  const g = Number.parseInt(fullHex.slice(2, 4), 16);
  const b = Number.parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function progressBetween(value: number, start: number, end: number) {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
}

function sceneWindow(progress: number, start: number, end: number, feather = STATE_FEATHER) {
  const fade = Math.min(feather, (end - start) / 2);
  const fadeIn = start <= 0 ? 1 : progressBetween(progress, start, start + fade);
  const fadeOut = end >= 1 ? 1 : 1 - progressBetween(progress, end - fade, end);

  return clamp(Math.min(fadeIn, fadeOut));
}

function getActivePhase(progress: number) {
  let active = 0;

  PHASES.forEach((phase, index) => {
    if (progress >= phase.start) {
      active = index;
    }
  });

  return active;
}

function getScenes(progress: number): SceneState {
  const arrival = sceneWindow(progress, 0, 0.1, 0.024);
  const engine = sceneWindow(progress, 0.1, 0.28);
  const inputs = sceneWindow(progress, 0.18, 0.36);
  const dual = sceneWindow(progress, 0.3, 0.46);
  const build = sceneWindow(progress, 0.44, 0.6);
  const personalize = sceneWindow(progress, 0.56, 0.8);
  const activate = sceneWindow(progress, 0.76, 0.9);
  const analytics = sceneWindow(progress, 0.86, 0.97, 0.026);
  const steady = sceneWindow(progress, 0.93, 1, 0.02);
  const hubHold = progressBetween(progress, 0.1, 0.14) * 0.96;

  return {
    arrival,
    inputs,
    engine,
    dual,
    build,
    personalize,
    activate,
    analytics,
    steady,
    hub: clamp(
      Math.max(
        hubHold,
        engine,
        inputs * 0.98,
        dual * 0.94,
        build * 0.96,
        personalize * 0.94,
        activate * 0.94,
        analytics * 0.92,
        steady
      )
    ),
  };
}

function SceneLayer({
  active,
  className,
  children,
  offset = 18,
}: {
  active: number;
  className: string;
  children: ReactNode;
  offset?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{ pointerEvents: active > 0.18 ? "auto" : "none" }}
      initial={false}
      animate={{
        opacity: active,
        y: (1 - active) * offset * 0.45,
        scale: 0.985 + active * 0.015,
      }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function GlassPill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/80 bg-white/78 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-slate-500 shadow-[0_18px_48px_rgba(109,126,170,0.12)] backdrop-blur-xl">
      {children}
    </div>
  );
}

function PreviewFrame({
  variant,
  accent,
  image,
  className = "",
  title,
}: {
  variant: VisualVariant;
  accent: string;
  image?: string;
  className?: string;
  title: string;
}) {
  const base = (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/85 bg-white/82 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 14% 18%, ${alphaColor(accent, 0.18)}, transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.96), ${alphaColor(BRAND.neutral0, 0.92)})`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_44%)]" />
      {renderPreviewVariant(variant, accent)}
    </div>
  );

  if (!image) return base;

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/85 bg-white/82 ${className}`}
    >
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.12))]" />
    </div>
  );
}

function renderPreviewVariant(variant: VisualVariant, accent: string): ReactNode {
  const dot = {
    backgroundColor: accent,
    boxShadow: `0 0 0 8px ${alphaColor(accent, 0.1)}`,
  };

  switch (variant) {
    case "graph":
      return (
        <>
          <div className="absolute left-5 right-5 top-5 h-10 rounded-[18px] border border-white/70 bg-white/76" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end gap-2">
            {[26, 44, 36, 62, 54].map((height, index) => (
              <div
                key={height}
                className="flex-1 rounded-t-[12px]"
                style={{
                  height,
                  opacity: 0.72 + index * 0.06,
                  background: `linear-gradient(180deg, ${alphaColor(COLORS.indigo, 0.8)}, ${alphaColor(COLORS.sky, 0.46)})`,
                }}
              />
            ))}
          </div>
          <svg viewBox="0 0 100 60" className="absolute bottom-12 left-5 right-5 h-[72px] w-[calc(100%-40px)]">
            <path
              d="M 4 42 C 18 36 27 40 38 24 S 62 10 74 18 S 88 25 96 12"
              fill="none"
              stroke={accent}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </>
      );
    case "flow":
      return (
        <>
          <div className="absolute left-5 right-5 top-6 grid gap-3">
            {[0, 1, 2].map((step) => (
              <div key={step} className="relative rounded-[18px] border border-white/80 bg-white/82 px-4 py-4">
                <div className="h-2 w-16 rounded-full bg-slate-200" />
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${72 + step * 8}%`,
                      background: `linear-gradient(90deg, ${accent}, ${COLORS.sky})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      );
    case "network":
      return (
        <>
          {[
            { left: "48%", top: "44%", size: 22 },
            { left: "23%", top: "24%", size: 14 },
            { left: "77%", top: "28%", size: 12 },
            { left: "72%", top: "68%", size: 16 },
            { left: "27%", top: "72%", size: 14 },
          ].map((node, index) => (
            <div
              key={`${node.left}-${node.top}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80"
              style={{
                left: node.left,
                top: node.top,
                width: node.size,
                height: node.size,
                ...dot,
                opacity: index === 0 ? 0.95 : 0.78,
              }}
            />
          ))}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {[
              "M 48 44 C 40 38 33 31 23 24",
              "M 52 44 C 61 37 68 33 77 28",
              "M 52 50 C 60 57 66 63 72 68",
              "M 47 51 C 39 58 34 65 27 72",
            ].map((path) => (
              <path
                key={path}
                d={path}
                fill="none"
                stroke={alphaColor(accent, 0.34)}
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </>
      );
    case "cards":
      return (
        <>
          <div className="absolute left-8 top-8 h-[62%] w-[52%] rounded-[22px] border border-white/80 bg-white/82 shadow-[0_12px_32px_rgba(109,126,170,0.12)]" />
          <div
            className="absolute right-8 top-14 h-[48%] w-[42%] rounded-[22px] border border-white/80 shadow-[0_12px_32px_rgba(109,126,170,0.12)]"
            style={{ backgroundColor: alphaColor(accent, 0.08) }}
          />
          <div className="absolute bottom-8 left-[22%] h-[32%] w-[52%] rounded-[22px] border border-white/80 bg-white/88 shadow-[0_12px_32px_rgba(109,126,170,0.12)]" />
          <div className="absolute left-12 top-12 h-3 w-24 rounded-full bg-slate-200" />
          <div className="absolute left-12 top-20 h-2 w-28 rounded-full bg-slate-100" />
        </>
      );
    case "report":
      return (
        <>
          <div className="absolute left-6 right-6 top-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((cell) => (
              <div key={cell} className="rounded-[16px] border border-white/80 bg-white/82 p-3">
                <div className="h-2 w-10 rounded-full bg-slate-200" />
                <div className="mt-4 h-8 rounded-[10px]" style={{ backgroundColor: alphaColor(accent, 0.12) }} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-[20px] border border-white/80 bg-white/84 p-4">
            <div className="flex items-end gap-2">
              {[26, 42, 36, 56, 50, 62].map((height) => (
                <div key={height} className="flex-1 rounded-t-[12px]" style={{ height, backgroundColor: `${accent}66` }} />
              ))}
            </div>
          </div>
        </>
      );
    case "chat":
      return (
        <>
          <div className="absolute left-6 top-8 h-12 w-[64%] rounded-[18px] border border-white/80 bg-white/84" />
          <div
            className="absolute right-6 top-24 h-12 w-[56%] rounded-[18px]"
            style={{ backgroundColor: alphaColor(accent, 0.12) }}
          />
          <div className="absolute left-6 top-40 h-14 w-[70%] rounded-[18px] border border-white/80 bg-white/84" />
          <div className="absolute bottom-6 left-6 right-6 h-12 rounded-[18px] border border-white/80 bg-white/78" />
        </>
      );
    case "board":
      return (
        <>
          <div className="absolute left-6 right-6 top-6 h-[45%] rounded-[22px] border border-white/80 bg-white/84 shadow-[0_10px_28px_rgba(109,126,170,0.08)]" />
          <div className="absolute left-6 bottom-6 h-[28%] w-[38%] rounded-[18px] border border-white/80 bg-white/84" />
          <div
            className="absolute right-6 bottom-6 h-[28%] w-[48%] rounded-[18px]"
            style={{ backgroundColor: alphaColor(accent, 0.1) }}
          />
        </>
      );
    case "landing":
      return (
        <>
          <div
            className="absolute left-6 right-6 top-6 h-[52%] rounded-[24px]"
            style={{
              background: `linear-gradient(135deg, ${alphaColor(COLORS.sky, 0.18)}, ${alphaColor(COLORS.indigo, 0.06)})`,
            }}
          />
          <div className="absolute left-10 top-10 h-3 w-24 rounded-full bg-white/86" />
          <div className="absolute left-10 top-[4.4rem] h-3 w-20 rounded-full bg-white/66" />
          <div className="absolute bottom-8 left-6 flex gap-3">
            <div className="h-12 w-28 rounded-[16px] border border-white/80 bg-white/84" />
            <div className="h-12 w-20 rounded-[16px]" style={{ backgroundColor: alphaColor(COLORS.indigo, 0.1) }} />
          </div>
        </>
      );
    case "feed":
      return (
        <>
          <div className="absolute inset-x-6 top-6 grid gap-3">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="rounded-[18px] border border-white/80 bg-white/82 p-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-[14px]" style={{ backgroundColor: `${accent}28` }} />
                  <div className="flex-1">
                    <div className="h-2 w-24 rounded-full bg-slate-200" />
                    <div className="mt-3 h-2 w-full rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    case "control":
      return (
        <>
          <div className="absolute left-6 right-6 top-7 h-[60%] rounded-[24px] border border-white/80 bg-white/86" />
          <div className="absolute left-6 right-6 top-11 grid grid-cols-3 gap-3">
            {["Edit", "Audience", "Approve"].map((chip) => (
              <div key={chip} className="flex justify-center">
                <div className="rounded-full border border-white/80 bg-[rgba(255,255,255,0.9)] px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {chip}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-7 left-6 right-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((cell) => (
              <div key={cell} className="rounded-[18px] border border-white/80 bg-white/84 p-3">
                <div className="h-2 w-16 rounded-full bg-slate-200" />
                <div className="mt-3 h-10 rounded-[12px]" style={{ backgroundColor: alphaColor(accent, 0.08) }} />
              </div>
            ))}
          </div>
        </>
      );
    case "persona":
      return (
        <>
          <div className="absolute left-8 top-1/2 h-[42%] w-[34%] -translate-y-1/2 rounded-[22px] border border-white/80 bg-white/84" />
          <div
            className="absolute right-7 top-8 h-12 w-[42%] rounded-[18px]"
            style={{ backgroundColor: alphaColor(COLORS.indigo, 0.1) }}
          />
          <div className="absolute right-4 top-[34%] h-12 w-[48%] rounded-[18px] border border-white/80 bg-white/84" />
          <div
            className="absolute right-4 bottom-[24%] h-12 w-[48%] rounded-[18px]"
            style={{ backgroundColor: alphaColor(COLORS.sky, 0.12) }}
          />
          <div className="absolute right-7 bottom-8 h-12 w-[42%] rounded-[18px] border border-white/80 bg-white/84" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {[
              "M 36 50 C 48 42 58 30 72 18",
              "M 36 50 C 50 48 60 46 76 40",
              "M 36 50 C 50 54 60 58 76 62",
              "M 36 50 C 48 60 58 70 72 82",
            ].map((path) => (
              <path
                key={path}
                d={path}
                fill="none"
                stroke={alphaColor(COLORS.indigo, 0.24)}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </>
      );
  }

  return null;
}

function MediaCard({
  item,
  active,
  className = "",
  previewClassName = "aspect-[1.28/1]",
  titleClassName = "",
  minimal = false,
}: {
  item: VisualCardData;
  active: number;
  className?: string;
  previewClassName?: string;
  titleClassName?: string;
  minimal?: boolean;
}) {
  return (
    <motion.div
      className={`rounded-[26px] border border-white/85 bg-white/76 p-4 shadow-[0_20px_52px_rgba(109,126,170,0.12)] backdrop-blur-xl ${className}`}
      initial={false}
      animate={{
        opacity: active,
        y: (1 - active) * 14,
        scale: 0.96 + active * 0.04,
      }}
      transition={{ duration: 0.68, ease: EASE }}
    >
      <PreviewFrame
        variant={item.variant}
        accent={item.accent}
        image={item.image}
        className={previewClassName}
        title={item.title}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <h3 className={`text-sm font-semibold text-slate-900 ${titleClassName}`}>{item.title}</h3>
          {!minimal ? (
            <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {item.tag}
            </p>
          ) : null}
        </div>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.accent }} />
      </div>
    </motion.div>
  );
}

function BrandDock() {
  return (
    <div className="absolute left-6 top-6 z-40 flex items-center gap-3.5 rounded-full border border-white/80 bg-white/76 px-4 py-3 shadow-[0_18px_48px_rgba(109,126,170,0.14)] backdrop-blur-xl">
      <Image src={LOGO_SRC} alt="Folloze" width={99} height={24} className="h-5 w-auto" priority />
      <div className="h-5 w-px" style={{ backgroundColor: alphaColor(BRAND.neutral3, 0.12) }} />
      <p className="text-sm font-medium" style={{ color: BRAND.neutral3 }}>
        Orchestration hub
      </p>
    </div>
  );
}

function PhaseMeter({ activePhase }: { activePhase: number }) {
  const isSteadyPhase = activePhase === PHASES.length - 1;

  return (
    <div className="absolute right-6 top-6 z-40 rounded-[24px] border border-white/80 bg-white/76 px-4 py-3 shadow-[0_18px_48px_rgba(109,126,170,0.12)] backdrop-blur-xl">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
        System state
      </p>
      <div className="mt-3 flex gap-1.5">
        {PHASES.map((phase, index) => (
          <span
            key={phase.label}
            className={`h-1 rounded-full transition-all duration-500 ${
              index <= activePhase ? "w-7 bg-slate-900" : "w-4 bg-slate-300"
            }`}
          />
        ))}
      </div>
      {!isSteadyPhase ? <p className="mt-3 text-sm font-medium text-slate-800">{PHASES[activePhase].label}</p> : null}
    </div>
  );
}

function TopHeadline({ active }: { active: number }) {
  return (
    <SceneLayer active={active} className="absolute inset-x-0 top-0 z-30 flex justify-center px-8 pt-10" offset={10}>
      <div className="w-full max-w-[760px] text-center">
        <GlassPill>Campaign intent</GlassPill>
        <h1 className="mt-5 [font-family:var(--font-display)] text-[4.3rem] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">
          AI agents for B2B marketing
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-lg text-slate-600">
          Idea in. Live campaign out.
        </p>

        <div className="mx-auto mt-7 max-w-[720px] rounded-[30px] border border-white/85 bg-white/76 p-4 shadow-[0_22px_60px_rgba(109,126,170,0.14)] backdrop-blur-xl">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <PreviewFrame
              title="Campaign intent"
              variant="landing"
              accent={COLORS.indigo}
              className="aspect-[1.9/1]"
            />
            <div className="grid gap-3 text-left">
              <div className="rounded-[22px] border border-white/85 bg-white/82 px-5 py-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Goal
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">{TOP_INTENT.goal}</p>
              </div>
              <div className="rounded-[22px] border border-white/85 bg-white/82 px-5 py-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Audience
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">{TOP_INTENT.audience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneLayer>
  );
}

function renderSignalGlyph(variant: VisualVariant, accent: string): ReactNode {
  switch (variant) {
    case "graph":
      return (
        <>
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-2">
            {[16, 24, 18, 32, 28].map((height) => (
              <div
                key={height}
                className="flex-1 rounded-t-[8px]"
                style={{ height, backgroundColor: `${accent}5c` }}
              />
            ))}
          </div>
          <svg viewBox="0 0 100 40" className="absolute left-3 right-3 top-2 h-[42px] w-[calc(100%-24px)]">
            <path
              d="M 4 28 C 18 28 24 20 36 20 S 56 28 70 14 S 84 8 96 10"
              fill="none"
              stroke={accent}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </>
      );
    case "flow":
      return (
        <div className="absolute inset-3 grid gap-2">
          {[72, 58, 66].map((width, index) => (
            <div
              key={width}
              className="rounded-[10px] border border-white/80 bg-white/82 px-3 py-2"
              style={{ opacity: 0.92 - index * 0.08 }}
            >
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${width}%`,
                    background: `linear-gradient(90deg, ${accent}, ${COLORS.sky})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "network":
      return (
        <>
          {[
            { left: "22%", top: "24%" },
            { left: "76%", top: "26%" },
            { left: "50%", top: "50%" },
            { left: "24%", top: "78%" },
            { left: "78%", top: "76%" },
          ].map((node) => (
            <div
              key={`${node.left}-${node.top}`}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: node.left, top: node.top, backgroundColor: accent }}
            />
          ))}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {[
              "M 22 24 C 34 30 40 38 50 50",
              "M 76 26 C 64 32 58 38 50 50",
              "M 24 78 C 36 68 42 60 50 50",
              "M 78 76 C 66 68 58 60 50 50",
            ].map((path) => (
              <path
                key={path}
                d={path}
                fill="none"
                stroke={`${accent}66`}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </>
      );
    case "cards":
      return (
        <>
          <div className="absolute left-3 top-3 h-[58%] w-[56%] rounded-[14px] border border-white/80 bg-white/84 shadow-[0_8px_18px_rgba(109,126,170,0.08)]" />
          <div
            className="absolute right-3 top-5 h-[44%] w-[40%] rounded-[14px]"
            style={{ backgroundColor: alphaColor(accent, 0.1) }}
          />
          <div className="absolute bottom-3 left-[24%] h-[28%] w-[50%] rounded-[14px] border border-white/80 bg-white/86" />
        </>
      );
    case "report":
      return (
        <>
          <div className="absolute left-3 right-3 top-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((cell) => (
              <div key={cell} className="rounded-[10px] border border-white/80 bg-white/82 px-2 py-2">
                <div className="h-1.5 w-5 rounded-full bg-slate-200" />
                <div className="mt-2 h-5 rounded-[8px]" style={{ backgroundColor: `${accent}20` }} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-1.5">
            {[12, 22, 18, 28, 20].map((height) => (
              <div key={height} className="flex-1 rounded-t-[8px]" style={{ height, backgroundColor: `${accent}72` }} />
            ))}
          </div>
        </>
      );
    case "chat":
      return (
        <>
          <div className="absolute left-3 top-4 h-9 w-[62%] rounded-[14px] border border-white/80 bg-white/84" />
          <div className="absolute right-3 top-14 h-8 w-[50%] rounded-[14px]" style={{ backgroundColor: `${accent}20` }} />
          <div className="absolute left-5 bottom-4 h-8 w-[58%] rounded-[14px] border border-white/80 bg-white/84" />
        </>
      );
    default:
      return null;
  }
}

function SignalMiniCard({
  item,
  active,
}: {
  item: (typeof SIGNALS)[number];
  active: number;
}) {
  return (
    <motion.div
      className="rounded-[22px] border border-white/85 bg-white/78 p-2.5 shadow-[0_18px_42px_rgba(109,126,170,0.1)] backdrop-blur-xl"
      initial={false}
      animate={{
        opacity: active,
        y: (1 - active) * 12,
        scale: 0.97 + active * 0.03,
      }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="relative h-[72px] overflow-hidden rounded-[16px] border border-white/80 bg-white/84">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 18%, ${item.accent}26, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.94), rgba(238,243,255,0.82))`,
          }}
        />
        {renderSignalGlyph(item.variant, item.accent)}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[0.72rem] font-semibold text-slate-900">{item.title}</p>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.accent }} />
      </div>
    </motion.div>
  );
}

function SignalsScene({ active }: { active: number }) {
  return (
    <SceneLayer active={active} className="absolute left-6 top-[23%] z-20 w-[150px]">
      <div className="rounded-[24px] border border-white/85 bg-white/76 p-4 shadow-[0_22px_60px_rgba(109,126,170,0.12)] backdrop-blur-xl">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Signals in
        </p>
        <p className="mt-2 text-[0.72rem] leading-5 text-slate-600">Identity. Intent. Engagement.</p>
      </div>
      <div className="mt-2.5 grid gap-2.5">
        {SIGNALS.map((item, index) => (
          <SignalMiniCard
            key={item.title}
            item={item}
            active={clamp(active - index * 0.04)}
          />
        ))}
      </div>
    </SceneLayer>
  );
}

function HubAnnotation({
  label,
  position,
  active,
}: {
  label: string;
  position: { left?: string; right?: string; top?: string; bottom?: string };
  active: number;
}) {
  return (
    <motion.div
      className="absolute z-30 rounded-full border border-white/85 bg-white/82 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-[0_18px_48px_rgba(109,126,170,0.12)] backdrop-blur-xl"
      style={{ ...position }}
      initial={false}
      animate={{
        opacity: active,
        y: (1 - active) * 10,
      }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {label}
    </motion.div>
  );
}

function DecisionHub({ active, focus, steady, reduceMotion }: { active: number; focus: number; steady: number; reduceMotion: boolean }) {
  const pulse = reduceMotion
    ? { scale: 1, opacity: 0.2 }
    : { scale: [0.96, 1.04, 0.96], opacity: [0.12, 0.28, 0.12] };

  return (
    <motion.div
      className="absolute left-1/2 top-[51%] z-20 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 xl:h-[470px] xl:w-[470px]"
      initial={false}
      animate={{
        opacity: 0.14 + active * 0.86,
        scale: 0.94 + active * 0.06,
      }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${alphaColor(COLORS.sky, 0.18)}, ${alphaColor(COLORS.lilac, 0.06)} 42%, transparent 64%)`,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[236px] w-[236px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `1px solid ${alphaColor(COLORS.indigo, 0.18)}` }}
        animate={pulse}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { duration: 5.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
        }
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[308px] w-[308px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: `1px solid ${alphaColor(COLORS.lilac, 0.16)}` }}
        animate={pulse}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { duration: 7.2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, delay: 0.6 }
        }
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          { d: "M 17 26 C 27 20 34 21 43 34" },
          { d: "M 30 14 C 39 18 44 25 46 34" },
          { d: "M 49 10 C 50 20 50 27 50 34" },
          { d: "M 70 15 C 61 18 56 25 54 34" },
          { d: "M 84 26 C 74 20 66 21 57 34" },
          { d: "M 88 47 C 74 46 67 46 58 48" },
          { d: "M 79 69 C 69 62 62 58 56 53" },
          { d: "M 63 84 C 57 73 54 66 52 58" },
          { d: "M 40 87 C 44 74 47 66 48 58" },
          { d: "M 18 74 C 30 67 36 61 43 56" },
          { d: "M 11 54 C 24 52 31 51 41 51" },
          { d: "M 71 54 C 64 54 60 53 58 52" },
        ].map((path) => (
          <path
            key={path.d}
            d={path.d}
            fill="none"
            stroke={alphaColor(BRAND.neutral3, 0.14)}
            strokeWidth="0.45"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {[
        { x: 17, y: 26, size: 18, color: COLORS.indigo },
        { x: 30, y: 14, size: 12, color: COLORS.sky },
        { x: 49, y: 10, size: 10, color: COLORS.lilac },
        { x: 70, y: 15, size: 15, color: COLORS.sky },
        { x: 84, y: 26, size: 17, color: COLORS.indigo },
        { x: 88, y: 47, size: 11, color: COLORS.sky },
        { x: 79, y: 69, size: 16, color: COLORS.lilac },
        { x: 63, y: 84, size: 14, color: COLORS.indigo },
        { x: 40, y: 87, size: 18, color: COLORS.sky },
        { x: 18, y: 74, size: 14, color: COLORS.lilac },
        { x: 11, y: 54, size: 10, color: COLORS.indigo },
        { x: 71, y: 54, size: 11, color: COLORS.lilac },
      ].map((node, index) => (
        <motion.span
          key={`${node.x}-${node.y}`}
          className="absolute rounded-full border border-white/80"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            backgroundColor: node.color,
            boxShadow: `0 0 0 10px ${node.color}18`,
          }}
          initial={false}
          animate={
            reduceMotion
              ? { opacity: 0.4 + active * 0.5, scale: 1 }
              : { opacity: 0.4 + active * 0.5, scale: [1, 1.1, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 3.2 + index * 0.25,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.1,
                }
          }
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[184px] w-[184px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[42px] px-6 text-center shadow-[0_28px_80px_rgba(109,126,170,0.18)]"
        style={{
          border: `1px solid ${alphaColor(COLORS.indigo, 0.2)}`,
          background: `linear-gradient(145deg, rgba(255,255,255,0.98), ${alphaColor(BRAND.neutral2, 0.84)})`,
        }}
        initial={false}
        animate={{
          boxShadow:
            steady > 0.16
              ? "0 34px 92px rgba(109,126,170,0.24)"
              : "0 28px 80px rgba(109,126,170,0.18)",
        }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Folloze
        </p>
        <p className="mt-2 [font-family:var(--font-display)] text-[1.8rem] font-semibold leading-tight tracking-[-0.06em] text-slate-950">
          Decision
          <span className="block">Engine</span>
        </p>
      </motion.div>

      {[
        { left: "2%", top: "18%" },
        { right: "2%", top: "18%" },
        { left: "2%", bottom: "18%" },
        { right: "2%", bottom: "18%" },
      ].map((position, index) => (
        <HubAnnotation
          key={HUB_ANNOTATIONS[index]}
          label={HUB_ANNOTATIONS[index]}
          position={position}
          active={focus}
        />
      ))}
    </motion.div>
  );
}

function DualControlScene({ active }: { active: number }) {
  return (
    <>
      <SceneLayer active={active} className="absolute left-1/2 top-[24%] z-20 w-[480px] -translate-x-1/2 text-center" offset={10}>
        <GlassPill>Operate the same engine two ways</GlassPill>
      </SceneLayer>

      <SceneLayer active={active} className="absolute left-[18%] top-[36%] z-20 w-[270px]">
        <div className="rounded-[30px] border border-white/85 bg-white/76 p-5 shadow-[0_22px_60px_rgba(109,126,170,0.12)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Use Folloze natively</h3>
            <span
              className="rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
              style={{ backgroundColor: alphaColor(COLORS.indigo, 0.08) }}
            >
              Workflow
            </span>
          </div>
          <PreviewFrame
            title="Native workflow"
            variant="flow"
            accent={COLORS.indigo}
            className="mt-4 aspect-[1.04/1]"
          />
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-[18px] border border-white/85 bg-white/78 p-2">
            {["Intent", "Segments", "Launch"].map((chip) => (
              <div
                key={chip}
                className="rounded-[14px] border border-white/80 bg-white/84 px-2.5 py-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </SceneLayer>

      <SceneLayer active={active} className="absolute right-[18%] top-[36%] z-20 w-[270px]">
        <div className="rounded-[30px] border border-white/85 bg-white/76 p-5 shadow-[0_22px_60px_rgba(109,126,170,0.12)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Use your own agent</h3>
            <span
              className="rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
              style={{ backgroundColor: alphaColor(COLORS.lilac, 0.1) }}
            >
              Chat
            </span>
          </div>
          <PreviewFrame
            title="Agent control"
            variant="chat"
            accent={COLORS.sky}
            className="mt-4 aspect-[1.04/1]"
          />
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-[18px] border border-white/85 bg-white/78 p-2">
            {["MCP", "API", "CLI"].map((chip) => (
              <div
                key={chip}
                className="rounded-[14px] border border-white/80 bg-white/84 px-2.5 py-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </SceneLayer>
    </>
  );
}

function BuildScene({ active }: { active: number }) {
  return (
    <>
      <SceneLayer active={active} className="absolute left-1/2 bottom-[11%] z-20 w-[220px] -translate-x-1/2 text-center" offset={12}>
        <GlassPill>Build the campaign</GlassPill>
      </SceneLayer>

      {BUILD_TILES.map((item, index) => (
        <div key={item.title} className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-[176px]"
            initial={false}
            animate={{
              x: item.x * active,
              y: item.y * active,
              opacity: active,
              scale: 0.86 + active * 0.14,
            }}
            transition={{ duration: 0.72, ease: EASE, delay: index * 0.03 }}
          >
            <MediaCard item={item} active={active} />
          </motion.div>
        </div>
      ))}
    </>
  );
}

function PersonalizePersonaCard({
  item,
  active,
  index,
}: {
  item: (typeof PERSONAS)[number];
  active: number;
  index: number;
}) {
  const level = clamp(active - index * 0.04);

  return (
    <motion.div
      className="rounded-[20px] border border-white/85 bg-white/82 p-2.5 shadow-[0_14px_32px_rgba(109,126,170,0.08)]"
      initial={false}
      animate={{
        opacity: level,
        y: (1 - level) * 8,
        scale: 0.975 + level * 0.025,
      }}
      transition={{ duration: 0.58, ease: EASE }}
    >
      <p className="text-[0.74rem] font-semibold leading-4 text-slate-900">{item.title}</p>
      <p className="mt-1 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {item.tag}
      </p>
      <PreviewFrame
        title={item.title}
        variant={item.variant}
        accent={item.accent}
        className="mt-3 aspect-square"
      />
    </motion.div>
  );
}

function PersonalizeActionTab({
  item,
  active,
  index,
}: {
  item: (typeof PERSONALIZE_ACTIONS)[number];
  active: number;
  index: number;
}) {
  const level = clamp(active - index * 0.04);

  return (
    <motion.div
      className="flex items-center justify-between rounded-[18px] border border-white/85 bg-white/82 px-4 py-3 shadow-[0_14px_32px_rgba(109,126,170,0.08)]"
      initial={false}
      animate={{
        opacity: level,
        y: (1 - level) * 8,
        scale: 0.98 + level * 0.02,
      }}
      transition={{ duration: 0.58, ease: EASE }}
    >
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.accent }} />
        <p className="text-[0.72rem] font-semibold tracking-[-0.01em] text-slate-900">{item.title}</p>
      </div>
      <div className="h-2 w-14 rounded-full" style={{ backgroundColor: alphaColor(BRAND.neutral2, 0.82) }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${64 + index * 12}%`, backgroundColor: item.accent }}
        />
      </div>
    </motion.div>
  );
}

function PersonalizeScene({ active }: { active: number }) {
  return (
    <SceneLayer active={active} className="absolute left-1/2 top-[10%] z-30 w-[920px] -translate-x-1/2" offset={12}>
      <div className="rounded-[34px] border border-white/85 bg-white/76 p-5 shadow-[0_24px_70px_rgba(109,126,170,0.14)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <GlassPill>Personalize at scale</GlassPill>
          <div className="flex gap-2">
            {["Copy", "Audience", "Mix", "Approve"].map((chip) => (
              <div
                key={chip}
                className="rounded-full border border-white/85 bg-white/84 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500"
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[1.05fr_0.95fr] gap-4">
          <div className="rounded-[28px] border border-white/85 bg-white/82 p-4 shadow-[0_18px_42px_rgba(109,126,170,0.08)]">
            <PreviewFrame
              title="Human controls"
              variant="control"
              accent={COLORS.indigo}
              className="aspect-[2.2/1]"
            />
            <div className="mt-3 grid gap-2.5">
              {PERSONALIZE_ACTIONS.map((item, index) => (
                <PersonalizeActionTab
                  key={item.title}
                  item={item}
                  active={active}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/85 bg-white/82 p-4 shadow-[0_18px_42px_rgba(109,126,170,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Tailored experiences
              </p>
              <div className="rounded-full border border-white/85 bg-white/88 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                One strategy
              </div>
            </div>
            <div className="mt-3 grid h-[248px] grid-cols-2 grid-rows-2 gap-3">
              {PERSONAS.map((item, index) => (
                <PersonalizePersonaCard
                  key={item.title}
                  item={item}
                  active={active}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneLayer>
  );
}

function ActivateChannelCard({
  item,
  active,
  index,
  className = "",
}: {
  item: (typeof ACTIVATE_CHANNELS)[number];
  active: number;
  index: number;
  className?: string;
}) {
  const level = clamp(active - index * 0.05);

  return (
    <motion.div
      className={`rounded-[22px] border border-white/85 bg-white/78 p-3 shadow-[0_18px_46px_rgba(109,126,170,0.1)] backdrop-blur-xl ${className}`}
      initial={false}
      animate={{
        opacity: level,
        y: (1 - level) * 10,
        scale: 0.97 + level * 0.03,
      }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="flex items-start gap-3">
        <PreviewFrame
          title={item.title}
          variant={item.variant}
          accent={item.accent}
          className="h-12 w-12 shrink-0"
        />
        <div className="min-w-0">
          <p className="text-[0.78rem] font-semibold leading-4 text-slate-900">{item.title}</p>
          <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {item.tag}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/85 bg-white/88 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
            {item.system}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivateIntegrationTile({
  item,
  active,
  index,
}: {
  item: (typeof ACTIVATE_INTEGRATIONS)[number];
  active: number;
  index: number;
}) {
  const level = clamp(active - index * 0.04);

  return (
    <motion.div
      className="rounded-[18px] border border-white/85 bg-white/82 px-3 py-3 shadow-[0_14px_32px_rgba(109,126,170,0.08)]"
      initial={false}
      animate={{
        opacity: level,
        y: (1 - level) * 8,
        scale: 0.975 + level * 0.025,
      }}
      transition={{ duration: 0.58, ease: EASE }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.accent }} />
        <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {item.title}
        </p>
      </div>
      <p className="mt-2 text-[0.72rem] font-medium leading-4 text-slate-900">{item.detail}</p>
    </motion.div>
  );
}

function ActivateScene({ active }: { active: number }) {
  return (
    <SceneLayer active={active} className="absolute right-6 top-[51%] z-20 w-[344px] -translate-y-1/2">
      <div className="relative">
        <motion.div
          className="absolute -left-[5.8rem] top-[71%] rounded-full border border-white/85 bg-white/84 px-3 py-2 shadow-[0_14px_32px_rgba(109,126,170,0.1)] backdrop-blur-xl"
          initial={false}
          animate={{
            opacity: clamp(active - 0.08),
            x: (1 - clamp(active - 0.08)) * 10,
            scale: 0.98 + clamp(active - 0.08) * 0.02,
          }}
          transition={{ duration: 0.58, ease: EASE }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.indigo }} />
            <p className="text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Fulfilled
            </p>
          </div>
        </motion.div>

        <div className="rounded-[28px] border border-white/85 bg-white/76 p-4 shadow-[0_22px_60px_rgba(109,126,170,0.12)] backdrop-blur-xl">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Activate everywhere
          </p>
          <p className="mt-2 text-[0.78rem] text-slate-600">Channels + systems in sync.</p>
        </div>

        <div className="mt-3 rounded-[24px] border border-white/85 bg-white/76 p-4 shadow-[0_18px_46px_rgba(109,126,170,0.1)] backdrop-blur-xl">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Folloze-powered channels
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {ACTIVATE_CHANNELS.map((item, index) => (
              <ActivateChannelCard
                key={item.title}
                item={item}
                active={active}
                index={index}
                className={index === 2 ? "col-span-2" : ""}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-[24px] border border-white/85 bg-white/76 p-4 shadow-[0_18px_46px_rgba(109,126,170,0.1)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Third-party systems
            </p>
            <div className="rounded-full border border-white/85 bg-white/84 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Live sync
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {ACTIVATE_INTEGRATIONS.map((item, index) => (
              <ActivateIntegrationTile key={item.title} item={item} active={active} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SceneLayer>
  );
}

function AnalyticsScene({ active }: { active: number }) {
  return (
    <SceneLayer active={active} className="absolute inset-x-0 bottom-5 z-20 flex justify-center px-6" offset={18}>
      <div className="w-full max-w-[1420px] rounded-[34px] border border-white/85 bg-white/76 px-6 py-5 shadow-[0_24px_70px_rgba(109,126,170,0.14)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-6">
          <GlassPill>Measure and optimize</GlassPill>
          <p className="text-sm text-slate-600">Feedback closes the loop.</p>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          {ANALYTICS.map((item, index) => (
            <MediaCard
              key={item.title}
              item={item}
              active={clamp(active - index * 0.03)}
              className="p-3"
              previewClassName="aspect-[1.25/1]"
            />
          ))}
        </div>
      </div>
    </SceneLayer>
  );
}

function SteadyStateScene({ active }: { active: number }) {
  return (
    <>
      <SceneLayer active={active} className="absolute left-1/2 bottom-[23%] z-30 w-[560px] -translate-x-1/2 text-center" offset={12}>
        <h2 className="[font-family:var(--font-display)] text-[2.4rem] font-semibold tracking-[-0.07em] text-slate-950">
          A marketing system that keeps learning
        </h2>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/?cta=demo"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_18px_46px_rgba(0,119,255,0.26)] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary2}, ${BRAND.primary4})` }}
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-white/84 px-6 py-3 text-sm font-medium text-slate-800 shadow-[0_18px_46px_rgba(109,126,170,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ border: `1px solid ${alphaColor(BRAND.primary3, 0.18)}` }}
          >
            Try It Now
          </Link>
        </div>
      </SceneLayer>

      <SceneLayer active={active} className="absolute left-1/2 top-[23%] z-20 w-[720px] -translate-x-1/2">
        <div className="relative h-[152px]">
          {[
            { left: "2%", top: "28%" },
            { left: "24%", bottom: "4%" },
            { right: "24%", bottom: "4%" },
            { right: "2%", top: "28%" },
          ].map((position, index) => (
            <div
              key={FINAL_ANCHORS[index].title}
              className="absolute rounded-[20px] border border-white/85 bg-white/82 px-4 py-3 shadow-[0_16px_38px_rgba(109,126,170,0.1)]"
              style={position}
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {FINAL_ANCHORS[index].tag}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">{FINAL_ANCHORS[index].title}</p>
            </div>
          ))}
        </div>
      </SceneLayer>
    </>
  );
}

function AnimatedPath({
  d,
  active,
  stroke,
  width = 1.15,
  reduceMotion,
  dasharray = "8 16",
}: {
  d: string;
  active: number;
  stroke: string;
  width?: number;
  reduceMotion: boolean;
  dasharray?: string;
}) {
  const animatedDash = dasharray !== "1 0";

  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={alphaColor(BRAND.neutral3, 0.12)}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dasharray}
        initial={false}
        animate={{
          opacity: active,
          pathLength: active,
          strokeDashoffset: reduceMotion || active < 0.24 || !animatedDash ? 0 : -60,
        }}
        transition={{
          opacity: { duration: 0.4, ease: EASE },
          pathLength: { duration: 0.7, ease: EASE },
          strokeDashoffset:
            reduceMotion || active < 0.24 || !animatedDash
              ? { duration: 0.2 }
              : { duration: 5, ease: "linear", repeat: Number.POSITIVE_INFINITY },
        }}
      />
    </>
  );
}

function ConnectionLayer({ scenes, reduceMotion }: { scenes: SceneState; reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.sky} />
          <stop offset="100%" stopColor={COLORS.indigo} />
        </linearGradient>
        <linearGradient id="output-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.indigo} />
          <stop offset="100%" stopColor={COLORS.sky} />
        </linearGradient>
        <linearGradient id="build-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND.primary4} />
          <stop offset="55%" stopColor={COLORS.indigo} />
          <stop offset="100%" stopColor={COLORS.lilac} />
        </linearGradient>
        <linearGradient id="activate-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={BRAND.primary4} />
          <stop offset="55%" stopColor={COLORS.indigo} />
          <stop offset="100%" stopColor={COLORS.sky} />
        </linearGradient>
        <linearGradient id="feedback-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.sky} />
          <stop offset="100%" stopColor={COLORS.lilac} />
        </linearGradient>
      </defs>

      {SIGNAL_FLOW_PATHS.map((path, index) => (
        <AnimatedPath
          key={path.d}
          d={path.d}
          active={clamp(Math.max(scenes.inputs, scenes.steady * 0.35) - index * 0.02)}
          stroke={path.stroke}
          width={1.35}
          reduceMotion={reduceMotion}
        />
      ))}

      <AnimatedPath
        d="M 50 22 C 50 31 50 36 50 42"
        active={Math.max(scenes.engine, scenes.steady * 0.5)}
        stroke="url(#signal-gradient)"
        reduceMotion={reduceMotion}
      />

      <AnimatedPath
        d="M 42 48 C 36 44 31 42 25 42"
        active={scenes.dual}
        stroke="url(#signal-gradient)"
        reduceMotion={reduceMotion}
      />
      <AnimatedPath
        d="M 58 48 C 64 44 69 42 75 42"
        active={scenes.dual}
        stroke="url(#signal-gradient)"
        reduceMotion={reduceMotion}
      />

      {BUILD_FLOW_PATHS.map((path, index) => (
        <AnimatedPath
          key={path}
          d={path}
          active={clamp(scenes.build - index * 0.025)}
          stroke="url(#build-gradient)"
          width={1.4}
          reduceMotion={reduceMotion}
          dasharray="1 0"
        />
      ))}

      {ACTIVATE_FLOW_PATHS.map((path, index) => (
        <AnimatedPath
          key={path.d}
          d={path.d}
          active={clamp(Math.max(scenes.activate, scenes.steady * 0.35) - index * 0.03)}
          stroke="url(#activate-gradient)"
          width={path.width}
          reduceMotion={reduceMotion}
          dasharray="1 0"
        />
      ))}
      <AnimatedPath
        d="M 55 54 C 65 57 72 60 78 63"
        active={scenes.personalize}
        stroke="url(#output-gradient)"
        reduceMotion={reduceMotion}
      />

      <AnimatedPath
        d="M 48 55 C 44 63 39 71 31 79"
        active={Math.max(scenes.analytics, scenes.steady * 0.45)}
        stroke="url(#feedback-gradient)"
        width={1.35}
        reduceMotion={reduceMotion}
        dasharray="1 0"
      />
      <AnimatedPath
        d="M 50 56 C 50 64 50 72 50 80"
        active={Math.max(scenes.analytics, scenes.steady * 0.45)}
        stroke="url(#feedback-gradient)"
        width={1.35}
        reduceMotion={reduceMotion}
        dasharray="1 0"
      />
      <AnimatedPath
        d="M 52 55 C 57 63 63 71 71 79"
        active={Math.max(scenes.analytics, scenes.steady * 0.45)}
        stroke="url(#feedback-gradient)"
        width={1.35}
        reduceMotion={reduceMotion}
        dasharray="1 0"
      />
    </svg>
  );
}

function DesktopCanvas() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const shellScale = useTransform(scrollYProgress, [0, 1], [0.995, 1.015]);
  const haloLeftY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const haloRightY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const haloBottomY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = clamp(value);

    startTransition(() => {
      setProgress(next);
      setActivePhase(getActivePhase(next));
    });
  });

  const scenes = getScenes(progress);

  return (
    <div ref={scrollRef} className="relative hidden min-h-[460vh] xl:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: shellScale, backgroundColor: BRAND.neutral0 }}>
          <motion.div
            className="absolute -left-24 top-16 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{
              y: haloLeftY,
              background: `radial-gradient(circle, ${alphaColor(COLORS.sky, 0.22)}, transparent 68%)`,
            }}
          />
          <motion.div
            className="absolute right-[-120px] top-10 h-[440px] w-[440px] rounded-full blur-3xl"
            style={{
              y: haloRightY,
              background: `radial-gradient(circle, ${alphaColor(COLORS.lilac, 0.16)}, transparent 68%)`,
            }}
          />
          <motion.div
            className="absolute bottom-[-180px] left-1/2 h-[460px] w-[640px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              y: haloBottomY,
              background: `radial-gradient(circle, ${alphaColor(BRAND.neutral2, 0.36)}, transparent 72%)`,
            }}
          />
        </motion.div>

        <div className="relative mx-auto h-full max-w-[1600px] px-6 py-6 2xl:px-10">
          <div className="relative h-full overflow-hidden rounded-[40px] border border-white/80 bg-[rgba(249,251,255,0.82)] shadow-[0_36px_140px_rgba(88,106,150,0.16)] backdrop-blur-2xl">
            <div className="absolute inset-0 opacity-70" style={GRID_STYLE} />
            <div className="absolute inset-[18px] rounded-[34px] border border-white/60" />

            <BrandDock />
            <PhaseMeter activePhase={activePhase} />
            <TopHeadline active={scenes.arrival} />
            <ConnectionLayer scenes={scenes} reduceMotion={reduceMotion} />
            <SignalsScene active={Math.max(scenes.inputs, scenes.steady * 0.35)} />
            <DecisionHub active={scenes.hub} focus={scenes.engine} steady={scenes.steady} reduceMotion={reduceMotion} />
            <DualControlScene active={scenes.dual} />
            <BuildScene active={scenes.build} />
            <PersonalizeScene active={scenes.personalize} />
            <ActivateScene active={scenes.activate} />
            <AnalyticsScene active={scenes.analytics} />
            <SteadyStateScene active={scenes.steady} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCard({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[30px] border border-white/85 bg-white/78 p-5 shadow-[0_22px_64px_rgba(109,126,170,0.12)] backdrop-blur-xl">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
        {label}
      </p>
      <h2 className="mt-3 [font-family:var(--font-display)] text-[1.9rem] font-semibold tracking-[-0.06em] text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm text-slate-600">{body}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function MobileCanvas() {
  return (
    <div className="xl:hidden">
      <div className="relative overflow-hidden px-4 pb-10 pt-5">
        <div
          className="absolute -left-24 top-6 h-[260px] w-[260px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${alphaColor(COLORS.sky, 0.18)}, transparent 70%)` }}
        />
        <div
          className="absolute right-[-80px] top-24 h-[220px] w-[220px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${alphaColor(COLORS.lilac, 0.16)}, transparent 68%)` }}
        />

        <div className="relative mx-auto max-w-xl space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/76 px-4 py-3 shadow-[0_18px_48px_rgba(109,126,170,0.12)] backdrop-blur-xl">
            <Image src={LOGO_SRC} alt="Folloze" width={99} height={24} className="h-5 w-auto" priority />
            <div className="h-5 w-px" style={{ backgroundColor: alphaColor(BRAND.neutral3, 0.12) }} />
            <p className="text-sm font-medium" style={{ color: BRAND.neutral3 }}>
              Orchestration hub
            </p>
          </div>

          <MobileCard label="Campaign intent" title="AI agents for B2B marketing" body="Idea in. Live campaign out.">
            <div className="grid gap-4">
              <PreviewFrame
                title="Intent"
                variant="landing"
                accent={COLORS.indigo}
                className="aspect-[1.6/1]"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/85 bg-white/84 px-4 py-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Goal
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800">{TOP_INTENT.goal}</p>
                </div>
                <div className="rounded-[22px] border border-white/85 bg-white/84 px-4 py-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Audience
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800">{TOP_INTENT.audience}</p>
                </div>
              </div>
            </div>
          </MobileCard>

          <MobileCard label="Decision engine" title="Live orchestration" body="Resolve identity. Build segments. Select next action.">
            <div className="grid gap-4">
              <PreviewFrame
                title="Engine"
                variant="network"
                accent={COLORS.indigo}
                className="aspect-[1.15/1]"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {HUB_ANNOTATIONS.map((annotation) => (
                  <div
                    key={annotation}
                    className="rounded-full border border-white/85 bg-white/84 px-4 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-600"
                  >
                    {annotation}
                  </div>
                ))}
              </div>
            </div>
          </MobileCard>

          <MobileCard label="Signals in" title="Source the system" body="Identity. Intent. Engagement.">
            <div className="grid gap-3 sm:grid-cols-2">
              {SIGNALS.map((item) => (
                <MediaCard
                  key={item.title}
                  item={item}
                  active={1}
                  className="p-3"
                  previewClassName="aspect-[1.5/1]"
                  minimal
                />
              ))}
            </div>
          </MobileCard>

          <MobileCard label="Operate the same engine two ways" title="Native workflow or agent control" body="Same hub. Two control paths.">
            <div className="grid gap-3">
              <MediaCard
                item={{ title: "Use Folloze natively", tag: "Workflow", variant: "flow", accent: COLORS.indigo } as const}
                active={1}
              />
              <MediaCard
                item={{ title: "Agent chat", tag: "Chat", variant: "chat", accent: COLORS.sky } as const}
                active={1}
              />
            </div>
          </MobileCard>

          <MobileCard label="Build" title="Assemble the campaign" body="Audience, content, and channels take shape.">
            <div className="grid gap-3 sm:grid-cols-2">
              {BUILD_TILES.map((item) => (
                <MediaCard
                  key={item.title}
                  item={item}
                  active={1}
                  className="p-3"
                  previewClassName="aspect-[1.28/1]"
                />
              ))}
            </div>
          </MobileCard>

          <MobileCard label="Personalize" title="Personalize at scale" body="AI assembles. You tune across audiences.">
            <div className="grid gap-3">
              <PreviewFrame
                title="Personalize"
                variant="control"
                accent={COLORS.indigo}
                className="aspect-[1.55/1]"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {PERSONAS.map((item) => (
                  <MediaCard
                    key={item.title}
                    item={item}
                    active={1}
                    className="p-3"
                    previewClassName="aspect-[1.3/1]"
                    titleClassName="text-[0.82rem]"
                  />
                ))}
              </div>
            </div>
          </MobileCard>

          <MobileCard label="Activate" title="Channels + systems in sync." body="Folloze channels, fulfilled delivery, and third-party sync.">
            <div className="grid gap-3 sm:grid-cols-2">
              {ACTIVATE_CHANNELS.map((item) => (
                <MediaCard
                  key={item.title}
                  item={item}
                  active={1}
                  className="p-3"
                  previewClassName="aspect-[1.45/1]"
                />
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {ACTIVATE_INTEGRATIONS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/85 bg-white/82 px-4 py-4 shadow-[0_18px_42px_rgba(109,126,170,0.08)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.accent }} />
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-900">{item.detail}</p>
                </div>
              ))}
              <div className="rounded-[22px] border border-white/85 bg-white/82 px-4 py-4 shadow-[0_18px_42px_rgba(109,126,170,0.08)] sm:col-span-2">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Fulfilled
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">Activation routes into live delivery.</p>
              </div>
            </div>
          </MobileCard>

          <MobileCard label="Measure + optimize" title="Feedback closes the loop." body="Engagement, pipeline, and revenue flow back in.">
            <div className="grid gap-3 sm:grid-cols-2">
              {ANALYTICS.map((item) => (
                <MediaCard
                  key={item.title}
                  item={item}
                  active={1}
                  className="p-3"
                  previewClassName="aspect-[1.35/1]"
                />
              ))}
            </div>
          </MobileCard>

          <div className="rounded-[30px] border border-white/85 bg-white/78 p-5 text-center shadow-[0_22px_64px_rgba(109,126,170,0.12)] backdrop-blur-xl">
            <h2 className="[font-family:var(--font-display)] text-[2rem] font-semibold tracking-[-0.06em] text-slate-950">
              A marketing system that keeps learning
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {FINAL_ANCHORS.map((anchor) => (
                <div
                  key={anchor.title}
                  className="rounded-[20px] border border-white/85 bg-white/84 px-4 py-3"
                >
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {anchor.tag}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{anchor.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/?cta=demo"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_18px_46px_rgba(0,119,255,0.26)]"
                style={{ background: `linear-gradient(135deg, ${BRAND.primary2}, ${BRAND.primary4})` }}
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white/84 px-6 py-3 text-sm font-medium text-slate-800 shadow-[0_18px_46px_rgba(109,126,170,0.12)]"
                style={{ border: `1px solid ${alphaColor(BRAND.primary3, 0.18)}` }}
              >
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketingSystemCanvas() {
  return (
    <MotionConfig transition={{ duration: 0.72, ease: EASE }}>
      <main className="relative overflow-x-clip [font-family:var(--font-body)] text-slate-950">
        <DesktopCanvas />
        <MobileCanvas />
      </main>
    </MotionConfig>
  );
}
